"""Rule-based scheduling helpers for StudyPilot.

These helpers are intentionally simple so they can run fully offline and be
easily replaced later if a more advanced planner is added.
"""

from __future__ import annotations

from collections import defaultdict
from datetime import date, datetime, timedelta
from typing import Any


FOCUS_BLOCK_MINUTES = 45
BREAK_MINUTES = 10


def _parse_date(value: str | None) -> date | None:
    if not value:
        return None
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError:
        return None


def _status_rank(status: str) -> int:
    ranks = {
        "Not Started": 0,
        "Learning": 1,
        "Revised": 2,
        "Mastered": 3,
    }
    return ranks.get(status, 0)


def build_daily_plan(student: dict, tasks: list[dict], exams: list[dict], curriculum: list[dict]) -> dict[str, Any]:
    """Build a small offline study plan for the current day.

    The plan prefers urgent homework first, then upcoming exams, then weak
    curriculum topics. Breaks are inserted between focus blocks so the schedule
    stays realistic for school use.
    """

    daily_hours = float(student.get("daily_study_hours") or 2)
    available_minutes = max(int(daily_hours * 60), 60)
    focus_budget = int(available_minutes * 0.8)
    break_budget = available_minutes - focus_budget

    today = date.today()
    task_candidates = sorted(
        tasks,
        key=lambda item: (
            _parse_date(item.get("due_date")) or today + timedelta(days=365),
            -(item.get("priority") or 0),
        ),
    )
    upcoming_exams = sorted(
        [
            exam
            for exam in exams
            if _parse_date(exam.get("exam_date")) and _parse_date(exam.get("exam_date")) >= today
        ],
        key=lambda item: _parse_date(item.get("exam_date")) or today + timedelta(days=365),
    )

    low_progress_topics = [row for row in curriculum if _status_rank(row.get("topic_status", "")) < 2]

    focus_blocks: list[dict[str, Any]] = []
    sources = defaultdict(list)
    for task in task_candidates:
        sources[task.get("subject") or "General"].append(task)
    for exam in upcoming_exams:
        sources[exam.get("subject") or "General"].append(exam)
    for topic in low_progress_topics:
        sources[topic.get("subject_name") or "General"].append(topic)

    for subject, items in sources.items():
        if focus_budget <= 0:
            break

        item = items[0]
        title = item.get("title") or item.get("topic_title") or item.get("chapter_title") or f"Study {subject}"
        reason = "Homework first" if "due_date" in item else "Exam or curriculum review"
        focus_minutes = min(FOCUS_BLOCK_MINUTES, focus_budget)
        focus_blocks.append(
            {
                "subject": subject,
                "title": title,
                "minutes": focus_minutes,
                "reason": reason,
            }
        )
        focus_budget -= focus_minutes

    break_blocks = []
    if break_budget > 0 and focus_blocks:
        break_blocks.append(
            {
                "label": "Short break",
                "minutes": min(BREAK_MINUTES, break_budget),
            }
        )

    return {
        "date": today.isoformat(),
        "focus_blocks": focus_blocks,
        "break_blocks": break_blocks,
        "recommended_minutes": available_minutes,
        "notes": [
            "Start with the most urgent task.",
            "Take a short break after each focus block.",
            "Swap in an exam revision block if a test is within a week.",
        ],
    }


def rebalance_missed_sessions(existing_sessions: list[dict], missed_task_ids: list[int]) -> list[dict[str, Any]]:
    """Move missed work to the next available day in a simple, deterministic way."""

    next_day = date.today() + timedelta(days=1)
    rebalanced = []

    for session in existing_sessions:
        if session.get("task_id") in missed_task_ids:
            updated = dict(session)
            updated["session_date"] = next_day.isoformat()
            updated["status"] = "rescheduled"
            rebalanced.append(updated)
        else:
            rebalanced.append(dict(session))

    return rebalanced
