"""Package a skill folder into a `.skill` archive.

Usage:
    python -m scripts.package_skill <path/to/skill/folder>

Produces `<folder-name>.skill` (a zip) next to the skill folder.
"""
import argparse
import shutil
import zipfile
from pathlib import Path

from .common import skill_dir_of


def package(path, out_path=None):
    skill_dir = skill_dir_of(path)
    if not (skill_dir / "SKILL.md").exists():
        raise ValueError(f"Not a skill directory (no SKILL.md): {skill_dir}")
    if out_path is None:
        out_path = skill_dir.parent / f"{skill_dir.name}.skill"
    out_path = Path(out_path)

    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(skill_dir.rglob("*")):
            if f.is_file():
                if any(part.startswith(".") for part in f.relative_to(skill_dir).parts):
                    continue
                if f.suffix in {".pyc"}:
                    continue
                zf.write(f, f.relative_to(skill_dir))
    return out_path


def main(argv=None):
    parser = argparse.ArgumentParser(description="Package a skill into a .skill archive")
    parser.add_argument("path", help="Path to the skill folder (or its SKILL.md)")
    parser.add_argument("--out", default=None, help="Output .skill path")
    args = parser.parse_args(argv)
    out = package(args.path, args.out)
    print(out)


if __name__ == "__main__":
    main()
