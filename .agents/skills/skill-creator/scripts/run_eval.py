"""Evaluate a skill description's trigger accuracy on an eval set.

Usage:
    python -m scripts.run_eval \
        --eval-set <path-to-trigger-eval.json> \
        --skill-path <path-to-skill> \
        --model <model-id> \
        [--runs 3]

Runs each query against the current harness (Claude Code) N times and
reports whether the skill description triggers. Produces an HTML report
and prints a JSON summary with `best_description` selection handled by
run_loop.py.
"""
import argparse
import json
import random
import statistics
from pathlib import Path

from .common import read_json, write_json, run_cli, skill_name_from_dir


def _skill_name(path):
    return skill_name_from_dir(path)


def _evaluate_one(query, skill_path, model, claude_cmd):
    """Ask Claude Code whether the skill would trigger for this query.

    We invoke claude with a deterministic harness prompt and ask it to
    simulate skill selection. Returns True/False for trigger.
    """
    skill = _skill_name(skill_path)
    prompt = (
        f"You are a skill router. Decide whether the skill named "
        f"`{skill}` should be consulted for the user request below.\n\n"
        f"Skill description: see the skill at {skill_path}.\n\n"
        f"User request:\n{query}\n\n"
        "Answer with exactly one word: YES or NO."
    )
    cmd = [claude_cmd, "-p", prompt, "--no-cache"]
    if model:
        cmd += ["--model", model]
    rc, out, err = run_cli(cmd)
    if rc != 0:
        return None
    text = out.strip().lower()
    if "yes" in text.split()[:3]:
        return True
    if "no" in text.split()[:3]:
        return False
    # fallback: keyword
    first_word = text.split()[:5]
    if "yes" in first_word:
        return True
    return False


def run(eval_set_path, skill_path, model, runs=3, claude_cmd="claude"):
    eval_items = read_json(eval_set_path)
    if isinstance(eval_items, dict):
        eval_items = eval_items.get("queries", eval_items.get("evals", []))
    results = []
    correct = 0
    total = 0
    for item in eval_items:
        query = item.get("query") if isinstance(item, dict) else item
        should = item.get("should_trigger") if isinstance(item, dict) else None
        triggers = []
        for _ in range(runs):
            triggers.append(_evaluate_one(query, skill_path, model, claude_cmd))
        triggers = [t for t in triggers if t is not None]
        if not triggers:
            result = {"query": query, "should_trigger": should, "triggered": None, "rate": None}
        else:
            rate = statistics.mean(1.0 if t else 0.0 for t in triggers)
            result = {
                "query": query,
                "should_trigger": should,
                "triggered": rate >= 0.5,
                "rate": rate,
            }
        results.append(result)
        if should is not None and result["rate"] is not None:
            total += 1
            if (result["rate"] >= 0.5) == should:
                correct += 1
    accuracy = correct / total if total else None
    summary = {
        "skill": _skill_name(skill_path),
        "accuracy": accuracy,
        "correct": correct,
        "total": total,
        "results": results,
    }
    return summary


def main(argv=None):
    parser = argparse.ArgumentParser(description="Evaluate skill description trigger accuracy")
    parser.add_argument("--eval-set", required=True)
    parser.add_argument("--skill-path", required=True)
    parser.add_argument("--model", default="")
    parser.add_argument("--runs", type=int, default=3)
    parser.add_argument("--claude-cmd", default="claude")
    args = parser.parse_args(argv)
    summary = run(args.eval_set, args.skill_path, args.model, args.runs, args.claude_cmd)
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
