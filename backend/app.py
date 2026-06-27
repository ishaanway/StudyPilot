"""Flask API for StudyPilot.

The current front-end prototype still runs in the browser, but this backend
provides the SQLite-backed foundation for the next phases.
"""

from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request, send_file

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
from backend.library import (
    delete_download,
    ensure_downloaded,
    book_file_path,
    filtered_catalog,
    find_catalog_item,
)
from backend.llm import generate_tutor_response_with_choice, list_local_model_options
from backend.reminder import build_reminders
from backend.scheduler import build_daily_plan, rebalance_missed_sessions


PROJECT_ROOT = Path(__file__).resolve().parent.parent

app = Flask(__name__, static_folder=str(PROJECT_ROOT), static_url_path="")


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


def _looks_like_greeting(question: str) -> bool:
    text = question.strip().lower()
    if not text:
        return False
    greetings = {
        "hi",
        "hello",
        "hey",
        "namaste",
        "good morning",
        "good afternoon",
        "good evening",
    }
    return text in greetings or text.startswith(tuple(greetings))


def _looks_like_prompt_echo(answer: str) -> bool:
    text = (answer or "").strip().lower()
    if not text:
        return True
    echo_markers = (
        "student:",
        "subject:",
        "question:",
        "context:",
        "related cbse/ncert syllabus context",
        "greetings!",
        "please let me know",
    )
    return any(marker in text for marker in echo_markers)


def _resolve_llm_details(llm_mode: str, requested_provider: str | None, requested_model: str | None) -> tuple[str, str]:
    provider = (requested_provider or "").strip().lower() or "auto"
    model = (requested_model or "").strip()

    if isinstance(llm_mode, str) and ":" in llm_mode:
        # llm_mode values look like "ollama:gemma3:4b".
        resolved_provider, resolved_model = llm_mode.split(":", 1)
        resolved_provider = resolved_provider.strip().lower()
        resolved_model = resolved_model.strip()
        if resolved_provider == "ollama":
            provider = resolved_provider
            if resolved_model:
                model = resolved_model
    elif isinstance(llm_mode, str) and llm_mode.strip() == "ollama":
        provider = llm_mode.strip().lower()

    return provider, model


def _normalize_list(value: Any) -> list[str]:
    if isinstance(value, list):
        items = value
    elif isinstance(value, str):
        items = [part.strip() for part in value.replace(";", ",").split(",")]
    else:
        items = []

    normalized: list[str] = []
    for item in items:
        text = str(item).strip()
        if text:
            normalized.append(text)
    return normalized


def _normalize_history(value: Any, limit: int = 8) -> list[dict[str, str]]:
    if not isinstance(value, list):
        return []

    normalized: list[dict[str, str]] = []
    for item in value[-max(limit, 1):]:
        if not isinstance(item, dict):
            continue
        role = str(item.get("role") or "").strip().lower()
        content = str(item.get("content") or item.get("message") or "").strip()
        if role not in {"user", "assistant"} or not content:
            continue
        normalized.append(
            {
                "role": role,
                "content": content,
                "mode": str(item.get("mode") or "").strip().lower(),
            }
        )
    return normalized[-max(limit, 1):]


def _profile_context(profile: dict[str, Any] | None, payload: dict[str, Any] | None = None) -> dict[str, Any]:
    profile = profile or {}
    payload = payload or {}
    subjects = _normalize_list(profile.get("subjects") or payload.get("subjects"))
    favorite_subjects = _normalize_list(profile.get("favoriteSubjects") or profile.get("favouriteSubjects"))
    weak_subjects = _normalize_list(profile.get("weakSubjects") or profile.get("weak_subjects"))
    interests = _normalize_list(profile.get("interests"))
    hobbies = _normalize_list(profile.get("hobbies"))
    learning_goals = _normalize_list(profile.get("learningGoals") or profile.get("learning_goals"))

    return {
        "name": str(profile.get("name") or payload.get("name") or "").strip(),
        "grade": str(profile.get("grade") or payload.get("grade") or "10"),
        "board": str(profile.get("board") or profile.get("school_board") or payload.get("board") or payload.get("school_board") or "CBSE").strip(),
        "subjects": subjects,
        "favorite_subjects": favorite_subjects or subjects[:3],
        "weak_subjects": weak_subjects,
        "interests": interests,
        "hobbies": hobbies,
        "learning_goals": learning_goals,
        "goal": str(profile.get("goal") or profile.get("academic_goal") or payload.get("goal") or "").strip(),
        "dream_career": str(profile.get("dreamCareer") or profile.get("dream_career") or payload.get("dreamCareer") or payload.get("dream_career") or "").strip(),
        "daily_hours": profile.get("dailyHours") or profile.get("daily_study_hours") or payload.get("dailyHours") or payload.get("daily_study_hours") or 0,
    }


def _mode_instruction(mode: str) -> str:
    normalized = (mode or "learn").strip().lower()
    if normalized == "homework":
        return (
            "Explain homework problems step by step. "
            "Guide the student through the reasoning, pause for checks, and avoid giving only the final answer."
        )
    if normalized == "revision":
        return (
            "Provide a concise revision summary with key formulas, definitions, and memory hooks. "
            "Use short bullets and keep the response compact."
        )
    if normalized == "exam":
        return (
            "Create a mini test or mock exam with a few questions, marking scheme hints, and quick exam strategy. "
            "Encourage practice instead of just answering once."
        )
    if normalized == "doubt":
        return (
            "Answer interactively and invite the next follow-up question. "
            "Be patient, clarify misconceptions, and adapt to the student's exact doubt."
        )
    return (
        "Teach the concept in detail at the student's grade level with examples, analogies, and small checks for understanding. "
        "Do not simply provide a bare answer."
    )


def _step_by_step_arithmetic_response(question: str, result: str) -> str:
    return (
        f"Let's solve it together step by step. {result}. "
        "I kept the final value at the end so you can see how the calculation lands, and you can check the order of operations again if needed."
    )


def _strip_json_fences(text: str) -> str:
    cleaned = (text or "").strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.strip("`")
        if cleaned.lower().startswith("json"):
            cleaned = cleaned[4:].strip()
    if cleaned.startswith("json"):
        cleaned = cleaned[4:].strip()
    return cleaned


def _career_catalog() -> list[dict[str, Any]]:
    return [
        {
            "title": "Aerospace Engineer",
            "required_subjects": ["Physics", "Mathematics"],
            "skills": ["Analytical thinking", "Problem solving", "CAD", "Design"],
            "future_demand": "High",
            "pathway": "Grade 10 -> Science stream -> Engineering degree -> Aerospace specialization",
            "keywords": ["space", "physics", "math", "engineering", "rockets", "aircraft", "aerospace"],
        },
        {
            "title": "Software Developer",
            "required_subjects": ["Mathematics", "Computer Science"],
            "skills": ["Logic", "Programming", "Debugging", "System design"],
            "future_demand": "High",
            "pathway": "Grade 10 -> Science or Computer stream -> Computer Science degree -> Software projects and internships",
            "keywords": ["coding", "programming", "apps", "software", "ai", "robotics"],
        },
        {
            "title": "Doctor",
            "required_subjects": ["Biology", "Chemistry", "Physics"],
            "skills": ["Empathy", "Memory", "Observation", "Communication"],
            "future_demand": "High",
            "pathway": "Grade 10 -> Science stream -> Medical entrance preparation -> MBBS and specialization",
            "keywords": ["medicine", "health", "biology", "human body", "hospital"],
        },
        {
            "title": "Civil Engineer",
            "required_subjects": ["Mathematics", "Physics"],
            "skills": ["Planning", "Design", "Structural thinking", "Project management"],
            "future_demand": "High",
            "pathway": "Grade 10 -> Science stream -> Engineering degree -> Civil or structural specialization",
            "keywords": ["construction", "buildings", "roads", "design", "infrastructure"],
        },
        {
            "title": "Architect",
            "required_subjects": ["Mathematics", "Art"],
            "skills": ["Visualization", "Creativity", "Space planning", "Design"],
            "future_demand": "High",
            "pathway": "Grade 10 -> Mathematics/Arts aligned stream -> Architecture degree -> Internship and licensing",
            "keywords": ["design", "buildings", "spaces", "creativity", "drawing", "architecture"],
        },
        {
            "title": "Data Scientist",
            "required_subjects": ["Mathematics", "Statistics", "Computer Science"],
            "skills": ["Data analysis", "Programming", "Pattern recognition", "Critical thinking"],
            "future_demand": "Very High",
            "pathway": "Grade 10 -> Science/Math -> Computer Science or Statistics degree -> Data projects and analytics roles",
            "keywords": ["data", "analysis", "ai", "statistics", "coding", "math"],
        },
        {
            "title": "Chartered Accountant",
            "required_subjects": ["Mathematics", "Commerce"],
            "skills": ["Numeracy", "Attention to detail", "Financial analysis", "Planning"],
            "future_demand": "High",
            "pathway": "Grade 10 -> Commerce stream -> CA foundation -> Articleship and qualification",
            "keywords": ["finance", "accounting", "business", "numbers", "economics"],
        },
        {
            "title": "Teacher",
            "required_subjects": ["English", "Any core subject"],
            "skills": ["Communication", "Patience", "Explanation", "Empathy"],
            "future_demand": "Stable",
            "pathway": "Grade 10 -> Any stream -> Graduation -> Teacher education / subject specialization",
            "keywords": ["teaching", "explain", "students", "learning", "education"],
        },
    ]


def _career_fallback(profile: dict[str, Any] | None, progress_payload: dict[str, Any] | None = None) -> dict[str, Any]:
    profile = profile or {}
    progress_payload = progress_payload or {}

    text_bag = " ".join(
        [
            str(profile.get("name") or ""),
            str(profile.get("grade") or ""),
            str(profile.get("board") or ""),
            " ".join(_normalize_list(profile.get("subjects"))),
            " ".join(_normalize_list(profile.get("favorite_subjects"))),
            " ".join(_normalize_list(profile.get("weak_subjects"))),
            " ".join(_normalize_list(profile.get("interests"))),
            " ".join(_normalize_list(profile.get("hobbies"))),
            " ".join(_normalize_list(profile.get("learning_goals"))),
            str(profile.get("dream_career") or ""),
            str(progress_payload.get("overall_readiness") or ""),
        ]
    ).lower()

    def score_item(item: dict[str, Any]) -> int:
        score = 45
        title = str(item.get("title") or "").lower()
        keywords = [str(term).lower() for term in item.get("keywords", []) if str(term).strip()]
        required_subjects = [str(term).lower() for term in item.get("required_subjects", []) if str(term).strip()]

        if str(profile.get("dream_career") or "").strip():
            dream = str(profile.get("dream_career") or "").lower()
            if dream in title or title in dream:
                score += 30
            elif any(term in dream for term in keywords):
                score += 18

        favorite_subjects = set(_normalize_list(profile.get("favorite_subjects")))
        weak_subjects = set(_normalize_list(profile.get("weak_subjects")))
        interests = set(_normalize_list(profile.get("interests")))
        hobbies = set(_normalize_list(profile.get("hobbies")))

        for subject in required_subjects:
            if subject in {item.lower() for item in favorite_subjects}:
                score += 12
            if subject in {item.lower() for item in weak_subjects}:
                score -= 5

        for term in keywords:
            if term and term in text_bag:
                score += 10

        for term in interests | hobbies:
            if term.lower() in title or any(term.lower() in keyword for keyword in keywords):
                score += 10

        if "science" in text_bag and any(key in title for key in ["engineer", "doctor", "scientist", "data"]):
            score += 6
        if "math" in text_bag or "mathematics" in text_bag:
            if any(key in title for key in ["engineer", "data", "accountant", "architect", "software"]):
                score += 6
        if "art" in text_bag or "design" in text_bag:
            if any(key in title for key in ["architect", "designer", "teacher"]):
                score += 6
        if "coding" in text_bag or "robot" in text_bag:
            if any(key in title for key in ["software", "data", "engineer"]):
                score += 8

        return max(0, min(100, score))

    ranked: list[dict[str, Any]] = []
    for item in _career_catalog():
        score = score_item(item)
        ranked.append(
            {
                "title": item["title"],
                "match_score": score,
                "fit_score": score,
                "why": f"{profile.get('name') or 'This student'} shows signals that align with {item['title'].lower()}.",
                "summary": f"{profile.get('name') or 'This student'} shows signals that align with {item['title'].lower()}.",
                "required_subjects": item["required_subjects"],
                "best_subjects": item["required_subjects"],
                "skills": item["skills"],
                "future_demand": item["future_demand"],
                "pathway": item["pathway"],
                "next_steps": [
                    f"Check how {item['title'].lower()} connects to current school subjects.",
                    f"Build one small project or note set related to {item['title'].lower()}.",
                    "Review the strongest matching subjects and improve one weak area.",
                ],
                "why_it_fits": f"It matches the student's profile, interests, and school strengths.",
            }
        )

    ranked.sort(key=lambda item: (-int(item.get("match_score") or 0), str(item.get("title") or "")))
    top = ranked[:5]
    summary = (
        f"These career directions are ranked from the student's profile, interests, and current study signals. "
        f"The best overall match is {top[0]['title']}."
        if top
        else "Career recommendations are generated from the student profile."
    )

    return {
        "summary": summary,
        "recommendations": top,
        "action_plan": [
            "Keep using the AI Tutor for subject strengths and weak areas.",
            "Track study progress so the career ranking can improve over time.",
            "Review the top two career pathways and save one goal to the profile.",
        ],
    }


def _build_tutor_system_prompt(mode: str, profile_context: dict[str, Any]) -> str:
    mode_note = _mode_instruction(mode)
    return (
        "You are StudyPilot, an educational AI tutor for school students. "
        f"Mode: {mode}. "
        f"{mode_note} "
        "Always adapt the explanation to the student's grade level. "
        "Use the profile context, weak areas, and conversation history. "
        "Never dump a raw final answer without teaching the reasoning. "
        "Use examples and analogies when helpful. "
        "If the student's question needs multiple steps, structure the answer clearly. "
        "If the student is asking follow-up doubt questions, answer interactively and invite the next question. "
        "Stay aligned to the official CBSE/NCERT syllabus context when it is available. "
        f"Student context: {json.dumps(profile_context, ensure_ascii=False)}"
    )


def _normalize_career_recommendation(item: dict[str, Any]) -> dict[str, Any]:
    subjects = item.get("required_subjects") or item.get("best_subjects") or []
    skills = item.get("skills") or []
    pathway = item.get("pathway") or ""
    why = item.get("why") or item.get("summary") or item.get("why_it_fits") or ""
    score = item.get("match_score", item.get("fit_score", 70))
    next_steps = _normalize_list(item.get("next_steps"))
    if not next_steps and pathway:
        next_steps = [
            step.strip(" -•")
            for step in re.split(r"\s*(?:->|→|›|››|\|)\s*", str(pathway))
            if step.strip(" -•")
        ]
    normalized = {
        "title": str(item.get("title") or "Career Path").strip(),
        "match_score": max(0, min(100, int(score or 70))),
        "fit_score": max(0, min(100, int(score or 70))),
        "why": str(why).strip(),
        "summary": str(why).strip(),
        "required_subjects": _normalize_list(subjects),
        "best_subjects": _normalize_list(subjects),
        "skills": _normalize_list(skills),
        "future_demand": str(item.get("future_demand") or "Moderate").strip(),
        "pathway": str(pathway).strip(),
        "next_steps": next_steps,
        "why_it_fits": str(item.get("why_it_fits") or why).strip(),
        "rank": int(item.get("rank") or 0),
    }
    return normalized


def _student_from_row(row: dict | None) -> dict | None:
    if not row:
        return None

    try:
        subjects = json.loads(row.get("subjects_json") or "[]")
    except json.JSONDecodeError:
        subjects = []

    try:
        profile_json = json.loads(row.get("profile_json") or "{}")
    except json.JSONDecodeError:
        profile_json = {}

    if not isinstance(profile_json, dict):
        profile_json = {}

    student = {
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

    student.update(profile_json)
    student["id"] = row.get("id")
    student["student_id"] = row.get("id")
    student.setdefault("profile_json", profile_json)
    return student


def _profile_payload_to_student_fields(payload: dict[str, Any], existing_row: dict | None = None) -> dict[str, Any]:
    existing_row = existing_row or {}
    payload = payload or {}

    existing_profile = {}
    try:
        existing_profile = json.loads(existing_row.get("profile_json") or "{}") if existing_row else {}
    except json.JSONDecodeError:
        existing_profile = {}
    if not isinstance(existing_profile, dict):
        existing_profile = {}

    merged_profile: dict[str, Any] = {}
    if isinstance(existing_profile, dict):
        merged_profile.update(existing_profile)
    merged_profile.update(payload)

    if "grade" not in merged_profile and existing_row.get("grade") is not None:
        merged_profile["grade"] = existing_row.get("grade")
    if "board" not in merged_profile and existing_row.get("school_board") is not None:
        merged_profile["board"] = existing_row.get("school_board")

    name = str(merged_profile.get("name") or existing_row.get("name") or "Student").strip() or "Student"
    grade = _clamp_grade(merged_profile.get("grade") or existing_row.get("grade") or 10)
    section = str(merged_profile.get("section") or existing_row.get("section") or "").strip()
    board = str(
        merged_profile.get("board")
        or merged_profile.get("school_board")
        or existing_row.get("school_board")
        or "CBSE"
    ).strip() or "CBSE"
    subjects = _normalize_list(merged_profile.get("subjects") or existing_profile.get("subjects") or [])
    daily_hours = merged_profile.get("dailyHours") or merged_profile.get("daily_study_hours") or existing_row.get("daily_study_hours") or 2
    goal = str(
        merged_profile.get("goal")
        or merged_profile.get("academic_goal")
        or existing_row.get("academic_goal")
        or "Improve overall grades"
    ).strip() or "Improve overall grades"

    merged_profile["name"] = name
    merged_profile["grade"] = str(grade)
    merged_profile["section"] = section
    merged_profile["board"] = board
    merged_profile["school_board"] = board
    merged_profile["subjects"] = subjects
    merged_profile["dailyHours"] = float(daily_hours or 0)
    merged_profile["goal"] = goal
    merged_profile["academic_goal"] = goal
    merged_profile["profileVersion"] = int(merged_profile.get("profileVersion") or 1)

    return {
        "name": name,
        "grade": grade,
        "section": section,
        "school_board": board,
        "subjects_json": json.dumps(subjects, ensure_ascii=False),
        "daily_study_hours": float(daily_hours or 0),
        "academic_goal": goal,
        "profile_json": json.dumps(merged_profile, ensure_ascii=False),
        "profile": merged_profile,
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


@app.get("/")
def index():
    return app.send_static_file("index.html")


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


@app.route("/api/profile", methods=["GET", "PUT", "POST"])
def profile():
    row = fetch_one("SELECT * FROM students ORDER BY id LIMIT 1")

    if request.method == "GET":
        return jsonify({"ok": True, "item": _student_from_row(row)})

    payload = _payload()
    target_row = row
    target_id = payload.get("student_id") or payload.get("id")
    if target_id is not None:
        try:
            target_row = fetch_one("SELECT * FROM students WHERE id = ?", (int(target_id),))
        except (TypeError, ValueError):
            target_row = row

    fields = _profile_payload_to_student_fields(payload, target_row)

    if target_row:
        execute(
            """
            UPDATE students
            SET name = ?, grade = ?, section = ?, school_board = ?, subjects_json = ?,
                daily_study_hours = ?, academic_goal = ?, profile_json = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            """,
            (
                fields["name"],
                fields["grade"],
                fields["section"],
                fields["school_board"],
                fields["subjects_json"],
                fields["daily_study_hours"],
                fields["academic_goal"],
                fields["profile_json"],
                target_row["id"],
            ),
        )
        student = _student_from_row(fetch_one("SELECT * FROM students WHERE id = ?", (target_row["id"],)))
        return jsonify({"ok": True, "item": student})

    student_id = execute(
        """
        INSERT INTO students (
            name, grade, section, school_board, subjects_json, daily_study_hours, academic_goal, profile_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            fields["name"],
            fields["grade"],
            fields["section"],
            fields["school_board"],
            fields["subjects_json"],
            fields["daily_study_hours"],
            fields["academic_goal"],
            fields["profile_json"],
        ),
    )
    student = _student_from_row(fetch_one("SELECT * FROM students WHERE id = ?", (student_id,)))
    return jsonify({"ok": True, "item": student}), 201


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
    backend_profile = fetch_one("SELECT * FROM students WHERE id = ?", (student_id,)) if student_id else None
    merged_profile: dict[str, Any] = {}
    if backend_profile:
      merged_profile.update(backend_profile)
    if isinstance(payload.get("profile"), dict):
      merged_profile.update(payload.get("profile") or {})

    grade = _clamp_grade(payload.get("grade") or (merged_profile.get("grade") if merged_profile else 10))
    subject = (payload.get("subject") or "").strip()
    study_mode = str(payload.get("mode") or payload.get("study_mode") or "learn").strip().lower() or "learn"
    greeting_mode = _looks_like_greeting(question)
    history = _normalize_history(payload.get("history"), limit=12)
    profile_context = _profile_context(merged_profile, payload)
    analytics_summary = payload.get("analytics_summary") if isinstance(payload.get("analytics_summary"), dict) else {}

    arithmetic_answer = solve_simple_arithmetic(question)
    if arithmetic_answer:
        return jsonify(
            {
                "ok": True,
                "mode": "calculator",
                "study_mode": study_mode,
                "provider": "calculator",
                "model": "",
                "answer": _step_by_step_arithmetic_response(question, arithmetic_answer),
                "sources": [],
            }
        )

    use_knowledge = (not greeting_mode) and (not subject or subject.lower() == "science")
    matches = search_knowledge(question, grade=grade, subject=subject, limit=4) if use_knowledge else []
    syllabus_matches = [] if greeting_mode else search_syllabus_nodes(question, grade=grade, subject=subject, limit=6)
    if not greeting_mode and not matches and not syllabus_matches:
        syllabus_matches = search_syllabus_nodes(question, grade=None, subject=subject, limit=6)
    if syllabus_matches:
        same_grade_matches = [row for row in syllabus_matches if row.get("grade") in {None, grade}]
        if same_grade_matches:
            syllabus_matches = same_grade_matches
    context = format_knowledge_context(matches) if matches else ""
    if syllabus_matches:
        syllabus_lines = ["Imported syllabus matches:"]
        for row in syllabus_matches:
            syllabus_lines.append(
                f"- {row.get('title')} ({row.get('node_type')})"
                + (f" | {row.get('book_title')}" if row.get('book_title') else "")
                + (f" | Chapter {row.get('chapter_number')}" if row.get('chapter_number') else "")
            )
        context = f"{context}\n\n" + "\n".join(syllabus_lines) if context else "\n".join(syllabus_lines)
    system_prompt = _build_tutor_system_prompt(study_mode, profile_context)
    if greeting_mode:
        system_prompt = (
            "You are StudyPilot, a friendly school tutor and study companion. "
            "The student is greeting you, so respond warmly in one short paragraph. "
            "Then ask what subject, chapter, or mode they want help with. "
            "Keep the tone encouraging and energetic. "
            "Use the student's profile context and remember the recent conversation history. "
            f"Student context: {json.dumps(profile_context, ensure_ascii=False)} "
            f"Conversation history: {json.dumps(history, ensure_ascii=False)}"
        )

    user_prompt = json.dumps(
        {
            "question": question,
            "mode": "greeting" if greeting_mode else study_mode,
            "grade": grade,
            "subject_hint": subject or "",
            "student": profile_context,
            "analytics_summary": analytics_summary,
            "conversation_history": history,
            "curriculum_context": context,
            "instructions": [
                "Never simply provide a bare final answer.",
                "Encourage understanding with steps, examples, or a short check-for-understanding question.",
                "Keep the explanation age-appropriate for the student's grade.",
            ],
        },
        ensure_ascii=False,
        indent=2,
    )

    requested_provider = payload.get("provider") or payload.get("ai_provider") or payload.get("model_provider")
    requested_model = payload.get("model") or payload.get("ai_model")

    response_text, llm_mode = generate_tutor_response_with_choice(
        system_prompt,
        user_prompt,
        provider=requested_provider,
        model=requested_model,
    )

    if llm_mode.startswith("ollama") and _looks_like_prompt_echo(response_text):
        if greeting_mode:
            retry_system_prompt = (
                "You are StudyPilot, a warm school tutor. "
                "Reply with exactly one short friendly paragraph. "
                "Do not repeat the user's words or any labels. "
                "Use the student's profile and recent conversation history to keep the greeting personal."
            )
            retry_user_prompt = json.dumps(
                {
                    "grade": grade,
                    "student": profile_context,
                    "conversation_history": history,
                    "task": "Write a short greeting and ask what grade, subject, or chapter they need help with.",
                },
                ensure_ascii=False,
                indent=2,
            )
        else:
            retry_system_prompt = (
                "You are StudyPilot, a helpful school tutor. "
                "Answer with a teaching-first explanation using steps, examples, and one short check question. "
                "Do not repeat labels or prompt text. "
                "Use the student's profile context and conversation history."
            )
            retry_user_prompt = (
                json.dumps(
                    {
                        "grade": grade,
                        "mode": study_mode,
                        "question": question,
                        "student": profile_context,
                        "conversation_history": history,
                        "context": context,
                    },
                    ensure_ascii=False,
                    indent=2,
                )
            )
        retry_text, retry_mode = generate_tutor_response_with_choice(
            retry_system_prompt,
            retry_user_prompt,
            provider=requested_provider,
            model=requested_model,
        )
        if retry_text and not _looks_like_prompt_echo(retry_text):
            response_text = retry_text
            llm_mode = retry_mode

    if not response_text:
        response_text = offline_answer(question, matches)
        llm_mode = "offline_knowledge"

    resolved_provider, resolved_model = _resolve_llm_details(llm_mode, requested_provider, requested_model)

    return jsonify(
        {
            "ok": True,
            "mode": llm_mode,
            "study_mode": study_mode,
            "provider": resolved_provider,
            "model": resolved_model,
            "used_model": resolved_model,
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


@app.get("/api/tutor/models")
def tutor_models():
    models = list_local_model_options()
    active = models[0] if models else {"provider": "offline", "model": "", "label": "Offline"}
    return jsonify({"ok": True, "items": models, "active": active})


@app.post("/api/career/recommendations")
def career_recommendations():
    payload = _payload()
    profile_payload = payload.get("profile") if isinstance(payload.get("profile"), dict) else {}
    student_id = _resolve_student_id(payload)
    backend_profile = _student_from_row(fetch_one("SELECT * FROM students WHERE id = ?", (student_id,))) if student_id else None

    profile: dict[str, Any] = {}
    if backend_profile:
        profile.update(backend_profile)
    profile.update(profile_payload)

    history = _normalize_history(payload.get("history"), limit=12)
    profile_context = _profile_context(profile, payload)
    analytics_summary = payload.get("analytics_summary") if isinstance(payload.get("analytics_summary"), dict) else {}
    progress_payload = payload.get("progress") if isinstance(payload.get("progress"), dict) else {}

    system_prompt = (
        "You are StudyPilot Career Coach. "
        "Return valid JSON only with summary, recommendations, and action_plan. "
        "Generate at least five distinct career matches from the student's real profile and performance signals. "
        "Each recommendation must include title, match_score, why, required_subjects, skills, future_demand, pathway, and why_it_fits. "
        "Do not use fallback cards or placeholder careers. "
        "Keep the advice realistic, specific, and motivating for a school student."
    )
    user_prompt = json.dumps(
        {
            "profile": {
                "name": profile_context.get("name", ""),
                "grade": profile_context.get("grade", ""),
                "board": profile_context.get("board", ""),
                "favorite_subjects": profile_context.get("favorite_subjects", []),
                "weak_subjects": profile_context.get("weak_subjects", []),
                "interests": profile_context.get("interests", []),
                "hobbies": profile_context.get("hobbies", []),
                "dream_career": profile_context.get("dream_career", ""),
                "learning_goals": profile_context.get("learning_goals", []),
            },
            "analytics_summary": {
                "questionsAsked": analytics_summary.get("questionsAsked", 0),
                "revisionSessions": analytics_summary.get("revisionSessions", 0),
                "quizAccuracy": analytics_summary.get("quizAccuracy", 0),
                "strongTopics": [item.get("topic") for item in analytics_summary.get("strongTopics", []) if isinstance(item, dict) and item.get("topic")],
                "weakTopics": [item.get("topic") for item in analytics_summary.get("weakTopics", []) if isinstance(item, dict) and item.get("topic")],
            },
            "conversation_history": history[-2:],
        },
        indent=2,
    )

    response_text, llm_mode = generate_tutor_response_with_choice(
        system_prompt,
        user_prompt,
        provider=payload.get("provider") or payload.get("ai_provider") or "auto",
        model=payload.get("model") or payload.get("ai_model"),
        json_mode=True,
    )

    parsed: dict[str, Any] | None = None
    if response_text:
        try:
            parsed = json.loads(_strip_json_fences(response_text))
        except json.JSONDecodeError:
            parsed = None

    if not parsed or not isinstance(parsed.get("recommendations"), list):
        parsed = _career_fallback(profile_context, progress_payload)
        llm_mode = "profile_rules"

    parsed.setdefault("summary", "Here are the strongest career directions for you right now.")
    parsed.setdefault("recommendations", [])
    parsed.setdefault("action_plan", [])
    parsed["recommendations"] = [_normalize_career_recommendation(item) for item in parsed["recommendations"][:5] if isinstance(item, dict)]
    if len(parsed["recommendations"]) < 5:
        fallback_data = _career_fallback(profile_context, progress_payload)
        fallback_recommendations = [
            _normalize_career_recommendation(item)
            for item in fallback_data.get("recommendations", [])
            if isinstance(item, dict)
        ]
        combined = parsed["recommendations"][:]
        seen_titles = {str(item.get("title") or "").strip().lower() for item in combined if item.get("title")}
        for item in fallback_recommendations:
            title_key = str(item.get("title") or "").strip().lower()
            if not title_key or title_key in seen_titles:
                continue
            combined.append(item)
            seen_titles.add(title_key)
            if len(combined) >= 5:
                break
        if len(combined) < 5:
            for item in fallback_recommendations:
                combined.append(item)
                if len(combined) >= 5:
                    break
        parsed["recommendations"] = combined[:5]
        if not str(parsed.get("summary") or "").strip():
            parsed["summary"] = fallback_data.get("summary", "")
        if not parsed.get("action_plan"):
            parsed["action_plan"] = fallback_data.get("action_plan", [])
        if not llm_mode.startswith("ollama"):
            llm_mode = "profile_rules"

    resolved_provider, resolved_model = _resolve_llm_details(llm_mode, payload.get("provider"), payload.get("model"))

    return jsonify(
        {
            "ok": True,
            "mode": llm_mode,
            "provider": resolved_provider,
            "model": resolved_model,
            "used_model": resolved_model,
            **parsed,
        }
    )


def _study_tool_prompt(tool: str, profile_context: dict[str, Any], analytics: dict[str, Any], analytics_summary: dict[str, Any], payload: dict[str, Any], context: str, history: list[dict[str, str]]) -> tuple[str, str]:
    normalized_tool = (tool or "pack").strip().lower()
    subject = str(payload.get("subject") or "").strip()
    chapter = str(payload.get("chapter") or payload.get("chapter_title") or "").strip()
    difficulty = str(payload.get("difficulty") or "medium").strip().lower()
    count = int(payload.get("count") or 5)
    tool_specific_notes = {
        "quiz": "Return 5 quiz questions with four options, a correct answer index, and a short explanation. Make the questions match the selected chapter and difficulty.",
        "flashcards": "Return compact flashcards with short fronts and backs. Keep them revision-friendly.",
        "notes": "Return concise chapter notes with bullet points, definitions, and examples where helpful.",
        "summary": "Return a short revision summary and a compact set of key points.",
        "practice": "Return practice questions with hints and answer outlines. Do not make them too easy.",
        "pack": "Return a balanced learning pack that can include notes, summary, flashcards, quiz questions, and practice questions.",
    }

    system_prompt = (
        "You are StudyPilot's study-tool generator. "
        "Return valid JSON only. "
        "Generate school-appropriate learning material that matches the student's profile, analytics, and syllabus context. "
        "Never include filler text outside JSON. "
        f"{tool_specific_notes.get(normalized_tool, tool_specific_notes['pack'])}"
    )
    user_prompt = json.dumps(
        {
            "tool": normalized_tool,
            "profile": profile_context,
            "analytics": analytics,
            "analytics_summary": analytics_summary,
            "conversation_history": history,
            "subject": subject,
            "chapter": chapter,
            "difficulty": difficulty,
            "count": count,
            "syllabus_context": context,
            "schema": {
                "summary": "string",
                "notes": "string",
                "flashcards": [{"front": "string", "back": "string"}],
                "quiz_questions": [
                    {"question": "string", "options": ["A", "B", "C", "D"], "answer_index": 0, "explanation": "string"}
                ],
                "practice_questions": [
                    {"question": "string", "hint": "string", "answer_outline": "string"}
                ],
                "revision_summary": "string",
            },
            "instructions": [
                "Keep explanations age-appropriate.",
                "Use examples when useful.",
                "Match the output to the selected difficulty.",
                "If the student profile shows weak subjects, make the practice slightly more supportive.",
            ],
        },
        indent=2,
    )
    return system_prompt, user_prompt


def _offline_study_pack(tool_name: str, grade: int, subject: str, context_entries: list[dict[str, Any]], count: int) -> dict[str, Any]:
    limit = max(1, min(int(count or 5), 8))
    summary = format_knowledge_context(context_entries) if context_entries else f"Use the official NCERT chapter list and study tools for {subject or f'Grade {grade}'}."

    notes_lines = [summary]
    if context_entries:
      notes_lines.extend(["", "Matched chapters:"])
      for row in context_entries[:limit]:
        chapter_title = str(row.get("chapter_title") or row.get("title") or "Study topic").strip()
        book_title = str(row.get("book_title") or "").strip()
        notes_lines.append(f"- {chapter_title}" + (f" | {book_title}" if book_title else ""))
    notes = "\n".join(notes_lines).strip()

    flashcards: list[dict[str, str]] = []
    quiz_questions: list[dict[str, Any]] = []
    practice_questions: list[dict[str, str]] = []

    for row in context_entries[:limit]:
        chapter_title = str(row.get("chapter_title") or row.get("title") or "This topic").strip()
        chapter_summary = str(row.get("summary") or summary).strip()
        subject_name = str(row.get("subject") or subject or "Study").strip()
        flashcards.append(
            {
                "front": f"What is {chapter_title} about?",
                "back": chapter_summary or summary,
            }
        )
        quiz_questions.append(
            {
                "question": f"Which idea is covered in {chapter_title}?",
                "options": [
                    chapter_title,
                    subject_name,
                    "A sports topic",
                    "A poetry topic",
                ],
                "answer_index": 0,
                "explanation": chapter_summary or summary,
            }
        )
        practice_questions.append(
            {
                "question": f"Explain the main idea of {chapter_title} in your own words.",
                "hint": chapter_summary or summary,
            }
        )

    if not flashcards:
        flashcards = [
            {
                "front": f"What should you revise first for Grade {grade} {subject or 'study'}?",
                "back": summary,
            }
        ]
    if not quiz_questions:
        quiz_questions = [
            {
                "question": f"What should you focus on first for Grade {grade} {subject or 'study'}?",
                "options": [
                    "Review the syllabus context",
                    "Ignore the chapter list",
                    "Skip revision",
                    "Only memorize answers",
                ],
                "answer_index": 0,
                "explanation": summary,
            }
        ]
    if not practice_questions:
        practice_questions = [
            {
                "question": f"Write one short revision note for Grade {grade} {subject or 'study'}.",
                "hint": summary,
            }
        ]

    payload: dict[str, Any] = {
        "summary": summary,
        "notes": notes,
        "flashcards": flashcards,
        "quiz_questions": quiz_questions,
        "practice_questions": practice_questions,
        "revision_summary": summary,
    }

    if tool_name == "notes":
        payload["notes"] = notes
        payload["revision_summary"] = summary
        payload["summary"] = summary
    elif tool_name == "summary":
        payload["summary"] = summary
        payload["revision_summary"] = summary
    elif tool_name == "flashcards":
        payload["flashcards"] = flashcards
    elif tool_name == "quiz":
        payload["quiz_questions"] = quiz_questions

    return payload


@app.post("/api/study-tools/generate")
def generate_study_tools():
    payload = _payload()
    profile_payload = payload.get("profile") if isinstance(payload.get("profile"), dict) else {}
    student_id = _resolve_student_id(payload)
    backend_profile = _student_from_row(fetch_one("SELECT * FROM students WHERE id = ?", (student_id,))) if student_id else None

    profile: dict[str, Any] = {}
    if backend_profile:
        profile.update(backend_profile)
    profile.update(profile_payload)

    analytics = payload.get("analytics") if isinstance(payload.get("analytics"), dict) else {}
    analytics_summary = payload.get("analytics_summary") if isinstance(payload.get("analytics_summary"), dict) else {}
    history = _normalize_history(payload.get("history"), limit=12)
    profile_context = _profile_context(profile, payload)
    subject = (payload.get("subject") or "").strip()
    grade = _clamp_grade(payload.get("grade") or profile_context.get("grade"))
    context_query = subject or f"Grade {grade}"
    context_entries = search_knowledge(context_query, grade=grade, subject=subject or None, limit=4)
    context = format_knowledge_context(context_entries) if context_entries else "No local syllabus context was matched."

    system_prompt, user_prompt = _study_tool_prompt(
        payload.get("tool") or "pack",
        profile_context,
        analytics,
        analytics_summary,
        payload,
        context,
        history,
    )

    response_text, llm_mode = generate_tutor_response_with_choice(
        system_prompt,
        user_prompt,
        provider=payload.get("provider") or payload.get("ai_provider") or "auto",
        model=payload.get("model") or payload.get("ai_model"),
        json_mode=True,
    )

    if not response_text:
        offline_pack = _offline_study_pack(
            str(payload.get("tool") or "pack").strip().lower(),
            grade,
            subject,
            context_entries,
            int(payload.get("count") or 5),
        )
        return jsonify(
            {
                "ok": True,
                "mode": "offline_knowledge",
                "tool": payload.get("tool") or "pack",
                "provider": "offline_knowledge",
                "data": offline_pack,
            }
        )

    parsed: dict[str, Any] | None = None
    try:
        parsed = json.loads(_strip_json_fences(response_text))
    except json.JSONDecodeError:
        parsed = None

    tool_name = str(payload.get("tool") or "pack").strip().lower()
    fallback_text = _strip_json_fences(response_text)
    if not isinstance(parsed, dict):
        if tool_name == "notes":
            parsed = {
                "summary": "",
                "notes": fallback_text,
                "flashcards": [],
                "quiz_questions": [],
                "practice_questions": [],
                "revision_summary": fallback_text,
            }
        elif tool_name == "summary":
            parsed = {
                "summary": fallback_text,
                "notes": "",
                "flashcards": [],
                "quiz_questions": [],
                "practice_questions": [],
                "revision_summary": fallback_text,
            }
        else:
            return jsonify(
                {
                    "ok": False,
                    "error": "The AI study generator returned an invalid response.",
                    "mode": llm_mode,
                }
            ), 503

    parsed.setdefault("summary", "")
    parsed.setdefault("notes", "")
    parsed.setdefault("flashcards", [])
    parsed.setdefault("quiz_questions", [])
    parsed.setdefault("practice_questions", [])
    parsed.setdefault("revision_summary", parsed.get("summary", ""))
    def _extract_blob_text(value: Any, preferred_keys: list[str]) -> str:
        if not isinstance(value, str):
            return str(value or "").strip()
        blob = _strip_json_fences(value)
        try:
            nested = json.loads(blob)
        except json.JSONDecodeError:
            return blob.strip()
        if isinstance(nested, dict):
            for key in preferred_keys:
                candidate = nested.get(key)
                if isinstance(candidate, str) and candidate.strip():
                    return candidate.strip()
            nested_notes = nested.get("notes")
            if isinstance(nested_notes, dict):
                sections: list[str] = []
                for section_name, items in nested_notes.items():
                    if isinstance(items, list) and items:
                        sections.append(f"{section_name}: " + "; ".join(str(item) for item in items))
                if sections:
                    return "\n".join(sections)
        return blob.strip()

    if tool_name == "notes" and not str(parsed.get("notes") or "").strip():
        parsed["notes"] = fallback_text
    if tool_name == "summary" and not str(parsed.get("summary") or "").strip():
        parsed["summary"] = fallback_text
    if tool_name == "summary" and not str(parsed.get("revision_summary") or "").strip():
        parsed["revision_summary"] = fallback_text
    if tool_name == "notes":
        parsed["notes"] = _extract_blob_text(parsed.get("notes"), ["notes", "summary"])
        parsed["revision_summary"] = _extract_blob_text(parsed.get("revision_summary"), ["revision_summary", "summary"])
    if tool_name == "summary":
        parsed["summary"] = _extract_blob_text(parsed.get("summary"), ["summary", "revision_summary"])
        parsed["revision_summary"] = parsed["summary"]

    return jsonify(
        {
            "ok": True,
            "mode": llm_mode,
            "tool": payload.get("tool") or "pack",
            "provider": "ollama" if llm_mode.startswith("ollama") else "offline_knowledge",
            "data": parsed,
        }
    )


@app.get("/api/library/books")
def library_books():
    grade = request.args.get("grade", type=int)
    subject = request.args.get("subject", type=str)
    query = request.args.get("query", type=str)
    downloaded_arg = request.args.get("downloaded", type=str)
    downloaded: bool | None
    if downloaded_arg is None or downloaded_arg == "":
        downloaded = None
    else:
        downloaded = downloaded_arg.lower() in {"1", "true", "yes"}

    items = filtered_catalog(grade=grade, subject=subject, query=query, downloaded=downloaded)
    return jsonify({"ok": True, "items": items})


@app.post("/api/library/books/<path:item_id>/download")
def library_download_book(item_id: str):
    try:
        item = ensure_downloaded(item_id)
    except KeyError:
        return _json_error("Book not found.", 404)
    except ValueError as exc:
        return _json_error(str(exc))
    except Exception:
        return _json_error("Unable to download this NCERT book right now.", 503)
    return jsonify({"ok": True, "item": item})


@app.delete("/api/library/books/<path:item_id>")
def library_delete_book(item_id: str):
    try:
        item = delete_download(item_id)
    except KeyError:
        return _json_error("Book not found.", 404)
    return jsonify({"ok": True, "item": item})


@app.get("/api/library/books/<path:item_id>/file")
def library_book_file(item_id: str):
    try:
        item = find_catalog_item(item_id)
        if not item:
            return _json_error("Book not found.", 404)
        path = book_file_path(item_id)
        if not path.exists():
            return _json_error("This book has not been downloaded yet.", 404)
        return send_file(path, mimetype="application/pdf", as_attachment=False, download_name=path.name)
    except KeyError:
        return _json_error("Book not found.", 404)


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


def _ensure_student_profile_storage() -> None:
    columns = {row.get("name") for row in fetch_all("PRAGMA table_info(students)") if row.get("name")}
    if "profile_json" not in columns:
        execute("ALTER TABLE students ADD COLUMN profile_json TEXT NOT NULL DEFAULT '{}'")


init_db()
_ensure_student_profile_storage()
seed_knowledge_base()
seed_official_curriculum_catalog()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
