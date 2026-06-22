"""Flask API for StudyPilot.

The current front-end prototype still runs in the browser, but this backend
provides the SQLite-backed foundation for the next phases.
"""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request

from backend.database import execute, fetch_all, fetch_one, init_db
from backend.knowledge import (
    format_knowledge_context,
    offline_answer,
    search_knowledge,
    search_syllabus_nodes,
    seed_knowledge_base,
    seed_official_curriculum_catalog,
    solve_simple_arithmetic,
)
from backend.llm import generate_tutor_response
from backend.reminder import build_reminders
from backend.scheduler import build_daily_plan, rebalance_missed_sessions


PROJECT_ROOT = Path(__file__).resolve().parent.parent

app = Flask(__name__)


def _json_error(message: str, status_code: int = 400):
    return jsonify({"ok": False, "error": message}), status_code


def _today() -> str:
    return date.today().isoformat()


def _payload() -> dict[str, Any]:
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else {}


def _clamp_grade(value: Any) -> int:
    try:
        grade = int(value)
    except (TypeError, ValueError):
        return 10
    return max(6, min(10, grade))


def _student_from_row(row: dict | None) -> dict | None:
    if not row:
        return None

    try:
        subjects = json.loads(row.get("subjects_json") or "[]")
    except json.JSONDecodeError:
        subjects = []

    return {
        "id": row.get("id"),
        "name": row.get("name"),
        "grade": row.get("grade"),
        "section": row.get("section"),
        "school_board": row.get("school_board"),
        "subjects": subjects,
        "daily_study_hours": row.get("daily_study_hours"),
        "academic_goal": row.get("academic_goal"),
        "created_at": row.get("created_at"),
        "updated_at": row.get("updated_at"),
    }


def _settings_from_row(row: dict | None, student_id: int | None = None) -> dict:
    if not row:
        return {
            "student_id": student_id,
            "theme": "light",
            "offline_mode_enabled": True,
            "notifications_enabled": True,
            "reminder_time": "18:00",
            "ai_mode": "offline",
        }

    return {
        "id": row.get("id"),
        "student_id": row.get("student_id"),
        "theme": row.get("theme"),
        "offline_mode_enabled": bool(row.get("offline_mode_enabled")),
        "notifications_enabled": bool(row.get("notifications_enabled")),
        "reminder_time": row.get("reminder_time"),
        "ai_mode": row.get("ai_mode"),
        "updated_at": row.get("updated_at"),
    }


def _resolve_student_id(payload: dict[str, Any] | None = None) -> int | None:
    payload = payload or {}
    if payload.get("student_id") is not None:
        try:
            return int(payload["student_id"])
        except (TypeError, ValueError):
            return None

    student = fetch_one("SELECT id FROM students ORDER BY id LIMIT 1")
    return student["id"] if student else None


def _upsert_settings(student_id: int, payload: dict[str, Any]) -> dict:
    existing = fetch_one("SELECT * FROM settings WHERE student_id = ?", (student_id,))
    theme = payload.get("theme", existing.get("theme") if existing else "light")
    reminder_time = payload.get("reminder_time", existing.get("reminder_time") if existing else "18:00")
    ai_mode = payload.get("ai_mode", existing.get("ai_mode") if existing else "offline")
    offline_mode_enabled = 1 if bool(payload.get("offline_mode_enabled", True)) else 0
    notifications_enabled = 1 if bool(payload.get("notifications_enabled", True)) else 0

    if existing:
        execute(
            """
            UPDATE settings
            SET theme = ?, offline_mode_enabled = ?, notifications_enabled = ?,
                reminder_time = ?, ai_mode = ?, updated_at = CURRENT_TIMESTAMP
            WHERE student_id = ?
            """,
            (theme, offline_mode_enabled, notifications_enabled, reminder_time, ai_mode, student_id),
        )
    else:
        execute(
            """
            INSERT INTO settings (
                student_id, theme, offline_mode_enabled, notifications_enabled,
                reminder_time, ai_mode
            ) VALUES (?, ?, ?, ?, ?, ?)
            """,
            (student_id, theme, offline_mode_enabled, notifications_enabled, reminder_time, ai_mode),
        )

    return _settings_from_row(fetch_one("SELECT * FROM settings WHERE student_id = ?", (student_id,)), student_id)


def _subject_progress(student_id: int) -> list[dict]:
    curriculum = fetch_all(
        "SELECT * FROM curriculum WHERE student_id = ? ORDER BY sort_order, id",
        (student_id,),
    )
    tasks = fetch_all("SELECT * FROM tasks WHERE student_id = ?", (student_id,))
    progress_rows = fetch_all("SELECT * FROM progress WHERE student_id = ?", (student_id,))

    task_map: dict[str, list[dict]] = {}
    for task in tasks:
        task_map.setdefault(task.get("subject"), []).append(task)

    progress_map = {row.get("subject_name"): row for row in progress_rows}
    curriculum_by_subject: dict[str, list[dict]] = {}
    for row in curriculum:
        curriculum_by_subject.setdefault(row.get("subject_name"), []).append(row)

    subject_names = sorted(curriculum_by_subject.keys() | task_map.keys() | progress_map.keys())
    subject_metrics = []

    for subject_name in subject_names:
        curriculum_rows = curriculum_by_subject.get(subject_name, [])
        total_topics = len(curriculum_rows)
        mastered = sum(1 for row in curriculum_rows if row.get("topic_status") == "Mastered")
        revised = sum(1 for row in curriculum_rows if row.get("topic_status") in {"Revised", "Mastered"})
        learning = sum(1 for row in curriculum_rows if row.get("topic_status") == "Learning")
        pending = sum(1 for row in curriculum_rows if row.get("topic_status") == "Not Started")

        homework_tasks = task_map.get(subject_name, [])
        completed_tasks = sum(1 for task in homework_tasks if task.get("status") == "completed")
        homework_completion = round((completed_tasks / len(homework_tasks)) * 100) if homework_tasks else 0
        chapter_completion = round((mastered / total_topics) * 100) if total_topics else 0
        revision_progress = round((revised / total_topics) * 100) if total_topics else 0

        stored = progress_map.get(subject_name) or {}
        quiz_performance = int(stored.get("quiz_performance") or 0)
        confidence_level = int(stored.get("confidence_level") or max(revision_progress, quiz_performance))
        readiness = round(
            homework_completion * 0.2
            + chapter_completion * 0.25
            + revision_progress * 0.25
            + quiz_performance * 0.15
            + confidence_level * 0.15
        )

        subject_metrics.append(
            {
                "subject": subject_name,
                "homework_completion": homework_completion,
                "chapter_completion": chapter_completion,
                "revision_progress": revision_progress,
                "quiz_performance": quiz_performance,
                "confidence_level": confidence_level,
                "overall_readiness": readiness,
                "status": (
                    "Excellent"
                    if readiness >= 85
                    else "Ready"
                    if readiness >= 70
                    else "Needs Revision"
                ),
                "topic_breakdown": {
                    "mastered": mastered,
                    "learning": learning,
                    "not_started": pending,
                    "total": total_topics,
                },
            }
        )

    return subject_metrics


def _overall_progress(subject_metrics: list[dict]) -> dict:
    if not subject_metrics:
        return {"overall_readiness": 0, "subjects_ready": 0, "subjects": []}

    readiness_values = [row["overall_readiness"] for row in subject_metrics]
    ready_subjects = sum(1 for row in subject_metrics if row["overall_readiness"] >= 70)
    return {
        "overall_readiness": round(sum(readiness_values) / len(readiness_values)),
        "subjects_ready": ready_subjects,
        "subjects": subject_metrics,
    }


@app.after_request
def _add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    return response


@app.before_request
def _handle_preflight():
    if request.method == "OPTIONS":
        return ("", 204)


@app.get("/api/health")
def health():
    db_exists = (PROJECT_ROOT / "database" / "studypilot.db").exists()
    return jsonify({"ok": True, "service": "StudyPilot", "database_ready": db_exists})


@app.get("/api/bootstrap")
def bootstrap():
    student_row = fetch_one("SELECT * FROM students ORDER BY id LIMIT 1")
    student = _student_from_row(student_row)
    student_id = student["id"] if student else None

    if student_id is None:
        return jsonify(
            {
                "ok": True,
                "student": None,
                "tasks": [],
                "homework": [],
                "exams": [],
                "planner": {"focus_blocks": [], "break_blocks": [], "notes": []},
                "curriculum": [],
                "progress": {"overall_readiness": 0, "subjects_ready": 0, "subjects": []},
                "reminders": [],
                "settings": _settings_from_row(None, None),
            }
        )

    tasks = fetch_all("SELECT * FROM tasks WHERE student_id = ? ORDER BY due_date, priority DESC, id", (student_id,))
    homework = fetch_all("SELECT * FROM homework WHERE student_id = ? ORDER BY due_date, id", (student_id,))
    exams = fetch_all("SELECT * FROM exams WHERE student_id = ? ORDER BY exam_date, id", (student_id,))
    curriculum = fetch_all("SELECT * FROM curriculum WHERE student_id = ? ORDER BY sort_order, id", (student_id,))
    study_sessions = fetch_all(
        "SELECT * FROM study_sessions WHERE student_id = ? ORDER BY session_date, start_time, id",
        (student_id,),
    )
    reminders = build_reminders(student, tasks, exams, curriculum)
    planner = build_daily_plan(student, tasks, exams, curriculum)
    subject_metrics = _subject_progress(student_id)
    progress = _overall_progress(subject_metrics)

    return jsonify(
        {
            "ok": True,
            "student": student,
            "tasks": tasks,
            "homework": homework,
            "exams": exams,
            "curriculum": curriculum,
            "study_sessions": study_sessions,
            "planner": planner,
            "progress": progress,
            "exam_readiness": {"subjects": subject_metrics, "overall_readiness": progress["overall_readiness"]},
            "reminders": reminders,
            "settings": _settings_from_row(fetch_one("SELECT * FROM settings WHERE student_id = ?", (student_id,)), student_id),
        }
    )


@app.route("/api/students", methods=["GET", "POST"])
def students():
    if request.method == "GET":
        rows = fetch_all("SELECT * FROM students ORDER BY id DESC")
        return jsonify({"ok": True, "items": [_student_from_row(row) for row in rows]})

    payload = _payload()
    name = (payload.get("name") or "").strip()
    if not name:
        return _json_error("Student name is required.")

    grade = _clamp_grade(payload.get("grade"))
    section = (payload.get("section") or "").strip()
    board = (payload.get("school_board") or payload.get("board") or "CBSE").strip() or "CBSE"
    daily_study_hours = float(payload.get("daily_study_hours") or 2)
    academic_goal = (payload.get("academic_goal") or payload.get("goal") or "Improve Marks").strip()
    subjects = payload.get("subjects") or []
    if not isinstance(subjects, list):
        subjects = []

    student_id = execute(
        """
        INSERT INTO students (name, grade, section, school_board, subjects_json, daily_study_hours, academic_goal)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (name, grade, section, board, json.dumps(subjects), daily_study_hours, academic_goal),
    )
    student = _student_from_row(fetch_one("SELECT * FROM students WHERE id = ?", (student_id,)))
    _upsert_settings(student_id, payload)
    return jsonify({"ok": True, "item": student}), 201


@app.route("/api/students/<int:student_id>", methods=["GET", "PUT", "DELETE"])
def student_detail(student_id: int):
    row = fetch_one("SELECT * FROM students WHERE id = ?", (student_id,))
    if not row:
        return _json_error("Student not found.", 404)

    if request.method == "GET":
        return jsonify({"ok": True, "item": _student_from_row(row)})

    if request.method == "DELETE":
        execute("DELETE FROM students WHERE id = ?", (student_id,))
        return jsonify({"ok": True})

    payload = _payload()
    name = (payload.get("name") or row["name"]).strip()
    grade = _clamp_grade(payload.get("grade", row["grade"]))
    section = (payload.get("section") or row["section"]).strip()
    board = (payload.get("school_board") or payload.get("board") or row["school_board"]).strip()
    daily_study_hours = float(payload.get("daily_study_hours") or row["daily_study_hours"])
    academic_goal = (payload.get("academic_goal") or payload.get("goal") or row["academic_goal"]).strip()
    subjects = payload.get("subjects")
    subjects_json = row["subjects_json"] if subjects is None else json.dumps(subjects if isinstance(subjects, list) else [])

    execute(
        """
        UPDATE students
        SET name = ?, grade = ?, section = ?, school_board = ?, subjects_json = ?,
            daily_study_hours = ?, academic_goal = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (name, grade, section, board, subjects_json, daily_study_hours, academic_goal, student_id),
    )
    _upsert_settings(student_id, payload)
    return jsonify({"ok": True, "item": _student_from_row(fetch_one("SELECT * FROM students WHERE id = ?", (student_id,)))})


@app.route("/api/tasks", methods=["GET", "POST"])
def tasks():
    student_id = _resolve_student_id(_payload())
    if student_id is None:
        return jsonify({"ok": True, "items": []}) if request.method == "GET" else _json_error("Create a student first.")

    if request.method == "GET":
        rows = fetch_all("SELECT * FROM tasks WHERE student_id = ? ORDER BY due_date, priority DESC, id", (student_id,))
        return jsonify({"ok": True, "items": rows})

    payload = _payload()
    title = (payload.get("title") or "").strip()
    subject = (payload.get("subject") or "General").strip()
    if not title:
        return _json_error("Task title is required.")

    task_id = execute(
        """
        INSERT INTO tasks (student_id, title, subject, description, due_date, priority, estimated_minutes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            student_id,
            title,
            subject,
            (payload.get("description") or "").strip(),
            payload.get("due_date") or _today(),
            int(payload.get("priority") or 2),
            int(payload.get("estimated_minutes") or 30),
            payload.get("status") or "pending",
        ),
    )
    return jsonify({"ok": True, "item": fetch_one("SELECT * FROM tasks WHERE id = ?", (task_id,))}), 201


@app.route("/api/tasks/<int:task_id>", methods=["GET", "PUT", "PATCH", "DELETE"])
def task_detail(task_id: int):
    row = fetch_one("SELECT * FROM tasks WHERE id = ?", (task_id,))
    if not row:
        return _json_error("Task not found.", 404)

    if request.method == "GET":
        return jsonify({"ok": True, "item": row})

    if request.method == "DELETE":
        execute("DELETE FROM tasks WHERE id = ?", (task_id,))
        return jsonify({"ok": True})

    payload = _payload()
    execute(
        """
        UPDATE tasks
        SET title = ?, subject = ?, description = ?, due_date = ?, priority = ?,
            estimated_minutes = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        """,
        (
            (payload.get("title") or row["title"]).strip(),
            (payload.get("subject") or row["subject"]).strip(),
            (payload.get("description") or row["description"]).strip(),
            payload.get("due_date") or row["due_date"],
            int(payload.get("priority") or row["priority"]),
            int(payload.get("estimated_minutes") or row["estimated_minutes"]),
            payload.get("status") or row["status"],
            task_id,
        ),
    )
    return jsonify({"ok": True, "item": fetch_one("SELECT * FROM tasks WHERE id = ?", (task_id,))})


@app.route("/api/homework", methods=["GET", "POST"])
def homework():
    student_id = _resolve_student_id(_payload())
    if student_id is None:
        return jsonify({"ok": True, "items": []}) if request.method == "GET" else _json_error("Create a student first.")

    if request.method == "GET":
        rows = fetch_all("SELECT * FROM homework WHERE student_id = ? ORDER BY due_date, id", (student_id,))
        return jsonify({"ok": True, "items": rows})

    payload = _payload()
    title = (payload.get("title") or "").strip()
    if not title:
        return _json_error("Homework title is required.")

    homework_id = execute(
        """
        INSERT INTO homework (student_id, task_id, title, subject, due_date, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            student_id,
            payload.get("task_id"),
            title,
            (payload.get("subject") or "General").strip(),
            payload.get("due_date") or _today(),
            payload.get("status") or "pending",
            (payload.get("notes") or "").strip(),
        ),
    )
    return jsonify({"ok": True, "item": fetch_one("SELECT * FROM homework WHERE id = ?", (homework_id,))}), 201


@app.route("/api/exams", methods=["GET", "POST"])
def exams():
    student_id = _resolve_student_id(_payload())
    if student_id is None:
        return jsonify({"ok": True, "items": []}) if request.method == "GET" else _json_error("Create a student first.")

    if request.method == "GET":
        rows = fetch_all("SELECT * FROM exams WHERE student_id = ? ORDER BY exam_date, id", (student_id,))
        return jsonify({"ok": True, "items": rows})

    payload = _payload()
    subject = (payload.get("subject") or "").strip()
    title = (payload.get("title") or payload.get("topic") or "").strip()
    if not subject or not title:
        return _json_error("Exam subject and title are required.")

    exam_id = execute(
        """
        INSERT INTO exams (student_id, subject, title, exam_date, syllabus_scope, confidence_level)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            student_id,
            subject,
            title,
            payload.get("exam_date") or payload.get("date") or _today(),
            (payload.get("syllabus_scope") or payload.get("scope") or "").strip(),
            int(payload.get("confidence_level") or 50),
        ),
    )
    return jsonify({"ok": True, "item": fetch_one("SELECT * FROM exams WHERE id = ?", (exam_id,))}), 201


@app.route("/api/curriculum", methods=["GET", "POST"])
def curriculum():
    student_id = _resolve_student_id(_payload())
    if student_id is None:
        return jsonify({"ok": True, "items": []}) if request.method == "GET" else _json_error("Create a student first.")

    if request.method == "GET":
        rows = fetch_all("SELECT * FROM curriculum WHERE student_id = ? ORDER BY sort_order, id", (student_id,))
        return jsonify({"ok": True, "items": rows})

    payload = _payload()
    subject_name = (payload.get("subject_name") or payload.get("subject") or "").strip()
    chapter_title = (payload.get("chapter_title") or payload.get("chapter") or "").strip()
    topic_title = (payload.get("topic_title") or payload.get("topic") or "").strip()
    if not subject_name or not chapter_title or not topic_title:
        return _json_error("Curriculum subject, chapter, and topic are required.")

    curriculum_id = execute(
        """
        INSERT INTO curriculum (
            student_id, grade, subject_id, subject_name, chapter_title, topic_title,
            topic_status, sort_order, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            student_id,
            int(payload.get("grade") or 10),
            payload.get("subject_id"),
            subject_name,
            chapter_title,
            topic_title,
            payload.get("topic_status") or "Not Started",
            int(payload.get("sort_order") or 0),
            (payload.get("notes") or "").strip(),
        ),
    )
    return jsonify({"ok": True, "item": fetch_one("SELECT * FROM curriculum WHERE id = ?", (curriculum_id,))}), 201


@app.route("/api/progress", methods=["GET"])
def progress():
    student_id = _resolve_student_id()
    if student_id is None:
        return jsonify({"ok": True, "overall_readiness": 0, "subjects": []})

    subject_metrics = _subject_progress(student_id)
    return jsonify({"ok": True, **_overall_progress(subject_metrics)})


@app.route("/api/exam-readiness", methods=["GET"])
def exam_readiness():
    return progress()


@app.route("/api/planner", methods=["GET"])
def planner():
    student_id = _resolve_student_id()
    if student_id is None:
        return jsonify({"ok": True, "items": []})

    rows = fetch_all(
        "SELECT * FROM study_sessions WHERE student_id = ? ORDER BY session_date, start_time, id",
        (student_id,),
    )
    return jsonify({"ok": True, "items": rows})


@app.route("/api/planner/generate", methods=["POST"])
def generate_planner():
    student_id = _resolve_student_id(_payload())
    if student_id is None:
        return _json_error("Create a student first.")

    student = fetch_one("SELECT * FROM students WHERE id = ?", (student_id,))
    if not student:
        return _json_error("Student not found.", 404)

    payload = _payload()
    tasks = fetch_all("SELECT * FROM tasks WHERE student_id = ?", (student_id,))
    exams = fetch_all("SELECT * FROM exams WHERE student_id = ?", (student_id,))
    curriculum_rows = fetch_all("SELECT * FROM curriculum WHERE student_id = ?", (student_id,))
    plan = build_daily_plan(student, tasks, exams, curriculum_rows)

    if payload.get("persist", False):
        existing_sessions = fetch_all("SELECT * FROM study_sessions WHERE student_id = ?", (student_id,))
        missed_task_ids = [
            task.get("id")
            for task in tasks
            if task.get("status") != "completed" and task.get("due_date") and task.get("due_date") < _today()
        ]
        rebalanced = rebalance_missed_sessions(existing_sessions, missed_task_ids)

        execute("DELETE FROM study_sessions WHERE student_id = ?", (student_id,))
        for block in plan["focus_blocks"]:
            execute(
                """
                INSERT INTO study_sessions (
                    student_id, subject, session_date, start_time, end_time, session_type,
                    focus_level, status, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    student_id,
                    block.get("subject"),
                    plan["date"],
                    payload.get("start_time") or "18:00",
                    payload.get("end_time") or "18:45",
                    "study",
                    3,
                    "planned",
                    block.get("reason"),
                ),
            )

        for session in rebalanced:
            execute(
                """
                INSERT INTO study_sessions (
                    student_id, task_id, subject, session_date, start_time, end_time,
                    session_type, focus_level, status, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    student_id,
                    session.get("task_id"),
                    session.get("subject"),
                    session.get("session_date"),
                    session.get("start_time"),
                    session.get("end_time"),
                    session.get("session_type"),
                    session.get("focus_level"),
                    session.get("status"),
                    session.get("notes"),
                ),
            )

    return jsonify({"ok": True, "plan": plan})


@app.route("/api/settings", methods=["GET", "PUT"])
def settings():
    student_id = _resolve_student_id(_payload())
    if student_id is None:
        if request.method == "GET":
            return jsonify({"ok": True, "item": _settings_from_row(None, None)})
        return _json_error("Create a student first.")

    if request.method == "GET":
        row = fetch_one("SELECT * FROM settings WHERE student_id = ?", (student_id,))
        return jsonify({"ok": True, "item": _settings_from_row(row, student_id)})

    payload = _payload()
    item = _upsert_settings(student_id, payload)
    return jsonify({"ok": True, "item": item})


@app.post("/api/tutor/respond")
def tutor_respond():
    payload = _payload()
    question = (payload.get("question") or "").strip()
    if not question:
        return _json_error("Question is required.")

    student_id = _resolve_student_id(payload)
    profile = fetch_one("SELECT * FROM students WHERE id = ?", (student_id,)) if student_id else None
    grade = _clamp_grade(payload.get("grade") or (profile.get("grade") if profile else 10))
    subject = (payload.get("subject") or "").strip()

    arithmetic_answer = solve_simple_arithmetic(question)
    if arithmetic_answer:
        return jsonify(
            {
                "ok": True,
                "mode": "calculator",
                "answer": arithmetic_answer,
                "sources": [],
            }
        )

    matches = search_knowledge(question, grade=grade, subject=subject, limit=4)
    syllabus_matches = search_syllabus_nodes(question, grade=grade, subject=subject, limit=6)
    context = format_knowledge_context(matches)
    if syllabus_matches:
        syllabus_lines = ["Imported syllabus matches:"]
        for row in syllabus_matches:
            syllabus_lines.append(
                f"- {row.get('title')} ({row.get('node_type')})"
                + (f" | {row.get('book_title')}" if row.get('book_title') else "")
                + (f" | Chapter {row.get('chapter_number')}" if row.get('chapter_number') else "")
            )
        context = f"{context}\n\n" + "\n".join(syllabus_lines)
    system_prompt = (
        "You are StudyPilot, a calm and honest school tutor for Grades 6-10. "
        "Use only the provided CBSE syllabus context and the student's details. "
        "If the context is not enough, say so clearly and suggest the closest textbook chapter. "
        "Never invent syllabus facts or pretend to know something you do not know. "
        "Keep the explanation concise, friendly, and appropriate for a school exhibition demo."
    )

    user_prompt = (
        f"Student grade: {grade}\n"
        f"Subject hint: {subject or 'not specified'}\n"
        f"Question: {question}\n\n"
        f"{context}\n\n"
        "Answer the student's question in simple language. "
        "If helpful, end with one short follow-up question."
    )

    response_text, llm_mode = generate_tutor_response(system_prompt, user_prompt)

    if not response_text:
        response_text = offline_answer(question, matches)
        llm_mode = "offline_knowledge"

    return jsonify(
        {
            "ok": True,
            "mode": llm_mode,
            "answer": response_text,
            "sources": [
                {
                    "grade": entry["grade"],
                    "subject": entry["subject"],
                    "book_title": entry["book_title"],
                    "chapter_number": entry["chapter_number"],
                    "chapter_title": entry["chapter_title"],
                    "source_url": entry["source_url"],
                }
                for entry in matches
            ]
            + [
                {
                    "grade": row.get("grade"),
                    "subject": row.get("subject"),
                    "book_title": row.get("book_title"),
                    "chapter_number": row.get("chapter_number"),
                    "section_number": row.get("section_number"),
                    "title": row.get("title"),
                    "node_type": row.get("node_type"),
                    "source_url": row.get("source_url"),
                }
                for row in syllabus_matches
            ],
        }
    )


@app.get("/api/syllabus/tree")
def syllabus_tree():
    grade = request.args.get("grade", type=int)
    subject = request.args.get("subject", type=str)
    node_type = request.args.get("node_type", type=str)

    where = ["1=1"]
    params: list[Any] = []
    if grade is not None:
        where.append("(grade IS NULL OR grade = ?)")
        params.append(grade)
    if subject:
        where.append("(subject IS NULL OR LOWER(subject) LIKE ?)")
        params.append(f"%{subject.lower()}%")
    if node_type:
        where.append("node_type = ?")
        params.append(node_type)

    rows = fetch_all(
        f"""
        SELECT * FROM syllabus_nodes
        WHERE {' AND '.join(where)}
        ORDER BY grade, subject, book_title, chapter_number, section_number, order_index, id
        """,
        tuple(params),
    )
    return jsonify({"ok": True, "items": rows})


@app.get("/api/syllabus/search")
def syllabus_search():
    query = (request.args.get("query") or "").strip()
    grade = request.args.get("grade", type=int)
    subject = request.args.get("subject", type=str)
    if not query:
        return _json_error("query is required.")

    rows = search_syllabus_nodes(query, grade=grade, subject=subject, limit=20)
    return jsonify({"ok": True, "items": rows})


init_db()
seed_knowledge_base()
seed_official_curriculum_catalog()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
