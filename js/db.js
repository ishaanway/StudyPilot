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
      { id: "t1",  title: "Read Curiosity Ch 3 — Electricity summary",                        subject: "Science",          duration: 30, completed: false, date: "2026-06-22" },
      { id: "t2",  title: "Solve Arithmetic Expressions — Ganita Prakash Ch 2 (BODMAS)",     subject: "Mathematics",      duration: 45, completed: true,  date: "2026-06-22" },
      { id: "t3",  title: "Revise Parallel Lines & Transversal Angles — Ganita Prakash Ch 5", subject: "Mathematics",      duration: 30, completed: false, date: "2026-06-22" },
      { id: "t4",  title: "Read Poorvi Ch 1 — Three Questions (Leo Tolstoy)",                subject: "English",          duration: 25, completed: false, date: "2026-06-22" },
      { id: "t5",  title: "Social Science — Delhi Sultans notes (Exploring Society H-3)",    subject: "Social Science",   duration: 40, completed: false, date: "2026-06-22" },
      { id: "t6",  title: "Tamil — திருக்குறள் அன்பு அதிகாரம் பாடல் மனப்பாடம்",           subject: "Tamil",            duration: 20, completed: false, date: "2026-06-23" },
      { id: "t7",  title: "Computer Science — Excel formulas practice (Ch 5)",               subject: "Computer Science", duration: 30, completed: false, date: "2026-06-23" },
      { id: "t8",  title: "Science — Acids & Bases lab questions (Curiosity Ch 2)",          subject: "Science",          duration: 35, completed: false, date: "2026-06-23" }
    ],

    exams: [
      { id: "e1", subject: "Science",        topic: "Periodic Test: Curiosity Ch 1-3 (Science, Acids, Electricity)", date: "2026-06-25" },
      { id: "e2", subject: "Mathematics",    topic: "Class Test: Ganita Prakash Ch 1-2 (Large Numbers, BODMAS)",      date: "2026-06-29" },
      { id: "e3", subject: "Social Science", topic: "Unit Test: Exploring Society History Strand H-3 & H-4",          date: "2026-07-03" },
      { id: "e4", subject: "Tamil",          topic: "Term I Tamil — இலக்கணம் & திருக்குறள் Exam",                   date: "2026-07-10" }
    ],

    calendar: [
      { id: "c1",  title: "Maths: Ganita Prakash",                             day: "Monday",    type: "class", start: "09:00", end: "10:00" },
      { id: "c2",  title: "Science: Curiosity",                                 day: "Monday",    type: "class", start: "11:00", end: "12:00" },
      { id: "c3",  title: "AI Study Block: Electricity & Circuits",             day: "Monday",    type: "study", start: "18:00", end: "19:00" },
      { id: "c4",  title: "English: Poorvi",                                     day: "Tuesday",   type: "class", start: "09:00", end: "10:00" },
      { id: "c5",  title: "Tamil Language Class",                                day: "Tuesday",   type: "class", start: "10:00", end: "11:00" },
      { id: "c6",  title: "AI Study Block: BODMAS Arithmetic Expressions",      day: "Wednesday", type: "study", start: "17:00", end: "18:30" },
      { id: "c7",  title: "Social Science: Exploring Society",                   day: "Wednesday", type: "class", start: "11:00", end: "12:00" },
      { id: "c8",  title: "AI Study Block: Delhi Sultans Revision",              day: "Thursday",  type: "study", start: "16:00", end: "17:00" },
      { id: "c9",  title: "Computer Science Class",                              day: "Thursday",  type: "class", start: "14:00", end: "15:00" },
      { id: "c10", title: "AI Study Block: Maths Exam Revision",                day: "Friday",    type: "study", start: "15:00", end: "16:30" },
      { id: "c11", title: "AI Study Block: Tamil — திருக்குறள் மீட்டல்",       day: "Friday",    type: "study", start: "17:00", end: "18:00" }
    ],

    notes: [
      {
        id: "n1",
        title: "Science: Curiosity Ch 3 — Electricity Circuits",
        body: "Key Points (CBSE 2026-27):\n1. Battery = 2+ cells connected +ve to -ve.\n2. Heating Effect: fuse wire melts on overload → breaks circuit safely.\n3. Magnetic Effect: Oersted (1820) found current near wire deflects compass.\n4. Electromagnet: coil + iron core + current = temporary magnet.",
        color: "blue",
        updatedAt: "2026-06-22 10:15"
      },
      {
        id: "n2",
        title: "Maths: Ganita Prakash Ch 7 — Simple Equations",
        body: "Solving Linear Equations (Transposition Method):\n- Move terms across = sign (change sign: +→-, ×→÷)\n- Example: 2x + 5 = 13 → 2x = 8 → x = 4\n- Always verify: substitute x back in original equation.",
        color: "yellow",
        updatedAt: "2026-06-21 15:40"
      },
      {
        id: "n3",
        title: "Social Science: Exploring Society — Mughal Empire (H-4)",
        body: "Mughal Emperors: Babur (1526, First Battle of Panipat) → Humayun → Akbar (Mansabdari, Din-i-Ilahi) → Jahangir → Shah Jahan (Taj Mahal 1632-53) → Aurangzeb (Jizya reimposed).\nMansabdari System: hierarchical rank for nobles (mansabdars) — pay + troops based on rank.",
        color: "purple",
        updatedAt: "2026-06-22 09:00"
      },
      {
        id: "n4",
        title: "Tamil — திருக்குறள் முக்கிய குறள்கள்",
        body: "ஆசிரியர்: திருவள்ளுவர் | 133 அதிகாரங்கள் | 1330 குறள்கள்\n\nமுக்கிய குறள்கள்:\n• அன்பிற்கும் உண்டோ அடைக்கும் தாழ்? (அன்பு)\n• கற்றதனால் ஆய பயன் என்கொல்? (கல்வி)\n• இன்சொலால் ஈரம் அளைஇப் படிறுஇலவாம் (இன்சொல்)",
        color: "green",
        updatedAt: "2026-06-22 11:00"
      }
    ],

    flashcards: [
      { id: "f_s1",  subject: "Science",          question: "What does blue litmus turn to in an acid?",           answer: "Red. Acids turn blue litmus red; bases turn red litmus blue.",                                    ease: 0, nextReview: "" },
      { id: "f_s2",  subject: "Science",          question: "What is an electromagnet?",                           answer: "A temporary magnet made by passing current through a coil wound around an iron core.",            ease: 0, nextReview: "" },
      { id: "f_s3",  subject: "Science",          question: "Difference between physical and chemical change?",    answer: "Physical: no new substance, often reversible. Chemical: new substance formed, usually irreversible.",ease: 0, nextReview: "" },
      { id: "f_s4",  subject: "Science",          question: "What is the Law of Reflection?",                     answer: "Angle of incidence = Angle of reflection (both measured from the normal).",                         ease: 0, nextReview: "" },
      { id: "f_s5",  subject: "Science",          question: "Write the photosynthesis word equation.",             answer: "CO₂ + H₂O + Sunlight (Chlorophyll) → Glucose + O₂.",                                             ease: 0, nextReview: "" },
      { id: "f_m1",  subject: "Mathematics",      question: "What does BODMAS stand for?",                        answer: "Brackets, Of, Division, Multiplication, Addition, Subtraction — the order of operations.",          ease: 0, nextReview: "" },
      { id: "f_m2",  subject: "Mathematics",      question: "Solve: 2x + 5 = 13",                                 answer: "x = 4. Transpose 5: 2x = 8. Divide by 2: x = 4.",                                                 ease: 0, nextReview: "" },
      { id: "f_m3",  subject: "Mathematics",      question: "State the Angle Sum Property of triangles.",         answer: "The sum of all interior angles in any triangle is always 180°.",                                    ease: 0, nextReview: "" },
      { id: "f_m4",  subject: "Mathematics",      question: "State the Pythagoras theorem.",                      answer: "Hypotenuse² = Base² + Perpendicular². (e.g., 3²+4²=5²)",                                          ease: 0, nextReview: "" },
      { id: "f_h1",  subject: "Social Science",   question: "Who was the first Sultan of Delhi?",                 answer: "Qutb-ud-din Aibak (1206) — founded the Slave Dynasty.",                                            ease: 0, nextReview: "" },
      { id: "f_h2",  subject: "Social Science",   question: "Who built the Taj Mahal and why?",                   answer: "Shah Jahan built it (1632-53) as a mausoleum for his wife Mumtaz Mahal.",                           ease: 0, nextReview: "" },
      { id: "f_g1",  subject: "Social Science",   question: "Earth's three main layers?",                         answer: "Crust (outermost), Mantle (thickest), Core (innermost).",                                          ease: 0, nextReview: "" },
      { id: "f_c1",  subject: "Social Science",   question: "What is Universal Adult Franchise?",                 answer: "All citizens aged 18+ can vote regardless of caste, religion, or gender.",                          ease: 0, nextReview: "" },
      { id: "f_e1",  subject: "English",           question: "What are Tolstoy's Three Questions?",               answer: "(1) Who is the most important person? (2) What is the right time? (3) What is the right action?",  ease: 0, nextReview: "" },
      { id: "f_e2",  subject: "English",           question: "What is the moral of 'Quality' (Galsworthy)?",      answer: "True craftsmanship and dedication are admirable even if they lead to financial ruin.",               ease: 0, nextReview: "" },
      { id: "f_ta1", subject: "Tamil",             question: "திருக்குறளின் ஆசிரியர் யார்?",                   answer: "திருவள்ளுவர் — 133 அதிகாரங்கள், 1330 குறள்கள், 3 பால்கள்.",                                    ease: 0, nextReview: "" },
      { id: "f_ta2", subject: "Tamil",             question: "சிலப்பதிகாரம் யார் எழுதியது?",                   answer: "இளங்கோவடிகள் — கண்ணகி கதாநாயகி. ஐம்பெருங்காப்பியங்களில் ஒன்று.",                             ease: 0, nextReview: "" },
      { id: "f_cs1", subject: "Computer Science", question: "What does HTTP stand for?",                          answer: "HyperText Transfer Protocol — the foundation protocol for the World Wide Web.",                       ease: 0, nextReview: "" },
      { id: "f_cs2", subject: "Computer Science", question: "Excel formula for average of A1:A10?",               answer: "=AVERAGE(A1:A10)",                                                                               ease: 0, nextReview: "" }
    ],

    notifications: [
      { id: "no1", message: "📅 Science Periodic Test on 25 June — Curiosity Ch 1-3 (Electricity, Acids, Science Methods).", read: false, type: "exam" },
      { id: "no2", message: "🤖 AI Coach: Study session for BODMAS & Simple Equations scheduled for Wednesday 5 PM.",          read: false, type: "info" },
      { id: "no3", message: "📅 Social Science Unit Test on 3 July — Delhi Sultans & Mughal Empire.",                         read: false, type: "exam" },
      { id: "no4", message: "🌺 Tamil Term I Exam on 10 July — திருக்குறள் & இலக்கணம் (Grammar) chapters.",                 read: false, type: "exam" }
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
      if (profile && String(profile.board || "").toUpperCase() === "CBSE" && String(profile.grade || "") === "7") {
        profile.grade = "10";
        this.saveProfile(profile);
      }

      const replaceText = (value) => String(value || "")
        .replace(/Curiosity Ch 1-3 \(Electricity, Acids, Science Methods\)/g, "Grade 10 Science Ch 2, 9, 11")
        .replace(/Curiosity Ch 3 — Electricity summary/g, "Grade 10 Science Ch 11 — Electricity")
        .replace(/Curiosity Ch 2/g, "Grade 10 Science Ch 2")
        .replace(/Curiosity Ch 1-3/g, "Grade 10 Science Ch 2, 9, 11")
        .replace(/Curiosity/g, "Grade 10 Science")
        .replace(/Ganita Prakash Ch 1-2 \(Large Numbers, BODMAS\)/g, "BODMAS practice")
        .replace(/Ganita Prakash Ch 7 — Simple Equations/g, "BODMAS practice")
        .replace(/Ganita Prakash/g, "Grade 10 Science")
        .replace(/Poorvi/g, "official Grade 10 Science")
        .replace(/Exploring Society/g, "Grade 10 Science");

      const tasks = this.getTasks().map(task => ({
        ...task,
        title: replaceText(task.title),
      }));
      this.saveTasks(tasks);

      const exams = this.getExams().map(exam => ({
        ...exam,
        topic: replaceText(exam.topic),
      }));
      this.saveExams(exams);

      const calendar = this.getCalendarEvents().map(event => ({
        ...event,
        title: replaceText(event.title),
      }));
      this.saveCalendarEvents(calendar);

      const notes = this.getNotes().map(note => ({
        ...note,
        title: replaceText(note.title),
        body: replaceText(note.body),
      }));
      this.saveNotes(notes);
    },

    // Profile API
    getProfile: function () {
      return get("profile");
    },
    saveProfile: function (profileData) {
      set("profile", profileData);
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
    getNotes: function () {
      return get("notes");
    },
    saveNotes: function (notes) {
      set("notes", notes);
    },
    addNote: function (title, body, color) {
      const notes = this.getNotes();
      const newNote = {
        id: "note_" + Date.now(),
        title: title || "Untitled Note",
        body: body || "",
        color: color || "default",
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      notes.unshift(newNote); // Put at front
      this.saveNotes(notes);
      return newNote;
    },
    deleteNote: function (id) {
      let notes = this.getNotes();
      notes = notes.filter(n => n.id !== id);
      this.saveNotes(notes);
    },

    // Flashcards API
    getFlashcards: function () {
      return get("flashcards");
    },
    saveFlashcards: function (cards) {
      set("flashcards", cards);
    },
    addFlashcard: function (subject, question, answer) {
      const cards = this.getFlashcards();
      const newCard = {
        id: "fc_" + Date.now(),
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
