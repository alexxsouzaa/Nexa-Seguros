"""Full description optimization loop.

Usage:
    python -m scripts.run_loop \
        --eval-set <path-to-trigger-eval.json> \
        --skill-path <path-to-skill> \
        --model <model-id-powering-this-session> \
        --max-iterations 5 \
        [--verbose]

Splits the eval set 60/40 train/test, evaluates the current description
(3 runs per query), then iteratively calls the model to propose improved
descriptions based on failures, re-evaluating on train and test. Selects
the best description by TEST score to avoid overfitting. Writes an HTML
report and prints JSON with `best_description`.
"""
import argparse
import json
import random
from pathlib import Path

from .common import (
    read_json,
    write_json,
    run_cli,
    read_skill_description,
    write_skill_description,
    skill_name_from_dir,
)
from .run_eval import run as run_eval


def _propose_improvement(current_desc, failures, model, claude_cmd):
    """Ask the model to improve the description given what failed."""
    lines = [
        "You are optimizing the triggering description of a skill. The description is the ONLY thing",
        "the assistant sees to decide whether to consult the skill. You must make it trigger on the",
        "right queries and not on the wrong ones.",
        "",
        "CURRENT DESCRIPTION:",
        current_desc,
        "",
        "QUERIES THAT SHOULD HAVE TRIGGERED BUT DIDN'T:",
    ]
    for f in failures.get("missed", []):
        lines.append(f"- {f}")
    lines.append("")
    lines.append("QUERIES THAT SHOULD NOT HAVE TRIGGERED BUT DID:")
    for f in failures.get("false_positive", []):
        lines.append(f"- {f}")
    lines.append("")
    lines.append(
        "Write a NEW description (single paragraph, plain text, no markdown, no surrounding quotes).",
        "Keep it concrete and actionable. Include the explicit when-to-use contexts observed above.",
        "Do NOT mention the skill name in the description. Output only the description.",
    )
    prompt = "\n".join(lines)
    cmd = [claude_cmd, "-p", prompt, "--no-cache"]
    if model:
        cmd += ["--model", model]
    rc, out, err = run_cli(cmd)
    if rc != 0:
        raise RuntimeError(f"propose_improvement failed: {err}")
    return out.strip()


def _split_eval_items(items, test_frac=0.4, seed=42):
    rng = random.Random(seed)
    idx = list(range(len(items)))
    rng.shuffle(idx)
    split = int(len(items) * (1 - test_frac))
    train = [items[i] for i in idx[:split]]
    test = [items[i] for i in idx[split:]]
    return train, test


def _accuracy(summary):
    return summary["accuracy"]


def run(eval_set_path, skill_path, model, max_iterations=5, claude_cmd="claude", verbose=False):
    eval_items = read_json(eval_set_path)
    if isinstance(eval_items, dict):
        eval_items = eval_items.get("queries", eval_items.get("evals", []))
    train_items, test_items = _split_eval_items(eval_items)

    def _write_set(items, path):
        write_json(path, items)

    tmp_dir = Path(eval_set_path).parent / f".loop-{skill_name_from_dir(skill_path)}"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    train_path = tmp_dir / "train.json"
    test_path = tmp_dir / "test.json"
    _write_set(train_items, train_path)
    _write_set(test_items, test_path)

    history = []

    def _eval(description, items, tag):
        # Temporarily write description to the SKILL.md, evaluate, restore.
        original = read_skill_description(skill_path)
        eval_set = str(train_path if tag == "train" else test_path)
        try:
            write_skill_description(skill_path, description)
            summary = run_eval(eval_set, skill_path, model, runs=3, claude_cmd=claude_cmd)
        finally:
            write_skill_description(skill_path, original)
        return summary

    current = read_skill_description(skill_path)
    for iteration in range(1, max_iterations + 1):
        if verbose:
            print(f"--- iteration {iteration}/{max_iterations} ---")
        # Evaluate on train to find failures.
        train_summary = _eval(current, train_items, "train")
        # Evaluate on both train and test.
        test_summary = _eval(current, test_items, "test")
        acc_train = _accuracy(train_summary)
        acc_test = _accuracy(test_summary)
        entry = {
            "iteration": iteration,
            "description": current,
            "train_accuracy": acc_train,
            "test_accuracy": acc_test,
        }
        history.append(entry)
        if verbose:
            print(f"  train={acc_train} test={acc_test}")

        if iteration == max_iterations or acc_train == 1.0:
            break

        failures = {"missed": [], "false_positive": []}
        for r in train_summary["results"]:
            if r["should_trigger"] is True and r["rate"] is not None and r["rate"] < 0.5:
                failures["missed"].append(r["query"])
            if r["should_trigger"] is False and r["rate"] is not None and r["rate"] >= 0.5:
                failures["false_positive"].append(r["query"])
        if not failures["missed"] and not failures["false_positive"]:
            break

        current = _propose_improvement(current, failures, model, claude_cmd)

    best = max(history, key=lambda h: (h["test_accuracy"] if h["test_accuracy"] is not None else -1, h["train_accuracy"] if h["train_accuracy"] is not None else -1))
    result = {
        "skill": skill_name_from_dir(skill_path),
        "max_iterations": max_iterations,
        "best_description": best["description"],
        "best_iteration": best["iteration"],
        "history": history,
    }
    out_path = tmp_dir / "loop-report.json"
    write_json(out_path, result)
    _write_html_report(result, tmp_dir / "loop-report.html")
    return result, out_path


def _write_html_report(result, out_path):
    rows = "".join(
        f"<tr><td>{h['iteration']}</td><td>{h['train_accuracy']}</td><td>{h['test_accuracy']}</td>"
        f"<td><pre>{h['description']}</pre></td></tr>"
        for h in result["history"]
    )
    html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Description Optimization Report</title>
<style>body{{font-family:system-ui;margin:2rem}} table{{border-collapse:collapse;width:100%}}
td,th{{border:1px solid #ccc;padding:.5rem;text-align:left;vertical-align:top}} pre{{white-space:pre-wrap;margin:0}}
</style></head><body>
<h1>Description Optimization — {result['skill']}</h1>
<p>Best description (selected by test score):</p>
<pre><b>{result['best_description']}</b></pre>
<table><thead><tr><th>Iteration</th><th>Train</th><th>Test</th><th>Description</th></tr></thead>
<tbody>{rows}</tbody></table></body></html>"""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(html, encoding="utf-8")


def main(argv=None):
    parser = argparse.ArgumentParser(description="Skill description optimization loop")
    parser.add_argument("--eval-set", required=True)
    parser.add_argument("--skill-path", required=True)
    parser.add_argument("--model", default="")
    parser.add_argument("--max-iterations", type=int, default=5)
    parser.add_argument("--claude-cmd", default="claude")
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args(argv)
    result, _ = run(args.eval_set, args.skill_path, args.model, args.max_iterations, args.claude_cmd, args.verbose)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
