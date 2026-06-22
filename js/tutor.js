/* ======================================================== */
/* StudyPilot AI Tutor Chat, Quizzes & Flashcards — Grade 10 */
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

    init: function () {
      this.initTabs();
      this.initChat();
      this.bindProfileListener();
      this.syncGradeState(true);
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
    },

    /* ─────────────────────────────────────────────
       TAB SWITCHER (Quizzes ↔ Flashcards)
    ───────────────────────────────────────────── */
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

    /* ─────────────────────────────────────────────
       AI CHAT
    ───────────────────────────────────────────── */
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

    handleUserMessage: function (msg) {
      this.appendMessage(msg, "user");
      const loader = this.appendMessage(`<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`, "bot typing");

      this.fetchTutorResponse(msg)
        .then(({ answer, mode }) => {
          if (loader) loader.remove();
          this.appendMessage(this.formatTutorAnswer(answer, mode), "bot");
        })
        .catch(() => {
          if (loader) loader.remove();
          this.appendMessage(this.buildOfflineFallback(msg), "bot");
        });
    },

    fetchTutorResponse: function (msg) {
      const profile     = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const subjectHint = this.inferSubjectHint(msg);
      const apiBase = this.getApiBaseUrl();

      return fetch(`${apiBase}/api/tutor/respond`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: msg,
          grade: profile ? profile.grade : "10",
          subject: subjectHint,
          student_id: profile && profile.id ? profile.id : undefined
        })
      })
        .then(async res => {
          if (!res.ok) throw new Error("Tutor API unavailable");
          return res.json();
        })
        .then(data => {
          if (!data || !data.ok || !data.answer) throw new Error("Empty tutor response");
          return { answer: data.answer, mode: data.mode || "offline_knowledge" };
        });
    },

    getApiBaseUrl: function () {
      if (window.STUDYPILOT_API_BASE && String(window.STUDYPILOT_API_BASE).trim()) {
        return String(window.STUDYPILOT_API_BASE).replace(/\/+$/, "");
      }

      if (window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return window.location.origin;
      }

      return "http://127.0.0.1:5000";
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
      if (/tamil|திருக்குறள்|சிலப்பதிகாரம்|sangam|kural|valluvar/.test(lowerMsg)) return "Tamil";
      if (/computer|excel|internet|algorithm|spreadsheet|url|browser/.test(lowerMsg)) return "Computer Science";
      return "";
    },

    formatTutorAnswer: function (answer, mode) {
      const badge = mode === "ollama"
        ? `<span class="ai-badge local-badge">🤖 Local AI</span>`
        : `<span class="ai-badge online-badge">✨ AI Tutor</span>`;
      return `${badge}<p>${escapeHTML(answer).replace(/\n/g, "<br>")}</p>`;
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
        const value = Function(`"use strict"; return (${expression});`)();
        if (!Number.isFinite(value)) return null;
        const answer = Number.isInteger(value) ? String(value) : parseFloat(value.toFixed(10)).toString();
        return `${expression} = ${answer}`;
      } catch {
        return null;
      }
    },

    buildOfflineFallback: function (msg) {
      const lowerMsg = msg.toLowerCase();
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const grade = profile ? String(profile.grade || "10") : "10";

      const arithmetic = this.solveArithmeticQuestion(msg);
      if (arithmetic) {
        return `<p>${escapeHTML(arithmetic)}</p>`;
      }

      // Fallbacks for common patterns
      if (/quiz|test me|practice/.test(lowerMsg)) {
        return `<p>The full Ollama tutor is not connected right now. Start the backend with Ollama and I will generate detailed quizzes for Grade ${escapeHTML(grade)}.</p>`;
      }
      if (/flashcard/.test(lowerMsg)) {
        return `<p>The full Ollama tutor is not connected right now. Start the backend with Ollama and I will generate detailed flashcards for Grade ${escapeHTML(grade)}.</p>`;
      }
      if (/hello|hi|hey|namaste/.test(lowerMsg)) {
        const name = profile ? escapeHTML(profile.name || "Scholar") : "Scholar";
        return `<p>Hello, <strong>${name}</strong>! 👋 I am waiting for the full Ollama tutor connection. Once the backend is running, I can answer Grade ${escapeHTML(grade)} questions in detail.</p>`;
      }

      return `<p>I am not connected to the full Ollama tutor right now. Start the StudyPilot backend with Ollama, then ask again for a detailed Grade ${escapeHTML(grade)} answer.</p>`;
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

    /* ─────────────────────────────────────────────
       QUIZZES
    ───────────────────────────────────────────── */
    updateQuizChapters: function () {
      const subjEl = document.getElementById("quiz-subject-select");
      const chapEl = document.getElementById("quiz-chapter-select");
      if (!subjEl || !chapEl) return;

      const subj    = subjEl.value;
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const grade   = profile ? profile.grade : "10";
      const curriculum = window.StudyPilotCurriculum;
      const chapters = curriculum ? curriculum.getQuizChapters(subj, grade) : [];

      chapEl.innerHTML = chapters.length > 0
        ? chapters.map(ch => `<option value="${escapeHTML(ch.key)}">${escapeHTML(ch.label)}</option>`).join("")
        : `<option value="">No quiz available for this subject yet</option>`;
    },

    startQuiz: function () {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      this.activeQuizGrade = profile ? profile.grade : "10";
      this.activeQuizSubject = document.getElementById("quiz-subject-select").value;
      this.activeQuizChapter = document.getElementById("quiz-chapter-select").value;
      this.currentQuestionIndex = 0;
      this.quizScore = 0;
      this.quizTimeSeconds = 0;

      const curriculum = window.StudyPilotCurriculum;
      const quizBank = curriculum ? curriculum.getQuizBank(this.activeQuizGrade) : {};
      const subjectBank = quizBank[this.activeQuizSubject];
      if (!subjectBank || !subjectBank[this.activeQuizChapter]) {
        alert("No quiz questions available for this chapter yet. Please try another chapter.");
        return;
      }

      document.getElementById("quiz-init-view").classList.add("hidden");
      document.getElementById("quiz-active-view").classList.remove("hidden");

      this.startQuizTimer();
      this.loadQuizQuestion();
    },

    startQuizTimer: function () {
      const timerEl = document.getElementById("quiz-timer");
      clearInterval(this.quizTimerInterval);
      this.quizTimerInterval = setInterval(() => {
        this.quizTimeSeconds++;
        const m = Math.floor(this.quizTimeSeconds / 60).toString().padStart(2, "0");
        const s = (this.quizTimeSeconds % 60).toString().padStart(2, "0");
        if (timerEl) timerEl.innerText = `${m}:${s}`;
      }, 1000);
    },

    loadQuizQuestion: function () {
      const curriculum = window.StudyPilotCurriculum;
      const quizBank  = curriculum ? curriculum.getQuizBank(this.activeQuizGrade) : {};
      const questions = quizBank[this.activeQuizSubject][this.activeQuizChapter];
      const qData     = questions[this.currentQuestionIndex];
      const total     = Math.min(questions.length, 5);

      document.getElementById("quiz-quest-num").innerText = `Question ${this.currentQuestionIndex + 1} of ${total}`;
      document.getElementById("quiz-question-text").innerText = qData.q;
      document.getElementById("quiz-progress").style.width = `${((this.currentQuestionIndex + 1) / total) * 100}%`;

      const container = document.getElementById("quiz-options-container");
      container.innerHTML = qData.options.map((opt, i) =>
        `<button class="quiz-opt-btn" onclick="window.StudyPilotTutor.submitAnswer(${i})">${escapeHTML(opt)}</button>`
      ).join("");

      document.getElementById("quiz-feedback").classList.add("hidden");
      document.getElementById("quiz-next-btn").classList.add("hidden");
    },

    submitAnswer: function (selectedIdx) {
      const curriculum = window.StudyPilotCurriculum;
      const quizBank  = curriculum ? curriculum.getQuizBank(this.activeQuizGrade) : {};
      const questions = quizBank[this.activeQuizSubject][this.activeQuizChapter];
      const qData     = questions[this.currentQuestionIndex];
      const buttons   = document.querySelectorAll(".quiz-options .quiz-opt-btn");

      buttons.forEach(btn => btn.disabled = true);

      const feedback = document.getElementById("quiz-feedback");
      feedback.classList.remove("hidden");

      if (selectedIdx === qData.answer) {
        buttons[selectedIdx].classList.add("correct");
        feedback.className = "quiz-feedback-box correct";
        feedback.innerHTML = `<strong>✅ Correct!</strong> ${escapeHTML(qData.explain)}`;
        this.quizScore++;
      } else {
        buttons[selectedIdx].classList.add("incorrect");
        if (buttons[qData.answer]) buttons[qData.answer].classList.add("correct");
        feedback.className = "quiz-feedback-box incorrect";
        feedback.innerHTML = `<strong>❌ Incorrect.</strong> Correct answer: "<em>${escapeHTML(qData.options[qData.answer])}</em>".<br>${escapeHTML(qData.explain)}`;
      }

      document.getElementById("quiz-next-btn").classList.remove("hidden");
    },

    nextQuizQuestion: function () {
      const curriculum = window.StudyPilotCurriculum;
      const quizBank  = curriculum ? curriculum.getQuizBank(this.activeQuizGrade) : {};
      const questions = quizBank[this.activeQuizSubject][this.activeQuizChapter];
      const total     = Math.min(questions.length, 5);

      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < total) {
        this.loadQuizQuestion();
      } else {
        this.completeQuiz(total);
      }
    },

    completeQuiz: function (total) {
      clearInterval(this.quizTimerInterval);
      document.getElementById("quiz-active-view").classList.add("hidden");
      document.getElementById("quiz-result-view").classList.remove("hidden");
      document.getElementById("quiz-final-score").innerText = `${this.quizScore}/${total}`;

      const resultText = document.getElementById("quiz-result-text");
      if (this.quizScore === total) {
        resultText.innerText = "🏆 Perfect score! You're fully prepared on this topic!";
      } else if (this.quizScore >= Math.ceil(total * 0.6)) {
        resultText.innerText = "👍 Good job! A little revision will make it perfect.";
      } else {
        resultText.innerText = "📚 Keep practising. Re-read the chapter and try again!";
      }

      window.StudyPilotDB.addNotification(
        `Quiz: ${this.quizScore}/${total} in ${this.activeQuizSubject}.`,
        "success"
      );
    },

    resetQuiz: function () {
      document.getElementById("quiz-result-view").classList.add("hidden");
      document.getElementById("quiz-init-view").classList.remove("hidden");
    },

    /* ─────────────────────────────────────────────
       FLASHCARDS
    ───────────────────────────────────────────── */
    loadFlashcards: function () {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      this.activeFlashcardGrade = profile ? String(profile.grade || "10") : "10";
      this.flashcardList = window.StudyPilotDB.getFlashcards(this.activeFlashcardGrade);
      if (this.activeFlashcardSubject !== "all" && !this.flashcardList.some(card => card.subject === this.activeFlashcardSubject)) {
        this.activeFlashcardSubject = "all";
      }
      this.filterFlashcards(this.activeFlashcardSubject || "all");
      this.renderFlashcardSubjectFilters();
    },

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
      let msg = rating === 1 ? "Easy — see in 4 days."
              : rating === 2 ? "Medium — see in 2 days."
              : "Hard — see again in 10 mins.";

      window.StudyPilotDB.addNotification(`Flashcard rated: ${msg}`, "info");
      setTimeout(() => this.navigateFlashcard(1), 300);
    },

    navigateFlashcard: function (dir) {
      if (this.filteredCards.length === 0) return;
      this.currentFlashcardIndex = (this.currentFlashcardIndex + dir + this.filteredCards.length) % this.filteredCards.length;
      this.renderFlashcard();
    },

    /* ─────────────────────────────────────────────
       ADD FLASHCARD MODAL
    ───────────────────────────────────────────── */
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

  /* ──────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────── */
  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.StudyPilotTutor.escapeHTMLText = escapeHTML;
})();
