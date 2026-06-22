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

  function getScienceChapters() {
    return SCIENCE_CHAPTERS.map(chapter => ({ ...chapter }));
  }

  function getChapterByKey(key) {
    return SCIENCE_CHAPTERS.find(chapter => chapter.key === key || chapter.id === key) || null;
  }

  function getChapterByQuery(query) {
    const lower = normalize(query);
    if (!lower) return null;
    return SCIENCE_CHAPTERS.find(chapter =>
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
        <p class="text-muted text-xs">CBSE Grade 10 Science - Official NCERT source</p>
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

  function getSubjects() {
    return ["Science", "Mathematics", "Social Science", "English", "Tamil", "Computer Science"];
  }

  function getQuizChapters(subject) {
    if (normalize(subject) !== "science") return [];
    return SCIENCE_CHAPTERS.map(chapter => ({
      key: chapter.key,
      label: `Ch ${chapter.num}: ${chapter.title}`,
      officialUrl: chapter.textbookUrl,
      textbookPage: chapter.textbookPage,
    }));
  }

  function getQuizBank() {
    return JSON.parse(JSON.stringify(QUIZ_BANK));
  }

  function findKnowledge(query) {
    const chapter = getChapterByQuery(query);
    if (chapter) {
      return buildKnowledgeHtml(chapter);
    }

    if (/grade\s*10|class\s*x|cbse|ncert/.test(normalize(query))) {
      return `
        <div class="official-knowledge-card">
          <p>Official Grade 10 Science is connected to the NCERT textbook only for these three chapters right now:</p>
          <ul class="chapter-highlights">
            ${SCIENCE_CHAPTERS.map(chapter => `<li>Ch ${chapter.num}: ${escapeHTML(chapter.title)}</li>`).join("")}
          </ul>
          <p>Choose a chapter to open the official PDF in a new tab.</p>
        </div>
      `;
    }

    return null;
  }

  function getSubjectSummary(subject) {
    if (normalize(subject) !== "science") {
      return [];
    }
    return getScienceChapters();
  }

  const catalog = {
    board: "CBSE",
    grade: 10,
    subject: "Science",
    textbookPage: "https://ncert.nic.in/textbook.php?jesc1=1-16",
    getBoards: () => ["CBSE"],
    getGrades: () => [10],
    getSubjects,
    getChapters: (subject) => getSubjectSummary(subject),
    getScienceChapters,
    getChapterByKey,
    getQuizChapters,
    getQuizBank,
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
  window.CBSE7Syllabus = catalog;
})();
