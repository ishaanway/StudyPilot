/* ======================================================== */
/* StudyPilot Official Curriculum Catalog                   */
/* CBSE Grade 10 | Official NCERT textbook links only       */
/* ======================================================== */

(function () {
  const SCIENCE_CHAPTERS = [
    {
      id: "cbse10_science_ch2",
      num: 2,
      key: "ch2",
      title: "Acids, Bases and Salts",
      textbookUrl: "https://ncert.nic.in/textbook/pdf/jesc102.pdf",
      textbookPage: "https://ncert.nic.in/textbook.php?jesc1=2-13",
      summary: "Study acids, bases, indicators, pH, neutralisation, and everyday applications from the official NCERT chapter.",
      highlights: [
        "Acids, bases, and indicators",
        "pH scale and neutral substances",
        "Neutralisation and daily-life uses",
      ],
      keywords: ["acid", "base", "salt", "indicator", "ph", "neutralisation", "neutralization", "baking soda", "vinegar", "litmus"],
    },
    {
      id: "cbse10_science_ch9",
      num: 9,
      key: "ch9",
      title: "Light - Reflection and Refraction",
      textbookUrl: "https://ncert.nic.in/textbook/pdf/jesc109.pdf",
      textbookPage: "https://ncert.nic.in/textbook.php?jesc1=9-13",
      summary: "Focus on reflection, refraction, mirrors, lenses, dispersion, and atmospheric refraction with the official NCERT text.",
      highlights: [
        "Laws of reflection",
        "Refraction through lenses and slabs",
        "Dispersion, twinkling, and rainbow formation",
      ],
      keywords: ["light", "reflection", "refraction", "mirror", "lens", "dispersion", "rainbow", "twinkling", "atmospheric refraction"],
    },
    {
      id: "cbse10_science_ch11",
      num: 11,
      key: "ch11",
      title: "Electricity",
      textbookUrl: "https://ncert.nic.in/textbook/pdf/jesc111.pdf",
      textbookPage: "https://ncert.nic.in/textbook.php?jesc1=11-13",
      summary: "Cover electric current, circuits, potential difference, Ohm's law, resistance, and heating effect from the NCERT chapter.",
      highlights: [
        "Current, circuit, and potential difference",
        "Ohm's law and resistance",
        "Heating effect and circuit safety",
      ],
      keywords: ["electricity", "current", "circuit", "ohm", "resistance", "potential difference", "ammeter", "voltmeter", "fuse", "heating effect"],
    },
  ];

  const QUIZ_BANK = {
    Science: {
      ch2: [
        { q: "What does blue litmus turn into in an acid?", options: ["Red", "Green", "Blue", "Yellow"], answer: 0, explain: "Acids turn blue litmus red." },
        { q: "What is the pH of a neutral solution?", options: ["0", "7", "10", "14"], answer: 1, explain: "Neutral substances have a pH of 7." },
        { q: "What is formed when an acid reacts with a base?", options: ["Salt and water", "Only heat", "Only gas", "Only acid"], answer: 0, explain: "Neutralisation usually produces salt and water." },
        { q: "Which of these is a base?", options: ["Vinegar", "Lemon juice", "Baking soda", "Orange juice"], answer: 2, explain: "Baking soda is basic." },
        { q: "Which acid is commonly present in vinegar?", options: ["Sulphuric acid", "Acetic acid", "Hydrochloric acid", "Nitric acid"], answer: 1, explain: "Vinegar contains acetic acid." },
      ],
      ch9: [
        { q: "A convex lens usually does what to parallel rays?", options: ["Diverges them", "Reflects them", "Converges them", "Stops them"], answer: 2, explain: "A convex lens converges parallel rays to a focus." },
        { q: "What is true about the angle of incidence and angle of reflection?", options: ["They are equal", "Incidence is always larger", "Reflection is always zero", "They are unrelated"], answer: 0, explain: "The law of reflection says both angles are equal." },
        { q: "The image in a plane mirror is usually:", options: ["Real and inverted", "Virtual and erect", "Real and erect", "Virtual and inverted"], answer: 1, explain: "Plane mirrors form virtual, erect images." },
        { q: "Why do stars twinkle?", options: ["Ocean waves", "Atmospheric refraction", "Magnetic fields", "Sound waves"], answer: 1, explain: "Starlight passes through changing layers of air." },
        { q: "A rainbow is formed because of:", options: ["Dispersion of sunlight", "Sound reflection", "Friction", "Evaporation only"], answer: 0, explain: "Water droplets disperse sunlight into colours." },
      ],
      ch11: [
        { q: "What is the SI unit of electric current?", options: ["Volt", "Ohm", "Ampere", "Watt"], answer: 2, explain: "Current is measured in ampere (A)." },
        { q: "Which device measures current?", options: ["Voltmeter", "Ammeter", "Thermometer", "Barometer"], answer: 1, explain: "An ammeter is connected in series to measure current." },
        { q: "Ohm's law is written as:", options: ["V = IR", "I = VR", "R = VI", "P = VI"], answer: 0, explain: "Voltage is current multiplied by resistance." },
        { q: "What happens to a fuse when current is too high?", options: ["It becomes brighter", "It melts and breaks the circuit", "It increases current", "Nothing"], answer: 1, explain: "A fuse protects the circuit by melting on overload." },
        { q: "Which effect of current is used in an electric heater?", options: ["Magnetic effect", "Heating effect", "Chemical effect", "Gravitational effect"], answer: 1, explain: "A heater works due to the heating effect of current." },
      ],
    },
  };

  const OFFICIAL_SOURCE_URLS = {
    Science: "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Science_Sec_2025-26.pdf",
    Mathematics: "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Maths_Sec_2025-26.pdf",
    "Social Science": "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Social_Science_Sec_2025-26.pdf",
    English: "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/English_LL_2025-26.pdf",
    "Computer Science": "https://cbseacademic.nic.in/web_material/CurriculumMain26/Sec/Computer_Applications_Sec_2025-26.pdf",
  };

  const SCIENCE_CHAPTERS_BY_GRADE = {
    9: [
      {
        id: "cbse9_science_ch1",
        num: 1,
        key: "g9_ch1",
        grade: 9,
        title: "Matter in Our Surroundings",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Study states of matter, diffusion, evaporation, and changes of state from the official CBSE science syllabus.",
        highlights: ["States of matter", "Diffusion and evaporation", "Change of state"],
        keywords: ["matter", "surroundings", "evaporation", "diffusion", "solid", "liquid", "gas"],
      },
      {
        id: "cbse9_science_ch2",
        num: 2,
        key: "g9_ch2",
        grade: 9,
        title: "Is Matter Around Us Pure",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Revision on mixtures, solutions, suspensions, and separation methods from the CBSE science syllabus.",
        highlights: ["Mixtures and solutions", "Suspensions and colloids", "Separation techniques"],
        keywords: ["pure", "mixture", "solution", "suspension", "colloid", "separation"],
      },
      {
        id: "cbse9_science_ch3",
        num: 3,
        key: "g9_ch3",
        grade: 9,
        title: "Atoms and Molecules",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Revise laws of chemical combination, atomic mass, molecular mass, and formula writing.",
        highlights: ["Law of conservation of mass", "Atomic and molecular mass", "Chemical formulae"],
        keywords: ["atom", "molecule", "formula", "mass", "conservation", "chemical combination"],
      },
      {
        id: "cbse9_science_ch5",
        num: 5,
        key: "g9_ch5",
        grade: 9,
        title: "The Fundamental Unit of Life",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Learn about cell structure, organelles, and the cell as the basic unit of life.",
        highlights: ["Cell membrane and nucleus", "Plant and animal cells", "Cell organelles"],
        keywords: ["cell", "life", "membrane", "nucleus", "organelle", "tissue"],
      },
      {
        id: "cbse9_science_ch9",
        num: 9,
        key: "g9_ch9",
        grade: 9,
        title: "Force and Laws of Motion",
        textbookUrl: OFFICIAL_SOURCE_URLS.Science,
        textbookPage: OFFICIAL_SOURCE_URLS.Science,
        summary: "Focus on force, inertia, momentum, and Newton's laws of motion.",
        highlights: ["Inertia and momentum", "Newton's laws", "Balanced and unbalanced force"],
        keywords: ["force", "motion", "newton", "momentum", "inertia", "law of motion"],
      },
    ],
    10: SCIENCE_CHAPTERS,
  };

  const QUIZ_BANK_BY_GRADE = {
    9: {
      Science: {
        g9_ch1: [
          { q: "Which state of matter has fixed shape and fixed volume?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 0, explain: "Solids keep both shape and volume." },
          { q: "What happens during evaporation?", options: ["Liquid changes to gas", "Gas changes to liquid", "Solid changes to gas only", "Nothing"], answer: 0, explain: "Evaporation is liquid to gas at the surface." },
          { q: "Which is a method of separating insoluble solids from liquids?", options: ["Filtration", "Sublimation", "Melting", "Condensation"], answer: 0, explain: "Filtration separates an insoluble solid from a liquid." },
        ],
        g9_ch3: [
          { q: "The law of conservation of mass says:", options: ["Mass can disappear", "Mass is always constant in a reaction", "Atoms are destroyed", "Molecules never form"], answer: 1, explain: "Mass is conserved in a chemical reaction." },
          { q: "Which unit is commonly used for atomic mass?", options: ["kg", "u", "m", "N"], answer: 1, explain: "Atomic mass is measured in unified atomic mass units (u)." },
          { q: "What is a molecule?", options: ["A single proton", "A group of atoms chemically bonded", "Any mixture", "A cell part"], answer: 1, explain: "Molecules are groups of atoms bonded together." },
        ],
        g9_ch9: [
          { q: "What does inertia mean?", options: ["Resistance to change in motion", "Speed of light", "Friction only", "Weight of a body"], answer: 0, explain: "Inertia is resistance to change in state of motion." },
          { q: "Momentum is equal to:", options: ["mass x velocity", "force x time only", "mass / velocity", "weight x area"], answer: 0, explain: "Momentum equals mass multiplied by velocity." },
          { q: "Newton's first law is also called the law of:", options: ["Action and reaction", "Inertia", "Gravity", "Energy"], answer: 1, explain: "Newton's first law describes inertia." },
        ],
      },
    },
    10: {
      Science: QUIZ_BANK.Science,
    },
  };

  const GRADE_FLASHCARD_SPECS = {
    9: {
      Science: [
        ["Matter in Our Surroundings", "Which state of matter has fixed shape and fixed volume?", "Solid has fixed shape and fixed volume."],
        ["Atoms and Molecules", "What does the law of conservation of mass say?", "Mass remains conserved in a chemical reaction."],
        ["The Fundamental Unit of Life", "What is the basic structural and functional unit of life?", "The cell is the basic unit of life."],
      ],
      Mathematics: [
        ["Number Systems", "How do we describe irrational numbers?", "They cannot be written as p/q where q is not zero."],
        ["Polynomials", "What is the degree of a polynomial?", "The highest power of the variable."],
        ["Coordinate Geometry", "What is the origin on the Cartesian plane?", "The origin is the point (0, 0)."],
      ],
      "Social Science": [
        ["Democratic Politics-I", "What is democracy?", "A form of government chosen by the people through elections."],
        ["History", "What ideas drove the French Revolution?", "Liberty, equality, and fraternity."],
        ["Economics", "What is the basic idea of production in Palampur?", "Farming is the main economic activity."],
      ],
      English: [
        ["Reading Skills", "What does inference mean in reading comprehension?", "Using clues to reach a logical conclusion."],
        ["Writing Skills", "What does a formal letter usually include?", "Address, date, subject, salutation, body, and closing."],
        ["Grammar", "Why do we revise subject-verb agreement?", "To match the verb with the subject correctly."],
      ],
      "Computer Science": [
        ["Basics of IT", "What is the difference between RAM and ROM?", "RAM is temporary memory; ROM is permanent memory."],
        ["Cyber Safety", "Why are strong passwords important?", "They protect accounts and personal data."],
        ["Office Tools", "What does a spreadsheet help you do?", "Store data and calculate values like sum and average."],
      ],
    },
    10: {
      Science: [
        ["Acids, Bases and Salts", "What is neutralisation?", "An acid reacts with a base to form salt and water."],
        ["Light - Reflection and Refraction", "What does a convex lens do to parallel rays?", "It converges them to a focus."],
        ["Electricity", "What is Ohm's law?", "Voltage equals current multiplied by resistance."],
      ],
      Mathematics: [
        ["Real Numbers", "What do we use the Euclid division algorithm for?", "To find the HCF of two positive integers."],
        ["Pair of Linear Equations", "What does a pair of linear equations represent?", "Two straight lines that may intersect, coincide, or be parallel."],
        ["Statistics", "What does the mean measure?", "The average value of a data set."],
      ],
      "Social Science": [
        ["History", "What idea became central in the rise of nationalism in Europe?", "The idea of a nation state."],
        ["Geography", "What is the main focus of resources and development?", "Using resources sustainably."],
        ["Political Science", "What does consumer rights protect?", "The rights of buyers against unfair trade practices."],
      ],
      English: [
        ["Reading Skills", "What is the main goal of reading comprehension?", "To understand and interpret the text accurately."],
        ["Writing Skills", "What should a formal letter keep?", "A clear format, tone, and purpose."],
        ["Literature", "Why do we study theme and message?", "To understand what the writer wants to convey."],
      ],
      "Computer Science": [
        ["Networking", "What is the World Wide Web?", "A system of linked web pages accessed through browsers."],
        ["HTML", "What does the href attribute do?", "It defines the destination of a link."],
        ["Cyber Ethics", "What is netiquette?", "Good and respectful online behaviour."],
      ],
    },
  };

  function subjectKey(value) {
    return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  }

  function buildFlashcardsForGrade(grade) {
    const gradeSpecs = GRADE_FLASHCARD_SPECS[grade] || GRADE_FLASHCARD_SPECS[10];
    const sourceBySubject = OFFICIAL_SOURCE_URLS;
    const cards = [];

    Object.keys(gradeSpecs).forEach(subject => {
      const sourceUrl = sourceBySubject[subject] || "";
      gradeSpecs[subject].forEach((entry, index) => {
        cards.push({
          id: `g${grade}_${subjectKey(subject)}_${index + 1}`,
          grade: String(grade),
          subject,
          topic: entry[0],
          question: entry[1],
          answer: entry[2],
          sourceUrl,
        });
      });
    });

    return cards;
  }

  const GRADE_FLASHCARDS = {
    9: buildFlashcardsForGrade(9),
    10: buildFlashcardsForGrade(10),
  };

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function escapeHTML(value) {
    return cleanText(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalize(value) {
    return cleanText(value).toLowerCase();
  }

  function getScienceChapters(grade = 10) {
    const chapters = SCIENCE_CHAPTERS_BY_GRADE[grade] || SCIENCE_CHAPTERS_BY_GRADE[10];
    return chapters.map(chapter => ({ ...chapter }));
  }

  function getChapterByKey(key, grade = null) {
    const chapters = grade ? getScienceChapters(grade) : [...getScienceChapters(9), ...getScienceChapters(10)];
    return chapters.find(chapter => chapter.key === key || chapter.id === key) || null;
  }

  function getChapterByQuery(query, grade = 10) {
    const lower = normalize(query);
    if (!lower) return null;
    const chapters = getScienceChapters(grade);
    return chapters.find(chapter =>
      chapter.key === lower ||
      chapter.id === lower ||
      chapter.title.toLowerCase().includes(lower) ||
      chapter.keywords.some(keyword => lower.includes(keyword))
    ) || null;
  }

  function getChapterStatus(chapterId) {
    if (!window.StudyPilotDB || typeof window.StudyPilotDB.getCurriculumProgress !== "function") {
      return "Not Started";
    }
    const progress = window.StudyPilotDB.getCurriculumProgress();
    return (progress && progress[chapterId] && progress[chapterId].status) || "Not Started";
  }

  function buildKnowledgeHtml(chapter) {
    const status = getChapterStatus(chapter.id);
    const highlights = chapter.highlights.map(item => `<li>${escapeHTML(item)}</li>`).join("");
    return `
      <div class="official-knowledge-card">
        <p class="text-muted text-xs">CBSE Grade ${escapeHTML(chapter.grade || 10)} Science - Official NCERT source</p>
        <h3>${escapeHTML(chapter.title)}</h3>
        <p>${escapeHTML(chapter.summary)}</p>
        <ul class="chapter-highlights">${highlights}</ul>
        <p><strong>Status:</strong> ${escapeHTML(status)}</p>
        <p>
          <a href="${chapter.textbookUrl}" target="_blank" rel="noopener noreferrer">Open official chapter PDF</a>
          &nbsp;|&nbsp;
          <a href="${chapter.textbookPage}" target="_blank" rel="noopener noreferrer">Open textbook page</a>
        </p>
      </div>
    `;
  }

  function getSubjects(grade = 10) {
    return getSubjectsForGrade(grade);
  }

  function getSubjectsForGrade(grade = 10) {
    const cards = GRADE_FLASHCARDS[grade] || GRADE_FLASHCARDS[10];
    return [...new Set(cards.map(card => card.subject))];
  }

  function getQuizChapters(subject, grade = 10) {
    if (normalize(subject) !== "science") return [];
    return getScienceChapters(grade).map(chapter => ({
      key: chapter.key,
      label: `Ch ${chapter.num}: ${chapter.title}`,
      officialUrl: chapter.textbookUrl,
      textbookPage: chapter.textbookPage,
    }));
  }

  function getQuizBank(grade = 10) {
    const quizBank = QUIZ_BANK_BY_GRADE[grade] || QUIZ_BANK_BY_GRADE[10];
    return JSON.parse(JSON.stringify(quizBank));
  }

  function getFlashcardsForGrade(grade = 10, subject = "") {
    const deck = GRADE_FLASHCARDS[grade] || GRADE_FLASHCARDS[10];
    const cards = Object.values(deck).flat();
    if (!subject) return JSON.parse(JSON.stringify(cards));
    return JSON.parse(JSON.stringify(cards.filter(card => card.subject === subject)));
  }

  function findKnowledge(query, grade = 10) {
    const chapter = getChapterByQuery(query, grade);
    if (chapter) {
      return buildKnowledgeHtml(chapter);
    }

    if (/grade\s*(9|10)|class\s*(ix|x)|cbse|ncert/.test(normalize(query))) {
      const chapters = getScienceChapters(grade);
      return `
        <div class="official-knowledge-card">
          <p>Official Grade ${grade} Science is connected to the NCERT textbook only for these chapters right now:</p>
          <ul class="chapter-highlights">
            ${chapters.map(chapter => `<li>Ch ${chapter.num}: ${escapeHTML(chapter.title)}</li>`).join("")}
          </ul>
          <p>Choose a chapter to open the official PDF in a new tab.</p>
        </div>
      `;
    }

    return null;
  }

  function getSubjectSummary(subject, grade = 10) {
    if (normalize(subject) !== "science") {
      return [];
    }
    return getScienceChapters(grade);
  }

  const catalog = {
    board: "CBSE",
    grade: 10,
    subject: "Science",
    textbookPage: "https://ncert.nic.in/textbook.php?jesc1=1-16",
    getBoards: () => ["CBSE"],
    getGrades: () => [9, 10],
    getSubjects,
    getSubjectsForGrade,
    getChapters: (subject) => {
      const profile = window.StudyPilotDB && typeof window.StudyPilotDB.getProfile === "function"
        ? window.StudyPilotDB.getProfile()
        : null;
      const grade = profile ? profile.grade : 10;
      return getSubjectSummary(subject, grade);
    },
    getScienceChapters,
    getChapterByKey,
    getQuizChapters,
    getQuizBank,
    getFlashcardsForGrade,
    findKnowledge,
    getOfficialTextbookUrl: (chapterKey) => {
      const chapter = getChapterByKey(chapterKey);
      return chapter ? chapter.textbookUrl : "";
    },
    getOfficialTextbookPage: (chapterKey) => {
      const chapter = getChapterByKey(chapterKey);
      return chapter ? chapter.textbookPage : "";
    },
    getChapterStatus,
  };

  window.StudyPilotCurriculum = catalog;
  window.StudyPilotSyllabus = catalog;
})();
