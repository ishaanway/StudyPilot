/* ======================================================== */
/* StudyPilot Local Storage Database Engine & Defaults       */
/* ======================================================== */

(function () {
  const DB_PREFIX = "studypilot_";

  const DEFAULTS = {
    profile: {
      name: "",
      grade: "10",
      board: "CBSE",
      subjects: ["Mathematics", "Science", "Social Science", "English", "Tamil", "Computer Science"],
      dailyHours: 2,
      goal: "Improve overall grades",
      streak: 5,
      lastActive: "2026-06-21",
      setupComplete: false,
      careerUnlocked: false
    },

    tasks: [
      { id: "t1", title: "Read NCERT Science Ch 2 - Acids, Bases and Salts", subject: "Science", duration: 30, completed: false, date: "2026-06-22" },
      { id: "t2", title: "Revise NCERT Science Ch 9 - Light, Reflection and Refraction", subject: "Science", duration: 35, completed: false, date: "2026-06-22" },
      { id: "t3", title: "Solve NCERT Science Ch 11 - Electricity practice questions", subject: "Science", duration: 40, completed: false, date: "2026-06-22" },
      { id: "t4", title: "Complete one mixed practice quiz", subject: "Science", duration: 25, completed: false, date: "2026-06-22" },
      { id: "t5", title: "Review class notes and mark doubts", subject: "Science", duration: 20, completed: false, date: "2026-06-23" }
    ],

    exams: [
      { id: "e1", subject: "Science", topic: "Periodic Test: NCERT Ch 2, 9 and 11", date: "2026-06-25" },
      { id: "e2", subject: "Science", topic: "Chapter quiz: Acids, Bases and Salts", date: "2026-06-29" },
      { id: "e3", subject: "Science", topic: "Chapter quiz: Light, Reflection and Refraction", date: "2026-07-03" }
    ],

    calendar: [
      { id: "c1", title: "Science Class", day: "Monday", type: "class", start: "09:00", end: "10:00" },
      { id: "c2", title: "AI Study Block: Science Ch 2 Revision", day: "Monday", type: "study", start: "18:00", end: "19:00" },
      { id: "c3", title: "AI Study Block: Science Ch 9 Practice", day: "Wednesday", type: "study", start: "17:00", end: "18:00" },
      { id: "c4", title: "AI Study Block: Science Ch 11 Problem Solving", day: "Friday", type: "study", start: "17:00", end: "18:00" }
    ],

    notes: [
      {
        id: "n1",
        grade: "9",
        title: "Matter in Our Surroundings",
        body: "Track state changes, diffusion, evaporation, and condensation from the chapter summary.",
        color: "blue",
        updatedAt: "2026-06-22 10:15"
      },
      {
        id: "n2",
        grade: "9",
        title: "Atoms and Molecules",
        body: "Keep the law of conservation of mass, formula writing, and atomic mass in one place.",
        color: "yellow",
        updatedAt: "2026-06-21 15:40"
      },
      {
        id: "n3",
        grade: "9",
        title: "Force and Laws of Motion",
        body: "Revise inertia, momentum, and Newton's laws with one worked example per law.",
        color: "purple",
        updatedAt: "2026-06-22 09:00"
      },
      {
        id: "n4",
        grade: "10",
        title: "Science Ch 2 - Acids, Bases and Salts",
        body: "Use the official NCERT chapter for indicators, pH, and neutralisation. Keep one page for examples from daily life.",
        color: "blue",
        updatedAt: "2026-06-22 10:15"
      },
      {
        id: "n5",
        grade: "10",
        title: "Science Ch 9 - Light, Reflection and Refraction",
        body: "Revise mirror formulas, refraction, and ray diagrams. Open the textbook page before the quiz.",
        color: "yellow",
        updatedAt: "2026-06-21 15:40"
      },
      {
        id: "n6",
        grade: "10",
        title: "Science Ch 11 - Electricity",
        body: "Focus on current, potential difference, resistance, Ohm's law, and circuit safety.",
        color: "purple",
        updatedAt: "2026-06-22 09:00"
      }
    ],

    flashcards: [],

    notifications: [
      { id: "no1", message: "Science periodic test is coming up on 25 June. Revise NCERT Ch 2, 9 and 11.", read: false, type: "exam" },
      { id: "no2", message: "AI Coach: Your Science revision block is scheduled for Monday evening.", read: false, type: "info" },
      { id: "no3", message: "Open the official NCERT textbook links before starting quiz practice.", read: false, type: "info" },
      { id: "no4", message: "Mark completed chapters to update readiness and spaced revision automatically.", read: false, type: "info" }
    ],

    curriculumProgress: {
      "cbse10_science_ch2": { status: "Not Started", startedAt: "", completedAt: "", revisionDates: [] },
      "cbse10_science_ch9": { status: "Not Started", startedAt: "", completedAt: "", revisionDates: [] },
      "cbse10_science_ch11": { status: "Not Started", startedAt: "", completedAt: "", revisionDates: [] }
    }
  };

  // Helper local storage wrappers
  function get(key) {
    const data = localStorage.getItem(DB_PREFIX + key);
    return data ? JSON.parse(data) : DEFAULTS[key];
  }

  function set(key, value) {
    localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
  }

  // Database API
  window.StudyPilotDB = {
    // Initializer
    init: function () {
      // Ensure all fields have items
      for (let key in DEFAULTS) {
        if (!localStorage.getItem(DB_PREFIX + key)) {
          set(key, DEFAULTS[key]);
        }
      }
      this.migrateLegacyDemoData();
      this.checkStreak();
    },

    // Reset database to defaults
    clearAll: function () {
      for (let key in DEFAULTS) {
        localStorage.removeItem(DB_PREFIX + key);
      }
      this.init();
    },

    migrateLegacyDemoData: function () {
      const profile = this.getProfile();
      if (profile && String(profile.board || '').toUpperCase() === 'CBSE' && String(profile.grade || '') === '7') {
        profile.grade = '10';
        this.saveProfile(profile);
      }

      const legacyPattern = /(Curiosity|Ganita Prakash|Poorvi|Exploring Society|Three Questions|Mughal Empire|Grade 7)/i;
      const sectionHasLegacyContent = (items, fields) => Array.isArray(items) && items.some(item =>
        fields.some(field => legacyPattern.test(String(item && item[field] ? item[field] : '')))
      );
      const cloneDefaults = (key) => JSON.parse(JSON.stringify(DEFAULTS[key]));

      if (sectionHasLegacyContent(this.getTasks(), ['title', 'subject'])) {
        this.saveTasks(cloneDefaults('tasks'));
      }

      if (sectionHasLegacyContent(this.getExams(), ['topic', 'subject'])) {
        this.saveExams(cloneDefaults('exams'));
      }

      if (sectionHasLegacyContent(this.getCalendarEvents(), ['title'])) {
        this.saveCalendarEvents(cloneDefaults('calendar'));
      }

      const storedNotes = get("notes");
      if (Array.isArray(storedNotes) && storedNotes.some(note => !note || !note.grade || sectionHasLegacyContent([note], ['title', 'body']))) {
        const normalizedNotes = cloneDefaults('notes');
        this.saveNotes(normalizedNotes);
      }

      const storedFlashcards = get("flashcards");
      if (Array.isArray(storedFlashcards) && storedFlashcards.some(card => !card || !card.grade || sectionHasLegacyContent([card], ['question', 'answer', 'subject']))) {
        this.saveFlashcards(cloneDefaults('flashcards'));
      }

      if (sectionHasLegacyContent(this.getNotifications(), ['message'])) {
        this.saveNotifications(cloneDefaults('notifications'));
      }
    },

    // Profile API
    getProfile: function () {
      return get("profile");
    },
    saveProfile: function (profileData) {
      set("profile", profileData);
      window.dispatchEvent(new CustomEvent("studypilot_profile_updated", {
        detail: profileData
      }));
    },

    // Tasks API
    getTasks: function () {
      return get("tasks");
    },
    saveTasks: function (tasks) {
      set("tasks", tasks);
    },
    addTask: function (title, subject, duration) {
      const tasks = this.getTasks();
      const newTask = {
        id: "task_" + Date.now(),
        title: title,
        subject: subject,
        duration: parseInt(duration),
        completed: false,
        date: "2026-06-22" // Hardcoded today's date for demo context consistency
      };
      tasks.push(newTask);
      this.saveTasks(tasks);
      this.addNotification(`New task added: "${title}"`, "info");
      return newTask;
    },
    toggleTask: function (id) {
      const tasks = this.getTasks();
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks(tasks);
      }
    },
    deleteTask: function (id) {
      let tasks = this.getTasks();
      tasks = tasks.filter(t => t.id !== id);
      this.saveTasks(tasks);
    },

    // Exams API
    getExams: function () {
      return get("exams");
    },
    saveExams: function (exams) {
      set("exams", exams);
    },
    addExam: function (subject, topic, date) {
      const exams = this.getExams();
      const newExam = {
        id: "exam_" + Date.now(),
        subject: subject,
        topic: topic,
        date: date
      };
      exams.push(newExam);
      this.saveExams(exams);
      
      // Also inject an exam event in the calendar schedule for that day if possible
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const examDateObj = new Date(date);
      const dayName = daysOfWeek[examDateObj.getDay()];
      this.addCalendarEvent(`EXAM: ${subject} (${topic})`, dayName, "exam", "09:00", "11:00");
      
      this.addNotification(`Upcoming exam added for ${subject} on ${date}.`, "exam");
      return newExam;
    },

    // Calendar API
    getCalendarEvents: function () {
      return get("calendar");
    },
    saveCalendarEvents: function (events) {
      set("calendar", events);
    },
    addCalendarEvent: function (title, day, type, start, end) {
      const events = this.getCalendarEvents();
      const newEvent = {
        id: "event_" + Date.now(),
        title: title,
        day: day,
        type: type,
        start: start,
        end: end
      };
      events.push(newEvent);
      this.saveCalendarEvents(events);
      return newEvent;
    },
    deleteCalendarEvent: function (id) {
      let events = this.getCalendarEvents();
      events = events.filter(e => e.id !== id);
      this.saveCalendarEvents(events);
    },

    // Curriculum progress API
    getCurriculumProgress: function () {
      return get("curriculumProgress");
    },
    saveCurriculumProgress: function (progress) {
      set("curriculumProgress", progress);
    },
    updateCurriculumChapter: function (chapterId, patch) {
      const progress = this.getCurriculumProgress();
      const current = progress[chapterId] || { status: "Not Started", startedAt: "", completedAt: "", revisionDates: [] };
      progress[chapterId] = { ...current, ...patch };
      this.saveCurriculumProgress(progress);
      return progress[chapterId];
    },
    markChapterStarted: function (chapterId) {
      const chapter = this.updateCurriculumChapter(chapterId, {
        status: "Started",
        startedAt: new Date().toISOString(),
      });
      this.addNotification("Chapter marked as started.", "info");
      return chapter;
    },
    markChapterCompleted: function (chapterId) {
      const chapter = this.updateCurriculumChapter(chapterId, {
        status: "Completed",
        completedAt: new Date().toISOString(),
      });
      this.scheduleRevisionForChapter(chapterId);
      this.addNotification("Chapter marked as completed. Revision has been scheduled.", "success");
      return chapter;
    },
    scheduleRevisionForChapter: function (chapterId) {
      const chapter = window.StudyPilotCurriculum ? window.StudyPilotCurriculum.getChapterByKey(chapterId) : null;
      if (!chapter) return;

      const progress = this.getCurriculumProgress();
      const current = progress[chapterId] || { status: "Not Started", startedAt: "", completedAt: "", revisionDates: [] };
      const revisionDates = Array.isArray(current.revisionDates) ? current.revisionDates.slice() : [];
      const baseDate = new Date("2026-06-22T00:00:00");
      const offsets = [2, 7];

      offsets.forEach(days => {
        const reviewDate = new Date(baseDate);
        reviewDate.setDate(reviewDate.getDate() + days);
        const reviewIso = reviewDate.toISOString().slice(0, 10);
        if (!revisionDates.includes(reviewIso)) {
          revisionDates.push(reviewIso);
          const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][reviewDate.getDay()];
          this.addCalendarEvent(`Revision: ${chapter.title}`, dayName, "study", "18:00", "18:45");
        }
      });

      progress[chapterId] = {
        ...current,
        revisionDates,
      };
      this.saveCurriculumProgress(progress);
    },
    getChapterCompletionSummary: function () {
      const progress = this.getCurriculumProgress();
      const chapters = window.StudyPilotCurriculum ? window.StudyPilotCurriculum.getScienceChapters() : [];
      const completed = chapters.filter(ch => (progress[ch.id] || {}).status === "Completed").length;
      const started = chapters.filter(ch => ["Started", "Completed"].includes((progress[ch.id] || {}).status)).length;
      const total = chapters.length;
      return {
        completed,
        started,
        total,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },

    // Notes API
    getNotes: function (gradeOverride) {
      const profile = this.getProfile();
      const grade = String(gradeOverride || (profile && profile.grade ? profile.grade : "10"));
      const notes = Array.isArray(get("notes")) ? get("notes") : [];
      return notes.filter(note => String(note && note.grade ? note.grade : "10") === grade);
    },
    saveNotes: function (notes) {
      set("notes", notes);
    },
    addNote: function (title, body, color, gradeOverride) {
      const profile = this.getProfile();
      const newNote = {
        id: "note_" + Date.now(),
        grade: String(gradeOverride || (profile && profile.grade ? profile.grade : "10")),
        title: title || "Untitled Note",
        body: body || "",
        color: color || "default",
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      const allNotes = Array.isArray(get("notes")) ? get("notes") : [];
      allNotes.unshift(newNote);
      this.saveNotes(allNotes);
      return newNote;
    },
    deleteNote: function (id) {
      const notes = Array.isArray(get("notes")) ? get("notes") : [];
      const filtered = notes.filter(n => n.id !== id);
      this.saveNotes(filtered);
    },

    // Flashcards API
    getFlashcards: function (gradeOverride) {
      const profile = this.getProfile();
      const grade = String(gradeOverride || (profile && profile.grade ? profile.grade : "10"));
      const curriculum = window.StudyPilotCurriculum;
      const official = curriculum && typeof curriculum.getFlashcardsForGrade === "function"
        ? curriculum.getFlashcardsForGrade(grade)
        : [];
      const stored = get("flashcards");
      const custom = Array.isArray(stored)
        ? stored.filter(card => String(card && card.grade ? card.grade : "") === grade)
        : [];
      return [...official, ...custom];
    },
    saveFlashcards: function (cards) {
      set("flashcards", cards);
    },
    addFlashcard: function (subject, question, answer) {
      const cards = Array.isArray(get("flashcards")) ? get("flashcards") : [];
      const profile = this.getProfile();
      const newCard = {
        id: "fc_" + Date.now(),
        grade: String(profile && profile.grade ? profile.grade : "10"),
        subject: subject,
        question: question,
        answer: answer,
        ease: 0,
        nextReview: ""
      };
      cards.push(newCard);
      this.saveFlashcards(cards);
      return newCard;
    },

    // Notifications API
    getNotifications: function () {
      return get("notifications");
    },
    saveNotifications: function (notifs) {
      set("notifications", notifs);
    },
    addNotification: function (message, type = "info") {
      const notifs = this.getNotifications();
      const newNotif = {
        id: "notif_" + Date.now(),
        message: message,
        read: false,
        type: type
      };
      notifs.unshift(newNotif);
      this.saveNotifications(notifs);
      
      // Dispatch custom event to trigger badge redraw in header
      window.dispatchEvent(new CustomEvent("studypilot_notification"));
    },

    // Streak and Date management
    checkStreak: function () {
      const profile = this.getProfile();
      const todayStr = "2026-06-22"; // Anchor demo date
      
      if (profile.lastActive && profile.lastActive !== todayStr) {
        // If last active was yesterday (June 21), keep streak or increment it
        if (profile.lastActive === "2026-06-21") {
          // Keep streak active. If they complete tasks, dashboard will increment
        } else {
          // Reset streak to 1 if they missed more than 1 day
          profile.streak = 1;
        }
        profile.lastActive = todayStr;
        this.saveProfile(profile);
      }
    }
  };

  // Run automatically when imported
  window.StudyPilotDB.init();
})();
