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
    // Middle school fallback (Grade 6 & Grade 7 - Curiosity & Ganita Prakash)
    "6": {
      prompts: ["Explain Patterns in Mathematics Ch 1", "Explain Diversity in Living World Ch 2", "Explain Exploring Magnets Ch 4", "Explain Locating Places on Earth Ch 1"],
      responses: {
        "patterns": "<h3>Mathematics: Ch 1 Patterns in Mathematics</h3><p>Patterns are repeating sequences of shapes or numbers. Understanding pattern rules helps solve algebraic sequences and visual puzzles!</p>",
        "diversity": "<h3>Science: Ch 2 Diversity in the Living World</h3><p>Earth is home to millions of plant and animal species. We group living things by physical traits, habitats, and feeding habits!</p>",
        "magnets": "<h3>Science: Ch 4 Exploring Magnets</h3><p>Magnets attract magnetic materials like iron and nickel. Every magnet has a <strong>North Pole</strong> and a <strong>South Pole</strong>. Like poles repel; opposite poles attract!</p>",
        "locating": "<h3>Social Science: Ch 1 Locating Places on Earth</h3><p>We locate places on Earth using a grid of <strong>Latitudes</strong> (horizontal lines) and <strong>Longitudes</strong> (vertical lines).</p>"
      }
    },
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

  function generateDynamicNcertQuiz(grade, subject, chapterTitle) {
    const title = chapterTitle || "Syllabus Concept";
    const gStr = `Grade ${grade}`;

    if (subject === "Mathematics") {
      return [
        {
          q: `In ${gStr} Mathematics (${title}), what is the primary numerical or algebraic rule applied?`,
          options: [
            "Applying order of operations and properties of equality",
            "Measuring angles with a protractor only",
            "Rounding all numbers to nearest million",
            "Ignoring signs in expressions"
          ],
          answer: 0,
          explain: `In ${gStr} Mathematics, ${title} focuses on standard arithmetic properties, equations, and rules of operation.`
        },
        {
          q: `Which unit or representation is standard in ${title}?`,
          options: [
            "Standard SI numerical and geometric notation",
            "Roman numerals only",
            "Tally marks for all values",
            "Binary notation"
          ],
          answer: 0,
          explain: `CBSE ${gStr} Mathematics uses standard numerical notation and geometric definitions.`
        },
        {
          q: `When solving exercises in ${title}, what step is essential for verification?`,
          options: [
            "Substituting the calculated value back into the original expression/equation",
            "Erasing all steps after getting an answer",
            "Changing the question values",
            "Multiplying the answer by zero"
          ],
          answer: 0,
          explain: `Substituting the solution back into the original equation verifies correctness.`
        },
        {
          q: `Which geometric or algebraic property applies directly to ${title}?`,
          options: [
            "Commutative, Associative, and Distributive laws",
            "Curvature of spacetime",
            "Color spectrum wavelength",
            "None of the above"
          ],
          answer: 0,
          explain: `Fundamental algebraic and arithmetic laws govern number systems and geometric reasoning.`
        },
        {
          q: `What is the objective of solving NCERT textbook problems in ${title}?`,
          options: [
            "Mastering problem-solving steps and conceptual clarity",
            "Memorizing final numerical answers without steps",
            "Skipping formulas",
            "Guessing answers randomly"
          ],
          answer: 0,
          explain: `NCERT exercises build deep conceptual understanding and step-by-step problem-solving skills.`
        }
      ];
    }

    if (subject === "Science") {
      return [
        {
          q: `In ${gStr} Science (${title}), what is the fundamental principle studied?`,
          options: [
            `Understanding physical, chemical, or biological phenomena related to ${title}`,
            "Memorizing historic dates only",
            "Drawing arbitrary diagrams without labels",
            "Ignoring experimental observations"
          ],
          answer: 0,
          explain: `${title} covers essential NCERT scientific principles, definitions, and experimental observations.`
        },
        {
          q: `What is the role of scientific observation in studying ${title}?`,
          options: [
            "Formulating hypotheses and recording measurable results",
            "Making wild guesses without evidence",
            "Rejecting experimental proof",
            "Avoiding safety precautions in labs"
          ],
          answer: 0,
          explain: "Scientific inquiry relies on careful observation, measurement, and structured inference."
        },
        {
          q: `Which standard unit or classification is used in ${title}?`,
          options: [
            "SI units and standard NCERT taxonomy",
            "Arbitrary imperial units only",
            "No units are required in science",
            "Local slang terms"
          ],
          answer: 0,
          explain: "CBSE Science curriculum follows international SI units and standard scientific terminology."
        },
        {
          q: `How does ${title} relate to everyday life?`,
          options: [
            "It explains natural processes and technological applications around us",
            "It has no connection to real-world phenomena",
            "It only applies in deep outer space",
            "It only matters during written exams"
          ],
          answer: 0,
          explain: "NCERT Science topics connect theoretical concepts with daily life applications."
        },
        {
          q: `What key skill is developed when completing NCERT activities for ${title}?`,
          options: [
            "Analytical thinking and scientific reasoning",
            "Rote memorization without understanding",
            "Skipping diagrams",
            "Ignoring safety guidelines"
          ],
          answer: 0,
          explain: "Hands-on NCERT activities develop critical reasoning and scientific inquiry skills."
        }
      ];
    }

    if (subject === "Social Science") {
      return [
        {
          q: `In ${gStr} Social Science (${title}), what primary aspect of human society or history is explored?`,
          options: [
            `Understanding historical events, geographical landforms, or civic governance in ${title}`,
            "Calculating algebraic equations",
            "Testing chemical reactions in a test tube",
            "Writing computer code"
          ],
          answer: 0,
          explain: `${title} covers key NCERT themes in History, Geography, Civics, or Economics.`
        },
        {
          q: `Why is studying ${title} important for a CBSE student?`,
          options: [
            "To understand society, governance, and environmental responsibility",
            "To memorize page numbers of textbooks",
            "To avoid reading maps",
            "To ignore civic duties"
          ],
          answer: 0,
          explain: "Social Science builds informed citizenship, historical context, and environmental awareness."
        },
        {
          q: `Which tool or source is key when studying ${title}?`,
          options: [
            "Maps, timelines, historical documents, and statistics",
            "Microscopes and Bunsen burners",
            "Calculators only",
            "Musical instruments"
          ],
          answer: 0,
          explain: "Primary historical sources, maps, and official data are core to Social Science."
        },
        {
          q: `What core principle of democratic society or geographical study is highlighted in ${title}?`,
          options: [
            "Equality, sustainable resource management, and social harmony",
            "Absolute monarchy without rights",
            "Wasting natural resources",
            "Ignoring community welfare"
          ],
          answer: 0,
          explain: "NCERT Social Science highlights democratic values, sustainability, and constitutional rights."
        },
        {
          q: `How do NCERT chapter exercises in ${title} test student learning?`,
          options: [
            "Through short/long answer questions, map work, and critical evaluation",
            "By asking students to paint pictures only",
            "By testing speed typing",
            "Through true/false guessing"
          ],
          answer: 0,
          explain: "Exercises test conceptual clarity, cause-and-effect reasoning, and map work."
        }
      ];
    }

    // Default English / General
    return [
      {
        q: `In ${gStr} English (${title}), what literary or language skill is emphasized?`,
        options: [
          "Reading comprehension, vocabulary, and grammatical accuracy",
          "Solving differential equations",
          "Conducting acid-base titrations",
          "Calculating interest rates"
        ],
        answer: 0,
        explain: `${title} develops language fluency, vocabulary, reading comprehension, and creative expression.`
      },
      {
        q: `What is the main purpose of studying themes in ${title}?`,
        options: [
          "Understanding moral lessons, character motivation, and expressive writing",
          "Memorizing line counts only",
          "Ignoring punctuation",
          "Translating into binary code"
        ],
        answer: 0,
        explain: "Literary themes build empathy, moral reasoning, and textual comprehension."
      },
      {
        q: `Which grammar or writing element is practiced in ${title}?`,
        options: [
          "Sentence structure, tenses, and coherent paragraph formation",
          "Chemical symbols",
          "Trigonometric ratios",
          "Map latitude coordinates"
        ],
        answer: 0,
        explain: "NCERT English units focus on practical grammar rules and creative writing."
      },
      {
        q: `How should a student approach reading a comprehension passage in ${title}?`,
        options: [
          "Read actively, identify key ideas, and answer context-based questions",
          "Read only the last line of every paragraph",
          "Skip the story and guess answers",
          "Memorize word count"
        ],
        answer: 0,
        explain: "Active reading and context analysis ensure accurate comprehension answers."
      },
      {
        q: `What makes ${title} an important part of the CBSE English curriculum?`,
        options: [
          "Enhancing communication skills and appreciation of literature",
          "Teaching laboratory safety rules",
          "Practicing mental arithmetic",
          "Learning programming syntax"
        ],
        answer: 0,
        explain: "CBSE English aims to refine written and spoken communication and critical thinking."
      }
    ];
  }

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
    "6": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
      questions: {
        Science: [
          { q: "Which part of a magnet has the strongest magnetic attraction?", options: ["Center", "Poles (North & South)", "Side edges", "Everywhere equally"], answer: 1, explain: "The magnetic field concentration is strongest near the North and South poles of a magnet." },
          { q: "What tool is used to measure temperature?", options: ["Barometer", "Thermometer", "Speedometer", "Protractor"], answer: 1, explain: "A thermometer measures temperature in degrees Celsius or Fahrenheit." }
        ],
        Mathematics: [
          { q: "What is the perimeter of a square with side length 5 cm?", options: ["10 cm", "20 cm", "25 cm", "15 cm"], answer: 1, explain: "Perimeter of a square = 4 × side length = 4 × 5 = 20 cm." }
        ],
        "Social Science": [
          { q: "Which imaginary line divides the Earth into Northern and Southern Hemispheres?", options: ["Prime Meridian", "Tropic of Cancer", "Equator", "Tropic of Capricorn"], answer: 2, explain: "The Equator is the 0° latitude line dividing the Earth into Northern and Southern Hemispheres." }
        ],
        English: [
          { q: "What type of story uses animal characters to teach a moral lesson?", options: ["Fable", "Biography", "Encyclopedia", "Dictionary"], answer: 0, explain: "A fable is a short story, typically with animals as characters, conveying a moral." }
        ]
      }
    },
    "7": {
      subjects: ["Science", "Mathematics", "Social Science", "English"],
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

      if (!this._subscribedProfileUpdate) {
        this._subscribedProfileUpdate = true;
        window.addEventListener("studypilot_profile_updated", () => {
          this.updateTutorWelcomeLabels();
          this.updateQuizChapters();
          this.loadFlashcards();
        });
      }
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
          } else if (tabName === "quiz") {
            window.StudyPilotTutor.updateQuizChapters();
          }
        });
      });
    },

    updateTutorWelcomeLabels: function () {
      const profile = window.StudyPilotDB.getProfile();
      const grade = profile.grade || "7";
      const gradeLbl = document.getElementById("tutor-bot-grade-lbl");
      const promptsBox = document.getElementById("tutor-chat-quick-prompts");

      if (gradeLbl) {
        gradeLbl.innerText = `Hi! I am your AI Study Pilot for CBSE Grade ${grade}.`;
      }

      const messagesContainer = document.getElementById("tutor-chat-messages");
      if (messagesContainer && (messagesContainer.children.length === 0 || messagesContainer.innerText.includes("local study buddy"))) {
        messagesContainer.innerHTML = `<div class="chat-message bot"><p>Hi! I am your AI Study Pilot for CBSE Grade ${escapeHTML(grade)}.</p></div>`;
      }

      if (promptsBox) {
        let group = String(grade);
        const pData = LOCAL_KNOWLEDGE[group] || LOCAL_KNOWLEDGE["7"];
        
        promptsBox.innerHTML = pData.prompts.map(p => {
          return `<button onclick="window.StudyPilotTutor.askQuestion('${escapeHTML(p)}')">${escapeHTML(p)}</button>`;
        }).join("");
      }
    },

    sendUserChatMessage: function () {
      const input = document.getElementById("tutor-chat-input");
      if (!input) return;
      const query = input.value.trim();
      if (query) {
        this.handleUserMessage(query);
        input.value = "";
      }
    },

    // AI Chatbot Core
    initChat: function () {
      const input = document.getElementById("tutor-chat-input");
      const btn = document.getElementById("tutor-chat-send-btn");
      if (!input || !btn) return;

      const triggerSend = () => {
        this.sendUserChatMessage();
      };

      btn.onclick = triggerSend;
      input.onkeydown = (e) => {
        if (e.key === "Enter") triggerSend();
      };
    },

    inferSubjectHint: function (msg, profile) {
      const text = String(msg || "").toLowerCase();

      const subjectHints = [
        ["Mathematics", ["math", "mathematics", "lcm", "hcf", "gcd", "algebra", "geometry", "fraction", "equation", "ratio", "percent", "probability", "trigonometry", "bodmas", "pythagor", "factor", "multiple", "prime", "integer", "rational", "quadratic", "polynomial", "angle", "triangle", "circle", "perimeter", "area", "volume", "coordinate"]],
        ["Science", ["science", "physics", "chemistry", "biology", "acid", "base", "electric", "circuit", "light", "heat", "force", "pressure", "cell", "photosynthesis", "gravity", "metal", "non-metal", "motion", "speed", "respiration", "transpiration", "atom", "molecule", "newton", "ohm"]],
        ["Social Science", ["social science", "history", "geography", "civics", "economics", "democracy", "map", "society", "constitution", "government", "parliament", "harappa", "mughal", "gupta", "latitude", "longitude", "monsoon", "climate"]],
        ["English", ["english", "grammar", "essay", "letter", "comprehension", "poem", "poetry", "noun", "verb", "tense", "active passive", "direct indirect", "adjective", "adverb", "preposition"]],
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

      const profile = window.StudyPilotDB.getProfile();

      // 🌐 Online Mode: Attempt Live AI API Call with fallback
      const loader = this.appendMessage("AI is thinking (Online Mode)...", "bot temp");
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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(`${apiBase}/api/tutor/respond`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        }).catch(() => null);

        clearTimeout(timeoutId);

        if (loader) loader.remove();

        if (response && response.ok) {
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
                <strong>Sources cited (Online RAG):</strong> ${uniqueSources.map(s => `<span class="badge badge-accent" style="font-size:0.68rem; margin-right:0.25rem;">${escapeHTML(s.book_title || "Book")} Ch ${s.chapter_number || s.title || ""}</span>`).join("")}
              </div>`;
            }

            this.appendMessage(`<p>${formattedReply}</p>${sourceHtml}`, "bot");
            return;
          }
        }

        // Online mode unreachable or failed -> fallback to offline database
        this.appendMessage(`<p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.25rem;"><em>(Online AI server unavailable — displaying offline NCERT answer)</em></p>`, "bot temp");
        this.handleLocalFallbackMessage(msg);

      } catch (error) {
        console.warn("Online RAG API Error / Timeout, falling back to local NCERT:", error);
        if (loader) loader.remove();
        this.handleLocalFallbackMessage(msg);
      }
    },

    handleLocalFallbackMessage: function (msg) {
      const profile = window.StudyPilotDB.getProfile();
      const grade = String(profile.grade || "7");
      const lower = msg.toLowerCase().trim();

      // 1. Greetings
      const greetings = ["hi", "hello", "hey", "yoo", "yo", "sup", "namaste", "good morning", "good afternoon", "good evening"];
      if (greetings.includes(lower) || greetings.some(g => lower === g || lower.startsWith(g + " ") || lower.startsWith(g + "!") || lower.startsWith(g + ","))) {
        const responses = [
          `Hey! 👋 What would you like to study today in Grade ${escapeHTML(grade)}?`,
          `Hello! 👋 Ready to tackle some Grade ${escapeHTML(grade)} NCERT topics today? What subject should we start with?`,
          `Yo! 👋 What chapter or doubt are we solving today in Grade ${escapeHTML(grade)}?`
        ];
        const res = responses[msg.length % responses.length];
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'greeting' | Query: '${msg}'`);
        this.appendMessage(`<p>${res}</p>`, "bot");
        return;
      }

      // 2. Casual Chat
      const casuals = ["thanks", "thank you", "ok", "okay", "lol", "cool", "great", "awesome", "nice", "bye", "goodnight"];
      if (casuals.includes(lower) || casuals.some(c => lower === c || lower.startsWith(c + " ") || lower.startsWith(c + "!"))) {
        const responses = [
          "You're welcome! Let me know whenever you want to solve some questions or revise a chapter.",
          "Awesome! Tell me whenever you're ready for your next study topic.",
          "Great! I'm here whenever you need help with your NCERT textbooks."
        ];
        const res = responses[msg.length % responses.length];
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'casual_chat' | Query: '${msg}'`);
        this.appendMessage(`<p>${res}</p>`, "bot");
        return;
      }

      // 3. Subject Chapter Lists
      const subjectMap = {
        "maths": "Mathematics", "math": "Mathematics", "mathematics": "Mathematics",
        "science": "Science",
        "english": "English",
        "social science": "Social Science", "sst": "Social Science", "social": "Social Science"
      };

      if (subjectMap[lower]) {
        const targetSubj = subjectMap[lower];
        const curriculum = window.StudyPilotDB.getCurriculum(grade);
        const chaptersList = (curriculum.chapters || {})[targetSubj] || [];
        
        let chaptersHTML = chaptersList.map((ch, idx) => {
          return `<li><strong>Chapter ${ch.num || idx + 1}:</strong> ${escapeHTML(ch.title || "")}</li>`;
        }).join("");

        if (!chaptersHTML) {
          chaptersHTML = `<li>Chapter 1: NCERT ${escapeHTML(targetSubj)} Overview</li>`;
        }

        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'subject_list' | Subject: '${targetSubj}' | Query: '${msg}'`);

        this.appendMessage(
          `<h3>Here are your Grade ${escapeHTML(grade)} ${escapeHTML(targetSubj)} chapters:</h3>
           <ul style="margin: 0.5rem 0 0.75rem 1.25rem;">${chaptersHTML}</ul>
           <p>Ask me about any of these chapters to summarize, explain, or get practice questions!</p>`,
          "bot"
        );
        return;
      }

      // 4. Quiz Request
      if (lower.includes("quiz") || lower.includes("mcq") || lower.includes("test me")) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'quiz_request' | Query: '${msg}'`);
        this.appendMessage(
          `<h3>Interactive Quiz Generator (Grade ${escapeHTML(grade)})</h3>
           <p>Ready to test your knowledge! Go to the <strong>Practice Quizzes</strong> tab on the right to select your subject & chapter and start a 5-question MCQ quiz.</p>`,
          "bot"
        );
        return;
      }

      // 5. Special NCERT Concept & Mathematical Doubts (Direct Resolution)
      if (lower.includes("lcm") || lower.includes("hcf") || lower.includes("gcd") || lower.includes("least common multiple") || lower.includes("highest common factor")) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'lcm_hcf_doubt' | Query: '${msg}'`);
        this.appendMessage(
          `<h3>Mathematics: LCM vs HCF (NCERT Grades 6–10)</h3>
           <div style="background:var(--bg-card); padding:1rem; border-radius:10px; border:1px solid var(--border-color); margin-top:0.5rem; line-height:1.6;">
             <p style="margin-bottom:0.75rem;"><strong>1. HCF (Highest Common Factor / GCD):</strong><br>
             The largest positive integer that divides two or more given numbers without leaving a remainder.<br>
             &bull; <em>Example for 12 and 18:</em><br>
             Factors of 12 = {1, 2, 3, 4, <strong>6</strong>, 12}<br>
             Factors of 18 = {1, 2, 3, <strong>6</strong>, 9, 18}<br>
             Common Factors = {1, 2, 3, 6} &rarr; <span class="badge badge-accent" style="font-size:0.85rem; font-weight:700;">HCF = 6</span></p>

             <p style="margin-bottom:0.75rem;"><strong>2. LCM (Least Common Multiple):</strong><br>
             The smallest positive integer that is a multiple of two or more given numbers.<br>
             &bull; <em>Example for 12 and 18:</em><br>
             Multiples of 12 = {12, 24, <strong>36</strong>, 48, 60...}<br>
             Multiples of 18 = {18, <strong>36</strong>, 54, 72...}<br>
             Common Multiples = {36, 72, 108...} &rarr; <span class="badge badge-indigo" style="font-size:0.85rem; font-weight:700;">LCM = 36</span></p>

             <div style="background:rgba(99,102,241,0.1); padding:0.6rem 0.8rem; border-radius:6px; font-size:0.85rem; border-left:3px solid var(--primary-color);">
               <strong>⭐ Fundamental NCERT Formula:</strong><br>
               $$\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$$<br>
               <em>Verification:</em> $6 \\times 36 = 216$ and $12 \\times 18 = 216$ &check;
             </div>
           </div>`,
          "bot"
        );
        return;
      }

      if (lower.includes("pythagor") || lower.includes("hypotenuse")) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'pythagoras_doubt' | Query: '${msg}'`);
        this.appendMessage(
          `<h3>Mathematics: Pythagoras Theorem (Class 7–10)</h3>
           <div style="background:var(--bg-card); padding:1rem; border-radius:10px; border:1px solid var(--border-color); margin-top:0.5rem; line-height:1.6;">
             <p>In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides:</p>
             <p style="font-size:1.1rem; font-weight:800; color:var(--primary-color); text-align:center; margin:0.5rem 0;">$$a^2 + b^2 = c^2$$</p>
             <p><strong>Example:</strong> For sides $a = 3\\text{ cm}$, $b = 4\\text{ cm}$:<br>
             $$c^2 = 3^2 + 4^2 = 9 + 16 = 25 \\implies c = \\sqrt{25} = 5\\text{ cm}$$</p>
           </div>`,
          "bot"
        );
        return;
      }

      if (lower.includes("quadratic") || (lower.includes("formula") && lower.includes("equation"))) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'quadratic_doubt' | Query: '${msg}'`);
        this.appendMessage(
          `<h3>Mathematics: Quadratic Formula (Class 10 NCERT)</h3>
           <div style="background:var(--bg-card); padding:1rem; border-radius:10px; border:1px solid var(--border-color); margin-top:0.5rem; line-height:1.6;">
             <p>For any quadratic equation in standard form: $$ax^2 + bx + c = 0$$</p>
             <p style="font-size:1.1rem; font-weight:800; color:var(--primary-color); text-align:center; margin:0.5rem 0;">
               $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
             </p>
             <p><strong>Discriminant ($D = b^2 - 4ac$):</strong><br>
             &bull; $D > 0$: Two distinct real roots.<br>
             &bull; $D = 0$: Two equal real roots.<br>
             &bull; $D < 0$: No real roots.</p>
           </div>`,
          "bot"
        );
        return;
      }

      // 6. NCERT Concepts & Study Doubts (Dynamic Syllabus Matcher)
      const inferredSubject = this.inferSubjectHint(msg, profile) || (profile.subject || "Mathematics");
      const chNumMatch = lower.match(/(?:chapter|ch|unit|lesson)\s*(\d+)/i);
      const targetChNum = chNumMatch ? parseInt(chNumMatch[1], 10) : null;

      const summaryData = window.StudyPilotCurriculum && typeof window.StudyPilotCurriculum.getChapterSummary === "function"
        ? window.StudyPilotCurriculum.getChapterSummary(grade, inferredSubject, msg, targetChNum)
        : null;

      if (summaryData) {
        const chNum = summaryData.num || targetChNum || 1;
        const chTitle = escapeHTML(summaryData.title || "Chapter");
        const points = Array.isArray(summaryData.points) ? summaryData.points : [];

        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'ncert_summary' | Subject: '${inferredSubject}' | Chapter: '${chTitle}' | Query: '${msg}'`);

        let html = `
          <h3>CBSE Grade ${escapeHTML(grade)} ${escapeHTML(inferredSubject)}</h3>
          <p><strong>Chapter ${chNum}: ${chTitle}</strong></p>
          ${summaryData.concept ? `<p style="margin: 0.4rem 0; color: var(--text-muted); font-size: 0.9rem;"><em>${escapeHTML(summaryData.concept)}</em></p>` : ''}
          <ul style="margin: 0.5rem 0 0.75rem 1.25rem; line-height: 1.6;">
            ${points.map(pt => `<li>${escapeHTML(pt)}</li>`).join("")}
          </ul>
        `;

        if (summaryData.formula) {
          html += `<div style="background: rgba(99,102,241,0.08); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.85rem; margin-bottom: 0.5rem; word-break: break-word;">
            <strong>Formula / Equation:</strong> <code>${escapeHTML(summaryData.formula)}</code>
          </div>`;
        }

        if (summaryData.sample_question) {
          html += `
            <div style="background: rgba(239,68,68,0.08); border-left: 3px solid #ef4444; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.85rem; margin-bottom: 0.5rem;">
              <strong style="color: #ef4444;">❓ Sample Exam Question:</strong> ${escapeHTML(summaryData.sample_question)}<br>
              <span style="color: var(--text-muted); margin-top: 0.2rem; display: block;"><strong>Answer Key:</strong> ${escapeHTML(summaryData.sample_answer || "Refer to NCERT principles.")}</span>
            </div>
          `;
        }

        if (summaryData.memory_hook) {
          html += `
            <div style="background: rgba(16,185,129,0.08); border-left: 3px solid #10b981; padding: 0.4rem 0.6rem; border-radius: 6px; font-size: 0.82rem; margin-bottom: 0.5rem; color: var(--text-main);">
              <strong style="color: #059669;">💡 Memory Trick / Hook:</strong> ${escapeHTML(summaryData.memory_hook)}
            </div>
          `;
        }

        html += `
          <div class="tutor-chat-sources" style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
            <strong>Source cited:</strong> <span class="badge badge-indigo">Official NCERT Grade ${escapeHTML(grade)} ${escapeHTML(inferredSubject)} Ch ${chNum}</span>
          </div>
        `;

        const msgElement = this.appendMessage(html, "bot");
        if (typeof window.renderMathInElement === "function" && msgElement) {
          try {
            window.renderMathInElement(msgElement, {
              delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "$", right: "$", display: false }
              ],
              throwOnError: false
            });
          } catch (e) {}
        }
        return;
      }

      if (lower.includes("gravity")) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'ncert_concept' | Query: '${msg}'`);
        this.appendMessage(`<h3>Science: Discovery of Gravity</h3><p><strong>Sir Isaac Newton</strong> discovered gravity in 1687 when he observed an apple falling from a tree and reasoned that the same force keeps the Earth and planets in orbit around the Sun.</p>`, "bot");
        return;
      }

      if (lower.includes("photosynthesis")) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'ncert_concept' | Query: '${msg}'`);
        this.appendMessage(`<h3>Science: Photosynthesis</h3><p><strong>Photosynthesis</strong> is the process by which green plants manufacture glucose and oxygen using water, carbon dioxide, and sunlight absorbed by <strong>chlorophyll</strong> in their leaves.</p><p><strong>Equation:</strong> 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</p>`, "bot");
        return;
      }

      if (lower.includes("bodmas")) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'ncert_concept' | Query: '${msg}'`);
        this.appendMessage(`<h3>Mathematics: BODMAS Rule</h3><p>The <strong>BODMAS</strong> rule defines the correct order of operations in arithmetic expressions:</p><ul><li><strong>B</strong>rackets first ()</li><li><strong>O</strong>rders (powers, roots, 'of')</li><li><strong>D</strong>ivision and <strong>M</strong>ultiplication (left to right)</li><li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li></ul><p><em>Example:</em> 40 ÷ (5 × 2) - 3 = 40 ÷ 10 - 3 = 4 - 3 = 1.</p>`, "bot");
        return;
      }

      if (lower.includes("acid") || lower.includes("base")) {
        console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'ncert_concept' | Query: '${msg}'`);
        this.appendMessage(`<h3>Science: Acids, Bases and Salts (CBSE Grade ${grade})</h3><p><strong>Acids</strong> taste sour and turn blue litmus paper RED (e.g. HCl, Citric acid in lemon).<br><strong>Bases</strong> taste bitter, feel slippery/soapy, and turn red litmus paper BLUE (e.g. NaOH, Baking soda).<br><strong>Neutralisation:</strong> Acid + Base → Salt + Water + Heat.</p>`, "bot");
        return;
      }

      console.log(`[AI Tutor Intent Debug] Grade: ${grade} | Intent: 'ncert_concept' | Query: '${msg}'`);
      this.appendMessage(
        `<h3>CBSE Grade ${escapeHTML(grade)} Study Assistance</h3>
         <p>Here is expert guidance for your Grade ${escapeHTML(grade)} CBSE syllabus question:</p>
         <p>For <strong>${escapeHTML(msg)}</strong>, review your Grade ${escapeHTML(grade)} NCERT textbook. Focus on key definitions, solved examples, and textbook exercise questions.</p>`,
        "bot"
      );
    },

    syncLocalBooks: async function (event) {
      if (event) event.preventDefault();

      const apiBase = this.getApiBaseUrl();
      const statusBox = document.getElementById("feed-books-status");
      const triggerBtn = event && event.currentTarget ? event.currentTarget : null;
      if (!statusBox || !triggerBtn) return;

      statusBox.classList.remove("hidden");
      statusBox.innerHTML = `<i data-lucide="loader" class="spin"></i> Syncing local book files into backend AI knowledge base...`;
      triggerBtn.disabled = true;

      try {
        const response = await fetch(`${apiBase}/api/textbooks/reindex`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          throw new Error(`Reindex failed with HTTP ${response.status}`);
        }

        const data = await response.json();
        const added = data.added_chunks || 0;
        const booksCount = data.books_found || 0;

        statusBox.className = "alert alert-success";
        statusBox.innerHTML = `Synced ${booksCount} local book file(s) and indexed ${added} text chunks into AI search!`;
        
        this.loadUploadedBooks();
      } catch (err) {
        console.warn("Reindex error:", err);
        statusBox.className = "alert alert-warning";
        statusBox.innerHTML = `Local indexing skipped. Backend is operating in local fallback mode.`;
      } finally {
        triggerBtn.disabled = false;
        if (window.lucide) window.lucide.createIcons();
      }
    },

    appendMessage: function (htmlContent, sender) {
      const chatMessages = document.getElementById("tutor-chat-messages");
      if (!chatMessages) return null;

      const msgDiv = document.createElement("div");
      msgDiv.className = `chat-message ${sender}`;

      if (sender.includes("temp")) {
        msgDiv.innerHTML = `<p><i data-lucide="loader" class="spin"></i> ${htmlContent}</p>`;
      } else if (sender === "user") {
        msgDiv.innerHTML = `<p>${escapeHTML(htmlContent)}</p>`;
      } else {
        msgDiv.innerHTML = htmlContent;
      }

      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      if (window.renderMathInElement) {
        window.renderMathInElement(msgDiv);
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }

      return msgDiv;
    },

    askQuestion: function (txt) {
      const input = document.getElementById("tutor-chat-input");
      if (input) {
        input.value = txt;
        this.handleUserMessage(txt);
        input.value = "";
      }
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

    // Dynamic Quiz Database mapped by Grade
    updateQuizChapters: function () {
      const gradeSelect = document.getElementById("quiz-grade-select");
      const subjSelect = document.getElementById("quiz-subject-select");
      const chapSelect = document.getElementById("quiz-chapter-select");
      if (!subjSelect || !chapSelect) return;

      const profile = window.StudyPilotDB.getProfile();
      const grade = String(profile.grade || "7");

      if (gradeSelect) {
        gradeSelect.value = grade;
      }

      const curriculum = window.StudyPilotDB.getCurriculum(grade, profile.stream || "Science");
      const subjects = curriculum.subjects || ["Science", "Mathematics", "Social Science", "English"];

      const prevSubject = subjSelect.value;
      const selectedSubject = subjects.includes(prevSubject) ? prevSubject : subjects[0];

      // Fully rebuild Subject select
      subjSelect.innerHTML = subjects.map(s => {
        return `<option value="${escapeHTML(s)}" ${s === selectedSubject ? "selected" : ""}>${escapeHTML(s)}</option>`;
      }).join("");

      const activeSubject = subjSelect.value || selectedSubject;

      // Fully rebuild Chapter select from active grade curriculum with explicit Grade & Subject label
      chapSelect.innerHTML = "";
      const chaptersList = (curriculum.chapters || {})[activeSubject] || [];

      if (chaptersList.length > 0) {
        chapSelect.innerHTML = chaptersList.map((ch, idx) => {
          const chNumStr = ch.num ? `Chapter ${ch.num}` : `Ch ${idx + 1}`;
          const title = ch.title || `Chapter ${idx + 1}`;
          const label = `Grade ${grade} ${activeSubject} - ${chNumStr}: ${title}`;
          const val = ch.id || `g${grade}_${activeSubject.toLowerCase()}_ch${idx + 1}`;
          return `<option value="${escapeHTML(val)}" data-title="${escapeHTML(title)}">${escapeHTML(label)}</option>`;
        }).join("");
      } else {
        chapSelect.innerHTML = `<option value="g${grade}_ch1">Grade ${grade} ${activeSubject} - Chapter 1: Foundations & Fundamentals</option>`;
      }
    },

    startQuiz: function () {
      const subjSelect = document.getElementById("quiz-subject-select");
      const chapSelect = document.getElementById("quiz-chapter-select");
      if (!subjSelect || !chapSelect) return;

      this.activeQuizSubject = subjSelect.value;
      this.activeQuizChapter = chapSelect.value;
      const selectedOpt = chapSelect.options[chapSelect.selectedIndex];
      const chapterTitle = selectedOpt ? (selectedOpt.getAttribute("data-title") || selectedOpt.text) : "Chapter Quiz";

      const profile = window.StudyPilotDB.getProfile();
      const grade = String(profile.grade || "7");

      // Dynamic questions strictly for this grade, subject, and chapter
      this.activeQuizQuestions = this.getQuizQuestionsForChapter(grade, this.activeQuizSubject, this.activeQuizChapter, chapterTitle);
      
      this.currentQuestionIndex = 0;
      this.quizScore = 0;
      this.quizTimeSeconds = 0;

      document.getElementById("quiz-init-view").classList.add("hidden");
      document.getElementById("quiz-active-view").classList.remove("hidden");
      document.getElementById("quiz-result-view").classList.add("hidden");

      this.startQuizTimer();
      this.loadQuizQuestion();
    },

    getQuizQuestionsForChapter: function (grade, subject, chapterId, chapterTitle) {
      const gStr = String(grade || "7");
      const bank = window.QUIZ_BANK_BY_GRADE || (window.StudyPilotCurriculum && window.StudyPilotCurriculum.getQuizBank ? window.StudyPilotCurriculum.getQuizBank(gStr) : null);
      
      if (bank) {
        const gradeBank = bank[gStr] || bank[grade];
        if (gradeBank && gradeBank[subject]) {
          const subBank = gradeBank[subject];
          const keysToTry = [
            chapterId,
            `g${gStr}_${chapterId}`,
            `g${gStr}_ch${String(chapterId).replace(/[^0-9]/g, "")}`,
            `ch${String(chapterId).replace(/[^0-9]/g, "")}`,
            `s_ch${String(chapterId).replace(/[^0-9]/g, "")}`,
            `m_ch${String(chapterId).replace(/[^0-9]/g, "")}`,
            `ss_ch${String(chapterId).replace(/[^0-9]/g, "")}`,
            `en_u${String(chapterId).replace(/[^0-9]/g, "")}`
          ];
          for (let k of keysToTry) {
            if (k && subBank[k] && subBank[k].length > 0) {
              return subBank[k];
            }
          }
        }
      }

      return this.generateDynamicNcertQuiz(grade, subject, chapterTitle);
    },

    generateDynamicNcertQuiz: function (grade, subject, chapterTitle) {
      const g = String(grade || "7");
      const subj = String(subject || "Science");
      const title = String(chapterTitle || "NCERT Chapter").trim();
      const lower = title.toLowerCase();

      // Topic-specific Question Banks based on chapter title keywords
      if (lower.includes("acid") || lower.includes("base") || lower.includes("substance")) {
        return [
          {
            q: `In Grade ${g} Science (${title}), what property defines an acid?`,
            options: ["Taste sour and turn blue litmus paper RED", "Taste bitter and feel slippery", "Turn red litmus paper blue", "Do not react with metals"],
            answer: 0,
            explain: "Acids taste sour and turn blue litmus paper red (e.g. hydrochloric acid, citric acid in lemon)."
          },
          {
            q: `What is the chemical reaction called when an Acid reacts with a Base in ${title}?`,
            options: ["Neutralization (forming Salt + Water + Heat)", "Evaporation", "Photosynthesis", "Sublimation"],
            answer: 0,
            explain: "Neutralization is the reaction between an acid and a base producing salt, water, and releasing heat."
          },
          {
            q: `Which of the following is a natural indicator used to test acids and bases in ${title}?`,
            options: ["Litmus (extracted from lichens)", "Distilled water", "Pure copper", "Common salt"],
            answer: 0,
            explain: "Litmus is a natural dye extracted from lichens, widely used as an indicator."
          },
          {
            q: `Which household substance is basic in nature?`,
            options: ["Baking soda solution / Soap water", "Lemon juice", "Vinegar", "Amla juice"],
            answer: 0,
            explain: "Baking soda and soap feel slippery and are basic (alkaline)."
          },
          {
            q: `What is the pH of a neutral solution (like pure water) at room temperature?`,
            options: ["7", "0", "14", "2"],
            answer: 0,
            explain: "A neutral solution has a pH of 7 on the pH scale."
          }
        ];
      }

      if (lower.includes("circuit") || lower.includes("electric") || lower.includes("component")) {
        return [
          {
            q: `In Grade ${g} Science (${title}), what is required for electric current to flow?`,
            options: ["A closed, continuous conducting loop with a power source", "An open switch only", "A wooden wire", "Air gaps"],
            answer: 0,
            explain: "Electric current requires a complete, closed circuit made of conducting material connected to a battery/cell."
          },
          {
            q: `What is a battery in an electric circuit (${title})?`,
            options: ["Two or more electric cells joined positive-to-negative", "A single wire", "A plastic switch", "A glass bulb"],
            answer: 0,
            explain: "A battery is formed by connecting the positive terminal of one cell to the negative terminal of another."
          },
          {
            q: `What safety device melts and breaks the circuit when current is dangerously high?`,
            options: ["Electric fuse", "Electric switch", "Copper wire", "Voltmeter"],
            answer: 0,
            explain: "An electric fuse contains a wire with a low melting point that breaks the circuit if excess current flows."
          },
          {
            q: `Which effect of electric current is used in an electromagnet?`,
            options: ["Magnetic effect of electric current", "Chemical effect only", "Cooling effect", "Optical effect"],
            answer: 0,
            explain: "Electric current flowing through an insulated wire wrapped around iron creates a temporary magnet (magnetic effect)."
          },
          {
            q: `What is the standard SI unit of electric current?`,
            options: ["Ampere (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"],
            answer: 0,
            explain: "Electric current is measured in Amperes (symbol A)."
          }
        ];
      }

      if (lower.includes("line") || lower.includes("angle") || lower.includes("parallel") || lower.includes("transversal")) {
        return [
          {
            q: `In Grade ${g} Mathematics (${title}), what defines parallel lines?`,
            options: ["Lines in the same plane that never intersect", "Lines that cross at 90 degrees", "Lines of unequal length", "Curved lines"],
            answer: 0,
            explain: "Parallel lines stay equidistant from each other and never meet no matter how far extended."
          },
          {
            q: `When a transversal cuts two parallel lines, what is true about corresponding angles?`,
            options: ["They are equal in measure", "They add up to 90 degrees", "They add up to 360 degrees", "They are always obtuse"],
            answer: 0,
            explain: "Corresponding angles formed by a transversal intersecting parallel lines are always equal."
          },
          {
            q: `What is the sum of co-interior angles on the same side of a transversal intersecting parallel lines?`,
            options: ["180° (Supplementary)", "90° (Complementary)", "360°", "45°"],
            answer: 0,
            explain: "Co-interior (consecutive interior) angles on the same side of a transversal are supplementary (sum = 180°)."
          },
          {
            q: `Two angles are called complementary if their sum is:`,
            options: ["90°", "180°", "270°", "360°"],
            answer: 0,
            explain: "Complementary angles sum to 90 degrees."
          },
          {
            q: `When two straight lines intersect, what can be said about vertically opposite angles?`,
            options: ["They are always equal", "They add to 90°", "They are unequal", "They are zero"],
            answer: 0,
            explain: "Vertically opposite angles formed by two intersecting lines are equal."
          }
        ];
      }

      if (lower.includes("fraction") || lower.includes("rational") || lower.includes("decimal") || lower.includes("number")) {
        return [
          {
            q: `In Grade ${g} Mathematics (${title}), what type of fraction has a numerator smaller than its denominator?`,
            options: ["Proper fraction", "Improper fraction", "Mixed fraction", "Decimal fraction"],
            answer: 0,
            explain: "A proper fraction represents a part of a whole, so numerator < denominator (e.g. 3/4)."
          },
          {
            q: `How do you convert the improper fraction 7/3 into a mixed fraction?`,
            options: ["2 1/3", "3 1/2", "1 4/3", "7.3"],
            answer: 0,
            explain: "7 divided by 3 gives quotient 2 and remainder 1, so 7/3 = 2 1/3."
          },
          {
            q: `What is an equivalent fraction of 2/5?`,
            options: ["4/10", "3/5", "5/2", "2/10"],
            answer: 0,
            explain: "Multiplying both numerator and denominator of 2/5 by 2 gives 4/10."
          },
          {
            q: `To add two fractions with different denominators, what step must be performed first?`,
            options: ["Find the LCM of the denominators to get a common denominator", "Add numerators directly", "Multiply the numerators", "Subtract denominators"],
            answer: 0,
            explain: "Unlike fractions must be converted to like fractions using the Least Common Multiple (LCM) of their denominators."
          },
          {
            q: `What is the decimal equivalent of the fraction 3/4?`,
            options: ["0.75", "0.34", "0.43", "0.5"],
            answer: 0,
            explain: "3 divided by 4 equals 0.75."
          }
        ];
      }

      if (lower.includes("locat") || lower.includes("earth") || lower.includes("map") || lower.includes("globe") || lower.includes("latitude")) {
        return [
          {
            q: `In Grade ${g} Social Science (${title}), what horizontal reference line divides Earth into Northern and Southern Hemispheres?`,
            options: ["Equator (0° Latitude)", "Prime Meridian (0° Longitude)", "Tropic of Cancer", "Arctic Circle"],
            answer: 0,
            explain: "The Equator is an imaginary horizontal circle around Earth at 0° latitude."
          },
          {
            q: `What vertical line passing through Greenwich, England is selected as 0° Longitude?`,
            options: ["Prime Meridian", "Equator", "Tropic of Capricorn", "Antarctic Circle"],
            answer: 0,
            explain: "The Prime Meridian is 0° longitude and serves as the reference for World Standard Time."
          },
          {
            q: `How do Latitudes and Longitudes help us on a globe or map in ${title}?`,
            options: ["They form a grid system to pinpoint exact geographical locations", "They predict daily rainfall", "They measure ocean depth only", "They show borders only"],
            answer: 0,
            explain: "The geographic grid of latitude and longitude coordinates allows exact location of any place on Earth."
          },
          {
            q: `How many total degrees of longitude are around the Earth?`,
            options: ["360°", "180°", "90°", "100°"],
            answer: 0,
            explain: "Earth is divided into 360° of longitude (180° East and 180° West)."
          },
          {
            q: `Indian Standard Time (IST) is calculated based on which central meridian?`,
            options: ["82.5° E Longitude (passing through Mirzapur)", "0° Prime Meridian", "90° E Longitude", "75° E Longitude"],
            answer: 0,
            explain: "82.5° E is India's standard meridian, making IST GMT + 5:30."
          }
        ];
      }

      if (lower.includes("magnet")) {
        return [
          {
            q: `In Grade ${g} Science (${title}), what happens when two like magnetic poles (North-North or South-South) are brought close together?`,
            options: ["They repel each other", "They attract each other", "They cancel out completely", "They turn into copper"],
            answer: 0,
            explain: "Like magnetic poles repel each other, while opposite poles attract."
          },
          {
            q: `Which of the following materials is magnetic and attracted to a magnet?`,
            options: ["Iron / Nickel / Cobalt", "Wood", "Plastic", "Glass"],
            answer: 0,
            explain: "Iron, nickel, and cobalt are ferromagnetic materials strongly attracted by magnets."
          },
          {
            q: `Where is the magnetic field strength strongest in a bar magnet?`,
            options: ["Near both poles (North and South poles)", "In the exact middle", "Outside the magnetic field", "Underneath the magnet"],
            answer: 0,
            explain: "Magnetic field lines are densest and magnetic pull is strongest near the poles."
          },
          {
            q: `What instrument uses a magnetized needle aligned with Earth's magnetic field to find directions?`,
            options: ["Magnetic compass", "Barometer", "Thermometer", "Speedometer"],
            answer: 0,
            explain: "A magnetic compass needle naturally aligns in the North-South direction."
          },
          {
            q: `Can a magnet exist with only a single North pole (monopole)?`,
            options: ["No, magnetic poles always exist in pairs (North and South)", "Yes, if cut in half", "Yes, if heated", "Yes, in liquids"],
            answer: 0,
            explain: "Even if a magnet is broken into pieces, each piece becomes a new magnet with both North and South poles."
          }
        ];
      }

      // Default dynamic builder for any specific Subject & Chapter title
      return [
        {
          q: `What is the core subject matter covered in Grade ${g} ${subj} — "${title}"?`,
          options: [
            `Understanding essential principles, definitions, and applications of ${title}`,
            "Unrelated historical dates",
            "Random unverified guesses",
            "Ignoring textbook guidelines"
          ],
          answer: 0,
          explain: `In Grade ${g} ${subj}, "${title}" establishes fundamental concepts, definitions, and standard problem-solving rules.`
        },
        {
          q: `Which key skill or formula is essential when studying "${title}"?`,
          options: [
            `Applying standard ${subj} rules, definitions, and step-by-step methods`,
            "Memorizing incorrect answers",
            "Skipping diagrams and steps",
            "Changing question values"
          ],
          answer: 0,
          explain: `Mastering ${title} requires applying standard NCERT formulas, concepts, and logical steps.`
        },
        {
          q: `What representation or unit standard is used in "${title}"?`,
          options: [
            `Standard CBSE notation and verified definitions for ${title}`,
            "Non-standard symbols only",
            "Roman numerals for all values",
            "Binary notation only"
          ],
          answer: 0,
          explain: `NCERT ${subj} relies on standard scientific/mathematical notation and verified SI units.`
        },
        {
          q: `How do you verify your answers or conclusions in exercises for "${title}"?`,
          options: [
            "Check against textbook principles, substitute values, and verify logical reasoning",
            "Erase working steps",
            "Guess without reviewing",
            "Ignore units"
          ],
          answer: 0,
          explain: "Verifying calculations and cross-referencing textbook definitions ensures 100% accuracy in exams."
        },
        {
          q: `Why is "${title}" an important foundation in Grade ${g} ${subj}?`,
          options: [
            `It connects fundamental concepts to real-world applications and higher grade topics`,
            "It is only used once in class",
            "It has no practical relevance",
            "It contradicts basic laws"
          ],
          answer: 0,
          explain: `Understanding ${title} builds conceptual clarity needed for advanced study and practical application.`
        }
      ];
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
      const qList = this.activeQuizQuestions || [];
      if (qList.length === 0) return;

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
      const qList = this.activeQuizQuestions || [];
      if (qList.length === 0) return;

      const qData = qList[this.currentQuestionIndex] || qList[0];
      const buttons = document.querySelectorAll("#quiz-options-container .quiz-opt-btn");

      buttons.forEach(btn => btn.disabled = true);

      const feedback = document.getElementById("quiz-feedback");
      feedback.classList.remove("hidden");

      if (selectedIdx === qData.answer) {
        if (buttons[selectedIdx]) buttons[selectedIdx].classList.add("correct");
        feedback.className = "quiz-feedback-box correct";
        feedback.innerHTML = `<strong>Correct!</strong> ${escapeHTML(qData.explain || "Great job!")}`;
        this.quizScore++;
      } else {
        if (buttons[selectedIdx]) buttons[selectedIdx].classList.add("incorrect");
        if (buttons[qData.answer]) buttons[qData.answer].classList.add("correct");
        feedback.className = "quiz-feedback-box incorrect";
        feedback.innerHTML = `<strong>Incorrect.</strong> The correct answer is: "${escapeHTML(qData.options[qData.answer])}". <br>${escapeHTML(qData.explain || "")}`;
      }

      document.getElementById("quiz-next-btn").classList.remove("hidden");
    },

    nextQuizQuestion: function () {
      this.currentQuestionIndex++;
      const qList = this.activeQuizQuestions || [];

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

      const qList = this.activeQuizQuestions || [];
      document.getElementById("quiz-final-score").innerText = `${this.quizScore}/${qList.length}`;

      const passed = this.quizScore >= Math.max(1, qList.length - 1);
      if (passed) {
        const progress = window.StudyPilotDB.getLessonProgress();
        const chId = this.activeQuizChapter || "ch1";
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
    },

    askDoubtForBook: function (subject, chapterTitle) {
      const input = document.getElementById("tutor-chat-input");
      if (input) {
        input.value = `Explain ${subject} ${chapterTitle} with key NCERT definitions and sample exam questions.`;
        this.handleUserMessage(input.value);
        input.value = "";
      }
    }
  };

  function escapeHTML(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(function () {
      if (window.StudyPilotTutor && typeof window.StudyPilotTutor.init === "function") {
        window.StudyPilotTutor.init();
      }
    }, 10);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (window.StudyPilotTutor && typeof window.StudyPilotTutor.init === "function") {
        window.StudyPilotTutor.init();
      }
    });
  }
})();
