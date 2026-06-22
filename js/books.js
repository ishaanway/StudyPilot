/* ======================================================== */
/* StudyPilot NCERT Books Shortcut                          */
/* Official textbook portals only                           */
/* ======================================================== */

(function () {
  const BOOK_PORTALS = {
    ncert: [
      {
        title: "NCERT Textbooks (I-XII)",
        description: "Official NCERT textbook portal with class, subject, and book title selection.",
        url: "https://ncert.nic.in/textbook.php",
      },
      {
        title: "ePathshala",
        description: "NCERT digital learning portal and e-book hub.",
        url: "https://epathshala.ncert.gov.in/",
      },
      {
        title: "CBSE Books & Support Material",
        description: "Official CBSE e-books and support material collection.",
        url: "https://cbseacademic.nic.in/publication_ebooks.html",
      },
      {
        title: "CBSE Publications & SQPs",
        description: "Question papers, publications, and supportive material from CBSE.",
        url: "https://cbseacademic.nic.in/publication_sqps.html",
      },
      {
        title: "CBSE Question Bank",
        description: "Class X subject question bank from the CBSE academic site.",
        url: "https://cbseacademic.nic.in/qbclass10.html",
      },
      {
        title: "CBSE Revision Books",
        description: "Official practice and revision books for Class X.",
        url: "https://cbseacademic.nic.in/revision10.html",
      },
    ],
    tamil: [
      {
        title: "Tamil Nadu Textbooks",
        description: "Official Tamil Nadu textbook portal for Samacheer Kalvi books.",
        url: "https://www.textbooksonline.tn.gov.in/",
      },
      {
        title: "NCERT Textbooks",
        description: "Use this when you need the CBSE/NCERT version of the same topic.",
        url: "https://ncert.nic.in/textbook.php",
      },
    ],
  };

  const SUBJECT_FALLBACKS = {
    ncert: ["Science", "Mathematics", "Social Science", "English", "Tamil", "Hindi", "Computer Science"],
    tamil: ["Tamil", "English", "Mathematics", "Science", "Social Science", "Computer Science"],
  };

  window.StudyPilotBooks = {
    selectedBoard: "ncert",
    selectedGrade: "10",
    selectedSubject: "Science",
    selectedChapterKey: "",
    lastProfileSignature: "",
    profileListenerBound: false,

    init: function () {
      this.bindProfileListener();
      this.syncFromProfile(false);
      this.render();
    },

    bindProfileListener: function () {
      if (this.profileListenerBound) return;
      this.profileListenerBound = true;

      window.addEventListener("studypilot_profile_updated", () => {
        this.syncFromProfile(true);
        this.render();
      });
    },

    syncFromProfile: function (forceReset) {
      const profile = window.StudyPilotDB && typeof window.StudyPilotDB.getProfile === "function"
        ? window.StudyPilotDB.getProfile()
        : null;

      const board = this.normalizeBoard(profile && profile.board);
      const grade = String(profile && profile.grade ? profile.grade : "10");
      const subjects = this.getSubjects(board, grade);
      const profileSignature = `${board}:${grade}`;
      const profileChanged = this.lastProfileSignature !== profileSignature;

      if (forceReset || profileChanged) {
        this.selectedBoard = board;
        this.selectedGrade = grade;
      }

      if (forceReset || profileChanged || !subjects.includes(this.selectedSubject)) {
        this.selectedSubject = subjects[0] || "";
      }

      const chapters = this.getChapters(board, grade, this.selectedSubject);
      if (forceReset || profileChanged || (chapters.length && !chapters.some(ch => ch.key === this.selectedChapterKey))) {
        this.selectedChapterKey = chapters[0].key;
      } else if (!chapters.length) {
        this.selectedChapterKey = "";
      }

      this.lastProfileSignature = profileSignature;
    },

    normalizeBoard: function (boardValue) {
      const value = String(boardValue || "").toLowerCase();
      if (value.includes("state") || value.includes("tamil")) return "tamil";
      return "ncert";
    },

    getBoardLabel: function (boardKey) {
      return boardKey === "tamil" ? "Tamil Nadu" : "NCERT / CBSE";
    },

    getSubjects: function (boardKey, grade) {
      const curriculum = window.StudyPilotCurriculum;
      const profile = window.StudyPilotDB && typeof window.StudyPilotDB.getProfile === "function"
        ? window.StudyPilotDB.getProfile()
        : null;

      const curriculumSubjects = curriculum && typeof curriculum.getSubjectsForGrade === "function"
        ? curriculum.getSubjectsForGrade(grade)
        : [];
      const profileSubjects = profile && Array.isArray(profile.subjects) ? profile.subjects : [];
      const fallback = SUBJECT_FALLBACKS[boardKey] || SUBJECT_FALLBACKS.ncert;
      return this.uniqueList([...curriculumSubjects, ...profileSubjects, ...fallback]);
    },

    getChapters: function (boardKey, grade, subject) {
      const curriculum = window.StudyPilotCurriculum;
      if (!curriculum) return [];

      if (boardKey === "ncert" && String(subject || "").toLowerCase() === "science" && typeof curriculum.getScienceChapters === "function") {
        return curriculum.getScienceChapters(grade).map(chapter => ({ ...chapter }));
      }

      return [];
    },

    getSelectedChapter: function () {
      const chapters = this.getChapters(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      return chapters.find(ch => ch.key === this.selectedChapterKey) || chapters[0] || null;
    },

    uniqueList: function (items) {
      return [...new Set(items.filter(Boolean))];
    },

    setBoard: function (boardKey) {
      this.selectedBoard = boardKey;
      const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
      if (!subjects.includes(this.selectedSubject)) {
        this.selectedSubject = subjects[0] || "";
      }
      const chapters = this.getChapters(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      this.selectedChapterKey = chapters.length ? chapters[0].key : "";
      this.render();
    },

    setGrade: function (grade) {
      this.selectedGrade = String(grade);
      const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
      if (!subjects.includes(this.selectedSubject)) {
        this.selectedSubject = subjects[0] || "";
      }
      const chapters = this.getChapters(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      this.selectedChapterKey = chapters.length ? chapters[0].key : "";
      this.render();
    },

    setSubject: function (subject) {
      this.selectedSubject = subject;
      const chapters = this.getChapters(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      this.selectedChapterKey = chapters.length ? chapters[0].key : "";
      this.render();
    },

    setChapter: function (chapterKey) {
      this.selectedChapterKey = chapterKey;
      this.render();
    },

    openUrl: function (url) {
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    },

    openSelectedSource: function () {
      const chapter = this.getSelectedChapter();
      if (chapter && chapter.textbookUrl) {
        this.openUrl(chapter.textbookUrl);
        return;
      }

      this.openBoardPortal();
    },

    openSelectedPage: function () {
      const chapter = this.getSelectedChapter();
      if (chapter && chapter.textbookPage) {
        this.openUrl(chapter.textbookPage);
        return;
      }

      this.openBoardPortal();
    },

    openBoardPortal: function () {
      const resources = this.getBoardResources(this.selectedBoard);
      const primary = resources[0];
      if (primary) {
        this.openUrl(primary.url);
      }
    },

    getBoardResources: function (boardKey) {
      return BOOK_PORTALS[boardKey] || BOOK_PORTALS.ncert;
    },

    getChapterResources: function () {
      const chapter = this.getSelectedChapter();
      if (!chapter) return [];
      return [
        {
          title: `Ch ${chapter.num}: ${chapter.title}`,
          description: chapter.summary,
          primaryLabel: "Open chapter PDF",
          secondaryLabel: "Open chapter page",
          primaryUrl: chapter.textbookUrl,
          secondaryUrl: chapter.textbookPage,
        },
      ];
    },

    render: function () {
      const selectorRoot = document.getElementById("books-selector-root");
      const linkRoot = document.getElementById("books-link-root");
      const gradePill = document.getElementById("books-grade-pill");
      if (!selectorRoot || !linkRoot || !gradePill) return;

      gradePill.textContent = `Grade ${this.selectedGrade}`;

      const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
      if (!subjects.includes(this.selectedSubject)) {
        this.selectedSubject = subjects[0] || "";
      }

      const chapters = this.getChapters(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      if (chapters.length) {
        if (!chapters.some(ch => ch.key === this.selectedChapterKey)) {
          this.selectedChapterKey = chapters[0].key;
        }
      } else {
        this.selectedChapterKey = "";
      }

      const boardLabel = this.getBoardLabel(this.selectedBoard);
      const boardResources = this.getBoardResources(this.selectedBoard);
      const chapterResources = this.getChapterResources();
      const selectedChapter = this.getSelectedChapter();

      selectorRoot.innerHTML = `
        <div class="books-selector-summary">
          <div>
            <span class="books-kicker">Current selection</span>
            <h3>${escapeHTML(boardLabel)} - Grade ${escapeHTML(this.selectedGrade)} - ${escapeHTML(this.selectedSubject || "Choose a subject")}</h3>
            <p>${chapters.length
              ? `Select a chapter to open the official NCERT source for ${escapeHTML(this.selectedSubject)}.`
              : `This subject opens the official textbook portal. Chapter-level links are available where StudyPilot has the official chapter metadata.`}</p>
          </div>
          <button class="btn btn-primary btn-sm" type="button" onclick="window.StudyPilotBooks.openSelectedSource()">Open selected source</button>
        </div>

        <div class="input-group books-board-group">
          <label>Board</label>
          <div class="books-board-toggle">
            <button type="button" class="books-board-pill ${this.selectedBoard === "ncert" ? "active" : ""}" onclick="window.StudyPilotBooks.setBoard('ncert')">NCERT / CBSE</button>
            <button type="button" class="books-board-pill ${this.selectedBoard === "tamil" ? "active" : ""}" onclick="window.StudyPilotBooks.setBoard('tamil')">Tamil Nadu</button>
          </div>
        </div>

        <div class="input-row books-input-row">
          <div class="input-group">
            <label for="books-grade-select">Grade</label>
            <select id="books-grade-select" onchange="window.StudyPilotBooks.setGrade(this.value)">
              ${[6, 7, 8, 9, 10].map(grade => `<option value="${grade}" ${String(grade) === String(this.selectedGrade) ? "selected" : ""}>Grade ${grade}</option>`).join("")}
            </select>
          </div>
          <div class="input-group">
            <label for="books-subject-select">Subject</label>
            <select id="books-subject-select" onchange="window.StudyPilotBooks.setSubject(this.value)">
              ${subjects.map(subject => `<option value="${escapeHTML(subject)}" ${subject === this.selectedSubject ? "selected" : ""}>${escapeHTML(subject)}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="input-group">
          <label for="books-chapter-select">Chapter</label>
          ${
            chapters.length
              ? `<select id="books-chapter-select" onchange="window.StudyPilotBooks.setChapter(this.value)">
                  ${chapters.map(chapter => `<option value="${escapeHTML(chapter.key)}" ${chapter.key === this.selectedChapterKey ? "selected" : ""}>Ch ${chapter.num}: ${escapeHTML(chapter.title)}</option>`).join("")}
                </select>`
              : `<div class="books-empty-state">No chapter list is mapped for this subject yet. Use the official textbook portal below to pick the exact class book title.</div>`
          }
        </div>

        <div class="books-action-row">
          <button class="btn btn-outline btn-sm" type="button" onclick="window.StudyPilotBooks.openSelectedPage()">Open page</button>
          <button class="btn btn-secondary btn-sm" type="button" onclick="window.StudyPilotBooks.openBoardPortal()">Open board hub</button>
        </div>
      `;

      const summaryText = selectedChapter
        ? `Focused on ${selectedChapter.title} for Grade ${this.selectedGrade}.`
        : `${boardLabel} official portals for Grade ${this.selectedGrade}.`;

      linkRoot.innerHTML = `
        <div class="books-selection-summary">
          <div>
            <span class="books-kicker">What opens next</span>
            <h3>${escapeHTML(summaryText)}</h3>
            <p>StudyPilot only links to official portals. It does not store or copy textbook content.</p>
          </div>
        </div>

        <div class="books-resource-grid">
          ${boardResources.map(resource => `
            <article class="books-resource-card">
              <div class="books-resource-card-head">
                <h4>${escapeHTML(resource.title)}</h4>
                <span class="badge badge-indigo">Official</span>
              </div>
              <p>${escapeHTML(resource.description)}</p>
              <button class="btn btn-primary btn-sm" type="button" onclick="window.StudyPilotBooks.openUrl('${escapeHTML(resource.url)}')">Open portal</button>
            </article>
          `).join("")}
        </div>

        <div class="books-chapter-section">
          <div class="books-section-header">
            <h4>Chapter-level links</h4>
            <span class="badge badge-accent">${chapters.length ? `${chapters.length} chapter${chapters.length === 1 ? "" : "s"}` : "Portal only"}</span>
          </div>
          ${
            chapterResources.length
              ? chapterResources.map(resource => `
                <article class="books-chapter-card">
                  <div>
                    <span class="books-kicker">Selected chapter</span>
                    <h4>${escapeHTML(resource.title)}</h4>
                    <p>${escapeHTML(resource.description)}</p>
                  </div>
                  <div class="books-chapter-actions">
                    <button class="btn btn-primary btn-sm" type="button" onclick="window.StudyPilotBooks.openUrl('${escapeHTML(resource.primaryUrl)}')">${escapeHTML(resource.primaryLabel)}</button>
                    <button class="btn btn-outline btn-sm" type="button" onclick="window.StudyPilotBooks.openUrl('${escapeHTML(resource.secondaryUrl)}')">${escapeHTML(resource.secondaryLabel)}</button>
                  </div>
                </article>
              `).join("")
              : `<div class="books-empty-state books-empty-state--wide">Choose Science on NCERT / CBSE to see chapter-level official NCERT links for Grades 6 to 10.</div>`
          }
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();
    },
  };

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
