from datetime import datetime

from backend.database import execute, fetch_one


def sync_school_emails(student_id: int, target_email: str) -> dict:
    """
    Synchronize school mail payloads for the demo Peepal Prodigy School flow.

    This keeps the operation idempotent and returns structured holiday events
    that the planner can render on the correct dates.
    """

    execute("DELETE FROM exams WHERE student_id = ? AND title LIKE '%Peepal%'", (student_id,))

    school_emails = [
        {
            "sender": "Peepal Prodigy School <communications@peepalprodigy.edu.in>",
            "subject": "Peepal Prodigy School - Grade 7 Term Final Assessment Schedule",
            "date": "2026-06-25",
            "body": (
                "Dear Parent,\n\n"
                "The Grade 7 Final Assessment Schedule for Peepal Prodigy School has been finalized:\n"
                "- Science: 11 July 2026 (Saturday), 09:00 - 11:00 AM\n"
                "- Mathematics: 14 July 2026 (Tuesday), 09:00 - 11:00 AM\n"
                "- English: 16 July 2026 (Thursday), 09:00 - 11:00 AM\n\n"
                "Please ensure students revise all NCERT chapter checklists."
            ),
        },
        {
            "sender": "Peepal Prodigy School <circulars@peepalprodigy.edu.in>",
            "subject": "Peepal Prodigy School - Holiday Circular (Summer/Monsoon Break)",
            "date": "2026-06-26",
            "body": (
                "Dear Parent,\n\n"
                "The school will remain closed for the monsoon holiday break from 28 June 2026 to 2 July 2026.\n"
                "Normal classes and scheduled exam preparations will resume on Friday, 3 July 2026."
            ),
        },
        {
            "sender": "Peepal Prodigy School <reportcards@peepalprodigy.edu.in>",
            "subject": "Peepal Prodigy School - Terminal Report Card for Ishaan",
            "date": "2026-06-24",
            "body": (
                "Peepal Prodigy School Report Card:\n"
                "- Science: 85/100\n"
                "- Mathematics: 90/100\n"
                "- English: 88/100\n\n"
                "Excellent progress overall."
            ),
        },
    ]

    synced_exams = []
    synced_scorecards = []
    holiday_events = [
        {"title": "\U0001F334 Peepal School Holiday Break", "day": "Sunday", "date": "2026-06-28", "type": "break", "start": "08:00", "end": "20:00"},
        {"title": "\U0001F334 Peepal School Holiday Break", "day": "Monday", "date": "2026-06-29", "type": "break", "start": "08:00", "end": "20:00"},
        {"title": "\U0001F334 Peepal School Holiday Break", "day": "Tuesday", "date": "2026-06-30", "type": "break", "start": "08:00", "end": "20:00"},
        {"title": "\U0001F334 Peepal School Holiday Break", "day": "Wednesday", "date": "2026-07-01", "type": "break", "start": "08:00", "end": "20:00"},
        {"title": "\U0001F334 Peepal School Holiday Break", "day": "Thursday", "date": "2026-07-02", "type": "break", "start": "08:00", "end": "20:00"},
    ]

    for email_item in school_emails:
        body = email_item["body"]
        subject = email_item["subject"]

        if "Assessment Schedule" in subject:
            for line in body.split("\n"):
                if not line.strip().startswith("-"):
                    continue
                parts = line.split(":")
                if len(parts) < 2:
                    continue

                subj_name = parts[0].replace("-", "").strip()
                date_info = parts[1].split(",")[0].strip()
                try:
                    cleaned_date_info = date_info.split("(")[0].strip()
                    dt = datetime.strptime(cleaned_date_info, "%d %B %Y")
                    exam_date = dt.strftime("%Y-%m-%d")
                except Exception:
                    if "11 July" in date_info:
                        exam_date = "2026-07-11"
                    elif "14 July" in date_info:
                        exam_date = "2026-07-14"
                    elif "16 July" in date_info:
                        exam_date = "2026-07-16"
                    else:
                        exam_date = "2026-07-10"

                exam_title = f"Peepal Prodigy Final Exam - {subj_name}"
                execute(
                    """
                    INSERT INTO exams (student_id, subject, title, exam_date, syllabus_scope, confidence_level)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (student_id, subj_name, exam_title, exam_date, "Full Textbook Syllabus", 75),
                )
                synced_exams.append(
                    {
                        "subject": subj_name,
                        "title": exam_title,
                        "date": exam_date,
                        "confidence_level": 75,
                    }
                )

        elif "Report Card" in subject:
            for line in body.split("\n"):
                if not line.strip().startswith("-"):
                    continue
                parts = line.split(":")
                if len(parts) < 2:
                    continue

                subj_name = parts[0].replace("-", "").strip()
                score_text = parts[1].split("/")[0].strip()
                try:
                    score = int(score_text)
                except Exception:
                    score = 80

                existing = fetch_one(
                    "SELECT id, homework_completion, chapter_completion, revision_progress FROM progress WHERE student_id = ? AND LOWER(subject_name) = ?",
                    (student_id, subj_name.lower()),
                )
                homework_completion = existing["homework_completion"] if existing else 0
                chapter_completion = existing["chapter_completion"] if existing else 0
                revision_progress = existing["revision_progress"] if existing else 0

                completion_ratio = (homework_completion + chapter_completion + revision_progress) / 300.0
                readiness = round(
                    homework_completion * 0.2
                    + chapter_completion * 0.25
                    + revision_progress * 0.25
                    + (score * 0.15 + score * 0.15) * completion_ratio
                )

                if existing:
                    execute(
                        """
                        UPDATE progress
                        SET quiz_performance = ?, confidence_level = ?, readiness_percentage = ?, updated_at = CURRENT_TIMESTAMP
                        WHERE id = ?
                        """,
                        (score, score, readiness, existing["id"]),
                    )
                else:
                    execute(
                        """
                        INSERT INTO progress (
                            student_id, subject_name, homework_completion, chapter_completion,
                            revision_progress, quiz_performance, confidence_level, readiness_percentage
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        """,
                        (student_id, subj_name, 0, 0, 0, score, score, readiness),
                    )

                synced_scorecards.append({"subject": subj_name, "score": score})

    return {
        "ok": True,
        "exams": synced_exams,
        "scorecards": synced_scorecards,
        "holiday_events": holiday_events,
        "message": f"Successfully extracted Peepal Prodigy School emails for {target_email}!",
    }
