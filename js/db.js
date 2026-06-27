/* ======================================================== */
/* StudyPilot Local Storage Database Engine & Defaults       */
/* ======================================================== */

(function () {
  const DB_PREFIX = "studypilot_";

  // CBSE 7th Grade Full Chapters & Sections table of contents hierarchy
  const CBSE_CURRICULUM = {
    "7": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      chapters: {
        Science: [
          { 
            id: "s_ch1", num: 1, title: "The Ever-Evolving World of Science", desc: "Scientific methods, observations, hypothesis testing, and the history of scientific discoveries.",
            sections: [
              { id: "s_ch1_1", num: "1.1", title: "What is Science?" },
              { id: "s_ch1_2", num: "1.2", title: "Scientific Method & Investigations" },
              { id: "s_ch1_3", num: "1.3", title: "History of Discoveries & Indian Contributors" },
              { id: "s_ch1_4", num: "1.4", title: "Lab Safety Guidelines" }
            ]
          },
          { 
            id: "s_ch2", num: 2, title: "Exploring Substances: Acidic, Basic, Neutral", desc: "Indicators (litmus, turmeric), acids and bases properties, neutralization reactions.",
            sections: [
              { id: "s_ch2_1", num: "2.1", title: "Acids, Bases and Indicators" },
              { id: "s_ch2_2", num: "2.2", title: "Litmus, Turmeric, China Rose indicators" },
              { id: "s_ch2_3", num: "2.3", title: "Neutralization Reactions" },
              { id: "s_ch2_4", num: "2.4", title: "Neutralization in Daily Life" }
            ]
          },
          { 
            id: "s_ch3", num: 3, title: "Electricity: Circuits and Components", desc: "Symbols of electrical circuit elements, battery formation, heating effect, magnetic effect, fuses, electromagnets.",
            sections: [
              { id: "s_ch3_1", num: "3.1", title: "Symbols of Electric Components" },
              { id: "s_ch3_2", num: "3.2", title: "Closed and Open Electric Circuits" },
              { id: "s_ch3_3", num: "3.3", title: "Heating Effect of Electric Current" },
              { id: "s_ch3_4", num: "3.4", title: "Magnetic Effect of Electric Current" }
            ]
          },
          { 
            id: "s_ch4", num: 4, title: "The World of Metals and Non-metals", desc: "Physical properties (lustre, malleability, ductility) and chemical behaviors.",
            sections: [
              { id: "s_ch4_1", num: "4.1", title: "Physical Properties of Metals" },
              { id: "s_ch4_2", num: "4.2", title: "Chemical Properties & Reactivity Series" },
              { id: "s_ch4_3", num: "4.3", title: "Uses of Metals and Non-metals" }
            ]
          },
          { 
            id: "s_ch5", num: 5, title: "Changes Around Us: Physical and Chemical", desc: "Differentiating physical changes from chemical reactions (rusting, crystallization).",
            sections: [
              { id: "s_ch5_1", num: "5.1", title: "Physical Changes" },
              { id: "s_ch5_2", num: "5.2", title: "Chemical Changes" },
              { id: "s_ch5_3", num: "5.3", title: "Rusting of Iron & Prevention" },
              { id: "s_ch5_4", num: "5.4", title: "Crystallization" }
            ]
          },
          { 
            id: "s_ch6", num: 6, title: "Adolescence: A Stage of Growth and Change", desc: "Physical changes, hormones, emotional growth, balanced diet during teenage years.",
            sections: [
              { id: "s_ch6_1", num: "6.1", title: "Changes at Puberty" },
              { id: "s_ch6_2", num: "6.2", title: "Secondary Sexual Characteristics & Hormones" },
              { id: "s_ch6_3", num: "6.3", title: "Reproductive Health and Nutrition" }
            ]
          },
          { 
            id: "s_ch7", num: 7, title: "Heat Transfer in Nature", desc: "Conduction, convection, radiation, land and sea breezes.",
            sections: [
              { id: "s_ch7_1", num: "7.1", title: "Heat and Temperature" },
              { id: "s_ch7_2", num: "7.2", title: "Conduction, Convection, and Radiation" },
              { id: "s_ch7_3", num: "7.3", title: "Land Breeze and Sea Breeze" }
            ]
          },
          { 
            id: "s_ch8", num: 8, title: "Measurement of Time and Motion", desc: "Simple pendulum, speed calculations, uniform and non-uniform motion graphs.",
            sections: [
              { id: "s_ch8_1", num: "8.1", title: "Measurement of Time" },
              { id: "s_ch8_2", num: "8.2", title: "Speed and its Calculation" },
              { id: "s_ch8_3", num: "8.3", title: "Uniform and Non-Uniform Motion" },
              { id: "s_ch8_4", num: "8.4", title: "Distance-Time Graphs" }
            ]
          },
          { 
            id: "s_ch9", num: 9, title: "Life Processes in Animals", desc: "Digestion, blood circulation, excretion, and breathing in animal species.",
            sections: [
              { id: "s_ch9_1", num: "9.1", title: "Respiration in Animals" },
              { id: "s_ch9_2", num: "9.2", title: "Circulatory System in Humans" },
              { id: "s_ch9_3", num: "9.3", title: "Excretory System in Humans" }
            ]
          },
          { 
            id: "s_ch10", num: 10, title: "Life Processes in Plants", desc: "Photosynthesis, transport of water and nutrients (Xylem/Phloem), transpiration.",
            sections: [
              { id: "s_ch10_1", num: "10.1", title: "Photosynthesis & Respiration" },
              { id: "s_ch10_2", num: "10.2", title: "Transportation of Water and Minerals" },
              { id: "s_ch10_3", num: "10.3", title: "Transpiration" }
            ]
          },
          { 
            id: "s_ch11", num: 11, title: "Light: Shadows and Reflections", desc: "Rectilinear propagation of light, concave and convex mirrors/lenses.",
            sections: [
              { id: "s_ch11_1", num: "11.1", title: "Rectilinear Propagation of Light" },
              { id: "s_ch11_2", num: "11.2", title: "Spherical Mirrors (Concave/Convex)" },
              { id: "s_ch11_3", num: "11.3", title: "Spherical Lenses" }
            ]
          },
          { 
            id: "s_ch12", num: 12, title: "Earth, Moon, and the Sun", desc: "Phases of the Moon, solar and lunar eclipses, tides, rotation and revolution.",
            sections: [
              { id: "s_ch12_1", num: "12.1", title: "The Solar System & Gravity" },
              { id: "s_ch12_2", num: "12.2", title: "Eclipses (Solar and Lunar)" },
              { id: "s_ch12_3", num: "12.3", title: "Phases of the Moon" }
            ]
          }
        ],
        Mathematics: [
          { 
            id: "m_ch1", num: 1, title: "Large Numbers Around Us", desc: "Place values, estimation, working with very large numbers in daily life.",
            sections: [
              { id: "m_ch1_1", num: "1.1", title: "Indian & International Place Value" },
              { id: "m_ch1_2", num: "1.2", title: "Estimation & Rounding Off" },
              { id: "m_ch1_3", num: "1.3", title: "Large Numbers in Daily Life Problems" }
            ]
          },
          { 
            id: "m_ch2", num: 2, title: "Arithmetic Expressions", desc: "Simplifying order of operations, brackets, BODMAS / PEMDAS rules.",
            sections: [
              { id: "m_ch2_1", num: "2.1", title: "Use of Brackets" },
              { id: "m_ch2_2", num: "2.2", title: "BODMAS Rule & Order of Operations" }
            ]
          },
          { 
            id: "m_ch3", num: 3, title: "A Peek Beyond the Point", desc: "Understanding decimal numbers, fractions, representing decimals on a number line.",
            sections: [
              { id: "m_ch3_1", num: "3.1", title: "Decimals & Tenths/Hundredths" },
              { id: "m_ch3_2", num: "3.2", title: "Decimals on the Number Line" },
              { id: "m_ch3_3", num: "3.3", title: "Decimals Operations" }
            ]
          },
          { 
            id: "m_ch4", num: 4, title: "Expressions using Letter-Numbers", desc: "Introduction to algebraic terms, variables, coefficients, and simple linear expressions.",
            sections: [
              { id: "m_ch4_1", num: "4.1", title: "Concept of Variables" },
              { id: "m_ch4_2", num: "4.2", title: "Algebraic Terms & Coefficients" },
              { id: "m_ch4_3", num: "4.3", title: "Like and Unlike Terms" }
            ]
          },
          { 
            id: "m_ch5", num: 5, title: "Parallel and Intersecting Lines", desc: "Identifying angles: alternate, interior, corresponding angles formed by transversals.",
            sections: [
              { id: "m_ch5_1", num: "5.1", title: "Intersecting Lines & Transversals" },
              { id: "m_ch5_2", num: "5.2", title: "Corresponding and Alternate Angles" },
              { id: "m_ch5_3", num: "5.3", title: "Co-interior Angles" }
            ]
          },
          { 
            id: "m_ch6", num: 6, title: "Number Play", desc: "Factors, multiples, prime factorization, and common divisible rules.",
            sections: [
              { id: "m_ch6_1", num: "6.1", title: "Factors and Multiples" },
              { id: "m_ch6_2", num: "6.2", title: "HCF and LCM Methods" },
              { id: "m_ch6_3", num: "6.3", title: "Divisibility Tests" }
            ]
          },
          { 
            id: "m_ch7", num: 7, title: "A Tale of Three Intersecting Lines", desc: "Properties of triangles, angle sum property, exterior angle theorem.",
            sections: [
              { id: "m_ch7_1", num: "7.1", title: "Properties of Triangles" },
              { id: "m_ch7_2", num: "7.2", title: "Angle Sum Property of a Triangle" },
              { id: "m_ch7_3", num: "7.3", title: "Exterior Angle Theorem" }
            ]
          },
          { 
            id: "m_ch8", num: 8, title: "Working with Fractions", desc: "Addition, subtraction, multiplication, and division of fractional values.",
            sections: [
              { id: "m_ch8_1", num: "8.1", title: "Proper, Improper, and Mixed Fractions" },
              { id: "m_ch8_2", num: "8.2", title: "Multiplication and Division of Fractions" },
              { id: "m_ch8_3", num: "8.3", title: "Fraction Word Problems" }
            ]
          },
          { 
            id: "m_ch9", num: 9, title: "Geometric Twins", desc: "Concept of Congruence: congruent shapes, lines, angles, triangles (SSS, SAS, ASA, RHS).",
            sections: [
              { id: "m_ch9_1", num: "9.1", title: "Concept of Congruence" },
              { id: "m_ch9_2", num: "9.2", title: "Criteria for Triangle Congruence" }
            ]
          },
          { 
            id: "m_ch10", num: 10, title: "Operations with Integers", desc: "Addition, subtraction, multiplication, and division of positive and negative integers.",
            sections: [
              { id: "m_ch10_1", num: "10.1", title: "Addition and Subtraction of Integers" },
              { id: "m_ch10_2", num: "10.2", title: "Multiplication and Division of Integers" },
              { id: "m_ch10_3", num: "10.3", title: "Properties of Integer Operations" }
            ]
          },
          { 
            id: "m_ch11", num: 11, title: "Finding Common Ground", desc: "Data handling: arithmetic mean, median, mode, and bar graphs.",
            sections: [
              { id: "m_ch11_1", num: "11.1", title: "Collection and Organisation of Data" },
              { id: "m_ch11_2", num: "11.2", title: "Mean, Median, and Mode" },
              { id: "m_ch11_3", num: "11.3", title: "Bar Graphs and Double Bar Graphs" }
            ]
          },
          { 
            id: "m_ch12", num: 12, title: "Another Peek Beyond the Point", desc: "Advanced fractions, ratios, rates, and unit conversions.",
            sections: [
              { id: "m_ch12_1", num: "12.1", title: "Advanced Decimals & Percentages" },
              { id: "m_ch12_2", num: "12.2", title: "Ratios and Rates" },
              { id: "m_ch12_3", num: "12.3", title: "Unitary Method" }
            ]
          },
          { 
            id: "m_ch13", num: 13, title: "Connecting the Dots...", desc: "Probability concepts, listing outcomes, experimental vs theoretical probability.",
            sections: [
              { id: "m_ch13_1", num: "13.1", title: "Chance and Probability" },
              { id: "m_ch13_2", num: "13.2", title: "Listing Outcomes and Sample Space" }
            ]
          },
          { 
            id: "m_ch14", num: 14, title: "Constructions and Tilings", desc: "Constructing perpendiculars, bisectors, and pattern tiling shapes.",
            sections: [
              { id: "m_ch14_1", num: "14.1", title: "Construction of Parallel Lines" },
              { id: "m_ch14_2", num: "14.2", title: "Construction of Triangles" },
              { id: "m_ch14_3", num: "14.3", title: "Symmetry & Tilings" }
            ]
          },
          { 
            id: "m_ch15", num: 15, title: "Finding the Unknown", desc: "Simple linear equations: forming and solving single-variable equations.",
            sections: [
              { id: "m_ch15_1", num: "15.1", title: "Forming Simple Linear Equations" },
              { id: "m_ch15_2", num: "15.2", title: "Solving Linear Equations (Transpose)" },
              { id: "m_ch15_3", num: "15.3", title: "Word Problems in Single Variable" }
            ]
          }
        ]
      }
    }
  };

  const DEFAULTS = {
    profile: {
      name: "",
      grade: "7",
      stream: "Science", 
      board: "CBSE",
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      dailyHours: 2,
      goal: "Improve overall grades",
      streak: 0,
      lastActive: "",
      setupComplete: false,
      careerUnlocked: false,
      geminiApiKey: "",
      backendStudentId: null
    },
    
    tasks: [],

    exams: [],
    
    calendar: [],
    
    notes: [],
    
    flashcards: [],

    notifications: [],

    // Stores section-level granular progress tracking states (Not Started, Initial Pass, Studied, Revised, Fully Ready)
    chapter_progress: {}
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
    // Expose curriculum database
    getCurriculum: function (grade, stream) {
      return CBSE_CURRICULUM["7"]; // Locked to 7th Grade full hierarchy for syllabus tracking
    },

    init: function () {
      for (let key in DEFAULTS) {
        if (!localStorage.getItem(DB_PREFIX + key)) {
          set(key, DEFAULTS[key]);
        }
      }
      const profile = this.getProfile();
      if (!profile.setupComplete && !String(profile.name || "").trim()) {
        set("tasks", []);
        set("exams", []);
        set("calendar", []);
        set("notes", []);
        set("flashcards", []);
        set("notifications", []);
        set("chapter_progress", {});
      }
      this.checkStreak();
    },

    clearAll: function () {
      for (let key in DEFAULTS) {
        localStorage.removeItem(DB_PREFIX + key);
      }
      this.init();
    },

    // Profile API
    getProfile: function () {
      return get("profile");
    },
    saveProfile: function (profileData) {
      const normalizedProfile = normalizeProfile(profileData);
      set("profile", normalizedProfile);
      void syncProfileToBackend(normalizedProfile);
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
        date: "2026-06-22"
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
      notes.unshift(newNote);
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
      window.dispatchEvent(new CustomEvent("studypilot_notification"));
    },

    // Lesson Progress Tracking (Section-level granular tracking)
    getLessonProgress: function () {
      return get("chapter_progress") || {};
    },
    
    saveLessonProgress: function (progress) {
      set("chapter_progress", progress);
    },
    
    updateSectionStatus: function (sectionId, status) {
      const progress = this.getLessonProgress();
      progress[sectionId] = status;
      this.saveLessonProgress(progress);
      
      this.addNotification(`Syllabus Update: Status of section set to "${status}".`, "info");
      window.dispatchEvent(new CustomEvent("studypilot_lesson_update"));
    },

    // Streak & Date
    checkStreak: function () {
      const profile = this.getProfile();
      if (!profile.setupComplete) return;
      const todayStr = "2026-06-22";
      if (profile.lastActive && profile.lastActive !== todayStr) {
        if (profile.lastActive !== "2026-06-21") {
          profile.streak = 1;
        }
        profile.lastActive = todayStr;
        this.saveProfile(profile);
      }
    }
  };

  window.StudyPilotDB.init();
})();
