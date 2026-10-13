"""Aggregate a benchmark iteration into benchmark.json and benchmark.md.

Usage:
    python -m scripts.aggregate_benchmark <workspace>/iteration-N \
        --skill-name <name>

Reads each eval run directory and produces:
    <workspace>/iteration-N/benchmark.json
    <workspace>/iteration-N/benchmark.md
"""
import argparse
import json
import statistics
from pathlib import Path

from .common import read_json, write_json


def _timing(run_dir):
    t = run_dir / "timing.json"
    if not t.exists():
        return {}
    try:
        data = read_json(t)
        return {
            "total_tokens": data.get("total_tokens"),
            "duration_ms": data.get("duration_ms"),
        }
    except Exception:
        return {}


def _grading(run_dir):
    g = run_dir / "grading.json"
    if not g.exists():
        return None
    try:
        data = read_json(g)
        expectations = data.get("expectations", [])
        if expectations:
            passed = sum(1 for e in expectations if e.get("passed") is True)
            return {"passed": passed, "total": len(expectations)}
        return None
    except Exception:
        return None


def _mean_stddev(values):
    values = [v for v in values if v is not None]
    if not values:
        return None, None
    if len(values) == 1:
        return values[0], 0.0
    return statistics.mean(values), statistics.stdev(values)


def _configs_in_eval(eval_dir):
    """Discover run config dirs inside an eval dir (e.g. with_skill/)."""
    return sorted(
        [d for d in eval_dir.iterdir() if d.is_dir() and not d.name.startswith(".")],
        key=lambda d: d.name,
    )


def aggregate(workspace, skill_name):
    workspace = Path(workspace)
    evals = sorted([d for d in workspace.iterdir() if d.is_dir() and d.name.startswith("eval-")], key=lambda d: d.name)

    # Infer config set from the first eval dir.
    config_names = []
    if evals:
        config_names = [c.name for c in _configs_in_eval(evals[0])]
    # Keep config order: with_skill first, then baseline.
    def _order_key(name):
        return (0 if name == "with_skill" else 1, name)

    config_names = sorted(config_names, key=_order_key)

    configs = {}
    for cfg in config_names:
        configs[cfg] = {"evals": [], "passed": 0, "total": 0, "timings": []}

    for ev in evals:
        meta = {}
        mf = ev / "eval_metadata.json"
        if mf.exists():
            meta = read_json(mf)
        eval_name = meta.get("eval_name", ev.name)
        for cfg in config_names:
            run_dir = ev / cfg
            if not run_dir.is_dir():
                continue
            entry = {"eval_name": eval_name}
            grade = _grading(run_dir)
            if grade:
                entry["passed"] = grade["passed"]
                entry["total"] = grade["total"]
                configs[cfg]["passed"] += grade["passed"]
                configs[cfg]["total"] += grade["total"]
            timing = _timing(run_dir)
            if timing:
                entry["tokens"] = timing["total_tokens"]
                entry["duration_ms"] = timing["duration_ms"]
                configs[cfg]["timings"].append(timing)
            configs[cfg]["evals"].append(entry)

    result = {"skill_name": skill_name, "configs": [], "delta": {}}
    for cfg in config_names:
        c = configs[cfg]
        total = c["total"]
        pass_rate = (c["passed"] / total) if total else None
        tokens = [t["total_tokens"] for t in c["timings"]]
        durations = [t["duration_ms"] for t in c["timings"]]
        tok_mean, tok_std = _mean_stddev(tokens)
        dur_mean, dur_std = _mean_stddev(durations)
        result["configs"].append(
            {
                "name": cfg,
                "pass_rate": pass_rate,
                "passed": c["passed"],
                "total": total,
                "tokens": {"mean": tok_mean, "stddev": tok_std},
                "duration_ms": {"mean": dur_mean, "stddev": dur_std},
                "evals": c["evals"],
            }
        )

    # Delta: first config vs each other.
    if len(result["configs"]) >= 2:
        base = result["configs"][0]
        for other in result["configs"][1:]:
            key = f"{base['name']}_vs_{other['name']}"
            result["delta"][key] = {}
            if base["pass_rate"] is not None and other["pass_rate"] is not None:
                result["delta"][key]["pass_rate"] = base["pass_rate"] - other["pass_rate"]
            if base["tokens"]["mean"] is not None and other["tokens"]["mean"] is not None:
                result["delta"][key]["tokens"] = base["tokens"]["mean"] - other["tokens"]["mean"]
            if base["duration_ms"]["mean"] is not None and other["duration_ms"]["mean"] is not None:
                result["delta"][key]["duration_ms"] = base["duration_ms"]["mean"] - other["duration_ms"]["mean"]

    bench_json = workspace / "benchmark.json"
    write_json(bench_json, result)
    _write_markdown(result, workspace / "benchmark.md")
    return result, bench_json


def _fmt(val, nd=2):
    if val is None:
        return "n/a"
    if isinstance(val, float):
        return f"{val:.{nd}f}"
    return str(val)


def _write_markdown(result, out_path):
    lines = [f"# Benchmark: {result['skill_name']}", ""]
    lines.append("| Config | Pass rate | Passed/Total | Tokens (mean ± std) | Duration ms (mean ± std) |")
    lines.append("|---|---|---|---|---|")
    for c in result["configs"]:
        lines.append(
            f"| {c['name']} | {_fmt(c['pass_rate'])} | {c['passed']}/{c['total']} | "
            f"{_fmt(c['tokens']['mean'])} ± {_fmt(c['tokens']['stddev'])} | "
            f"{_fmt(c['duration_ms']['mean'])} ± {_fmt(c['duration_ms']['stddev'])} |"
        )
    lines.append("")
    if result["delta"]:
        lines.append("## Delta")
        for key, d in result["delta"].items():
            parts = [f"**{key}**: pass_rate {_fmt(d.get('pass_rate'))}, tokens {_fmt(d.get('tokens'))}, duration_ms {_fmt(d.get('duration_ms'))}"]
            lines.append("- " + " ".join(parts))
        lines.append("")
    lines.append("## Per-eval")
    for c in result["configs"]:
        lines.append(f"\n### {c['name']}")
        lines.append("| Eval | Passed/Total | Tokens | Duration ms |")
        lines.append("|---|---|---|---|")
        for ev in c["evals"]:
            lines.append(
                f"| {ev.get('eval_name')} | {ev.get('passed', '-')}/{ev.get('total', '-')} | "
                f"{ev.get('tokens', '-')} | {ev.get('duration_ms', '-')} |"
            )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main(argv=None):
    parser = argparse.ArgumentParser(description="Aggregate benchmark iteration")
    parser.add_argument("workspace", help="Path to iteration-N workspace dir")
    parser.add_argument("--skill-name", default="skill", help="Skill name for the report")
    args = parser.parse_args(argv)
    result, bench_json = aggregate(args.workspace, args.skill_name)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print(f"Wrote {bench_json}")


if __name__ == "__main__":
    main()
