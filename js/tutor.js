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

    init: function () {
      this.initTabs();
      this.initChat();
      this.updateTutorWelcomeLabels();
      this.updateQuizChapters();
      this.loadFlashcards();
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

    handleUserMessage: async function (msg) {
      this.appendMessage(msg, "user");

      const loader = this.appendMessage("AI is thinking...", "bot temp");
      
      const profile = window.StudyPilotDB.getProfile();
      const apiKey = profile.geminiApiKey;

      if (apiKey) {
        // 1. Call Gemini Live API directly from client side
        try {
          const systemInstruction = `You are StudyPilot AI, an expert school tutor specifically teaching the CBSE syllabus for Grade ${profile.grade} (${profile.stream || 'General'}). 
            Your role is strictly educational. You must explain school topics in an age-appropriate, simple, and encouraging way.
            CRITICAL RULES:
            - ONLY answer educational, syllabus-related questions.
            - If the user asks general, non-study questions (e.g. video games, jokes, general code scripts, social chit-chat), politely decline and tell them you are programmed only to study CBSE lessons.
            - Keep your explanations clean, well-formatted, and use bullet points where helpful.
            - Answer the user's question now:`;

          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${systemInstruction}\n\nUser Question: ${msg}` }]
              }]
            })
          });

          if (loader) loader.remove();

          if (!response.ok) {
            throw new Error(`API returned error code: ${response.status}`);
          }

          const data = await response.json();
          const replyText = data.candidates[0].content.parts[0].text;
          
          // Format markdown carriage returns slightly for bubbles
          const formattedReply = replyText.replace(/\n/g, "<br>");
          this.appendMessage(`<p>${formattedReply}</p>`, "bot");

        } catch (error) {
          console.error("Gemini API Error: ", error);
          if (loader) loader.remove();
          this.appendMessage("<p>⚠️ <em>Could not connect to Gemini API. Checking local knowledge index...</em></p>", "bot");
          this.handleLocalFallbackMessage(msg);
        }
      } else {
        // 2. Offline / Local Heuristic fallback
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
          responseHTML = `<p>I am your local study buddy. Enter a **Gemini API Key** in your Profile screen to ask me *any* question about the entire CBSE Pre-KG to Grade 12 syllabus.</p>
            <p>Or, try asking me one of our preloaded topics: <strong>"${knowledge.prompts.join('", "')}"</strong>!</p>`;
        }
      }

      this.appendMessage(responseHTML, "bot");
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
    }
  };

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
