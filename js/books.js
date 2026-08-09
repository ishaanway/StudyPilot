/* ======================================================== */
/* StudyPilot NCERT Books Library                           */
/* Local PDFs inside the app + official portal shortcuts    */
/* ======================================================== */

(function () {
  function resolvePdfUrl(rawUrl) {
    if (!rawUrl) return "";
    let url = String(rawUrl).trim();

    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:") || url.startsWith("data:")) {
      return url;
    }

    const cleanPath = url.replace(/^\/+/, "");
    try {
      const href = window.location.href;
      const baseDir = href.substring(0, href.lastIndexOf('/') + 1);
      return new URL(cleanPath, baseDir).href;
    } catch (e) {
      return cleanPath;
    }
  }

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
        title: "CBSE Question Bank",
        description: "Class X subject question bank from the CBSE academic site.",
        url: "https://cbseacademic.nic.in/qbclass10.html",
      },
    ],
    tamil: [
      {
        title: "Tamil Nadu Textbooks",
        description: "Official Tamil Nadu textbook portal for Samacheer Kalvi books.",
        url: "https://textbookcorp.in/textbook/schools/books",
      },
    ],
  };

  const SUBJECT_FALLBACKS = {
    ncert: ["Science", "Mathematics", "Social Science", "English"],
    tamil: ["English", "Mathematics", "Science", "Social Science"],
  };

  const TAMIL_CLASS_PAGE_BY_GRADE = {
    "6": "https://textbookcorp.in/textbook/schools/books",
    "7": "https://textbookcorp.in/textbook/schools/books",
    "8": "https://textbookcorp.in/textbook/schools/books",
    "9": "https://textbookcorp.in/textbook/schools/books",
    "10": "https://textbookcorp.in/textbook/schools/books",
  };

  window.StudyPilotBooks = {
    selectedBoard: "ncert",
    selectedGrade: "7",
    selectedSubject: "Science",
    selectedBookKey: "",
    lastProfileSignature: "",
    profileListenerBound: false,
    viewerBook: null,

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
      const grade = String(profile && profile.grade ? profile.grade : "7");
      const subjects = this.getSubjects(board, grade);
      const profileSignature = `${board}:${grade}:${String(profile && profile.dreamCareer ? profile.dreamCareer : "")}`;
      const profileChanged = this.lastProfileSignature !== profileSignature;

      if (forceReset || profileChanged) {
        this.selectedBoard = board;
        this.selectedGrade = grade;
      }

      const preferredSubject = this.getPreferredSubject(this.selectedBoard, this.selectedGrade, subjects);
      if (forceReset || profileChanged || !subjects.includes(this.selectedSubject)) {
        this.selectedSubject = preferredSubject;
      } else if (!this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject).length && preferredSubject) {
        this.selectedSubject = preferredSubject;
      }

      const books = this.getBooks(board, grade, this.selectedSubject);
      if (forceReset || profileChanged || (books.length && !books.some(book => book.key === this.selectedBookKey))) {
        this.selectedBookKey = books[0] ? books[0].key : "";
      } else if (!books.length) {
        this.selectedBookKey = "";
      }

      this.lastProfileSignature = profileSignature;
    },

    normalizeBoard: function (boardValue) {
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
      return this.uniqueList([...curriculumSubjects, ...profileSubjects, ...fallback])
        .filter(s => s !== "Computer Science" && s !== "Hindi");
    },

    getBooks: function (boardKey, grade, subject) {
      const curriculum = window.StudyPilotCurriculum;
      if (!curriculum || typeof curriculum.getBookCatalog !== "function") return [];

      return curriculum.getBookCatalog(boardKey, grade, subject).map(book => ({
        key: this.bookKey(book.bookTitle || book.title || subject),
        title: book.bookTitle || book.title || subject,
        description: book.sourceLabel || "",
        pdfUrl: book.pdfUrl || "",
        pageUrl: book.pageUrl || "",
        localPdfUrl: book.localPdfUrl || "",
      }));
    },

    getPreferredSubject: function (boardKey, grade, subjects) {
      const list = Array.isArray(subjects) ? subjects : [];
      const mapped = list.find(subject => this.getBooks(boardKey, grade, subject).length > 0);
      return mapped || list[0] || "";
    },

    getTamilBookPageUrl: function (grade) {
      return TAMIL_CLASS_PAGE_BY_GRADE[String(grade)] || TAMIL_CLASS_PAGE_BY_GRADE["10"];
    },

    getSelectedBook: function () {
      const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      return books.find(book => book.key === this.selectedBookKey) || books[0] || null;
    },

    getSelectedBookPageUrl: function () {
      const book = this.getSelectedBook();
      if (book) {
        return book.localPdfUrl || book.pdfUrl || book.pageUrl || "";
      }

      if (this.selectedBoard === "tamil") {
        return this.getTamilBookPageUrl(this.selectedGrade);
      }

      const resources = this.getBoardResources(this.selectedBoard);
      const primary = resources[0];
      return primary ? primary.url : "";
    },

    uniqueList: function (items) {
      return [...new Set(items.filter(Boolean))];
    },

    bookKey: function (value) {
      return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
    },

    setBoard: function (boardKey) {
      this.selectedBoard = boardKey;
      const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
      this.selectedSubject = this.getPreferredSubject(this.selectedBoard, this.selectedGrade, subjects);
      const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      this.selectedBookKey = books.length ? books[0].key : "";
      this.render();
    },

    setGrade: function (grade) {
      const g = String(grade);
      this.selectedGrade = g;
      const profile = window.StudyPilotDB ? window.StudyPilotDB.getProfile() : null;
      if (profile && profile.grade !== g && window.StudyPilotApp && typeof window.StudyPilotApp.switchGlobalGrade === "function") {
        window.StudyPilotApp.switchGlobalGrade(g);
        return;
      }
      const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
      this.selectedSubject = this.getPreferredSubject(this.selectedBoard, this.selectedGrade, subjects);
      const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      this.selectedBookKey = books.length ? books[0].key : "";
      this.render();
    },

    setSubject: function (subject) {
      this.selectedSubject = subject;
      const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      this.selectedBookKey = books.length ? books[0].key : "";
      this.render();
    },

    setBook: function (bookKey) {
      this.selectedBookKey = bookKey;
      this.render();
    },

    openUrl: function (url) {
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    },

    openViewer: function (book) {
      const modal = document.getElementById("book-viewer-modal");
      const title = document.getElementById("book-viewer-title");
      const subtitle = document.getElementById("book-viewer-subtitle");
      const frame = document.getElementById("book-viewer-frame");
      const errorBox = document.getElementById("book-viewer-error");
      if (!modal || !title || !subtitle || !frame) return;

      const resolvedBook = book || this.getSelectedBook();
      if (!resolvedBook) return;

      this.viewerBook = resolvedBook;
      title.textContent = resolvedBook.book_title || resolvedBook.title || "NCERT Book";
      subtitle.textContent = resolvedBook.description || "Local PDF loaded from the StudyPilot library.";

      const rawPath = resolvedBook.local_url || resolvedBook.localPdfUrl || resolvedBook.pdf_url || resolvedBook.pdfUrl || resolvedBook.page_url || "";
      const pdfUrl = resolvePdfUrl(rawPath);

      console.log("[StudyPilot Offline Reader] Loading PDF path:", pdfUrl);

      if (errorBox) errorBox.classList.add("hidden");
      frame.style.display = "block";
      frame.src = pdfUrl;
      modal.classList.remove("hidden");
    },

    closeViewer: function () {
      const modal = document.getElementById("book-viewer-modal");
      const frame = document.getElementById("book-viewer-frame");
      if (frame) frame.src = "about:blank";
      if (modal) modal.classList.add("hidden");
      this.viewerBook = null;
    },

    openViewerExternal: function () {
      const book = this.viewerBook || this.getSelectedBook();
      if (!book) {
        this.openBoardPortal();
        return;
      }

      const externalUrl = book.pdfUrl || book.pageUrl || "";
      if (externalUrl) {
        this.openUrl(externalUrl);
      } else {
        this.openBoardPortal();
      }
    },

    openSelectedSource: function () {
      const book = this.getSelectedBook();
      if (book && book.localPdfUrl) {
        this.openViewer(book);
        return;
      }

      if (book && (book.pdfUrl || book.pageUrl)) {
        this.openUrl(book.pdfUrl || book.pageUrl);
        return;
      }

      this.openBoardPortal();
    },

    openSelectedPage: function () {
      const book = this.getSelectedBook();
      if (book && book.localPdfUrl) {
        this.openViewer(book);
        return;
      }

      if (book && (book.pdfUrl || book.pageUrl)) {
        this.openUrl(book.pdfUrl || book.pageUrl);
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
      if (boardKey === "tamil") {
        const grade = this.selectedGrade || "10";
        return [
          {
            title: `Class ${grade} Books`,
            description: `Open the official Tamil Nadu textbook listing for Grade ${grade}.`,
            url: this.getTamilBookPageUrl(grade),
          },
          ...(BOOK_PORTALS.tamil || []),
        ];
      }

      return BOOK_PORTALS[boardKey] || BOOK_PORTALS.ncert;
    },

    getBookResources: function () {
      const book = this.getSelectedBook();
      if (!book) return [];

      return [
        {
          title: book.title,
          description: book.description || book.pageUrl || "",
          primaryLabel: book.localPdfUrl ? "Open in app" : "Open PDF",
          secondaryLabel: book.localPdfUrl && (book.pdfUrl || book.pageUrl)
            ? "Open official source"
            : book.pdfUrl
              ? "Open PDF"
              : book.pageUrl
                ? "Open page"
                : "",
          primaryUrl: book.localPdfUrl || book.pdfUrl || book.pageUrl || "",
          secondaryUrl: book.localPdfUrl ? (book.pageUrl || book.pdfUrl || "") : (book.pdfUrl || book.pageUrl || ""),
          localPdfUrl: book.localPdfUrl || "",
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

      const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
      if (books.length) {
        if (!books.some(book => book.key === this.selectedBookKey)) {
          this.selectedBookKey = books[0].key;
        }
      } else {
        this.selectedBookKey = "";
      }

      const boardLabel = this.getBoardLabel(this.selectedBoard);
      const boardResources = this.getBoardResources(this.selectedBoard);
      const bookResources = this.getBookResources();
      const selectedBook = this.getSelectedBook();
      const localBookAvailable = !!(selectedBook && selectedBook.localPdfUrl);

      selectorRoot.innerHTML = `
        <div class="books-selector-summary">
          <div>
            <span class="books-kicker">Current selection</span>
            <h3>${escapeHTML(boardLabel)} - Grade ${escapeHTML(this.selectedGrade)} - ${escapeHTML(this.selectedSubject || "Choose a subject")}</h3>
            <p>${books.length
              ? `Open the local PDF inside StudyPilot or jump to the official source when you want the portal version.`
              : `This subject opens the official textbook portal for the selected board and grade.`}</p>
          </div>
          <button class="btn btn-primary btn-sm" type="button" onclick="window.StudyPilotBooks.openSelectedSource()">${localBookAvailable ? "Open in app" : "Open source"}</button>
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

        <div class="books-action-row">
          <button class="btn btn-outline btn-sm" type="button" onclick="window.StudyPilotBooks.openSelectedPage()">${localBookAvailable ? "Open in app" : "Open portal"}</button>
          <button class="btn btn-secondary btn-sm" type="button" onclick="window.StudyPilotBooks.openBoardPortal()">Open board hub</button>
        </div>

        <div class="books-inline-note">
          Local PDFs open in StudyPilot when available. If a book has not been cached yet, the official portal stays one tap away.
        </div>
      `;

      const summaryText = selectedBook
        ? `Focused on ${selectedBook.title} for Grade ${this.selectedGrade}.`
        : `${boardLabel} official portals for Grade ${this.selectedGrade}.`;

      linkRoot.innerHTML = `
        <div class="books-selection-summary">
          <div>
            <span class="books-kicker">What opens next</span>
            <h3>${escapeHTML(summaryText)}</h3>
            <p>StudyPilot caches NCERT PDFs locally on this device and keeps the official portals available beside them.</p>
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
            <h4>Local book</h4>
            <span class="badge badge-accent">${selectedBook && selectedBook.localPdfUrl ? "Cached locally" : "Portal only"}</span>
          </div>
          ${
            bookResources.length
              ? bookResources.map(resource => `
                <article class="books-chapter-card">
                  <div>
                    <span class="books-kicker">Selected book</span>
                    <h4>${escapeHTML(resource.title)}</h4>
                    <p>${escapeHTML(resource.description)}</p>
                  </div>
                  <div class="books-chapter-actions">
                    ${
                      resource.localPdfUrl
                        ? `<button class="btn btn-primary btn-sm" type="button" onclick="window.StudyPilotBooks.openViewer()">${escapeHTML(resource.primaryLabel)}</button>`
                        : `<button class="btn btn-primary btn-sm" type="button" onclick="window.StudyPilotBooks.openUrl('${escapeHTML(resource.primaryUrl)}')">${escapeHTML(resource.primaryLabel)}</button>`
                    }
                    ${resource.secondaryLabel ? `<button class="btn btn-outline btn-sm" type="button" onclick="window.StudyPilotBooks.openUrl('${escapeHTML(resource.secondaryUrl)}')">${escapeHTML(resource.secondaryLabel)}</button>` : ""}
                  </div>
                </article>
              `).join("")
              : `<div class="books-empty-state books-empty-state--wide">Choose a mapped book to open the exact official resource.</div>`
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
  window.StudyPilotBooks.libraryCatalog = [];
  window.StudyPilotBooks.libraryLoading = false;
  window.StudyPilotBooks.libraryError = "";
  window.StudyPilotBooks.libraryQuery = "";
  window.StudyPilotBooks.libraryDownloadedFilter = "all";
  window.StudyPilotBooks.libraryRequestPromise = null;

  window.StudyPilotBooks.getApiBaseUrl = function () {
    if (typeof window.getStudyPilotApiBaseUrl === "function") {
      return window.getStudyPilotApiBaseUrl();
    }
    if (window.StudyPilotApi && typeof window.StudyPilotApi.getBaseUrl === "function") {
      return window.StudyPilotApi.getBaseUrl();
    }
    if (window.STUDYPILOT_API_BASE && String(window.STUDYPILOT_API_BASE).trim()) {
      return String(window.STUDYPILOT_API_BASE).replace(/\/+$/, "");
    }
    return "http://127.0.0.1:5000";
  };

  window.StudyPilotBooks.loadLibraryCatalog = function (force = false) {
    const grade = String(this.selectedGrade || "10");
    const subject = String(this.selectedSubject || "");
    const query = String(this.libraryQuery || "");
    if (this.libraryRequestPromise && !force) return this.libraryRequestPromise;

    this.libraryLoading = true;
    const request = fetch(
      `${this.getApiBaseUrl()}/api/library/books?grade=${encodeURIComponent(grade)}&subject=${encodeURIComponent(subject)}&query=${encodeURIComponent(query)}`,
      { method: "GET", mode: "cors" }
    )
      .then(async res => {
        if (!res.ok) throw new Error("Library unavailable");
        return res.json();
      })
      .then(data => {
        this.libraryCatalog = Array.isArray(data && data.items) ? data.items : [];
        this.libraryError = "";
        this.libraryLoading = false;
        this.syncFromProfile(false);
        this.render();
      })
      .catch(() => {
        this.libraryCatalog = [];
        this.libraryError = "NCERT library is temporarily unavailable. Try again after the backend starts.";
        this.libraryLoading = false;
        this.render();
      });

    this.libraryRequestPromise = request.finally(() => {
      this.libraryRequestPromise = null;
    });
    return request;
  };

  window.StudyPilotBooks.setSearchQuery = function (query) {
    this.libraryQuery = String(query || "");
    this.loadLibraryCatalog(true);
  };

  window.StudyPilotBooks.setDownloadFilter = function (value) {
    this.libraryDownloadedFilter = String(value || "all");
    this.render();
  };

  function buildDefaultCbseCatalog() {
    const catalog = [];
    const g6Data = [
      {
        subject: "Mathematics",
        book_title: "Ganita Prakash (Class 6 Mathematics)",
        page_url: "https://ncert.nic.in/textbook.php?fegp1=0-10",
        chapters: [
          "Ch 1: Patterns in Mathematics", "Ch 2: Lines and Angles", "Ch 3: Number Play",
          "Ch 4: Data Handling and Presentation", "Ch 5: Prime Time", "Ch 6: Perimeter and Area",
          "Ch 7: Fractions", "Ch 8: Playing with Constructions", "Ch 9: Symmetry", "Ch 10: The Other Side of Zero"
        ]
      },
      {
        subject: "Science",
        book_title: "Curiosity (Class 6 Science)",
        page_url: "https://ncert.nic.in/textbook.php?fesc1=0-12",
        chapters: [
          "Ch 1: The Wonderful World of Science", "Ch 2: Diversity in the Living World", "Ch 3: Mindful Eating: A Path to a Healthy Body",
          "Ch 4: Exploring Magnets", "Ch 5: Measurement of Length and Motion", "Ch 6: Materials Around Us",
          "Ch 7: Temperature and its Measurement", "Ch 8: A Journey through States of Water", "Ch 9: Methods of Separation in Everyday Life",
          "Ch 10: Living Creatures: Exploring their Characteristics", "Ch 11: Nature's Treasures", "Ch 12: Beyond Earth"
        ]
      },
      {
        subject: "Social Science",
        book_title: "Exploring Society: India and Beyond (Class 6)",
        page_url: "https://ncert.nic.in/textbook.php?fess1=0-14",
        chapters: [
          "Ch 1: Locating Places on the Earth", "Ch 2: Oceans and Continents", "Ch 3: Landforms and Life",
          "Ch 4: Timeline and Sources of History", "Ch 5: India, That Is Bharat", "Ch 6: The Beginnings of Indian Civilisation",
          "Ch 7: India's Cultural Roots", "Ch 8: Unity in Diversity, or 'Many in the One'", "Ch 9: Family and Community",
          "Ch 10: Grassroots Democracy – Governance", "Ch 11: Local Government in Rural Areas", "Ch 12: Local Government in Urban Areas",
          "Ch 13: The Value of Work", "Ch 14: Economic Activities Around Us"
        ]
      },
      {
        subject: "English",
        book_title: "Poorvi (Class 6 English)",
        page_url: "https://ncert.nic.in/textbook.php?fepr1=0-5",
        chapters: [
          "Unit 1: Fables and Folk Tales", "Unit 2: Friendship", "Unit 3: Nurturing Nature",
          "Unit 4: Sports and Wellness", "Unit 5: Culture and Tradition"
        ]
      }
    ];

    const g7Data = [
      {
        subject: "Science",
        book_title: "Curiosity (Class 7 Science)",
        page_url: "https://ncert.nic.in/textbook.php?gecu1=0-12",
        chapters: [
          "Ch 1: The Ever-Evolving World of Science", "Ch 2: Exploring Substances: Acidic, Basic, Neutral",
          "Ch 3: Electricity: Circuits and Components", "Ch 4: The World of Metals and Non-metals",
          "Ch 5: Changes Around Us: Physical and Chemical", "Ch 6: Adolescence: A Stage of Growth and Change",
          "Ch 7: Heat Transfer in Nature", "Ch 8: Measurement of Time and Motion",
          "Ch 9: Life Processes in Animals", "Ch 10: Life Processes in Plants",
          "Ch 11: Light: Shadows and Reflections", "Ch 12: Earth, Moon, and the Sun"
        ]
      },
      {
        subject: "Mathematics",
        book_title: "Mathematics (Class 7)",
        page_url: "https://ncert.nic.in/textbook.php?gemh1=0-15",
        chapters: [
          "Ch 1: Large Numbers Around Us", "Ch 2: Arithmetic Expressions & Order of Operations",
          "Ch 3: A Peek Beyond the Point (Decimals)", "Ch 4: Expressions using Letter-Numbers (Algebra)",
          "Ch 5: Parallel and Intersecting Lines", "Ch 6: Number Play (Factors & Multiples)",
          "Ch 7: Properties of Triangles", "Ch 8: Working with Fractions",
          "Ch 9: Geometric Twins (Congruence)", "Ch 10: Operations with Integers",
          "Ch 11: Data Handling (Mean, Median, Mode)", "Ch 12: Percentages & Ratios",
          "Ch 13: Probability & Chance", "Ch 14: Geometric Constructions",
          "Ch 15: Finding the Unknown (Simple Equations)"
        ]
      },
      {
        subject: "Social Science",
        book_title: "Exploring Society: India and Beyond Part 1 & 2",
        page_url: "https://ncert.nic.in/textbook.php?gees1=0-12",
        chapters: [
          "Ch 1: Geographical Diversity of India", "Ch 2: Understanding the Weather", "Ch 3: Climate of India",
          "Ch 4: New Beginnings: Cities and States", "Ch 5: The Rise of Empires", "Ch 6: The Age of Reorganisation",
          "Ch 7: The Gupta Era: Age of Tireless Creativity", "Ch 8: How the Land Becomes Sacred",
          "Ch 9: Types of Governments", "Ch 10: The Constitution of India", "Ch 11: From Barter to Money",
          "Ch 12: Understanding Markets", "Ch 13: The Story of Indian Farming", "Ch 14: India and Her Neighbours",
          "Ch 15: Empires and Kingdoms (6th to 10th C)", "Ch 16: Turning Tides (11th and 12th C)",
          "Ch 17: India, a Home to Many", "Ch 18: State Government and You",
          "Ch 19: Infrastructure and National Growth", "Ch 20: Banks and Financial Literacy"
        ]
      },
      {
        subject: "English",
        book_title: "Poorvi (Class 7 English)",
        page_url: "https://ncert.nic.in/textbook.php?gepr1=0-11",
        chapters: [
          "Unit 1: Learning Together", "Unit 2: Wit and Humour", "Unit 3: Dreams and Discoveries",
          "Unit 4: Travel and Adventure", "Unit 5: Bravehearts"
        ]
      }
    ];

    const g8Data = [
      { subject: "Mathematics", book_title: "Mathematics (Class 8)", page_url: "https://ncert.nic.in/textbook.php?hemh1=0-13", localPdf: "assets/books/ncert/grade8-mathematics.pdf", chapters: ["Ch 1: Rational Numbers", "Ch 2: Linear Equations in One Variable", "Ch 3: Understanding Quadrilaterals", "Ch 4: Data Handling", "Ch 5: Square and Square Roots", "Ch 6: Cube and Cube Roots", "Ch 7: Comparing Quantities", "Ch 8: Algebraic Expressions and Identities", "Ch 9: Mensuration", "Ch 10: Exponents and Powers", "Ch 11: Direct and Inverse Proportions", "Ch 12: Factorisation", "Ch 13: Introduction to Graphs"] },
      { subject: "Science", book_title: "Science (Class 8)", page_url: "https://ncert.nic.in/textbook.php?hesc1=0-13", localPdf: "assets/books/ncert/grade8-science.pdf", chapters: ["Ch 1: Crop Production and Management", "Ch 2: Microorganisms: Friend and Foe", "Ch 3: Coal and Petroleum", "Ch 4: Combustion and Flame", "Ch 5: Conservation of Plants and Animals", "Ch 6: Reproduction in Animals", "Ch 7: Reaching the Age of Adolescence", "Ch 8: Force and Pressure", "Ch 9: Friction", "Ch 10: Sound", "Ch 11: Chemical Effects of Electric Current", "Ch 12: Some Natural Phenomena", "Ch 13: Light"] },
      { subject: "Social Science", book_title: "Social Science (Class 8)", page_url: "https://ncert.nic.in/textbook.php?hess1=0-10", localPdf: "assets/books/ncert/grade8-social-science.pdf", chapters: ["Ch 1: Resources", "Ch 2: Land, Soil, Water, Natural Vegetation", "Ch 3: Agriculture", "Ch 4: Industries", "Ch 5: Human Resources", "Ch 6: How, When and Where", "Ch 7: From Trade to Territory", "Ch 8: Ruling the Countryside", "Ch 9: Tribals, Dikus and Vision of Golden Age", "Ch 10: Indian Constitution & Secularism"] },
      { subject: "English", book_title: "Honeydew (Class 8 English)", page_url: "https://ncert.nic.in/textbook.php?hehd1=0-10", localPdf: "assets/books/ncert/grade8-english-honeydew.pdf", chapters: ["Unit 1: The Best Christmas Present in the World", "Unit 2: The Tsunami", "Unit 3: Glimpses of the Past", "Unit 4: Bepin Choudhury's Lapse of Memory", "Unit 5: The Summit Within", "Unit 6: This is Jody's Fawn"] }
    ];

    const g9Data = [
      { subject: "Mathematics", book_title: "Mathematics (Class 9)", page_url: "https://ncert.nic.in/textbook.php?iemh1=0-12", localPdf: "assets/books/ncert/grade9-mathematics.pdf", chapters: ["Ch 1: Number Systems", "Ch 2: Polynomials", "Ch 3: Coordinate Geometry", "Ch 4: Linear Equations in Two Variables", "Ch 5: Introduction to Euclid's Geometry", "Ch 6: Lines and Angles", "Ch 7: Triangles", "Ch 8: Quadrilaterals", "Ch 9: Circles", "Ch 10: Heron's Formula", "Ch 11: Surface Areas and Volumes", "Ch 12: Statistics"] },
      { subject: "Science", book_title: "Science (Class 9)", page_url: "https://ncert.nic.in/textbook.php?iesc1=0-12", localPdf: "assets/books/ncert/grade9-science.pdf", chapters: ["Ch 1: Matter in Our Surroundings", "Ch 2: Is Matter Around Us Pure", "Ch 3: Atoms and Molecules", "Ch 4: Structure of the Atom", "Ch 5: The Fundamental Unit of Life", "Ch 6: Tissues", "Ch 7: Motion", "Ch 8: Force and Laws of Motion", "Ch 9: Gravitation", "Ch 10: Work and Energy", "Ch 11: Sound", "Ch 12: Improvement in Food Resources"] },
      { subject: "Social Science", book_title: "Social Science (Class 9)", page_url: "https://ncert.nic.in/textbook.php?iess1=0-6", localPdf: "assets/books/ncert/grade9-social-science.pdf", chapters: ["Ch 1: The French Revolution", "Ch 2: Socialism in Europe and Russian Revolution", "Ch 3: Nazism and the Rise of Hitler", "Ch 4: India - Size and Location", "Ch 5: Physical Features of India", "Ch 6: Drainage", "Ch 7: Climate", "Ch 8: What is Democracy? Why Democracy?", "Ch 9: Constitutional Design", "Ch 10: The Story of Village Palampur"] },
      { subject: "English", book_title: "Beehive (Class 9 English)", page_url: "https://ncert.nic.in/textbook.php?iebe1=0-11", localPdf: "assets/books/ncert/grade9-english-beehive.pdf", chapters: ["Unit 1: The Fun They Had", "Unit 2: The Sound of Music", "Unit 3: The Little Girl", "Unit 4: A Truly Beautiful Mind", "Unit 5: The Snake and the Mirror", "Unit 6: My Childhood"] }
    ];

    const g10Data = [
      { subject: "Mathematics", book_title: "Mathematics (Class 10)", page_url: "https://ncert.nic.in/textbook.php?jemh1=0-14", localPdf: "assets/books/ncert/grade10-mathematics.pdf", chapters: ["Ch 1: Real Numbers", "Ch 2: Polynomials", "Ch 3: Pair of Linear Equations in Two Variables", "Ch 4: Quadratic Equations", "Ch 5: Arithmetic Progressions", "Ch 6: Triangles", "Ch 7: Coordinate Geometry", "Ch 8: Introduction to Trigonometry", "Ch 9: Some Applications of Trigonometry", "Ch 10: Circles", "Ch 11: Areas Related to Circles", "Ch 12: Surface Areas and Volumes", "Ch 13: Statistics", "Ch 14: Probability"] },
      { subject: "Science", book_title: "Science (Class 10)", page_url: "https://ncert.nic.in/textbook.php?jesc1=1-16", localPdf: "assets/books/ncert/grade10-science.pdf", chapters: ["Ch 1: Chemical Reactions and Equations", "Ch 2: Acids, Bases and Salts", "Ch 3: Metals and Non-metals", "Ch 4: Carbon and Its Compounds", "Ch 5: Life Processes", "Ch 6: Control and Coordination", "Ch 7: How do Organisms Reproduce?", "Ch 8: Heredity and Evolution", "Ch 9: Light - Reflection and Refraction", "Ch 10: The Human Eye and Colourful World", "Ch 11: Electricity", "Ch 12: Magnetic Effects of Electric Current", "Ch 13: Our Environment"] },
      { subject: "Social Science", book_title: "Social Science (Class 10)", page_url: "https://ncert.nic.in/textbook.php?jess1=0-5", localPdf: "assets/books/ncert/grade10-social-science.pdf", chapters: ["Ch 1: The Rise of Nationalism in Europe", "Ch 2: Nationalism in India", "Ch 3: The Making of a Global World", "Ch 4: Resources and Development", "Ch 5: Forest and Wildlife Resources", "Ch 6: Water Resources", "Ch 7: Agriculture", "Ch 8: Power Sharing", "Ch 9: Federalism", "Ch 10: Development"] },
      { subject: "English", book_title: "First Flight (Class 10 English)", page_url: "https://ncert.nic.in/textbook.php?jeff1=0-11", localPdf: "assets/books/ncert/grade10-english-first-flight.pdf", chapters: ["Unit 1: A Letter to God", "Unit 2: Nelson Mandela: Long Walk to Freedom", "Unit 3: Two Stories about Flying", "Unit 4: From the Diary of Anne Frank", "Unit 5: Glimpses of India", "Unit 6: Mijbil the Otter"] }
    ];

    function getSubjectPrefix(subject) {
      const s = String(subject || "").toLowerCase();
      if (s.includes("social")) return "ss_ch";
      if (s.includes("science")) return "s_ch";
      if (s.includes("math")) return "m_ch";
      if (s.includes("english")) return "en_u";
      return "ch";
    }

    [6, 7, 8, 9, 10].forEach(grade => {
      let list = g6Data;
      if (grade === 7) list = g7Data;
      else if (grade === 8) list = g8Data;
      else if (grade === 9) list = g9Data;
      else if (grade === 10) list = g10Data;

      list.forEach(bookItem => {
        const prefix = getSubjectPrefix(bookItem.subject);
        const fallbackPdf = bookItem.localPdf || `assets/books/ncert/grade${grade}-${bookItem.subject.toLowerCase().replace(/[^a-z0-9]+/g, "")}.pdf`;

        bookItem.chapters.forEach((chLabel, idx) => {
          const chNum = idx + 1;
          const cid = `g${grade}_${prefix}${chNum}`;
          const id = `cbse_g${grade}_${cid}`;
          catalog.push({
            id: id,
            grade: grade,
            grade_label: `Class ${grade}`,
            subject: bookItem.subject,
            book_title: bookItem.book_title,
            chapter_label: chLabel,
            chapter_index: chNum,
            page_url: bookItem.page_url,
            pdf_url: bookItem.page_url,
            local_url: fallbackPdf,
            downloaded: true
          });
        });
      });
    });

    return catalog;
  }

  window.StudyPilotBooks.getDownloadedIds = function () {
    try {
      const data = localStorage.getItem("studypilot_downloaded_books");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  };

  window.StudyPilotBooks.getBooks = function (boardKey, grade, subject) {
    if (boardKey !== "ncert") return [];
    let books = Array.isArray(this.libraryCatalog) && this.libraryCatalog.length > 0
      ? this.libraryCatalog
      : buildDefaultCbseCatalog();

    const downloadedIds = this.getDownloadedIds();

    return books.filter(book => {
      const matchesGrade = String(book.grade || "") === String(grade);
      const matchesSubject = !subject || String(book.subject || "").toLowerCase() === String(subject || "").toLowerCase();
      const isDownloaded = downloadedIds.includes(book.id) || Boolean(book.downloaded);
      const matchesDownload = this.libraryDownloadedFilter === "all"
        || (this.libraryDownloadedFilter === "downloaded" && isDownloaded)
        || (this.libraryDownloadedFilter === "online" && !isDownloaded);
      const query = String(this.libraryQuery || "").toLowerCase();
      const queryMatch = !query || [
        book.grade_label,
        book.subject,
        book.book_title,
        book.chapter_label,
      ].join(" ").toLowerCase().includes(query);
      return matchesGrade && matchesSubject && matchesDownload && queryMatch;
    }).map(book => {
      const isDownloaded = downloadedIds.includes(book.id) || Boolean(book.downloaded);
      return { ...book, key: book.id, downloaded: isDownloaded };
    });
  };

  window.StudyPilotBooks.getSelectedBook = function () {
    const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
    return books.find(book => book.id === this.selectedBookKey) || books[0] || null;
  };

  window.StudyPilotBooks.getBookById = function (bookId) {
    const books = Array.isArray(this.libraryCatalog) && this.libraryCatalog.length > 0
      ? this.libraryCatalog
      : buildDefaultCbseCatalog();
    const found = books.find(book => book.id === bookId);
    if (found) {
      const isDownloaded = this.getDownloadedIds().includes(found.id) || Boolean(found.downloaded);
      return { ...found, downloaded: isDownloaded, key: found.id };
    }
    return null;
  };

  window.StudyPilotBooks.setBoard = function (boardKey) {
    this.selectedBoard = boardKey;
    const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
    this.selectedSubject = this.getPreferredSubject(this.selectedBoard, this.selectedGrade, subjects);
    this.selectedBookKey = "";
    this.render();
    if (this.selectedBoard === "ncert") {
      this.loadLibraryCatalog(true);
    }
  };

  window.StudyPilotBooks.setGrade = function (grade) {
    this.selectedGrade = String(grade);
    const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
    this.selectedSubject = this.getPreferredSubject(this.selectedBoard, this.selectedGrade, subjects);
    this.selectedBookKey = "";
    this.render();
    if (this.selectedBoard === "ncert") {
      this.loadLibraryCatalog(true);
    }
  };

  window.StudyPilotBooks.setSubject = function (subject) {
    this.selectedSubject = subject;
    this.selectedBookKey = "";
    this.render();
    if (this.selectedBoard === "ncert") {
      this.loadLibraryCatalog(true);
    }
  };

  window.StudyPilotBooks.downloadBook = function (bookId) {
    const downloadedIds = this.getDownloadedIds();
    if (!downloadedIds.includes(bookId)) {
      downloadedIds.push(bookId);
      try {
        localStorage.setItem("studypilot_downloaded_books", JSON.stringify(downloadedIds));
      } catch (e) {}
    }
    const apiBase = this.getApiBaseUrl();
    fetch(`${apiBase}/api/library/books/${encodeURIComponent(bookId)}/download`, {
      method: "POST",
      mode: "cors",
    }).catch(() => null);

    this.render();
    if (window.StudyPilotDB) {
      window.StudyPilotDB.addNotification("Book chapter downloaded for offline reading.", "success");
    }
    return Promise.resolve();
  };

  window.StudyPilotBooks.deleteBook = function (bookId) {
    let downloadedIds = this.getDownloadedIds();
    downloadedIds = downloadedIds.filter(id => id !== bookId);
    try {
      localStorage.setItem("studypilot_downloaded_books", JSON.stringify(downloadedIds));
    } catch (e) {}

    const apiBase = this.getApiBaseUrl();
    fetch(`${apiBase}/api/library/books/${encodeURIComponent(bookId)}`, {
      method: "DELETE",
      mode: "cors",
    }).catch(() => null);

    this.render();
    if (window.StudyPilotDB) {
      window.StudyPilotDB.addNotification("Book chapter removed from offline downloads.", "info");
    }
    return Promise.resolve();
  };

  window.StudyPilotBooks.showViewerError = function (path, book) {
    const frame = document.getElementById("book-viewer-frame");
    const errorBox = document.getElementById("book-viewer-error");
    const errorPath = document.getElementById("book-viewer-error-path");
    const portalBtn = document.getElementById("book-viewer-portal-btn");

    if (frame) frame.style.display = "none";
    if (errorBox) errorBox.classList.remove("hidden");
    if (errorPath) errorPath.textContent = `Attempted PDF Path: ${path}`;
    if (portalBtn) {
      portalBtn.onclick = () => {
        const url = (book && (book.page_url || book.pdf_url || book.pageUrl || book.pdfUrl)) || "https://ncert.nic.in/textbook.php";
        window.open(url, "_blank", "noopener,noreferrer");
      };
    }
  };

  window.StudyPilotBooks.openViewer = function (book) {
    const resolvedBook = book || this.getSelectedBook();
    if (!resolvedBook) return;

    if (!resolvedBook.downloaded) {
      this.downloadBook(resolvedBook.id);
    }

    const modal = document.getElementById("book-viewer-modal");
    const title = document.getElementById("book-viewer-title");
    const subtitle = document.getElementById("book-viewer-subtitle");
    const frame = document.getElementById("book-viewer-frame");
    const errorBox = document.getElementById("book-viewer-error");
    if (!modal || !title || !subtitle || !frame) return;

    this.viewerBook = resolvedBook;
    title.textContent = `${resolvedBook.book_title || resolvedBook.title || "NCERT Book"} - ${resolvedBook.chapter_label || "Book"}`;
    subtitle.textContent = `${resolvedBook.grade_label || `Class ${resolvedBook.grade}`} · ${resolvedBook.subject || ""} (Offline Reader)`;

    // Prioritize local PDF URL for offline reading
    const rawPath = resolvedBook.local_url || resolvedBook.localPdfUrl || resolvedBook.pdf_url || resolvedBook.pdfUrl || resolvedBook.page_url || "";
    const pdfUrl = resolvePdfUrl(rawPath);

    console.log("[StudyPilot Offline Reader] Loading PDF path:", pdfUrl);

    if (errorBox) errorBox.classList.add("hidden");
    frame.style.display = "block";
    frame.src = pdfUrl;
    modal.classList.remove("hidden");

    if (pdfUrl && !pdfUrl.startsWith("http://") && !pdfUrl.startsWith("https://")) {
      fetch(pdfUrl, { method: "HEAD" }).then(res => {
        if (!res.ok) {
          console.warn("[StudyPilot Offline Reader] Local PDF HEAD check returned status:", res.status, pdfUrl);
          this.showViewerError(pdfUrl, resolvedBook);
        }
      }).catch(err => {
        console.warn("[StudyPilot Offline Reader] Local PDF fetch error:", err, pdfUrl);
        this.showViewerError(pdfUrl, resolvedBook);
      });
    }
  };

  window.StudyPilotBooks.closeViewer = function () {
    const modal = document.getElementById("book-viewer-modal");
    const frame = document.getElementById("book-viewer-frame");
    const errorBox = document.getElementById("book-viewer-error");
    if (frame) frame.src = "about:blank";
    if (errorBox) errorBox.classList.add("hidden");
    if (modal) modal.classList.add("hidden");
    this.viewerBook = null;
  };

  window.StudyPilotBooks.openSelectedSource = function () {
    const book = this.getSelectedBook();
    if (!book) {
      this.openBoardPortal();
      return;
    }
    this.openViewer(book);
  };

  window.StudyPilotBooks.downloadDirectPdf = function (bookId) {
    const book = this.getBookById(bookId);
    if (!book) return;
    const pdfUrl = book.localPdfUrl || book.pdfUrl || book.localPdf || "";
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `${book.subject || "Book"}_Class${book.grade}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.StudyPilotDB.addNotification(`Started downloading ${book.book_title || "PDF"}.`, "success");
    } else if (book.page_url) {
      window.open(book.page_url, "_blank", "noopener,noreferrer");
    }
  };

  window.StudyPilotBooks.toggleBookSummary = function (bookId) {
    const drawer = document.getElementById(`book-summary-${bookId}`);
    if (drawer) {
      const isOpening = drawer.classList.contains("hidden");
      drawer.classList.toggle("hidden");
      if (window.StudyPilotAudio) window.StudyPilotAudio.playClickSound();
      if (isOpening && typeof window.renderMathInElement === "function") {
        try {
          window.renderMathInElement(drawer, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false }
            ],
            throwOnError: false
          });
        } catch (e) {}
      }
    }
  };

  window.StudyPilotBooks.getCompletedChapterIds = function () {
    try {
      const data = localStorage.getItem("studypilot_completed_chapters");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  };

  window.StudyPilotBooks.toggleChapterCompletion = function (bookId) {
    let completed = this.getCompletedChapterIds();
    const isNowDone = !completed.includes(bookId);
    if (completed.includes(bookId)) {
      completed = completed.filter(id => id !== bookId);
      if (window.StudyPilotDB) window.StudyPilotDB.addNotification("Chapter marked as pending.", "info");
    } else {
      completed.push(bookId);
      if (window.StudyPilotAudio) window.StudyPilotAudio.playChime("complete");
      if (window.StudyPilotDB) window.StudyPilotDB.addNotification("Chapter marked COMPLETED! Parent report updated. 🔥", "success");
    }
    localStorage.setItem("studypilot_completed_chapters", JSON.stringify(completed));
    this.render();
    if (window.StudyPilotParents && typeof window.StudyPilotParents.render === "function") {
      window.StudyPilotParents.render();
    }
  };

  window.StudyPilotBooks.render = function () {
    const selectorRoot = document.getElementById("books-selector-root");
    const linkRoot = document.getElementById("books-link-root");
    const gradePill = document.getElementById("books-grade-pill");
    if (!selectorRoot || !linkRoot) return;

    if (gradePill) {
      gradePill.innerText = `Grade ${this.selectedGrade}`;
    }

    const subjects = this.getSubjects(this.selectedBoard, this.selectedGrade);
    const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
    const boardLabel = this.getBoardLabel(this.selectedBoard);
    const completedIds = this.getCompletedChapterIds();

    selectorRoot.innerHTML = `
      <div class="books-filter-stack">
        <div class="input-group">
          <label for="library-search">Search books</label>
          <input id="library-search" type="search" placeholder="Search by class, subject, chapter, or title" value="${escapeHTML(this.libraryQuery)}" oninput="window.StudyPilotBooks.setSearchQuery(this.value)">
        </div>

        <div class="input-row books-input-row">
          <div class="input-group">
            <label for="books-grade-select">Class</label>
            <select id="books-grade-select" onchange="window.StudyPilotBooks.setGrade(this.value)">
              ${[6, 7, 8, 9, 10].map(grade => `<option value="${grade}" ${String(grade) === String(this.selectedGrade) ? "selected" : ""}>Class ${grade}</option>`).join("")}
            </select>
          </div>
          <div class="input-group">
            <label for="books-subject-select">Subject</label>
            <select id="books-subject-select" onchange="window.StudyPilotBooks.setSubject(this.value)">
              ${subjects.map(subject => `<option value="${escapeHTML(subject)}" ${subject === this.selectedSubject ? "selected" : ""}>${escapeHTML(subject)}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="input-row books-input-row">
          <div class="input-group">
            <label for="books-download-filter">Downloads</label>
            <select id="books-download-filter" onchange="window.StudyPilotBooks.setDownloadFilter(this.value)">
              <option value="all" ${this.libraryDownloadedFilter === "all" ? "selected" : ""}>All books</option>
              <option value="downloaded" ${this.libraryDownloadedFilter === "downloaded" ? "selected" : ""}>Downloaded</option>
              <option value="online" ${this.libraryDownloadedFilter === "online" ? "selected" : ""}>Not downloaded</option>
            </select>
          </div>
          <div class="input-group">
            <label>NCERT Portal</label>
            <button class="btn btn-outline btn-sm" type="button" onclick="window.open('https://ncert.nic.in/textbook.php', '_blank', 'noopener,noreferrer')">Open official portal</button>
          </div>
        </div>
      </div>
    `;

    const cards = books.length ? books.map(book => {
      const isCompleted = completedIds.includes(book.id);
      const summaryData = window.StudyPilotCurriculum && typeof window.StudyPilotCurriculum.getChapterSummary === "function"
        ? window.StudyPilotCurriculum.getChapterSummary(book.grade, book.subject, book.chapter_label, book.chapter_index)
        : null;

      const points = summaryData && Array.isArray(summaryData.points) ? summaryData.points : [
        `Master foundational NCERT principles and definitions for ${escapeHTML(book.chapter_label || book.book_title)}.`,
        `Focus on standard units, derivations, and structural properties.`,
        `Review solved textbook examples and practice end-of-chapter problems.`
      ];

      return `
        <article class="books-chapter-card" style="border: ${isCompleted ? '2px solid #10b981' : '1px solid var(--border-color)'}; background: ${isCompleted ? 'rgba(16,185,129,0.05)' : 'var(--bg-card)'};">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="books-kicker">${escapeHTML(book.grade_label || `Class ${book.grade}`)} · ${escapeHTML(book.subject)}</span>
              ${isCompleted ? '<span class="badge badge-accent" style="background:#10b981; color:#ffffff; font-weight:700;">✓ Completed</span>' : ''}
            </div>
            <h4 style="margin-top:0.25rem;">${escapeHTML(book.book_title)}</h4>
            <p>${escapeHTML(book.chapter_label)}</p>
          </div>
          <div class="books-chapter-actions" style="display:flex; flex-wrap:wrap; gap:0.4rem; align-items:center;">
            <button class="btn ${isCompleted ? 'btn-success' : 'btn-outline'} btn-sm" type="button" onclick="window.StudyPilotBooks.toggleChapterCompletion('${escapeHTML(book.id)}')" style="font-weight:700;">
              ${isCompleted ? '✓ Completed' : 'Mark Completed ✓'}
            </button>
            <button class="btn btn-accent btn-sm" type="button" onclick="window.StudyPilotBooks.toggleBookSummary('${escapeHTML(book.id)}')" style="display:inline-flex; align-items:center; gap:0.25rem; font-weight:700;">
              ✨ AI Summary
            </button>
            <button class="btn btn-primary btn-sm" type="button" onclick="window.open('${escapeHTML(book.page_url || "https://ncert.nic.in/textbook.php")}', '_blank', 'noopener,noreferrer')" style="display:inline-flex; align-items:center; gap:0.25rem;">🌐 Open Portal</button>
            <button class="btn btn-secondary btn-sm" type="button" onclick="window.StudyPilotBooks.downloadDirectPdf('${escapeHTML(book.id)}')" style="display:inline-flex; align-items:center; gap:0.25rem;">📥 Download PDF</button>
            <button class="btn btn-outline btn-sm" type="button" onclick="window.StudyPilotBooks.openViewer(window.StudyPilotBooks.getBookById('${escapeHTML(book.id)}'))">View Reader</button>
          </div>

          <!-- Expandable AI Lesson Summary Drawer with Actual Topic Summary in POINTS -->
          <div id="book-summary-${escapeHTML(book.id)}" class="hidden" style="margin-top:0.75rem; padding:0.9rem 1.1rem; background:var(--bg-app, #f8fafc); border-radius:10px; border-left:4px solid var(--primary-color, #6366f1); font-size:0.85rem; line-height:1.5;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <span class="badge badge-accent" style="font-size:0.75rem; font-weight:700;">NCERT Official Lesson Summary in POINTS</span>
              <button class="btn-icon" style="font-size:0.8rem; cursor:pointer;" onclick="window.StudyPilotBooks.toggleBookSummary('${escapeHTML(book.id)}')">✕</button>
            </div>
            <h5 style="margin:0.25rem 0 0.4rem 0; font-weight:800; font-size:0.92rem; color:var(--text-main);">${escapeHTML(summaryData && summaryData.title ? summaryData.title : book.book_title)}</h5>
            ${summaryData && summaryData.concept ? `<p style="margin-bottom:0.6rem; color:var(--text-muted); font-size:0.83rem;"><em>${escapeHTML(summaryData.concept)}</em></p>` : ''}
            <ul style="margin-left:1.25rem; margin-bottom:0.6rem; color:var(--text-main); line-height:1.6;">
              ${points.map(pt => `<li>${escapeHTML(pt)}</li>`).join("")}
            </ul>
            ${summaryData && summaryData.formula ? `<div style="background:rgba(99,102,241,0.08); padding:0.4rem 0.6rem; border-radius:6px; font-size:0.82rem; margin-bottom:0.5rem; word-break:break-word;"><strong>Formula / Equation:</strong> <code>${escapeHTML(summaryData.formula)}</code></div>` : ''}
            ${summaryData && summaryData.sample_question ? `
              <div style="background:rgba(239,68,68,0.08); border-left:3px solid #ef4444; padding:0.5rem 0.75rem; border-radius:6px; font-size:0.8rem; margin-bottom:0.5rem;">
                <strong style="color:#ef4444;">❓ Sample Exam Question:</strong> ${escapeHTML(summaryData.sample_question)}<br>
                <span style="color:var(--text-muted); margin-top:0.2rem; display:block;"><strong>Answer Key:</strong> ${escapeHTML(summaryData.sample_answer || "State primary definition and verified NCERT formula.")}</span>
              </div>
            ` : ''}
            ${summaryData && summaryData.memory_hook ? `
              <div style="background:rgba(16,185,129,0.08); border-left:3px solid #10b981; padding:0.4rem 0.6rem; border-radius:6px; font-size:0.8rem; margin-bottom:0.5rem; color:var(--text-main);">
                <strong style="color:#059669;">💡 Memory Trick / Hook:</strong> ${escapeHTML(summaryData.memory_hook)}
              </div>
            ` : ''}
            <button class="btn btn-outline btn-xs" onclick="window.StudyPilotApp.switchScreen('tutor'); window.StudyPilotTutor.askDoubtForBook('${escapeHTML(book.subject)}', '${escapeHTML(book.chapter_label || book.book_title)}');">
              💬 Ask AI Tutor about this chapter
            </button>
          </div>
        </article>
      `;
    }).join("") : `
      <div class="books-empty-state books-empty-state--wide">
        ${this.libraryLoading ? "Loading the NCERT catalog..." : "No books match this class, subject, or search."}
      </div>
    `;

    linkRoot.innerHTML = `
      <div class="books-selection-summary">
        <div>
          <span class="books-kicker">Current filter</span>
          <h3>${escapeHTML(boardLabel)} · Class ${escapeHTML(this.selectedGrade)} · ${escapeHTML(this.selectedSubject || "All subjects")}</h3>
          <p>${this.libraryError ? escapeHTML(this.libraryError) : "Search, download, and read NCERT PDFs inside the app. Downloaded books stay cached across sessions and can be deleted anytime."}</p>
        </div>
      </div>
      <div class="books-chapter-section">
        <div class="books-section-header">
          <h4>NCERT library</h4>
          <span class="badge badge-accent">${books.filter(book => book.downloaded).length} downloaded</span>
        </div>
        ${cards}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  };

  window.StudyPilotBooks.bindProfileListener = function () {
    if (this.profileListenerBound) return;
    this.profileListenerBound = true;

    window.addEventListener("studypilot_profile_updated", () => {
      this.syncFromProfile(true);
      this.loadLibraryCatalog(true);
    });
  };

  window.StudyPilotBooks.init = function () {
    this.bindProfileListener();
    this.syncFromProfile(false);
    this.loadLibraryCatalog(true);
  };

})();
