/* ======================================================== */
/* StudyPilot NCERT Books Library                           */
/* Local PDFs inside the app + official portal shortcuts    */
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
    ncert: ["Science", "Mathematics", "Social Science", "English", "Tamil", "Hindi", "Computer Science"],
    tamil: ["Tamil", "English", "Mathematics", "Science", "Social Science", "Computer Science"],
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
    selectedGrade: "10",
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
      const grade = String(profile && profile.grade ? profile.grade : "10");
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
      this.selectedGrade = String(grade);
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
      if (!modal || !title || !subtitle || !frame) return;

      const resolvedBook = book || this.getSelectedBook();
      if (!resolvedBook) return;

      this.viewerBook = resolvedBook;
      title.textContent = resolvedBook.title || "NCERT Book";
      subtitle.textContent = resolvedBook.description || "Local PDF loaded from the StudyPilot library.";
      frame.src = resolvedBook.localPdfUrl || resolvedBook.pdfUrl || resolvedBook.pageUrl || "";
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
    if (window.StudyPilotApi && typeof window.StudyPilotApi.getBaseUrl === "function") {
      return window.StudyPilotApi.getBaseUrl();
    }
    if (window.STUDYPILOT_API_BASE && String(window.STUDYPILOT_API_BASE).trim()) {
      return String(window.STUDYPILOT_API_BASE).replace(/\/+$/, "");
    }
    if (window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
      return window.location.origin;
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

  window.StudyPilotBooks.getBooks = function (boardKey, grade, subject) {
    if (boardKey !== "ncert") return [];
    const books = Array.isArray(this.libraryCatalog) ? this.libraryCatalog : [];
    return books.filter(book => {
      const matchesGrade = String(book.grade || "") === String(grade);
      const matchesSubject = !subject || String(book.subject || "").toLowerCase() === String(subject || "").toLowerCase();
      const matchesDownload = this.libraryDownloadedFilter === "all"
        || (this.libraryDownloadedFilter === "downloaded" && book.downloaded)
        || (this.libraryDownloadedFilter === "online" && !book.downloaded);
      const query = String(this.libraryQuery || "").toLowerCase();
      const queryMatch = !query || [
        book.grade_label,
        book.subject,
        book.book_title,
        book.chapter_label,
      ].join(" ").toLowerCase().includes(query);
      return matchesGrade && matchesSubject && matchesDownload && queryMatch;
    }).map(book => ({ ...book, key: book.id }));
  };

  window.StudyPilotBooks.getSelectedBook = function () {
    const books = this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject);
    return books.find(book => book.id === this.selectedBookKey) || books[0] || null;
  };

  window.StudyPilotBooks.getBookById = function (bookId) {
    const books = Array.isArray(this.libraryCatalog) ? this.libraryCatalog : [];
    return books.find(book => book.id === bookId) || this.getBooks(this.selectedBoard, this.selectedGrade, this.selectedSubject).find(book => book.id === bookId) || null;
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
    const apiBase = this.getApiBaseUrl();
    return fetch(`${apiBase}/api/library/books/${encodeURIComponent(bookId)}/download`, {
      method: "POST",
      mode: "cors",
    })
      .then(async res => {
        if (!res.ok) throw new Error("Download failed");
        return res.json();
      })
      .then(() => this.loadLibraryCatalog(true));
  };

  window.StudyPilotBooks.deleteBook = function (bookId) {
    const apiBase = this.getApiBaseUrl();
    return fetch(`${apiBase}/api/library/books/${encodeURIComponent(bookId)}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then(async res => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => this.loadLibraryCatalog(true));
  };

  window.StudyPilotBooks.openViewer = function (book) {
    const resolvedBook = book || this.getSelectedBook();
    if (!resolvedBook) return;

    if (!resolvedBook.downloaded) {
      this.downloadBook(resolvedBook.id).then(() => this.openViewer(this.getBookById(resolvedBook.id))).catch(() => null);
      return;
    }

    const modal = document.getElementById("book-viewer-modal");
    const title = document.getElementById("book-viewer-title");
    const subtitle = document.getElementById("book-viewer-subtitle");
    const frame = document.getElementById("book-viewer-frame");
    if (!modal || !title || !subtitle || !frame) return;

    title.textContent = `${resolvedBook.book_title || "NCERT Book"} - ${resolvedBook.chapter_label || "Book"}`;
    subtitle.textContent = `${resolvedBook.grade_label || `Class ${resolvedBook.grade}`} · ${resolvedBook.subject}`;
    frame.src = resolvedBook.local_url || resolvedBook.page_url || "";
    modal.classList.remove("hidden");
    this.viewerBook = resolvedBook;
  };

  window.StudyPilotBooks.closeViewer = function () {
    const modal = document.getElementById("book-viewer-modal");
    const frame = document.getElementById("book-viewer-frame");
    if (frame) frame.src = "about:blank";
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

  window.StudyPilotBooks.openSelectedPage = function () {
    const book = this.getSelectedBook();
    if (!book) {
      this.openBoardPortal();
      return;
    }
    this.openViewer(book);
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

    const cards = books.length ? books.map(book => `
      <article class="books-chapter-card">
        <div>
          <span class="books-kicker">${escapeHTML(book.grade_label || `Class ${book.grade}`)} · ${escapeHTML(book.subject)}</span>
          <h4>${escapeHTML(book.book_title)}</h4>
          <p>${escapeHTML(book.chapter_label)}</p>
        </div>
        <div class="books-chapter-actions">
          <button class="btn btn-primary btn-sm" type="button" onclick="window.StudyPilotBooks.openViewer(window.StudyPilotBooks.getBookById('${escapeHTML(book.id)}'))">${book.downloaded ? "Open offline" : "Download & open"}</button>
          ${book.downloaded
            ? `<button class="btn btn-outline btn-sm" type="button" onclick="window.StudyPilotBooks.deleteBook('${escapeHTML(book.id)}')">Delete</button>`
            : `<button class="btn btn-outline btn-sm" type="button" onclick="window.StudyPilotBooks.downloadBook('${escapeHTML(book.id)}')">Download</button>`}
          <button class="btn btn-secondary btn-sm" type="button" onclick="window.open('${escapeHTML(book.page_url || "https://ncert.nic.in/textbook.php")}', '_blank', 'noopener,noreferrer')">Portal</button>
        </div>
      </article>
    `).join("") : `
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
