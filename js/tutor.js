/* ======================================================== */
/* StudyPilot AI Tutor Chat, Quizzes & Flashcards â€” Grade 10 */
/* Uses the official NCERT Grade 10 Science curriculum      */
/* ======================================================== */

(function () {

  window.StudyPilotTutor = {
    /* Quiz state */
    activeQuizSubject: "Science",
    activeQuizChapter: "ch3",
    currentQuestionIndex: 0,
    quizScore: 0,
    quizTimerInterval: null,
    quizTimeSeconds: 0,

    /* Flashcard state */
    flashcardList: [],
    currentFlashcardIndex: 0,
    filteredCards: [],
    activeFlashcardSubject: "all",
    activeFlashcardGrade: "10",
    lastSyncedGrade: "10",
    profileListenerBound: false,
    modelCatalog: [],
    selectedModelProvider: "auto",
    selectedModelName: "",
    backendOnline: null,
    modelCatalogLoaded: false,
    modelCatalogLoadPromise: null,
    selectedStudyMode: "learn",
    studyPackLoading: false,
    studyPack: null,
    generatedQuizQuestions: [],
    generatedFlashcards: [],
    generatedPracticeQuestions: [],
    studyPackRequestPromise: null,
    flashcardRequestPromise: null,

    init: function () {
      this.initTabs();
      this.initChat();
      this.bindProfileListener();
      this.loadStudyModePreference();
      this.loadModelPreferences();
      this.syncGradeState(true);
      this.syncModeSelect();
      this.refreshBackendStatus();
      this.refreshModelCatalog(false);
    },

    bindProfileListener: function () {
      if (this.profileListenerBound) return;
      this.profileListenerBound = true;

      window.addEventListener("studypilot_profile_updated", () => {
        this.syncGradeState(false);
      });
    },

    syncGradeState: function (forceResetQuiz) {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const grade = profile ? String(profile.grade || "10") : "10";
      const gradeChanged = this.lastSyncedGrade !== grade;

      this.lastSyncedGrade = grade;
      this.activeQuizGrade = grade;
      this.activeFlashcardGrade = grade;
      this.activeFlashcardSubject = "all";
      this.currentFlashcardIndex = 0;

      if (forceResetQuiz || gradeChanged) {
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.quizTimeSeconds = 0;
        clearInterval(this.quizTimerInterval);

        const quizInitView = document.getElementById("quiz-init-view");
        const quizActiveView = document.getElementById("quiz-active-view");
        const quizResultView = document.getElementById("quiz-result-view");
        if (quizInitView) quizInitView.classList.remove("hidden");
        if (quizActiveView) quizActiveView.classList.add("hidden");
        if (quizResultView) quizResultView.classList.add("hidden");
      }

      this.renderFlashcardSubjectFilters();
      this.loadFlashcards();
      this.updateQuizChapters();
      this.syncModelSelect();
    },

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       TAB SWITCHER (Quizzes â†” Flashcards)
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    initTabs: function () {
      document.querySelectorAll(".tutor-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tutor-tab-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          const tabName = btn.getAttribute("data-tab");
          document.querySelectorAll(".tutor-tab-content").forEach(c => c.classList.add("hidden"));
          document.getElementById(`tutor-tab-${tabName}`).classList.remove("hidden");
        });
      });
    },

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       AI CHAT
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    renderFlashcardSubjectFilters: function () {
      const container = document.querySelector('.flashcard-subject-filters');
      if (!container) return;

      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const grade = profile ? profile.grade : '10';
      const curriculum = window.StudyPilotCurriculum;
      const subjects = curriculum && typeof curriculum.getSubjectsForGrade === 'function'
        ? curriculum.getSubjectsForGrade(grade)
        : (curriculum ? curriculum.getSubjects() : []);

      const chips = [
        '<button class="filter-chip ' + (this.activeFlashcardSubject === 'all' ? 'active' : '') + '" data-filter="all" onclick="window.StudyPilotTutor.filterFlashcards(\'all\')">All</button>',
        ...subjects.map(subject => '<button class="filter-chip ' + (this.activeFlashcardSubject === subject ? 'active' : '') + '" data-filter="' + escapeHTML(subject) + '" onclick="window.StudyPilotTutor.filterFlashcards(\'' + escapeHTML(subject) + '\')">' + escapeHTML(subject) + '</button>')
      ];

      container.innerHTML = chips.join('');
      if (window.lucide) window.lucide.createIcons();
    },

    initChat: function () {
      const input = document.getElementById("tutor-chat-input");
      const btn   = document.getElementById("tutor-chat-send-btn");
      if (!input || !btn) return;

      const triggerSend = () => {
        const query = input.value.trim();
        if (query) { this.handleUserMessage(query); input.value = ""; }
      };

      btn.addEventListener("click", triggerSend);
      input.addEventListener("keypress", e => { if (e.key === "Enter") triggerSend(); });
    },

    loadStudyModePreference: function () {
      try {
        const saved = localStorage.getItem("studypilot_tutor_mode");
        if (saved) this.selectedStudyMode = saved;
      } catch {
        // Local storage is optional.
      }
    },

    saveStudyModePreference: function () {
      try {
        localStorage.setItem("studypilot_tutor_mode", this.selectedStudyMode || "learn");
      } catch {
        // Local storage is optional.
      }
    },

    syncModeSelect: function () {
      const select = document.getElementById("tutor-mode-select");
      if (select) {
        select.value = this.selectedStudyMode || "learn";
      }
    },

    setStudyModeFromSelect: function (value) {
      this.selectedStudyMode = String(value || "learn");
      this.saveStudyModePreference();
      this.syncModeSelect();
      if (window.StudyPilotDB && typeof window.StudyPilotDB.addNotification === "function") {
        window.StudyPilotDB.addNotification(`Tutor mode set to ${this.selectedStudyMode}.`, "info");
      }
    },

    loadModelPreferences: function () {
      try {
        const provider = localStorage.getItem("studypilot_tutor_model_provider");
        const model = localStorage.getItem("studypilot_tutor_model_name");
        if (provider) this.selectedModelProvider = provider;
        if (model) this.selectedModelName = model;
      } catch {
        // Local storage is optional.
      }
    },

    saveModelPreferences: function () {
      try {
        localStorage.setItem("studypilot_tutor_model_provider", this.selectedModelProvider || "auto");
        localStorage.setItem("studypilot_tutor_model_name", this.selectedModelName || "");
      } catch {
        // Local storage is optional.
      }
    },

    refreshModelCatalog: function (showNotification = true) {
      if (!this.canUseRemoteTutor()) {
        this.modelCatalog = [];
        this.modelCatalogLoaded = true;
        this.normalizeSelectedModel();
        this.populateModelSelect();
        this.syncModelSelect();
        return Promise.resolve();
      }

      const apiBase = this.getApiBaseUrl();
      const request = fetch(`${apiBase}/api/tutor/models`, { method: "GET", mode: "cors" })
        .then(async res => {
          if (!res.ok) throw new Error("Model catalog unavailable");
          return res.json();
        })
        .then(data => {
          this.modelCatalog = Array.isArray(data && data.items) ? data.items : [];
          this.modelCatalogLoaded = true;
          this.normalizeSelectedModel();
          this.populateModelSelect();
          this.syncModelSelect();
          if (showNotification && window.StudyPilotDB && typeof window.StudyPilotDB.addNotification === "function") {
            window.StudyPilotDB.addNotification("Local AI models refreshed.", "info");
          }
        })
        .catch(() => {
          this.modelCatalogLoaded = true;
          this.normalizeSelectedModel();
          this.populateModelSelect();
          this.syncModelSelect();
        });

      this.modelCatalogLoadPromise = request;
      return request;
    },

    refreshBackendStatus: function () {
      const statusEl = document.getElementById("tutor-backend-status");
      if (!statusEl) return Promise.resolve();

      statusEl.classList.remove("is-online", "is-offline");
      statusEl.classList.add("is-loading");
      statusEl.textContent = "Checking tutor connection...";

      const apiBase = this.getApiBaseUrl();
      const request = window.StudyPilotApi && typeof window.StudyPilotApi.checkHealth === "function"
        ? window.StudyPilotApi.checkHealth(apiBase)
        : Promise.resolve({ ok: false });

      return request.then(result => {
        const label = window.StudyPilotApi && typeof window.StudyPilotApi.getDisplayLabel === "function"
          ? window.StudyPilotApi.getDisplayLabel(apiBase)
          : apiBase;

        statusEl.classList.remove("is-loading");
        if (result && result.ok) {
          this.backendOnline = true;
          statusEl.classList.add("is-online");
          statusEl.textContent = `Tutor backend online at ${label}.`;
          return result;
        }

        this.backendOnline = false;
        statusEl.classList.add("is-offline");
        statusEl.textContent = "Local study help ready. Connect a backend for Ollama-powered answers.";
        return result;
      }).catch(() => {
        this.backendOnline = false;
        statusEl.classList.remove("is-loading");
        statusEl.classList.add("is-offline");
        statusEl.textContent = "Local study help ready. Connect a backend for Ollama-powered answers.";
      });
    },

    populateModelSelect: function () {
      const select = document.getElementById("tutor-model-select");
      if (!select) return;

      const options = [];
      const catalog = Array.isArray(this.modelCatalog) ? this.modelCatalog : [];
      if (!catalog.some(item => item.provider === "auto")) {
        options.push({ provider: "auto", model: "", label: "Auto", description: "Use the best available local model." });
      }

      catalog.forEach(item => {
        if (!item || !item.provider) return;
        options.push(item);
      });

      const currentValue = this.getModelSelectValue();
      select.innerHTML = options.map(item => {
        const value = `${item.provider || "auto"}::${item.model || ""}`;
        const label = item.label || item.model || item.provider;
        const description = item.description ? ` (${item.description})` : "";
        const disabled = item.available === false ? " disabled" : "";
        const selected = currentValue === value ? " selected" : "";
        return `<option value="${escapeHTML(value)}"${disabled}${selected}>${escapeHTML(label)}${escapeHTML(description)}</option>`;
      }).join("");
    },

    getModelSelectValue: function () {
      return `${this.selectedModelProvider || "auto"}::${this.selectedModelName || ""}`;
    },

    syncModelSelect: function () {
      const select = document.getElementById("tutor-model-select");
      if (!select) return;
      const value = this.getModelSelectValue();
      if (select.value !== value) {
        select.value = value;
      }
    },

    setModelPreferenceFromSelect: function (encodedValue) {
      const [provider = "auto", model = ""] = String(encodedValue || "auto::").split("::");
      this.selectedModelProvider = provider || "auto";
      this.selectedModelName = model || "";
      this.saveModelPreferences();
      this.syncModelSelect();

      if (window.StudyPilotDB && typeof window.StudyPilotDB.addNotification === "function") {
        const label = this.getSelectedModelLabel();
        window.StudyPilotDB.addNotification(`Tutor model set to ${label}.`, "info");
      }
    },

    getSelectedModelLabel: function () {
      const provider = String(this.selectedModelProvider || "auto");
      if (provider === "auto") return "Auto";
      const matched = (this.modelCatalog || []).find(item =>
        String(item.provider || "") === provider &&
        String(item.model || "") === String(this.selectedModelName || "")
      );
      return matched ? matched.label : (this.selectedModelName || provider);
    },

    normalizeSelectedModel: function () {
      const provider = String(this.selectedModelProvider || "auto");
      if (provider === "auto") return;

      const exists = (this.modelCatalog || []).some(item =>
        String(item.provider || "") === provider &&
        String(item.model || "") === String(this.selectedModelName || "")
      );

      if (!exists) {
        this.selectedModelProvider = "auto";
        this.selectedModelName = "";
        this.saveModelPreferences();
      }
    },

    handleUserMessage: function (msg) {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const subjectHint = this.inferSubjectHint(msg);
      if (window.StudyPilotDB && typeof window.StudyPilotDB.trackTutorQuestion === "function") {
        window.StudyPilotDB.trackTutorQuestion(msg, this.selectedStudyMode, subjectHint, {
          weakTopics: profile && Array.isArray(profile.weakSubjects) ? profile.weakSubjects : [],
          strongTopics: profile && Array.isArray(profile.favoriteSubjects) ? profile.favoriteSubjects : [],
        });
      }
      this.appendMessage(msg, "user");
      const loader = this.appendMessage(`<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`, "bot typing");

      this.fetchTutorResponse(msg)
        .then(({ answer, mode, provider, model }) => {
          if (loader) loader.remove();
          this.appendMessage(this.formatTutorAnswer(answer, mode, provider, model), "bot");
          if (window.StudyPilotDB && typeof window.StudyPilotDB.trackTutorAnswer === "function") {
            window.StudyPilotDB.trackTutorAnswer(answer, this.selectedStudyMode, subjectHint, provider || "");
          }
        })
        .catch(() => {
          if (loader) loader.remove();
          this.appendMessage(this.buildOfflineFallback(msg), "bot");
        });
    },

    fetchTutorResponse: function (msg) {
      const profile     = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const subjectHint = this.inferSubjectHint(msg);
      const history     = window.StudyPilotDB.getTutorHistory ? window.StudyPilotDB.getTutorHistory(12) : [];
      const analytics   = window.StudyPilotDB.getStudyAnalytics ? window.StudyPilotDB.getStudyAnalytics() : {};
      const analyticsSummary = window.StudyPilotDB.getStudyAnalyticsSummary ? window.StudyPilotDB.getStudyAnalyticsSummary() : {};

      if (!this.canUseRemoteTutor()) {
        return Promise.resolve({
          answer: this.buildOfflineFallback(msg),
          mode: "offline_browser",
          provider: "browser",
          model: "",
        });
      }

      const apiBase = this.getApiBaseUrl();

      return fetch(`${apiBase}/api/tutor/respond`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: msg,
          grade: profile ? profile.grade : "10",
          subject: subjectHint,
          student_id: profile && profile.id ? profile.id : undefined,
          profile,
          analytics,
          analytics_summary: analyticsSummary,
          history,
          mode: this.selectedStudyMode,
          provider: this.selectedModelProvider,
          model: this.selectedModelName
        })
      })
        .then(async res => {
          if (!res.ok) throw new Error("Tutor API unavailable");
          return res.json();
        })
        .then(data => {
          this.backendOnline = true;
          if (!data || !data.ok || !data.answer) throw new Error("Empty tutor response");
          return {
            answer: data.answer,
            mode: data.study_mode || data.mode || "offline_knowledge",
            provider: data.provider || this.selectedModelProvider,
            model: data.model || data.used_model || this.selectedModelName,
          };
        })
        .catch(() => {
          this.backendOnline = false;
          return {
            answer: this.buildOfflineFallback(msg),
            mode: "offline_browser",
            provider: "browser",
            model: "",
          };
        });
    },

    getApiBaseUrl: function () {
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
    },

    canUseRemoteTutor: function () {
      return this.backendOnline !== false && Boolean(this.getApiBaseUrl());
    },

    inferSubjectHint: function (msg) {
      const lowerMsg = msg.toLowerCase();
      if (/[0-9][0-9\s\+\-\*\/\(\)\.\u00d7\u00f7\u2212\u2013]*[0-9]/.test(lowerMsg)) return "Mathematics";
      if (/math|bodmas|equation|angle|fraction|triangle|algebra|ganita/.test(lowerMsg)) return "Mathematics";
      if (/science|acid|electric|change|magnet|light|photosynthes|respirat|soil|curiosity/.test(lowerMsg)) return "Science";
      if (/history|mughal|delhi sultan|akbar|babur|bhakti|sufi/.test(lowerMsg)) return "Social Science";
      if (/geography|atmosphere|earth|rock|water cycle|climate|vegetation/.test(lowerMsg)) return "Social Science";
      if (/civics|equality|mla|government|democracy|franchise/.test(lowerMsg)) return "Social Science";
      if (/english|tolstoy|galsworthy|cricket|bicycle|fire|poorvi/.test(lowerMsg)) return "English";
      if (/tamil|à®¤à®¿à®°à¯à®•à¯à®•à¯à®±à®³à¯|à®šà®¿à®²à®ªà¯à®ªà®¤à®¿à®•à®¾à®°à®®à¯|sangam|kural|valluvar/.test(lowerMsg)) return "Tamil";
      if (/computer|excel|internet|algorithm|spreadsheet|url|browser/.test(lowerMsg)) return "Computer Science";
      return "";
    },

    formatTutorAnswer: function (answer, mode, provider, model) {
      const normalizedProvider = String(provider || "").toLowerCase();
      const normalizedMode = String(mode || "").toLowerCase();
      const localProvider =
        normalizedProvider.startsWith("ollama") ||
        normalizedProvider === "browser" ||
        normalizedMode.startsWith("offline");
      const studyMode = String(this.selectedStudyMode || mode || "learn");
      const label = model ? escapeHTML(model) : escapeHTML(this.getSelectedModelLabel());
      const providerBadge = normalizedProvider === "browser" || normalizedMode.startsWith("offline")
        ? `<span class="ai-badge browser-badge">📘 Local Study Help</span>`
        : localProvider
          ? `<span class="ai-badge local-badge">🤖 Ollama · ${label}</span>`
          : `<span class="ai-badge online-badge">✨ AI Tutor</span>`;
      const modeBadge = `<span class="ai-badge">${escapeHTML(studyMode)}</span>`;
      return `${providerBadge}${modeBadge}<p>${escapeHTML(answer).replace(/\n/g, "<br>")}</p>`;
    },

    solveArithmeticQuestion: function (msg) {
      const normalized = String(msg || "")
        .replace(/\u00d7/g, "*")
        .replace(/\u00f7/g, "/")
        .replace(/\u2212/g, "-")
        .replace(/\u2013/g, "-")
        .replace(/^(can you\s+)?(what is|whats|what's|calculate|compute|solve|evaluate)\s*[:\-]?\s*/i, "")
        .replace(/[?.!]$/g, "")
        .trim();

      const expression = normalized.replace(/[^0-9+\-*/().\s]/g, " ").replace(/\s+/g, " ").trim();
      if (!expression || !/[0-9]/.test(expression) || !/[+\-*/]/.test(expression)) return null;

      try {
        const integerOnly = !/[./]/.test(expression);
        const value = integerOnly
          ? Function(`"use strict"; return (${expression.replace(/\b\d+\b/g, match => `${match}n`)});`)()
          : Function(`"use strict"; return (${expression});`)();
        const answer = typeof value === "bigint"
          ? value.toLocaleString("en-US")
          : Number.isInteger(value)
            ? String(value)
            : parseFloat(value.toFixed(10)).toString();
        return `${expression} = ${answer}`;
      } catch {
        return null;
      }
    },

    buildOfflineFallback: function (msg) {
      const lowerMsg = msg.toLowerCase();
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const grade = profile ? String(profile.grade || "10") : "10";

      const curriculum = window.StudyPilotCurriculum;
      if (curriculum && typeof curriculum.findKnowledge === "function") {
        const knowledgeHtml = curriculum.findKnowledge(msg, grade);
        if (knowledgeHtml) {
          return knowledgeHtml;
        }
      }

      const arithmetic = this.solveArithmeticQuestion(msg);
      if (arithmetic) {
        return `<p>${escapeHTML(arithmetic)}</p>`;
      }

      if (/hello|hi|hey|namaste/.test(lowerMsg)) {
        const name = profile ? escapeHTML(profile.name || "Scholar") : "Scholar";
        return `<p>Hello, <strong>${name}</strong>! I am ready to help with Grade ${escapeHTML(grade)} NCERT study questions. Ask me about a chapter, a formula, or a tricky concept and I will keep it simple.</p>`;
      }

      const subject = this.inferSubjectHint(msg);
      if (subject === "Science") {
        return `<p>I can still help with the Science chapters already loaded in StudyPilot. Try asking about acids and bases, light and refraction, or electricity, or open a chapter from the panel on the right.</p>`;
      }

      return `<p>I can still help with the NCERT chapters loaded in StudyPilot. Try asking about a chapter, formula, or concept, and I will explain it step by step.</p>`;
    },

    getStudyPackDifficulty: function () {
      const select = document.getElementById("quiz-difficulty-select");
      return select ? String(select.value || "medium") : "medium";
    },

    buildLocalStudyPack: function (tool = "pack", extra = {}) {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const gradeText = String(extra.grade || (profile && profile.grade) || this.activeQuizGrade || "10");
      const grade = parseInt(gradeText, 10) || 10;
      const subject = String(extra.subject || this.activeQuizSubject || this.activeFlashcardSubject || "Science");
      const chapter = String(extra.chapter || this.activeQuizChapter || "");
      const count = Number(extra.count || 5);
      const curriculum = window.StudyPilotCurriculum;

      const quizBank = curriculum && typeof curriculum.getQuizBank === "function"
        ? curriculum.getQuizBank(grade)
        : {};
      const subjectBank = quizBank && quizBank[subject] ? quizBank[subject] : {};
      const chapterQuestions = chapter && Array.isArray(subjectBank[chapter]) ? subjectBank[chapter].slice() : [];
      const allQuestions = Object.values(subjectBank).flat();
      const selectedQuestions = (chapterQuestions.length ? chapterQuestions : allQuestions).slice(0, Math.max(1, count));
      const practiceQuestions = selectedQuestions.map(item => ({
        question: item.q || item.question || "",
        hint: item.explain || item.explanation || "",
      }));

      const flashcards = curriculum && typeof curriculum.getFlashcardsForGrade === "function"
        ? curriculum.getFlashcardsForGrade(grade, subject === "all" ? "" : subject)
        : [];
      const chapterInfo = curriculum && typeof curriculum.getChapterByQuery === "function"
        ? curriculum.getChapterByQuery(chapter || subject, grade)
        : null;
      const chapterHighlights = chapterInfo && Array.isArray(chapterInfo.highlights) ? chapterInfo.highlights : [];
      const summary = chapterInfo
        ? chapterInfo.summary
        : `Use the official NCERT chapter list and study tools for ${subject}.`;
      const notes = chapterInfo
        ? [
            chapterInfo.title,
            "",
            chapterInfo.summary,
            "",
            "Key points:",
            ...chapterHighlights.map(item => `- ${item}`),
          ].join("\n")
        : summary;

      if (tool === "quiz") {
        return {
          ok: true,
          data: {
            quiz_questions: selectedQuestions,
            practice_questions: practiceQuestions,
            summary,
            notes,
          },
        };
      }

      if (tool === "flashcards") {
        return {
          ok: true,
          data: {
            flashcards: flashcards.slice(0, Math.max(1, count)).map(card => ({
              id: card.id,
              subject: card.subject,
              front: card.question,
              back: card.answer,
            })),
            practice_questions: practiceQuestions,
            summary,
            notes,
          },
        };
      }

      return {
        ok: true,
        data: {
          notes,
          summary,
          revision_summary: summary,
          practice_questions: practiceQuestions,
          quiz_questions: selectedQuestions,
          flashcards: flashcards.slice(0, Math.max(1, count)).map(card => ({
            id: card.id,
            subject: card.subject,
            front: card.question,
            back: card.answer,
          })),
        },
      };
    },

    requestStudyPack: function (tool = "pack", extra = {}) {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const analytics = window.StudyPilotDB.getStudyAnalytics ? window.StudyPilotDB.getStudyAnalytics() : {};
      const analyticsSummary = window.StudyPilotDB.getStudyAnalyticsSummary ? window.StudyPilotDB.getStudyAnalyticsSummary() : {};
      const history = window.StudyPilotDB.getTutorHistory ? window.StudyPilotDB.getTutorHistory(12) : [];
      const apiBase = this.getApiBaseUrl();
      const payload = {
        tool,
        grade: profile ? profile.grade : "10",
        profile,
        analytics,
        analytics_summary: analyticsSummary,
        history,
        subject: extra.subject || this.activeQuizSubject || this.activeFlashcardSubject || "",
        chapter: extra.chapter || this.activeQuizChapter || "",
        difficulty: extra.difficulty || this.getStudyPackDifficulty(),
        count: extra.count || 5,
        provider: this.selectedModelProvider,
        model: this.selectedModelName,
      };

      if (!this.canUseRemoteTutor()) {
        return Promise.resolve(this.buildLocalStudyPack(tool, payload));
      }

      return fetch(`${apiBase}/api/study-tools/generate`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(async res => {
        if (!res.ok) throw new Error("Study pack unavailable");
        return res.json();
      }).catch(() => {
        this.backendOnline = false;
        return this.buildLocalStudyPack(tool, payload);
      });
    },

    prepareAiQuiz: function () {
      if (this.studyPackLoading) return this.studyPackRequestPromise || Promise.resolve();
      this.studyPackLoading = true;
      this.renderQuizLoadingState("Generating quiz...");
      const request = this.requestStudyPack("quiz", {
        subject: this.activeQuizSubject,
        chapter: this.activeQuizChapter,
        count: 5,
      })
        .then(data => {
          const pack = data && data.data ? data.data : {};
          this.studyPack = pack;
          this.generatedQuizQuestions = Array.isArray(pack.quiz_questions) ? pack.quiz_questions.slice(0, 5) : [];
          this.generatedPracticeQuestions = Array.isArray(pack.practice_questions) ? pack.practice_questions : [];
          this.studyPackLoading = false;
          return pack;
        })
        .catch(() => {
          this.studyPackLoading = false;
          this.generatedQuizQuestions = [];
          this.generatedPracticeQuestions = [];
          this.renderQuizLoadingState("The AI quiz generator is unavailable right now.");
          throw new Error("Study pack unavailable");
        });
      this.studyPackRequestPromise = request.finally(() => {
        this.studyPackLoading = false;
        this.studyPackRequestPromise = null;
      });
      return this.studyPackRequestPromise;
    },

    prepareAiFlashcards: function () {
      if (this.flashcardRequestPromise) return this.flashcardRequestPromise;
      const request = this.requestStudyPack("flashcards", {
        subject: this.activeFlashcardSubject !== "all" ? this.activeFlashcardSubject : this.activeQuizSubject,
        count: 8,
      })
        .then(data => {
          const pack = data && data.data ? data.data : {};
          this.studyPack = pack;
          this.generatedFlashcards = Array.isArray(pack.flashcards) ? pack.flashcards : [];
          return pack;
        })
        .finally(() => {
          this.flashcardRequestPromise = null;
        });
      this.flashcardRequestPromise = request;
      return request;
    },

    appendMessage: function (htmlContent, type) {
      const container = document.getElementById("tutor-chat-messages");
      if (!container) return null;

      const msgDiv = document.createElement("div");
      msgDiv.className = `chat-message ${type}`;
      msgDiv.innerHTML = type.includes("bot")
        ? htmlContent
        : `<p>${escapeHTML(htmlContent)}</p>`;

      container.appendChild(msgDiv);
      container.scrollTop = container.scrollHeight;

      if (window.renderMathInElement) window.renderMathInElement(msgDiv);
      if (window.lucide) window.lucide.createIcons();

      return msgDiv;
    },

    askQuestion: function (query) {
      this.handleUserMessage(query);
    },

    updateQuizChapters: function () {
      const subjEl = document.getElementById("quiz-subject-select");
      const chapEl = document.getElementById("quiz-chapter-select");
      if (!subjEl || !chapEl) return;

      const subj = subjEl.value;
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const grade = profile ? profile.grade : "10";
      const curriculum = window.StudyPilotCurriculum;
      const chapters = curriculum ? curriculum.getQuizChapters(subj, grade) : [];

      chapEl.innerHTML = chapters.length > 0
        ? chapters.map(ch => `<option value="${escapeHTML(ch.key)}">${escapeHTML(ch.label)}</option>`).join("")
        : `<option value="">No quiz available for this subject yet</option>`;
    },

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       QUIZZES
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       FLASHCARDS
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
filterFlashcards: function (subj) {
      this.activeFlashcardSubject = subj;
      document.querySelectorAll(".flashcard-subject-filters .filter-chip").forEach(c => {
        const chipSubj = c.getAttribute("data-filter");
        c.classList.toggle("active", chipSubj === subj || (subj === "all" && chipSubj === "all"));
      });

      this.filteredCards = subj === "all"
        ? this.flashcardList
        : this.flashcardList.filter(c => c.subject === subj);

      this.currentFlashcardIndex = 0;
      this.renderFlashcard();
    },

    renderFlashcard: function () {
      const cardEl     = document.getElementById("active-flashcard");
      const indicator  = document.getElementById("flashcard-count-indicator");
      const ratingBtns = document.getElementById("spaced-rep-buttons");
      if (!cardEl) return;

      cardEl.classList.remove("flipped");
      if (ratingBtns) ratingBtns.classList.add("hidden");

      if (this.filteredCards.length === 0) {
        document.getElementById("flashcard-front-subject").innerText = "Info";
        document.getElementById("flashcard-front-text").innerText = "No flashcards for this subject. Create one by clicking '+ New Card'!";
        document.getElementById("flashcard-back-subject").innerText = "Info";
        document.getElementById("flashcard-back-text").innerText = "No flashcards found.";
        if (indicator) indicator.innerText = "0 of 0 cards";
        return;
      }

      const card = this.filteredCards[this.currentFlashcardIndex];
      document.getElementById("flashcard-front-subject").innerText = card.subject;
      document.getElementById("flashcard-front-text").innerText = card.question;
      document.getElementById("flashcard-back-subject").innerText = card.subject;
      document.getElementById("flashcard-back-text").innerText = card.answer;
      if (indicator) indicator.innerText = `${this.currentFlashcardIndex + 1} of ${this.filteredCards.length} cards`;

      if (window.renderMathInElement) window.renderMathInElement(cardEl);
    },

    flipFlashcard: function () {
      const cardEl = document.getElementById("active-flashcard");
      if (!cardEl || this.filteredCards.length === 0) return;

      const ratingBtns = document.getElementById("spaced-rep-buttons");
      cardEl.classList.toggle("flipped");
      if (ratingBtns) ratingBtns.classList.toggle("hidden", !cardEl.classList.contains("flipped"));
    },

    rateFlashcard: function (rating) {
      let msg = rating === 1 ? "Easy â€” see in 4 days."
              : rating === 2 ? "Medium â€” see in 2 days."
              : "Hard â€” see again in 10 mins.";

      window.StudyPilotDB.addNotification(`Flashcard rated: ${msg}`, "info");
      setTimeout(() => this.navigateFlashcard(1), 300);
    },

    navigateFlashcard: function (dir) {
      if (this.filteredCards.length === 0) return;
      this.currentFlashcardIndex = (this.currentFlashcardIndex + dir + this.filteredCards.length) % this.filteredCards.length;
      this.renderFlashcard();
    },

    /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       ADD FLASHCARD MODAL
    â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    showAddFlashcardModal: function () {
      const modal  = document.getElementById("modal-add-flashcard");
      const select = document.getElementById("card-input-subject");
      if (!modal || !select) return;

      const curriculum = window.StudyPilotCurriculum;
      const profile = window.StudyPilotDB.getProfile();
      const subjects = curriculum && typeof curriculum.getSubjectsForGrade === "function"
        ? curriculum.getSubjectsForGrade(profile ? profile.grade : "10")
        : (curriculum ? curriculum.getSubjects() : []);
      select.innerHTML = subjects.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join("");

      modal.classList.remove("hidden");
    },

    hideAddFlashcardModal: function () {
      const modal = document.getElementById("modal-add-flashcard");
      if (modal) modal.classList.add("hidden");
    },

    addFlashcardSubmit: function () {
      const subject  = document.getElementById("card-input-subject").value;
      const question = document.getElementById("card-input-question").value.trim();
      const answer   = document.getElementById("card-input-answer").value.trim();

      if (!question || !answer) { alert("Please enter both question and answer."); return; }

      window.StudyPilotDB.addFlashcard(subject, question, answer);
      this.hideAddFlashcardModal();
      document.getElementById("card-input-question").value = "";
      document.getElementById("card-input-answer").value = "";
      this.loadFlashcards();
    }
  };

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     HELPERS
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.StudyPilotTutor.escapeHTMLText = escapeHTML;

  window.StudyPilotTutor.getActiveQuizQuestions = function () {
    if (Array.isArray(this.generatedQuizQuestions) && this.generatedQuizQuestions.length) {
      return this.generatedQuizQuestions;
    }
    return [];
  };

  window.StudyPilotTutor.renderQuizLoadingState = function (message) {
    const initView = document.getElementById("quiz-init-view");
    const activeView = document.getElementById("quiz-active-view");
    const resultView = document.getElementById("quiz-result-view");
    const questionText = document.getElementById("quiz-question-text");
    if (initView) initView.classList.add("hidden");
    if (resultView) resultView.classList.add("hidden");
    if (activeView) activeView.classList.remove("hidden");
    if (questionText) questionText.innerText = message || "Generating quiz...";
    const container = document.getElementById("quiz-options-container");
    if (container) {
      container.innerHTML = `<div class="text-muted">${escapeHTML(message || "Loading...")}</div>`;
    }
  };

  window.StudyPilotTutor.startQuiz = function () {
    const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
    this.activeQuizGrade = profile ? profile.grade : "10";
    this.activeQuizSubject = document.getElementById("quiz-subject-select").value;
    this.activeQuizChapter = document.getElementById("quiz-chapter-select").value;
    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.quizTimeSeconds = 0;

    this.prepareAiQuiz()
      .catch(() => null)
      .finally(() => {
        const questions = this.getActiveQuizQuestions();
        if (!questions.length) {
          this.renderQuizLoadingState("No quiz questions are available right now.");
          return;
        }
        const initView = document.getElementById("quiz-init-view");
        const activeView = document.getElementById("quiz-active-view");
        if (initView) initView.classList.add("hidden");
        if (activeView) activeView.classList.remove("hidden");
        this.startQuizTimer();
        this.loadQuizQuestion();
      });
  };

  window.StudyPilotTutor.startQuizTimer = function () {
    const timerEl = document.getElementById("quiz-timer");
    clearInterval(this.quizTimerInterval);
    this.quizTimerInterval = setInterval(() => {
      this.quizTimeSeconds++;
      const m = Math.floor(this.quizTimeSeconds / 60).toString().padStart(2, "0");
      const s = (this.quizTimeSeconds % 60).toString().padStart(2, "0");
      if (timerEl) timerEl.innerText = `${m}:${s}`;
    }, 1000);
  };

  window.StudyPilotTutor.loadQuizQuestion = function () {
    const questions = this.getActiveQuizQuestions();
    if (!questions.length) return;

    const qData = questions[this.currentQuestionIndex];
    const total = Math.min(questions.length, 5);
    const options = Array.isArray(qData.options) ? qData.options : [];

    document.getElementById("quiz-quest-num").innerText = `Question ${this.currentQuestionIndex + 1} of ${total}`;
    document.getElementById("quiz-question-text").innerText = qData.question || qData.q || "";
    document.getElementById("quiz-progress").style.width = `${((this.currentQuestionIndex + 1) / total) * 100}%`;

    const container = document.getElementById("quiz-options-container");
    if (container) {
      container.innerHTML = options.map((opt, i) => `<button class="quiz-opt-btn" onclick="window.StudyPilotTutor.submitAnswer(${i})">${escapeHTML(opt)}</button>`).join("");
    }

    const feedback = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("quiz-next-btn");
    if (feedback) feedback.classList.add("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");
  };

  window.StudyPilotTutor.submitAnswer = function (selectedIdx) {
    const questions = this.getActiveQuizQuestions();
    if (!questions.length) return;

    const qData = questions[this.currentQuestionIndex];
    const buttons = document.querySelectorAll(".quiz-options .quiz-opt-btn");
    const options = Array.isArray(qData.options) ? qData.options : [];
    const correctAnswer = typeof qData.answer_index === "number" ? qData.answer_index : qData.answer;

    buttons.forEach(btn => btn.disabled = true);

    const feedback = document.getElementById("quiz-feedback");
    if (!feedback) return;
    feedback.classList.remove("hidden");

    if (selectedIdx === correctAnswer) {
      if (buttons[selectedIdx]) buttons[selectedIdx].classList.add("correct");
      feedback.className = "quiz-feedback-box correct";
      feedback.innerHTML = `<strong>Correct!</strong> ${escapeHTML(qData.explanation || qData.explain || "")}`;
      this.quizScore++;
    } else {
      if (buttons[selectedIdx]) buttons[selectedIdx].classList.add("incorrect");
      if (buttons[correctAnswer]) buttons[correctAnswer].classList.add("correct");
      feedback.className = "quiz-feedback-box incorrect";
      feedback.innerHTML = `<strong>Incorrect.</strong> Correct answer: "<em>${escapeHTML(options[correctAnswer] || "")}</em>".<br>${escapeHTML(qData.explanation || qData.explain || "")}`;
    }

    const nextBtn = document.getElementById("quiz-next-btn");
    if (nextBtn) nextBtn.classList.remove("hidden");
  };

  window.StudyPilotTutor.nextQuizQuestion = function () {
    const questions = this.getActiveQuizQuestions();
    if (!questions.length) return;
    const total = Math.min(questions.length, 5);

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < total) {
      this.loadQuizQuestion();
    } else {
      this.completeQuiz(total);
    }
  };

  window.StudyPilotTutor.completeQuiz = function (total) {
    clearInterval(this.quizTimerInterval);
    const activeView = document.getElementById("quiz-active-view");
    const resultView = document.getElementById("quiz-result-view");
    const scoreEl = document.getElementById("quiz-final-score");
    const resultText = document.getElementById("quiz-result-text");
    if (activeView) activeView.classList.add("hidden");
    if (resultView) resultView.classList.remove("hidden");
    if (scoreEl) scoreEl.innerText = `${this.quizScore}/${total}`;

    if (resultText) {
      if (this.quizScore === total) {
        resultText.innerText = "Perfect score. You're fully prepared on this topic.";
      } else if (this.quizScore >= Math.ceil(total * 0.6)) {
        resultText.innerText = "Good job. A little revision will make it perfect.";
      } else {
        resultText.innerText = "Keep practising. Re-read the chapter and try again.";
      }
    }

    if (window.StudyPilotDB && typeof window.StudyPilotDB.trackQuizAttempt === "function") {
      window.StudyPilotDB.trackQuizAttempt({
        subject: this.activeQuizSubject,
        chapter: this.activeQuizChapter,
        score: this.quizScore,
        total,
        difficulty: this.getStudyPackDifficulty(),
        mode: "quiz",
      });

      const ratio = total > 0 ? this.quizScore / total : 0;
      if (this.activeQuizChapter || this.activeQuizSubject) {
        if (ratio >= 0.8 && typeof window.StudyPilotDB.trackStrongTopic === "function") {
          window.StudyPilotDB.trackStrongTopic(this.activeQuizChapter || this.activeQuizSubject);
        } else if (typeof window.StudyPilotDB.trackWeakTopic === "function") {
          window.StudyPilotDB.trackWeakTopic(this.activeQuizChapter || this.activeQuizSubject);
        }
      }
    }

    window.StudyPilotDB.addNotification(`Quiz: ${this.quizScore}/${total} in ${this.activeQuizSubject}.`, "success");
  };

  window.StudyPilotTutor.loadFlashcards = function () {
    const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
    this.activeFlashcardGrade = profile ? String(profile.grade || "10") : "10";
    if (!this.generatedFlashcards.length && !this.flashcardRequestPromise) {
      this.prepareAiFlashcards().then(() => this.loadFlashcards()).catch(() => null);
    }
    this.flashcardList = this.generatedFlashcards.length
      ? this.generatedFlashcards.map((card, index) => ({
          id: card.id || `ai_fc_${index}`,
          subject: card.subject || this.activeFlashcardSubject || "Revision",
          question: card.front || card.question || "",
          answer: card.back || card.answer || "",
          ease: 0,
          nextReview: "",
        }))
      : window.StudyPilotDB.getFlashcards(this.activeFlashcardGrade);
    if (this.activeFlashcardSubject !== "all" && !this.flashcardList.some(card => card.subject === this.activeFlashcardSubject)) {
      this.activeFlashcardSubject = "all";
    }
    this.filterFlashcards(this.activeFlashcardSubject || "all");
    this.renderFlashcardSubjectFilters();
  };

  window.StudyPilotTutor.generateStudyPack = function (tool, extra) {
    return this.requestStudyPack(tool, extra);
  };
})();
