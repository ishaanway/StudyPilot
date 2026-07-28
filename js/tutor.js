/* ======================================================== */
/* StudyPilot AI Tutor Chat, Quizzes, & Flashcards Core JS */
/* ======================================================== */

(function () {
  // 1. Heuristics fallback database for all grades (Pre-KG to 12)
  const LOCAL_KNOWLEDGE = {
    // Early Years fallback
    "prekg": {
      prompts: ["Trace letter A", "Shapes game", "Count fruits"],
      responses: {
        "trace": "<h3>English: Tracing Letter A</h3><p>Let's draw! Start at the top point. Draw one slidey line down to the left. Go back to the top and draw another slidey line down to the right. Now draw a bridge line in the middle! Great job, you made an <strong>A</strong>! 🍎</p>",
        "shapes": "<h3>Mathematics: Shapes</h3><p>Look at your ball: it is a <strong>Circle</strong>! Look at your building block: it has flat sides, making it a <strong>Square</strong>! How many circles can you find in your room?</p>",
        "count": "<h3>Mathematics: Counting</h3><p>Let's count apples! 🍎 one... 🍎 🍎 two... 🍎 🍎 🍎 three! You have <strong>three</strong> sweet apples! Can you count on your fingers up to five?</p>"
      }
    },
    // Primary school fallback
    "5": {
      prompts: ["Explain Plant Reproduction", "How seed germinates", "Large Numbers placing"],
      responses: {
        "plant": "<h3>Science: Plant Reproduction</h3><p>Plants reproduce in different ways, mostly from <strong>seeds</strong>. Seeds need to be scattered so they don't fight for sunlight. This is called <strong>Seed Dispersal</strong>, and it happens through Wind (e.g. dandelion), Water (e.g. coconut), Animals (e.g. seeds sticking to fur), or Explosion (e.g. peas popping out).</p>",
        "germinate": "<h3>Science: Germination</h3><p>Germination is the process where a baby plant (embryo) grows out of a seed. A seed needs three main things to wake up: <strong>Water</strong> (to soften the shell), <strong>Oxygen/Air</strong> (to breathe), and <strong>Warmth/Sunlight</strong> (to activate growth cells).</p>"
      }
    },
    // Middle school fallback (Grade 7 - Curiosity & Ganita Prakash)
    "7": {
      prompts: ["Explain Acids & Bases Ch 2", "Explain Electric Circuits Ch 3", "Explain Parallel Lines Ch 5", "Explain BODMAS rules Ch 2"],
      responses: {
        "acids": "<h3>Science: Ch 2 Acids and Bases</h3><p>Acids are sour and turn <strong>blue litmus RED</strong> (like lemon citric acid). Bases are bitter, feel soapy, and turn <strong>red litmus BLUE</strong> (like soap). When mixed, they neutralize, forming <strong>Salt + Water + Heat</strong>.</p>",
        "electricity": "<h3>Science: Ch 3 Electricity Circuits</h3><p>Electric current requires a closed pathway. A <strong>Battery</strong> is two or more cells joined positive-to-negative. <strong>Fuses</strong> protect against short circuits by melting when current is too high. <strong>Electromagnets</strong> are temporary magnets made by running current through wire coils.</p>",
        "parallel": "<h3>Maths: Ch 5 Parallel Lines</h3><p>Parallel lines never meet. When cut by a <strong>transversal</strong>, they form: 1. <em>Corresponding angles</em> (equal), 2. <em>Alternate interior angles</em> (equal), and 3. <em>Co-interior angles</em> (add to 180°).</p>",
        "bodmas": "<h3>Maths: Ch 2 Arithmetic Expressions</h3><p>Always solve expressions in the order of <strong>BODMAS</strong>: 1. Brackets, 2. Of (Orders/Powers), 3. Division & Multiplication, 4. Addition & Subtraction (left-to-right).</p>"
      }
    },
    // Secondary fallback (Grade 10)
    "10": {
      prompts: ["Ohm's Law in Electricity", "pH Scale definition", "Trigonometry basics"],
      responses: {
        "ohm": "<h3>Science: Ohm's Law</h3><p>Ohm's Law states that electric current (I) flowing in a conductor is directly proportional to potential difference (V) across its ends, keeping temperature constant. Formula: <br><code>Potential Difference (V) = Current (I) * Resistance (R)</code>. Unit of resistance is the Ohm (Ω).</p>",
        "ph": "<h3>Science: pH Scale</h3><p>The pH scale measures how acidic or basic a water solution is, ranging from 0 to 14. <strong>pH 7 is Neutral</strong> (pure water). <strong>pH < 7 is Acidic</strong> (lower is stronger acid). <strong>pH > 7 is Basic/Alkaline</strong> (higher is stronger base).</p>"
      }
    },
    // Senior secondary fallback (Grade 12)
    "12": {
      prompts: ["Kirchhoff's Circuit Laws", "Ray Optics prism formula", "Accountancy Partnership Ledger"],
      responses: {
        "kirchhoff": "<h3>Physics: Kirchhoff's Laws</h3><p>Kirchhoff's circuit laws solve complex wiring networks:</p><ol><li><strong>Junction Rule (KCL):</strong> The sum of currents entering any junction equals the sum of currents leaving it (Conservation of Charge).</li><li><strong>Loop Rule (KVL):</strong> The algebraic sum of changes in potential around any closed loop is zero (Conservation of Energy).</li></ol>",
        "prism": "<h3>Physics: Prism Formula</h3><p>When light passes through a glass prism, the prism formula relates refractive index (μ), angle of prism (A), and angle of minimum deviation (D_m): <br><p style='text-align:center;'>\[\mu = \frac{\sin\left(\frac{A + D_m}{2}\right)}{\sin\left(\frac{A}{2}\right)}\]</p></p>"
      }
    }
  };

  // Dynamic Quiz Database mapped by Grade
  const GRADE_QUIZZES = {
    "pkg": {
      subjects: ["Mathematics", "English"],
      questions: {
        Mathematics: [
          { q: "Count the stars: ⭐ ⭐ ⭐", options: ["2", "3", "5", "1"], answer: 1, explain: "Count: one, two, three! There are 3 stars." }
        ],
        English: [
          { q: "What sound does 'A' make?", options: ["Ah (Apple)", "Buh (Ball)", "Cuh (Cat)", "Duh (Dog)"], answer: 0, explain: "'A' makes the 'Ah' phonics sound, as in Apple." }
        ]
      }
    },
    "7": {
      subjects: ["Science", "Mathematics"],
      questions: {
        Science: [
          { q: "What is a battery in an electrical circuit?", options: ["A single cell generating voltage", "A combination of two or more cells connected together", "A device that measures current", "A fuse wire"], answer: 1, explain: "A battery is a combination of two or more cells joined in series (positive terminal of one cell connected to negative terminal of the next)." },
          { q: "Which safety device melts when excessive current flows in a circuit?", options: ["Electric Bell", "Switch", "Fuse", "Electromagnet"], answer: 2, explain: "A fuse contains a wire with a low melting point. If current exceeds safe limits, the wire melts, breaking the circuit to prevent fires." }
        ],
        Mathematics: [
          { q: "Solve the expression: 40 ÷ (5 * 2) - 3", options: ["5", "1", "13", "0"], answer: 1, explain: "Following BODMAS: Brackets first (5*2 = 10). Then division (40÷10 = 4). Lastly subtraction (4 - 3 = 1)." }
        ]
      }
    },
    "12": {
      subjects: ["Physics", "Mathematics"],
      questions: {
        Physics: [
          { q: "According to Kirchhoff's Junction Rule, what is conserved?", options: ["Energy", "Mass", "Charge", "Momentum"], answer: 2, explain: "Kirchhoff's Junction Rule states the sum of currents entering is equal to currents leaving, which is a statement of Conservation of Charge." }
        ],
        Mathematics: [
          { q: "What is the derivative of sin(x) with respect to x?", options: ["cos(x)", "-cos(x)", "tan(x)", "sec^2(x)"], answer: 0, explain: "The standard calculus derivative formula gives d/dx [sin(x)] = cos(x)." }
        ]
      }
    }
  };

  window.StudyPilotTutor = {
    activeQuizSubject: "Science",
    activeQuizChapter: "",
    currentQuestionIndex: 0,
    quizScore: 0,
    quizTimerInterval: null,
    quizTimeSeconds: 0,

    flashcardList: [],
    currentFlashcardIndex: 0,
    filteredCards: [],
    plannerSummaryCache: {},

    chatHistory: [],

    init: function () {
      this.initTabs();
      this.initChat();
      this.updateTutorWelcomeLabels();
      this.updateQuizChapters();
      this.loadFlashcards();
      this.chatHistory = [];
    },

    initTabs: function () {
      const tabBtns = document.querySelectorAll(".tutor-tab-btn");
      tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          tabBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          const tabName = btn.getAttribute("data-tab");
          document.querySelectorAll(".tutor-tab-content").forEach(c => c.classList.add("hidden"));
          document.getElementById(`tutor-tab-${tabName}`).classList.remove("hidden");

          if (tabName === "feed-books") {
            window.StudyPilotTutor.loadUploadedBooks();
          }
        });
      });
    },

    updateTutorWelcomeLabels: function () {
      const profile = window.StudyPilotDB.getProfile();
      const gradeLbl = document.getElementById("tutor-bot-grade-lbl");
      const promptsBox = document.getElementById("tutor-chat-quick-prompts");

      if (gradeLbl) {
        gradeLbl.innerText = `Grade ${profile.grade === 'prekg' ? 'Pre-KG' : profile.grade} CBSE Coach${profile.grade === '11' || profile.grade === '12' ? ' (' + profile.stream + ')' : ''}`;
      }

      if (promptsBox) {
        // Resolve grade group for quick prompts
        let group = "7";
        if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") group = "prekg";
        else if (profile.grade === "5") group = "5";
        else if (profile.grade === "10") group = "10";
        else if (profile.grade === "11" || profile.grade === "12") group = "12";

        const pData = LOCAL_KNOWLEDGE[group] || LOCAL_KNOWLEDGE["7"];
        
        promptsBox.innerHTML = pData.prompts.map(p => {
          return `<button onclick="window.StudyPilotTutor.askQuestion('${escapeHTML(p)}')">${escapeHTML(p)}</button>`;
        }).join("");
      }
    },

    // AI Chatbot Core
    initChat: function () {
      const input = document.getElementById("tutor-chat-input");
      const btn = document.getElementById("tutor-chat-send-btn");
      if (!input || !btn) return;

      const triggerSend = () => {
        const query = input.value.trim();
        if (query) {
          this.handleUserMessage(query);
          input.value = "";
        }
      };

      btn.onclick = triggerSend;
      input.onkeypress = (e) => {
        if (e.key === "Enter") triggerSend();
      };
    },

    inferSubjectHint: function (msg, profile) {
      const text = String(msg || "").toLowerCase();
      const board = String(profile && profile.board ? profile.board : "").toLowerCase();

      const subjectHints = [
        ["Computer Science", ["computer", "coding", "programming", "algorithm", "browser", "internet", "spreadsheet", "network"]],
        ["Social Science", ["social science", "history", "geography", "civics", "economics", "democracy", "map"]],
        ["Mathematics", ["math", "mathematics", "algebra", "geometry", "fraction", "equation", "ratio", "percent", "probability", "trigonometry"]],
        ["Science", ["science", "physics", "chemistry", "biology", "acid", "base", "electric", "circuit", "light", "heat", "force", "pressure", "cell", "photosynthesis"]],
        ["English", ["english", "grammar", "essay", "letter", "comprehension", "poem", "poetry", "noun", "verb", "tense"]],
      ];

      for (const [subject, keywords] of subjectHints) {
        if (keywords.some(keyword => text.includes(keyword))) {
          return subject;
        }
      }

      return "";
    },

    handleUserMessage: async function (msg) {
      this.appendMessage(msg, "user");
      
      this.chatHistory = this.chatHistory || [];
      this.chatHistory.push({ role: "user", content: msg });

      const loader = this.appendMessage("AI is thinking...", "bot temp");
      
      const profile = window.StudyPilotDB.getProfile();
      const backendStudentId = profile.backendStudentId || null;
      const apiBase = this.getApiBaseUrl();

      try {
        const payload = {
          question: msg,
          student_id: backendStudentId,
          grade: profile.grade,
          subject: this.inferSubjectHint(msg, profile),
          mode: "learn",
          history: this.chatHistory.slice(0, -1),
          profile: profile,
          provider: "ollama",
          model: profile.ollamaModel || "auto"
        };

        const response = await fetch(`${apiBase}/api/tutor/respond`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (loader) loader.remove();

        if (!response.ok) {
          throw new Error(`API returned error code: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.ok) {
          const replyText = data.answer;
          this.chatHistory.push({ role: "assistant", content: replyText });
          
          const formattedReply = replyText.replace(/\n/g, "<br>");
          
          let sourceHtml = "";
          if (data.sources && data.sources.length > 0) {
            const uniqueSources = [];
            const seen = new Set();
            data.sources.forEach(src => {
              const label = `${src.book_title || "Book"} (Ch ${src.chapter_number || src.title || ""})`;
              if (!seen.has(label)) {
                seen.add(label);
                uniqueSources.push(src);
              }
            });
            sourceHtml = `<div class="tutor-chat-sources" style="margin-top:0.5rem; font-size:0.75rem; color:var(--text-muted);">
              <strong>Sources cited:</strong> ${uniqueSources.map(s => `<span class="badge badge-indigo" style="font-size:0.68rem; margin-right:0.25rem;">${escapeHTML(s.book_title || "Book")} Ch ${s.chapter_number || s.title || ""}</span>`).join("")}
            </div>`;
          }

          this.appendMessage(`<p>${formattedReply}</p>${sourceHtml}`, "bot");
        } else {
          throw new Error(data ? data.error : "Unknown error");
        }

      } catch (error) {
        console.error("Local RAG API Error: ", error);
        if (loader) loader.remove();
        this.handleLocalFallbackMessage(msg);
      }
    },

    handleLocalFallbackMessage: function (msg) {
      const profile = window.StudyPilotDB.getProfile();
      const lower = msg.toLowerCase();
      
      let group = "7";
      if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") group = "prekg";
      else if (profile.grade === "5") group = "5";
      else if (profile.grade === "10") group = "10";
      else if (profile.grade === "11" || profile.grade === "12") group = "12";

      const knowledge = LOCAL_KNOWLEDGE[group] || LOCAL_KNOWLEDGE["7"];
      let responseHTML = "";

      // Match keywords
      let matched = false;
      for (let key in knowledge.responses) {
        if (lower.includes(key)) {
          responseHTML = knowledge.responses[key];
          matched = true;
          break;
        }
      }

      if (!matched) {
        // Global keywords fallback
        if (lower.includes("acid") || lower.includes("base")) {
          responseHTML = LOCAL_KNOWLEDGE["7"].responses["acids"];
        } else if (lower.includes("electric") || lower.includes("circuit")) {
          responseHTML = LOCAL_KNOWLEDGE["7"].responses["electricity"];
        } else if (lower.includes("parallel") || lower.includes("line")) {
          responseHTML = LOCAL_KNOWLEDGE["7"].responses["parallel"];
        } else if (lower.includes("bodmas") || lower.includes("order")) {
          responseHTML = LOCAL_KNOWLEDGE["7"].responses["bodmas"];
        } else {
          responseHTML = `<p>I am your local study buddy. Please make sure the StudyPilot backend is running and Ollama is started locally to ask me *any* question about the CBSE Grade 7 syllabus.</p>
            <p>Or, try asking me one of our preloaded topics: <strong>"${knowledge.prompts.join('", "')}"</strong>!</p>`;
        }
      }

      this.appendMessage(responseHTML, "bot");
    },

    syncLocalBooks: async function (event) {
      if (event) event.preventDefault();

      const apiBase = this.getApiBaseUrl();
      const statusBox = document.getElementById("feed-books-status");
      const triggerBtn = event && event.currentTarget ? event.currentTarget : null;
      if (!statusBox || !triggerBtn) return;

      try {
        statusBox.classList.remove("hidden");
        statusBox.style.color = "var(--text-main)";
        statusBox.innerHTML = `<span>⏳ <strong>Indexing downloaded books...</strong> Importing local PDFs from the StudyPilot library into the AI Tutor.</span>`;
        triggerBtn.disabled = true;

        const response = await fetch(`${apiBase}/api/tutor/sync-local-books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ refresh: false })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        statusBox.style.color = "#166534";
        statusBox.innerHTML = `<span>✅ <strong>Synced!</strong> ${escapeHTML(data.message || "Downloaded books were indexed.")}</span>`;
        if (window.StudyPilotDB && typeof window.StudyPilotDB.addNotification === "function") {
          window.StudyPilotDB.addNotification(data.message || "Local books indexed for AI tutor.", "success");
        }
      } catch (error) {
        console.error("Error syncing local books:", error);
        statusBox.style.color = "var(--red-text)";
        statusBox.innerHTML = `<span>⚠️ <strong>Sync failed:</strong> ${escapeHTML(error.message || "Unable to index local textbooks.")}</span>`;
      } finally {
        triggerBtn.disabled = false;
      }
    },

    appendMessage: function (htmlContent, type) {
      const container = document.getElementById("tutor-chat-messages");
      if (!container) return null;

      const msgDiv = document.createElement("div");
      msgDiv.className = `chat-message ${type}`;
      msgDiv.innerHTML = type.includes("bot") ? htmlContent : `<p>${escapeHTML(htmlContent)}</p>`;
      
      container.appendChild(msgDiv);
      container.scrollTop = container.scrollHeight;
      
      if (window.renderMathInElement) {
        window.renderMathInElement(msgDiv);
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }

      return msgDiv;
    },

    askQuestion: function (query) {
      this.handleUserMessage(query);
    },

    capturePlannerSummary: function (payload) {
      if (!payload || !payload.chapterId) return;
      this.plannerSummaryCache[payload.chapterId] = payload;
    },

    showPlannerChapterSummary: function (payload) {
      if (!payload || !payload.chapterId) return;
      this.capturePlannerSummary(payload);

      const summaryHtml = payload.summaryHtml || `<p>${escapeHTML((payload.summaryData && payload.summaryData.summary) || "Summary is not available yet.")}</p>`;
      const chapterTitle = escapeHTML(payload.chapterTitle || "Selected chapter");
      const subject = escapeHTML(payload.subject || "Subject");

      this.appendMessage(
        `
          <div>
            <span class="badge badge-indigo">Planner Summary</span>
            <h3 style="margin:0.5rem 0 0.35rem 0;">${chapterTitle}</h3>
            <p style="margin-bottom:0.75rem;"><strong>${subject}</strong> chapter summary prepared from the PDF.</p>
            ${summaryHtml}
          </div>
        `,
        "bot"
      );
    },

    // Practice Quizzes
    updateQuizChapters: function () {
      const subjSelect = document.getElementById("quiz-subject-select");
      const chapSelect = document.getElementById("quiz-chapter-select");
      if (!subjSelect || !chapSelect) return;

      const profile = window.StudyPilotDB.getProfile();
      
      // Load active subjects for user grade
      let subGroup = "7";
      if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") subGroup = "pkg";
      else if (profile.grade === "11" || profile.grade === "12") subGroup = "12";

      const quizData = GRADE_QUIZZES[subGroup] || GRADE_QUIZZES["7"];
      
      // Sync subjects list select
      if (subjSelect.innerHTML === "") {
        subjSelect.innerHTML = quizData.subjects.map(s => `<option value="${s}">${s}</option>`).join("");
      }

      const activeSubject = subjSelect.value || quizData.subjects[0];
      
      // Populate chapter choices
      if (subGroup === "pkg") {
        chapSelect.innerHTML = `<option value="Mathematics">Chapter 1: Trace & Count</option>`;
      } else if (subGroup === "12") {
        if (activeSubject === "Physics") {
          chapSelect.innerHTML = `<option value="Physics">Chapter 1: Kirchhoff's network</option>`;
        } else {
          chapSelect.innerHTML = `<option value="Mathematics">Chapter 1: Relations & Calculus</option>`;
        }
      } else {
        // Grade 7
        if (activeSubject === "Science") {
          chapSelect.innerHTML = `<option value="ch3">Chapter 3: Electricity Circuits</option>`;
        } else {
          chapSelect.innerHTML = `<option value="ch2">Chapter 2: Arithmetic Expressions</option>`;
        }
      }
    },

    startQuiz: function () {
      this.activeQuizSubject = document.getElementById("quiz-subject-select").value;
      this.activeQuizChapter = document.getElementById("quiz-chapter-select").value;
      this.currentQuestionIndex = 0;
      this.quizScore = 0;
      this.quizTimeSeconds = 0;

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
        let m = Math.floor(this.quizTimeSeconds / 60).toString().padStart(2, '0');
        let s = (this.quizTimeSeconds % 60).toString().padStart(2, '0');
        timerEl.innerText = `${m}:${s}`;
      }, 1000);
    },

    loadQuizQuestion: function () {
      const profile = window.StudyPilotDB.getProfile();
      let subGroup = "7";
      if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") subGroup = "pkg";
      else if (profile.grade === "11" || profile.grade === "12") subGroup = "12";

      const quizData = GRADE_QUIZZES[subGroup] || GRADE_QUIZZES["7"];
      
      // Science Ch 3 or Maths Ch 2, otherwise fallback
      let qList = quizData.questions[this.activeQuizSubject];
      if (!qList && this.activeQuizSubject === "Science") qList = quizData.questions["Science"]["ch3"];
      if (!qList && this.activeQuizSubject === "Mathematics") qList = quizData.questions["Mathematics"]["ch2"];
      if (!qList) qList = GRADE_QUIZZES["7"].questions["Science"]; // Hard fallback

      const qData = qList[this.currentQuestionIndex] || qList[0];

      document.getElementById("quiz-quest-num").innerText = `Question ${this.currentQuestionIndex + 1} of ${qList.length}`;
      document.getElementById("quiz-question-text").innerText = qData.q;
      document.getElementById("quiz-progress").style.width = `${((this.currentQuestionIndex + 1) / qList.length) * 100}%`;

      const container = document.getElementById("quiz-options-container");
      container.innerHTML = qData.options.map((opt, i) => {
        return `<button class="quiz-opt-btn" onclick="window.StudyPilotTutor.submitAnswer(${i})">${escapeHTML(opt)}</button>`;
      }).join("");

      document.getElementById("quiz-feedback").classList.add("hidden");
      document.getElementById("quiz-next-btn").classList.add("hidden");
    },

    submitAnswer: function (selectedIdx) {
      const profile = window.StudyPilotDB.getProfile();
      let subGroup = "7";
      if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") subGroup = "pkg";
      else if (profile.grade === "11" || profile.grade === "12") subGroup = "12";

      const quizData = GRADE_QUIZZES[subGroup] || GRADE_QUIZZES["7"];
      let qList = quizData.questions[this.activeQuizSubject];
      if (!qList && this.activeQuizSubject === "Science") qList = quizData.questions["Science"]["ch3"];
      if (!qList && this.activeQuizSubject === "Mathematics") qList = quizData.questions["Mathematics"]["ch2"];
      if (!qList) qList = GRADE_QUIZZES["7"].questions["Science"];

      const qData = qList[this.currentQuestionIndex] || qList[0];
      const buttons = document.querySelectorAll(".quiz-options .quiz-opt-btn");

      buttons.forEach(btn => btn.disabled = true);

      const feedback = document.getElementById("quiz-feedback");
      feedback.classList.remove("hidden");

      if (selectedIdx === qData.answer) {
        buttons[selectedIdx].classList.add("correct");
        feedback.className = "quiz-feedback-box correct";
        feedback.innerHTML = `<strong>Correct!</strong> ${escapeHTML(qData.explain)}`;
        this.quizScore++;
      } else {
        buttons[selectedIdx].classList.add("incorrect");
        buttons[qData.answer].classList.add("correct");
        feedback.className = "quiz-feedback-box incorrect";
        feedback.innerHTML = `<strong>Incorrect.</strong> The correct answer is: "${escapeHTML(qData.options[qData.answer])}". <br>${escapeHTML(qData.explain)}`;
      }

      document.getElementById("quiz-next-btn").classList.remove("hidden");
    },

    nextQuizQuestion: function () {
      this.currentQuestionIndex++;
      
      const profile = window.StudyPilotDB.getProfile();
      let subGroup = "7";
      if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") subGroup = "pkg";
      else if (profile.grade === "11" || profile.grade === "12") subGroup = "12";

      const quizData = GRADE_QUIZZES[subGroup] || GRADE_QUIZZES["7"];
      let qList = quizData.questions[this.activeQuizSubject];
      if (!qList && this.activeQuizSubject === "Science") qList = quizData.questions["Science"]["ch3"];
      if (!qList && this.activeQuizSubject === "Mathematics") qList = quizData.questions["Mathematics"]["ch2"];
      if (!qList) qList = GRADE_QUIZZES["7"].questions["Science"];

      if (this.currentQuestionIndex < qList.length) {
        this.loadQuizQuestion();
      } else {
        this.completeQuiz();
      }
    },

    completeQuiz: function () {
      clearInterval(this.quizTimerInterval);
      document.getElementById("quiz-active-view").classList.add("hidden");
      document.getElementById("quiz-result-view").classList.remove("hidden");

      const profile = window.StudyPilotDB.getProfile();
      let subGroup = "7";
      if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") subGroup = "pkg";
      else if (profile.grade === "11" || profile.grade === "12") subGroup = "12";

      const quizData = GRADE_QUIZZES[subGroup] || GRADE_QUIZZES["7"];
      let qList = quizData.questions[this.activeQuizSubject];
      if (!qList && this.activeQuizSubject === "Science") qList = quizData.questions["Science"]["ch3"];
      if (!qList && this.activeQuizSubject === "Mathematics") qList = quizData.questions["Mathematics"]["ch2"];
      if (!qList) qList = GRADE_QUIZZES["7"].questions["Science"];

      document.getElementById("quiz-final-score").innerText = `${this.quizScore}/${qList.length}`;

      // Automatically check the "Quiz Taken" textbook status in Parent progress tracker (If score >= 4/5 or 1/1)
      const passed = this.quizScore >= (qList.length - 1);
      if (passed) {
        // Auto check science ch3 or maths ch2
        let chId = this.activeQuizChapter === "ch3" ? "s_ch3" : "m_ch2";
        // Pre-KG fallback
        if (subGroup === "pkg") chId = "pkg_m1";
        else if (subGroup === "12") chId = this.activeQuizSubject === "Physics" ? "g12_p1" : "g12_m1";

        const progress = window.StudyPilotDB.getLessonProgress();
        if (!progress[chId]) progress[chId] = { read: false, revised: false, quizTaken: false };
        progress[chId].quizTaken = true;
        window.StudyPilotDB.saveLessonProgress(progress);
        
        window.StudyPilotDB.addNotification(`Lesson progress updated: "Quiz Taken" checked for Chapter.`, "success");
        window.dispatchEvent(new CustomEvent("studypilot_lesson_update"));
      }

      window.StudyPilotDB.addNotification(`Quiz completed: ${this.quizScore}/${qList.length}.`, "success");
    },

    resetQuiz: function () {
      document.getElementById("quiz-result-view").classList.add("hidden");
      document.getElementById("quiz-init-view").classList.remove("hidden");
    },

    // Flashcards Spaced Repetition Logic
    loadFlashcards: function () {
      this.flashcardList = window.StudyPilotDB.getFlashcards();
      
      const filterBox = document.getElementById("tutor-flashcard-filters");
      if (filterBox) {
        const profile = window.StudyPilotDB.getProfile();
        filterBox.innerHTML = `
          <button class="filter-chip active" onclick="window.StudyPilotTutor.filterFlashcards('all')">All</button>
          ${profile.subjects.map(s => `<button class="filter-chip" onclick="window.StudyPilotTutor.filterFlashcards('${s}')">${s}</button>`).join("")}
        `;
      }
      this.filterFlashcards("all");
    },

    filterFlashcards: function (subj) {
      const chips = document.querySelectorAll("#tutor-flashcard-filters .filter-chip");
      chips.forEach(c => {
        if (c.innerText.toLowerCase().includes(subj.toLowerCase()) || (subj === "all" && c.innerText.toLowerCase() === "all")) {
          c.classList.add("active");
        } else {
          c.classList.remove("active");
        }
      });

      if (subj === "all") {
        this.filteredCards = this.flashcardList;
      } else {
        this.filteredCards = this.flashcardList.filter(c => c.subject === subj);
      }

      this.currentFlashcardIndex = 0;
      this.renderFlashcard();
    },

    renderFlashcard: function () {
      const cardEl = document.getElementById("active-flashcard");
      const indicator = document.getElementById("flashcard-count-indicator");
      const ratingBtns = document.getElementById("spaced-rep-buttons");

      if (!cardEl) return;

      cardEl.classList.remove("flipped");
      ratingBtns.classList.add("hidden");

      if (this.filteredCards.length === 0) {
        document.getElementById("flashcard-front-subject").innerText = "Info";
        document.getElementById("flashcard-front-text").innerText = "No flashcards found. Create one by clicking '+ New Card'!";
        document.getElementById("flashcard-back-subject").innerText = "Info";
        document.getElementById("flashcard-back-text").innerText = "No flashcards found.";
        indicator.innerText = "0 of 0 cards";
        return;
      }

      const card = this.filteredCards[this.currentFlashcardIndex];
      
      document.getElementById("flashcard-front-subject").innerText = card.subject;
      document.getElementById("flashcard-front-text").innerText = card.question;
      document.getElementById("flashcard-back-subject").innerText = card.subject;
      document.getElementById("flashcard-back-text").innerText = card.answer;
      
      indicator.innerText = `${this.currentFlashcardIndex + 1} of ${this.filteredCards.length} cards`;

      if (window.renderMathInElement) {
        window.renderMathInElement(cardEl);
      }
    },

    flipFlashcard: function () {
      const cardEl = document.getElementById("active-flashcard");
      if (this.filteredCards.length === 0) return;

      const ratingBtns = document.getElementById("spaced-rep-buttons");
      cardEl.classList.toggle("flipped");

      if (cardEl.classList.contains("flipped")) {
        ratingBtns.classList.remove("hidden");
      } else {
        ratingBtns.classList.add("hidden");
      }
    },

    rateFlashcard: function (rating) {
      const card = this.filteredCards[this.currentFlashcardIndex];
      let alertMsg = rating === 1 ? `Easy (4 days)` : (rating === 2 ? `Medium (2 days)` : `Hard (10 mins)`);

      window.StudyPilotDB.addNotification(`Flashcard rated as: ${alertMsg}`, "info");

      setTimeout(() => {
        this.navigateFlashcard(1);
      }, 300);
    },

    navigateFlashcard: function (dir) {
      if (this.filteredCards.length === 0) return;

      this.currentFlashcardIndex += dir;
      if (this.currentFlashcardIndex >= this.filteredCards.length) {
        this.currentFlashcardIndex = 0;
      } else if (this.currentFlashcardIndex < 0) {
        this.currentFlashcardIndex = this.filteredCards.length - 1;
      }
      this.renderFlashcard();
    },

    showAddFlashcardModal: function () {
      const modal = document.getElementById("modal-add-flashcard");
      const select = document.getElementById("card-input-subject");
      if (!modal || !select) return;

      const profile = window.StudyPilotDB.getProfile();
      select.innerHTML = profile.subjects.map(s => `<option value="${s}">${s}</option>`).join("");
      modal.classList.remove("hidden");
    },

    hideAddFlashcardModal: function () {
      const modal = document.getElementById("modal-add-flashcard");
      if (modal) modal.classList.add("hidden");
    },

    addFlashcardSubmit: function () {
      const subject = document.getElementById("card-input-subject").value;
      const question = document.getElementById("card-input-question").value.trim();
      const answer = document.getElementById("card-input-answer").value.trim();

      if (!question || !answer) {
        alert("Please enter both question and answer.");
        return;
      }

      window.StudyPilotDB.addFlashcard(subject, question, answer);
      this.hideAddFlashcardModal();
      document.getElementById("card-input-question").value = "";
      document.getElementById("card-input-answer").value = "";

      this.loadFlashcards();
    },

    getApiBaseUrl: function () {
      if (typeof window.getStudyPilotApiBaseUrl === "function") {
        return window.getStudyPilotApiBaseUrl();
      }
      if (window.StudyPilotBooks && typeof window.StudyPilotBooks.getApiBaseUrl === "function") {
        return window.StudyPilotBooks.getApiBaseUrl();
      }
      if (window.STUDYPILOT_API_BASE) {
        return window.STUDYPILOT_API_BASE.replace(/\/+$/, "");
      }
      return "http://127.0.0.1:5000";
    },

    loadUploadedBooks: async function () {
      const apiBase = this.getApiBaseUrl();
      const listContainer = document.getElementById("uploaded-books-list");
      if (!listContainer) return;

      try {
        listContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted);">Loading books...</p>`;
        const response = await fetch(`${apiBase}/api/tutor/uploaded-books`);
        if (!response.ok) throw new Error("Failed to load uploaded books list");
        
        const data = await response.json();
        if (data && data.ok) {
          const books = data.items || [];
          if (books.length === 0) {
            listContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--text-muted); text-align:center; padding:1rem;">No books fed yet. Upload your PDF above!</p>`;
            return;
          }

          listContainer.innerHTML = books.map(book => {
            const date = new Date(book.created_at).toLocaleDateString();
            return `
              <div class="upcoming-item" style="display:flex; justify-content:space-between; align-items:center; padding:0.65rem; border-bottom:1px solid var(--border-color);">
                <div style="flex-grow:1; min-width:0; padding-right:1rem;">
                  <span class="badge badge-accent" style="font-size:0.65rem; padding:0.15rem 0.35rem; margin-bottom:0.15rem; display:inline-block;">${escapeHTML(book.board)} · Class ${book.grade}</span>
                  <h4 style="font-size:0.85rem; font-weight:600; margin:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHTML(book.book_title)}</h4>
                  <p style="font-size:0.75rem; color:var(--text-muted); margin:0;">Subject: ${escapeHTML(book.subject)} · Uploaded: ${date}</p>
                </div>
                <button class="btn btn-outline btn-xs" onclick="window.StudyPilotTutor.deleteUploadedBook(event, ${book.id})" style="color:var(--red-text); border-color:var(--red-border); flex-shrink:0; cursor:pointer;">
                  Delete
                </button>
              </div>
            `;
          }).join("");
        }
      } catch (error) {
        console.error("Error loading uploaded books:", error);
        listContainer.innerHTML = `<p style="font-size:0.85rem; color:var(--red-text);">Failed to load textbooks.</p>`;
      }
    },

    uploadBookSubmit: async function (event) {
      if (event) event.preventDefault();

      const apiBase = this.getApiBaseUrl();
      const form = document.getElementById("feed-books-form");
      const statusBox = document.getElementById("feed-books-status");
      const submitBtn = document.getElementById("feed-books-submit-btn");
      if (!form || !statusBox || !submitBtn) return;

      const board = document.getElementById("feed-input-board").value;
      const grade = document.getElementById("feed-input-grade").value;
      const subject = document.getElementById("feed-input-subject").value.trim();
      const bookTitle = document.getElementById("feed-input-title").value.trim();
      const fileInput = document.getElementById("feed-input-file");

      if (!subject || !bookTitle || !fileInput.files || fileInput.files.length === 0) {
        alert("Please fill all fields and select a PDF file.");
        return;
      }

      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("board", board);
      formData.append("grade", grade);
      formData.append("subject", subject);
      formData.append("book_title", bookTitle);
      formData.append("file", file);

      try {
        statusBox.classList.remove("hidden");
        statusBox.style.color = "var(--text-main)";
        statusBox.innerHTML = `<span>⏳ <strong>Parsing PDF book...</strong> Extracting text and indexing pages for the AI Tutor... Please wait (this can take up to a minute).</span>`;
        submitBtn.disabled = true;

        const response = await fetch(`${apiBase}/api/tutor/upload-book`, {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.ok) {
          statusBox.style.color = "#166534";
          statusBox.innerHTML = `<span>✅ <strong>Success!</strong> ${escapeHTML(data.message)}</span>`;
          form.reset();
          this.loadUploadedBooks();
          
          window.StudyPilotDB.addNotification(`Book fed to AI: "${bookTitle}" indexed successfully.`, "success");
        } else {
          throw new Error(data.error || "Unknown error occurred.");
        }
      } catch (error) {
        console.error("Error uploading book:", error);
        statusBox.style.color = "#991b1b";
        statusBox.innerHTML = `<span>❌ <strong>Failed:</strong> ${escapeHTML(error.message)}</span>`;
      } finally {
        submitBtn.disabled = false;
      }
    },

    deleteUploadedBook: async function (event, bookId) {
      if (event) event.stopPropagation();

      if (!confirm("Are you sure you want to delete this book? The tutor will no longer be able to reference its pages.")) {
        return;
      }

      const apiBase = this.getApiBaseUrl();
      try {
        const response = await fetch(`${apiBase}/api/tutor/delete-book/${bookId}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete book from server");

        const data = await response.json();
        if (data && data.ok) {
          window.StudyPilotDB.addNotification("Book removed from AI tutor database.", "info");
          this.loadUploadedBooks();
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert(`Failed to delete book: ${error.message}`);
      }
    }
  };

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
