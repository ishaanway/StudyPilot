"""Reminder generation for StudyPilot."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from typing import Any


def _parse_date(value: str | None) -> date | None:
    if not value:
        return None
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError:
        return None


def build_reminders(student: dict, tasks: list[dict], exams: list[dict], curriculum: list[dict]) -> list[dict[str, Any]]:
    """Return a small list of useful reminders without being noisy."""

    today = date.today()
    tomorrow = today + timedelta(days=1)
    reminders: list[dict[str, Any]] = []

    for exam in exams:
        exam_date = _parse_date(exam.get("exam_date"))
        if not exam_date:
            continue
        days_left = (exam_date - today).days
        if 0 <= days_left <= 3:
            label = "Today" if days_left == 0 else "Tomorrow" if days_left == 1 else f"In {days_left} days"
            reminders.append(
                {
                    "type": "exam",
                    "priority": 1 if days_left <= 1 else 2,
                    "message": f"{exam.get('subject', 'Exam')} exam is {label}.",
                }
            )

    for task in tasks:
        due_date = _parse_date(task.get("due_date"))
        if due_date == tomorrow and task.get("status") != "completed":
            reminders.append(
                {
                    "type": "homework",
                    "priority": 1,
                    "message": f"Homework due tomorrow: {task.get('title', 'Untitled task')}.",
                }
            )

    weak_subjects = {
        row.get("subject_name")
        for row in curriculum
        if row.get("topic_status") in {"Not Started", "Learning"}
    }
    if weak_subjects:
        reminders.append(
            {
                "type": "revision",
                "priority": 3,
                "message": f"You still need revision time for {', '.join(sorted(s for s in weak_subjects if s))}.",
            }
        )

    study_hour = student.get("reminder_time") or "18:00"
    reminders.append(
        {
            "type": "routine",
            "priority": 4,
            "message": f"Your usual study time is around {study_hour}. Keep the streak going.",
        }
    )

    return reminders[:6]
