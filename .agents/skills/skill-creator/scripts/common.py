"""Shared helpers for the skill-creator scripts.

Run everything with `python -m scripts.<name>` from the skill-creator
directory so that the `scripts` package resolves.
"""
import json
import os
import re
import sys
from pathlib import Path


def read_json(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def write_json(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
    return path


def skill_dir_of(path):
    """Return the skill directory given a skill path or its SKILL.md file."""
    p = Path(path)
    if p.is_file():
        return p.parent
    return p


def skill_file_of(path):
    """Return the SKILL.md path given a skill path or a direct file path."""
    p = Path(path)
    if p.is_file():
        return p
    return p / "SKILL.md"


def skill_name_from_dir(path):
    return skill_dir_of(path).name


def read_skill_description(path):
    """Parse `description:` from a SKILL.md frontmatter block."""
    skill_file = skill_file_of(path)
    text = skill_file.read_text(encoding="utf-8")
    m = re.search(r"^---\s*\n(.*?)\n---", text, re.DOTALL)
    if not m:
        raise ValueError(f"No frontmatter in {skill_file}")
    fm = m.group(1)
    dm = re.search(r"^description:\s*(.+)$", fm, re.MULTILINE)
    if not dm:
        raise ValueError(f"No description in frontmatter of {skill_file}")
    return dm.group(1).strip()


def write_skill_description(path, description):
    """Replace `description:` in SKILL.md frontmatter (single-line value)."""
    skill_file = skill_file_of(path)
    text = skill_file.read_text(encoding="utf-8")
    pattern = r"^(description:)(\s*)(.+)$"
    new_text, n = re.subn(pattern, lambda m: m.group(1) + m.group(2) + description, text, count=1, flags=re.MULTILINE)
    if n != 1:
        raise ValueError(f"Could not locate description line in {skill_file}")
    skill_file.write_text(new_text, encoding="utf-8")
    return skill_file


def run_cli(args, env=None, capture=True):
    """Run a subprocess; returns (returncode, stdout, stderr)."""
    import subprocess

    proc = subprocess.run(
        args,
        capture_output=capture,
        text=True,
        env=env,
        encoding="utf-8",
        errors="replace",
    )
    return proc.returncode, proc.stdout or "", proc.stderr or ""
