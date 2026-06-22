PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    grade INTEGER NOT NULL CHECK (grade BETWEEN 6 AND 10),
    section TEXT NOT NULL DEFAULT '',
    school_board TEXT NOT NULL,
    subjects_json TEXT NOT NULL DEFAULT '[]',
    daily_study_hours REAL NOT NULL DEFAULT 2,
    academic_goal TEXT NOT NULL DEFAULT 'Improve Marks',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    code TEXT,
    teacher_name TEXT,
    is_core INTEGER NOT NULL DEFAULT 1 CHECK (is_core IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, name),
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS curriculum (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    grade INTEGER NOT NULL CHECK (grade BETWEEN 6 AND 10),
    subject_id INTEGER,
    subject_name TEXT NOT NULL,
    chapter_title TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    topic_status TEXT NOT NULL DEFAULT 'Not Started'
        CHECK (topic_status IN ('Not Started', 'Learning', 'Revised', 'Mastered')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT DEFAULT '',
    due_date TEXT NOT NULL,
    priority INTEGER NOT NULL DEFAULT 2 CHECK (priority BETWEEN 1 AND 5),
    estimated_minutes INTEGER NOT NULL DEFAULT 30,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed', 'skipped')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS homework (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    task_id INTEGER,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed', 'submitted', 'skipped')),
    notes TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    exam_date TEXT NOT NULL,
    syllabus_scope TEXT DEFAULT '',
    confidence_level INTEGER NOT NULL DEFAULT 50 CHECK (confidence_level BETWEEN 0 AND 100),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    task_id INTEGER,
    subject TEXT NOT NULL,
    session_date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    session_type TEXT NOT NULL DEFAULT 'study'
        CHECK (session_type IN ('study', 'revision', 'exam', 'break')),
    focus_level INTEGER NOT NULL DEFAULT 3 CHECK (focus_level BETWEEN 1 AND 5),
    status TEXT NOT NULL DEFAULT 'planned'
        CHECK (status IN ('planned', 'completed', 'missed', 'rescheduled')),
    notes TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject TEXT NOT NULL,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    ease INTEGER NOT NULL DEFAULT 0,
    next_review TEXT DEFAULT '',
    review_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT 'default',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    subject_name TEXT NOT NULL,
    homework_completion INTEGER NOT NULL DEFAULT 0 CHECK (homework_completion BETWEEN 0 AND 100),
    chapter_completion INTEGER NOT NULL DEFAULT 0 CHECK (chapter_completion BETWEEN 0 AND 100),
    revision_progress INTEGER NOT NULL DEFAULT 0 CHECK (revision_progress BETWEEN 0 AND 100),
    quiz_performance INTEGER NOT NULL DEFAULT 0 CHECK (quiz_performance BETWEEN 0 AND 100),
    confidence_level INTEGER NOT NULL DEFAULT 0 CHECK (confidence_level BETWEEN 0 AND 100),
    readiness_percentage INTEGER NOT NULL DEFAULT 0 CHECK (readiness_percentage BETWEEN 0 AND 100),
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, subject_name),
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL UNIQUE,
    theme TEXT NOT NULL DEFAULT 'light',
    offline_mode_enabled INTEGER NOT NULL DEFAULT 1 CHECK (offline_mode_enabled IN (0, 1)),
    notifications_enabled INTEGER NOT NULL DEFAULT 1 CHECK (notifications_enabled IN (0, 1)),
    reminder_time TEXT NOT NULL DEFAULT '18:00',
    ai_mode TEXT NOT NULL DEFAULT 'offline',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS knowledge_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grade INTEGER NOT NULL,
    subject TEXT NOT NULL,
    book_title TEXT NOT NULL,
    chapter_number INTEGER NOT NULL,
    chapter_title TEXT NOT NULL,
    summary TEXT NOT NULL,
    keywords TEXT NOT NULL DEFAULT '',
    source_url TEXT NOT NULL DEFAULT '',
    source_type TEXT NOT NULL DEFAULT 'NCERT',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS syllabus_nodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    node_type TEXT NOT NULL,
    source_provider TEXT NOT NULL DEFAULT 'NCERT',
    grade INTEGER,
    subject TEXT,
    board TEXT NOT NULL DEFAULT 'CBSE',
    book_title TEXT,
    chapter_number INTEGER,
    section_number INTEGER,
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    source_url TEXT NOT NULL DEFAULT '',
    pdf_url TEXT NOT NULL DEFAULT '',
    local_path TEXT NOT NULL DEFAULT '',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES syllabus_nodes (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_students_grade ON students (grade);
CREATE INDEX IF NOT EXISTS idx_tasks_student_due ON tasks (student_id, due_date);
CREATE INDEX IF NOT EXISTS idx_exams_student_date ON exams (student_id, exam_date);
CREATE INDEX IF NOT EXISTS idx_curriculum_student_subject ON curriculum (student_id, subject_name);
CREATE INDEX IF NOT EXISTS idx_sessions_student_date ON study_sessions (student_id, session_date);
CREATE INDEX IF NOT EXISTS idx_knowledge_grade_subject ON knowledge_entries (grade, subject);
CREATE INDEX IF NOT EXISTS idx_knowledge_keywords ON knowledge_entries (keywords);
CREATE INDEX IF NOT EXISTS idx_syllabus_nodes_parent ON syllabus_nodes (parent_id);
CREATE INDEX IF NOT EXISTS idx_syllabus_nodes_grade_subject ON syllabus_nodes (grade, subject);
CREATE INDEX IF NOT EXISTS idx_syllabus_nodes_type ON syllabus_nodes (node_type);
