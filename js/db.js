/* ======================================================== */
/* StudyPilot Local Storage Database Engine & Defaults       */
/* ======================================================== */

(function () {
  const DB_PREFIX = "studypilot_";

  const DEFAULTS = {
    auth: {
      user: null,
      session: {
        signedIn: false,
        userId: ""
      }
    },

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
      { id: "t6_1", grade: "6", title: "Read Science: Food and Its Sources", subject: "Science", duration: 20, completed: false, date: "2026-06-22" },
      { id: "t6_2", grade: "6", title: "Practice Maths: Fractions and Numbers", subject: "Mathematics", duration: 25, completed: false, date: "2026-06-22" },
      { id: "t6_3", grade: "6", title: "Revise English: nouns and sentences", subject: "English", duration: 20, completed: false, date: "2026-06-23" },
      { id: "t7_1", grade: "7", title: "Read Science: Nutrition in Plants", subject: "Science", duration: 25, completed: false, date: "2026-06-22" },
      { id: "t7_2", grade: "7", title: "Practice Maths: Simple Equations", subject: "Mathematics", duration: 30, completed: false, date: "2026-06-22" },
      { id: "t7_3", grade: "7", title: "Review Social Science: Environment", subject: "Social Science", duration: 20, completed: false, date: "2026-06-23" },
      { id: "t8_1", grade: "8", title: "Read Science: Force and Pressure", subject: "Science", duration: 25, completed: false, date: "2026-06-22" },
      { id: "t8_2", grade: "8", title: "Practice Maths: Linear Equations", subject: "Mathematics", duration: 30, completed: false, date: "2026-06-22" },
      { id: "t8_3", grade: "8", title: "Revise English: formal letter format", subject: "English", duration: 20, completed: false, date: "2026-06-23" },
      { id: "t9_1", grade: "9", title: "Read Science: Matter in Our Surroundings", subject: "Science", duration: 25, completed: false, date: "2026-06-22" },
      { id: "t9_2", grade: "9", title: "Practice Maths: Number Systems", subject: "Mathematics", duration: 30, completed: false, date: "2026-06-22" },
      { id: "t9_3", grade: "9", title: "Review Social Science: Democratic Politics", subject: "Social Science", duration: 20, completed: false, date: "2026-06-23" },
      { id: "t1", grade: "10", title: "Read NCERT Science Ch 2 - Acids, Bases and Salts", subject: "Science", duration: 30, completed: false, date: "2026-06-22" },
      { id: "t2", grade: "10", title: "Revise NCERT Science Ch 9 - Light, Reflection and Refraction", subject: "Science", duration: 35, completed: false, date: "2026-06-22" },
      { id: "t3", grade: "10", title: "Solve NCERT Science Ch 11 - Electricity practice questions", subject: "Science", duration: 40, completed: false, date: "2026-06-22" },
      { id: "t4", grade: "10", title: "Complete one mixed practice quiz", subject: "Science", duration: 25, completed: false, date: "2026-06-22" },
      { id: "t5", grade: "10", title: "Review class notes and mark doubts", subject: "Science", duration: 20, completed: false, date: "2026-06-23" }
    ],

    exams: [
      { id: "e6_1", grade: "6", subject: "Science", topic: "Chapter quiz: Food and Its Sources", date: "2026-06-25" },
      { id: "e7_1", grade: "7", subject: "Science", topic: "Chapter quiz: Heat", date: "2026-06-26" },
      { id: "e8_1", grade: "8", subject: "Science", topic: "Chapter quiz: Force and Pressure", date: "2026-06-27" },
      { id: "e9_1", grade: "9", subject: "Science", topic: "Chapter quiz: Matter in Our Surroundings", date: "2026-06-28" },
      { id: "e1", grade: "10", subject: "Science", topic: "Periodic Test: NCERT Ch 2, 9 and 11", date: "2026-06-25" },
      { id: "e2", grade: "10", subject: "Science", topic: "Chapter quiz: Acids, Bases and Salts", date: "2026-06-29" },
      { id: "e3", grade: "10", subject: "Science", topic: "Chapter quiz: Light, Reflection and Refraction", date: "2026-07-03" }
    ],

    calendar: [
      { id: "c6_1", grade: "6", title: "Science Class", day: "Monday", type: "class", start: "08:00", end: "09:00" },
      { id: "c6_2", grade: "6", title: "AI Study Block: Science Chapter Practice", day: "Monday", type: "study", start: "18:00", end: "18:45" },
      { id: "c7_1", grade: "7", title: "Science Class", day: "Tuesday", type: "class", start: "09:00", end: "10:00" },
      { id: "c7_2", grade: "7", title: "AI Study Block: Maths Practice", day: "Wednesday", type: "study", start: "17:00", end: "18:00" },
      { id: "c8_1", grade: "8", title: "Science Lab", day: "Thursday", type: "class", start: "10:00", end: "11:00" },
      { id: "c8_2", grade: "8", title: "AI Study Block: Revision Time", day: "Friday", type: "study", start: "18:00", end: "18:45" },
      { id: "c9_1", grade: "9", title: "Science Lab", day: "Monday", type: "class", start: "10:00", end: "11:00" },
      { id: "c9_2", grade: "9", title: "AI Study Block: Matter Revision", day: "Wednesday", type: "study", start: "18:00", end: "18:45" },
      { id: "c1", grade: "10", title: "Science Class", day: "Monday", type: "class", start: "09:00", end: "10:00" },
      { id: "c2", grade: "10", title: "AI Study Block: Science Ch 2 Revision", day: "Monday", type: "study", start: "18:00", end: "19:00" },
      { id: "c3", grade: "10", title: "AI Study Block: Science Ch 9 Practice", day: "Wednesday", type: "study", start: "17:00", end: "18:00" },
      { id: "c4", grade: "10", title: "AI Study Block: Science Ch 11 Problem Solving", day: "Friday", type: "study", start: "17:00", end: "18:00" }
    ],

    notes: [
      {
        id: "n6_1",
        grade: "6",
        title: "Science - Food and Its Sources",
        body: "Food comes from plants and animals. Use one example for each source.",
        color: "blue",
        updatedAt: "2026-06-22 09:30"
      },
      {
        id: "n7_1",
        grade: "7",
        title: "Science - Heat",
        body: "Remember conduction, convection, and radiation with a daily-life example.",
        color: "yellow",
        updatedAt: "2026-06-22 10:00"
      },
      {
        id: "n8_1",
        grade: "8",
        title: "Science - Force and Pressure",
        body: "Force is a push or pull. Pressure depends on force and area.",
        color: "purple",
        updatedAt: "2026-06-22 10:30"
      },
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
      window.dispatchEvent(new CustomEvent("studypilot_data_updated"));
    },

    // Authentication API
    getAuth: function () {
      return get("auth");
    },
    saveAuth: function (authData) {
      set("auth", authData);
      window.dispatchEvent(new CustomEvent("studypilot_auth_changed", {
        detail: authData
      }));
    },
    isAuthenticated: function () {
      const auth = this.getAuth();
      return !!(auth && auth.session && auth.session.signedIn && auth.user && auth.user.id);
    },
    getCurrentUser: function () {
      const auth = this.getAuth();
      return auth && auth.session && auth.session.signedIn ? auth.user : null;
    },
    hashPassword: async function (password) {
      const text = String(password || "");
      if (window.crypto && window.crypto.subtle && window.TextEncoder) {
        const bytes = new TextEncoder().encode(text);
        const digest = await window.crypto.subtle.digest("SHA-256", bytes);
        return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
      }

      return btoa(unescape(encodeURIComponent(text)));
    },
    signUp: async function ({ name, email, password }) {
      const auth = this.getAuth();
      const safeName = String(name || "").trim();
      const safeEmail = String(email || "").trim().toLowerCase();
      const safePassword = String(password || "");

      if (!safeName || !safeEmail || !safePassword) {
        throw new Error("Please fill in your name, email, and password.");
      }

      if (auth && auth.user) {
        throw new Error("An account already exists on this device. Please log in or reset the app to create a new one.");
      }

      const passwordHash = await this.hashPassword(safePassword);
      const user = {
        id: "user_" + Date.now(),
        name: safeName,
        email: safeEmail,
        passwordHash,
        createdAt: new Date().toISOString(),
      };

      const nextAuth = {
        user,
        session: {
          signedIn: true,
          userId: user.id,
        },
      };

      set("auth", nextAuth);

      const profile = this.getProfile() || JSON.parse(JSON.stringify(DEFAULTS.profile));
      if (!profile.name) profile.name = safeName;
      if (!profile.setupComplete) profile.setupComplete = false;
      this.saveProfile(profile);

      window.dispatchEvent(new CustomEvent("studypilot_auth_changed", {
        detail: nextAuth
      }));

      return user;
    },
    signIn: async function ({ email, password }) {
      const auth = this.getAuth();
      const safeEmail = String(email || "").trim().toLowerCase();
      const safePassword = String(password || "");

      if (!auth || !auth.user) {
        throw new Error("No account found on this device. Please sign up first.");
      }

      if (safeEmail !== String(auth.user.email || "").toLowerCase()) {
        throw new Error("Email not found. Please check your login details.");
      }

      const passwordHash = await this.hashPassword(safePassword);
      if (passwordHash !== auth.user.passwordHash) {
        throw new Error("Incorrect password. Please try again.");
      }

      const nextAuth = {
        user: auth.user,
        session: {
          signedIn: true,
          userId: auth.user.id,
        },
      };

      set("auth", nextAuth);
      window.dispatchEvent(new CustomEvent("studypilot_auth_changed", {
        detail: nextAuth
      }));

      return auth.user;
    },
    signOut: function () {
      const auth = this.getAuth();
      const nextAuth = {
        user: auth && auth.user ? auth.user : null,
        session: {
          signedIn: false,
          userId: "",
        },
      };
      set("auth", nextAuth);
      window.dispatchEvent(new CustomEvent("studypilot_auth_changed", {
        detail: nextAuth
      }));
    },

    // Tasks API
    getAllTasks: function () {
      return Array.isArray(get("tasks")) ? get("tasks") : [];
    },
    getTasks: function (gradeOverride) {
      const profile = this.getProfile();
      const grade = String(gradeOverride || (profile && profile.grade ? profile.grade : "10"));
      const tasks = this.getAllTasks();
      return tasks.filter(task => String(task && task.grade ? task.grade : "10") === grade);
    },
    saveTasks: function (tasks) {
      set("tasks", tasks);
      window.dispatchEvent(new CustomEvent("studypilot_data_updated"));
    },
    addTask: function (title, subject, duration) {
      const tasks = this.getAllTasks();
      const profile = this.getProfile();
      const newTask = {
        id: "task_" + Date.now(),
        grade: String(profile && profile.grade ? profile.grade : "10"),
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
      const tasks = this.getAllTasks();
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks(tasks);
      }
    },
    deleteTask: function (id) {
      let tasks = this.getAllTasks();
      tasks = tasks.filter(t => t.id !== id);
      this.saveTasks(tasks);
    },

    // Exams API
    getAllExams: function () {
      return Array.isArray(get("exams")) ? get("exams") : [];
    },
    getExams: function (gradeOverride) {
      const profile = this.getProfile();
      const grade = String(gradeOverride || (profile && profile.grade ? profile.grade : "10"));
      const exams = this.getAllExams();
      return exams.filter(exam => String(exam && exam.grade ? exam.grade : "10") === grade);
    },
    saveExams: function (exams) {
      set("exams", exams);
      window.dispatchEvent(new CustomEvent("studypilot_data_updated"));
    },
    addExam: function (subject, topic, date) {
      const exams = Array.isArray(get("exams")) ? get("exams") : [];
      const profile = this.getProfile();
      const newExam = {
        id: "exam_" + Date.now(),
        grade: String(profile && profile.grade ? profile.grade : "10"),
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
    getAllCalendarEvents: function () {
      return Array.isArray(get("calendar")) ? get("calendar") : [];
    },
    getCalendarEvents: function (gradeOverride) {
      const profile = this.getProfile();
      const grade = String(gradeOverride || (profile && profile.grade ? profile.grade : "10"));
      const events = this.getAllCalendarEvents();
      return events.filter(event => String(event && event.grade ? event.grade : "10") === grade);
    },
    saveCalendarEvents: function (events) {
      set("calendar", events);
      window.dispatchEvent(new CustomEvent("studypilot_data_updated"));
    },
    addCalendarEvent: function (title, day, type, start, end) {
      const events = Array.isArray(get("calendar")) ? get("calendar") : [];
      const profile = this.getProfile();
      const newEvent = {
        id: "event_" + Date.now(),
        grade: String(profile && profile.grade ? profile.grade : "10"),
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
      let events = this.getAllCalendarEvents();
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
      const profile = this.getProfile();
      const grade = profile ? String(profile.grade || "10") : "10";
      const chapters = window.StudyPilotCurriculum ? window.StudyPilotCurriculum.getScienceChapters(grade) : [];
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
      window.dispatchEvent(new CustomEvent("studypilot_data_updated"));
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
      window.dispatchEvent(new CustomEvent("studypilot_data_updated"));
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
      window.dispatchEvent(new CustomEvent("studypilot_data_updated"));
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
