"""Generate the human review viewer for an iteration workspace.

Usage:
    python <skill-creator-path>/eval-viewer/generate_review.py \
        <workspace>/iteration-N \
        --skill-name "my-skill" \
        [--benchmark <workspace>/iteration-N/benchmark.json] \
        [--previous-workspace <workspace>/iteration-<N-1>] \
        [--static <output_path>] \
        [--port 8890]

With `--static`, writes a standalone HTML file instead of serving it.
Without it, serves over HTTP and opens the default browser.
"""
import argparse
import html
import json
import re
import socket
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote

VIEWER_TEMPLATE = Path(__file__).with_name("viewer.html")


def _read_json(path):
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except Exception:
        return None


def _render_file(path):
    """Render a file for inline display; returns (kind, text_or_none)."""
    suffix = path.suffix.lower()
    if suffix in {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}:
        return "image", None
    if suffix in {".md", ".txt", ".json", ".csv", ".log", ".py", ".js", ".ts", ".tsx", ".jsx", ".css", ".html", ".yaml", ".yml", ".toml", ".sql"}:
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except Exception:
            return "binary", None
        return "text", text
    return "file", None


def _collect_run(run_dir):
    """Collect metadata for a run dir (with_skill / without_skill)."""
    timing = _read_json(run_dir / "timing.json") or {}
    grading = _read_json(run_dir / "grading.json") or {}
    outputs = run_dir / "outputs"
    files = []
    if outputs.is_dir():
        for f in sorted(outputs.rglob("*")):
            if f.is_file():
                kind, text = _render_file(f)
                files.append(
                    {
                        "name": str(f.relative_to(run_dir)),
                        "kind": kind,
                        "text": text,
                        "rel": str(f.relative_to(outputs)),
                    }
                )
    expectations = grading.get("expectations", [])
    return {
        "timing": timing,
        "grade": {"passed": sum(1 for e in expectations if e.get("passed")), "total": len(expectations)},
        "expectations": expectations,
        "files": files,
    }


def build_data(workspace, previous_workspace=None, benchmark_path=None):
    workspace = Path(workspace)
    data = {"workspace": str(workspace), "evals": []}
    for ev_dir in sorted(workspace.iterdir()):
        if not ev_dir.is_dir():
            continue
        meta = _read_json(ev_dir / "eval_metadata.json") or {}
        eval_entry = {
            "name": meta.get("eval_name", ev_dir.name),
            "id": meta.get("eval_id"),
            "prompt": meta.get("prompt", ""),
            "runs": {},
        }
        for run_name in ("with_skill", "without_skill", "old_skill"):
            run_dir = ev_dir / run_name
            if run_dir.is_dir():
                eval_entry["runs"][run_name] = _collect_run(run_dir)
        # Previous iteration outputs (same eval name) for comparison.
        if previous_workspace:
            prev = Path(previous_workspace) / ev_dir.name
            if prev.is_dir() and (prev / "with_skill").is_dir():
                eval_entry["previous"] = _collect_run(prev / "with_skill")
        data["evals"].append(eval_entry)

    data["benchmark"] = _read_json(benchmark_path) if benchmark_path else None
    return data


def render_html(data, skill_name):
    template = VIEWER_TEMPLATE.read_text(encoding="utf-8")
    payload = json.dumps(data, ensure_ascii=False)
    return (
        template.replace("__SKILL_NAME__", html.escape(skill_name))
        .replace("__DATA__", payload)
    )


def _serve(html_string, port):
    root = Path(__file__).parent
    payload_path = root / ".review_payload.html"
    payload_path.write_text(html_string, encoding="utf-8")

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(root), **kwargs)

        def log_message(self, *args):
            pass

    handler = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    url = f"http://127.0.0.1:{port}/.review_payload.html"
    return handler, url


def main(argv=None):
    parser = argparse.ArgumentParser(description="Generate the skill review viewer")
    parser.add_argument("workspace", help="Path to iteration-N workspace dir")
    parser.add_argument("--skill-name", default="skill")
    parser.add_argument("--benchmark", default=None)
    parser.add_argument("--previous-workspace", default=None)
    parser.add_argument("--static", default=None, help="Write standalone HTML to this path")
    parser.add_argument("--port", type=int, default=8890)
    args = parser.parse_args(argv)

    data = build_data(args.workspace, args.previous_workspace, args.benchmark)
    html_string = render_html(data, args.skill_name)

    if args.static:
        out = Path(args.static)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html_string, encoding="utf-8")
        print(f"Static review file written to {out}")
        return

    handler, url = _serve(html_string, args.port)
    print(f"Review viewer: {url}")
    print("Press Ctrl+C to stop the server.")
    try:
        import webbrowser

        webbrowser.open(url)
        handler.serve_forever()
    except KeyboardInterrupt:
        handler.server_close()


if __name__ == "__main__":
    main()
