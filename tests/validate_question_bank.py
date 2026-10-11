#!/usr/bin/env python3
"""Validate the static English question banks without third-party packages."""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
BANK_DIR = ROOT / "data" / "questions"
VALID_GRADES = {f"P{i}" for i in range(1, 7)}
VALID_TYPES = {"mcq", "short_answer", "cloze", "comprehension", "writing_prompt", "listening_prompt", "speaking_prompt"}
REQUIRED = ("id", "grade", "strand", "topic", "type", "difficulty", "prompt", "explanation")


def validate_file(path):
    errors = []
    try:
        bank = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"{path.relative_to(ROOT)}: cannot read valid JSON: {exc}"], 0
    questions = bank.get("questions") if isinstance(bank, dict) else None
    if not isinstance(questions, list):
        return [f"{path.relative_to(ROOT)}: 'questions' must be a list"], 0
    seen = set()
    expected_grade = path.stem.upper()
    for i, q in enumerate(questions, 1):
        where = f"{path.name} question #{i}"
        if not isinstance(q, dict):
            errors.append(f"{where}: question must be an object")
            continue
        for key in REQUIRED:
            if key not in q or q[key] in (None, ""):
                errors.append(f"{where}: missing {key}")
        if q.get("id") in seen:
            errors.append(f"{where}: duplicate id {q.get('id')}")
        seen.add(q.get("id"))
        if q.get("grade") not in VALID_GRADES:
            errors.append(f"{where}: invalid grade {q.get('grade')}")
        if q.get("grade") != expected_grade:
            errors.append(f"{where}: grade does not match filename ({expected_grade})")
        if q.get("type") not in VALID_TYPES:
            errors.append(f"{where}: invalid type {q.get('type')}")
        if not isinstance(q.get("difficulty"), int) or not 1 <= q["difficulty"] <= 5:
            errors.append(f"{where}: difficulty must be integer 1–5")
        if q.get("type") == "mcq":
            options = q.get("options")
            answer = q.get("answer_index")
            if not isinstance(options, list) or len(options) < 2:
                errors.append(f"{where}: MCQ needs at least two options")
            elif not isinstance(answer, int) or not 0 <= answer < len(options):
                errors.append(f"{where}: answer_index is outside options")
            elif any(not isinstance(option, str) or not option.strip() for option in options):
                errors.append(f"{where}: options must be non-empty strings")
        if q.get("source_type") not in {"original", "licensed", "public_domain", "teacher_authored"}:
            errors.append(f"{where}: source_type must be recorded")
    return errors, len(questions)


def main():
    total = 0
    all_errors = []
    for grade in sorted(VALID_GRADES):
        path = BANK_DIR / f"{grade.lower()}.json"
        if not path.exists():
            all_errors.append(f"Missing bank: {path.relative_to(ROOT)}")
            continue
        errors, count = validate_file(path)
        total += count
        all_errors.extend(errors)
    if all_errors:
        print(f"FAILED: {len(all_errors)} issue(s) across {total} questions.")
        print("\n".join(f"- {e}" for e in all_errors))
        return 1
    print(f"PASS: validated {total} questions across 6 grade banks.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
