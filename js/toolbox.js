/* ======================================================== */
/* StudyPilot Toolbox Tools: Pomodoro, Notes, OCR, Career    */
/* ======================================================== */

(function () {
  
  // Custom Career suggestions database mapped by Stream/Goal
  const CAREER_DATABASE = {
    Science: [
      {
        title: "AI & Software Systems Engineer",
        desc: "Design intelligent algorithms, building web applications and agent systems.",
        skills: ["Coding (Python/JS)", "Logic", "Algorithms"],
        roadmap: [
          { label: "BODMAS Rules", status: "completed" },
          { label: "Variables & Algebra", status: "active" },
          { label: "Basic Coding (Python)", status: "pending" },
          { label: "College Prep (B.Tech)", status: "pending" }
        ]
      },
      {
        title: "Medical Specialist / Surgeon",
        desc: "Study biology, diagnostics, and therapeutics to save lives.",
        skills: ["Anatomy", "Focus", "Critical Thinking"],
        roadmap: [
          { label: "World of Science", status: "completed" },
          { label: "Animal/Plant Life", status: "active" },
          { label: "Pre-Med Entry Prep", status: "pending" },
          { label: "Medical University", status: "pending" }
        ]
      }
    ],
    Commerce: [
      {
        title: "Chartered Accountant (CA)",
        desc: "Manage audit systems, corporate taxes, and balance sheet books.",
        skills: ["Double Entry Ledger", "Calculations", "Law"],
        roadmap: [
          { label: "Arithmetic Prep", status: "completed" },
          { label: "Partnership Accounts", status: "active" },
          { label: "CA Foundation Exam", status: "pending" },
          { label: "Articleship Prep", status: "pending" }
        ]
      },
      {
        title: "Investment Banker",
        desc: "Advise corporations on capital, stocks, market shares, and finance structures.",
        skills: ["Financial Analysis", "Macroeconomics", "Statistics"],
        roadmap: [
          { label: "Percentage Ratios", status: "completed" },
          { label: "National Income GDP", status: "active" },
          { label: "Finance Degree (MBA)", status: "pending" },
          { label: "Corporate Finance", status: "pending" }
        ]
      }
    ],
    Humanities: [
      {
        title: "International Relations Diplomat",
        desc: "Represent country goals in global councils, managing embassies and peace treaties.",
        skills: ["Diplomacy", "Cold War History", "Languages"],
        roadmap: [
          { label: "English Grammar", status: "completed" },
          { label: "World Politics Ch 1", status: "active" },
          { label: "Civil Services UPSC", status: "pending" },
          { label: "Diplomatic Academy", status: "pending" }
        ]
      }
    ]
  };

  window.StudyPilotToolbox = {
    pomodoroInterval: null,
    pomodoroMinutes: 25,
    pomodoroSeconds: 0,
    pomodoroIsRunning: false,
    pomodoroMode: "focus", 
    selectedNoteColor: "default",
    ocrProgressInterval: null,

    init: function () {
      this.initToolNavigation();
      this.renderNotes();
      this.resetPomodoro();
      this.syncCareerGoalInfo();
    },

    initToolNavigation: function () {
      const menuBtns = document.querySelectorAll(".tool-menu-btn");
      menuBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          menuBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

          const toolName = btn.getAttribute("data-tool");
          document.querySelectorAll(".tool-panel").forEach(p => p.classList.add("hidden"));
          document.getElementById(`tool-panel-${toolName}`).classList.remove("hidden");
          
          if (window.lucide) {
            window.lucide.createIcons();
          }
        });
      });
    },

    // ======================================================== 
    // Tool: Pomodoro Focus Timer
    // ========================================================
    togglePomodoroMode: function () {
      this.pausePomodoro();
      this.pomodoroMode = this.pomodoroMode === "focus" ? "break" : "focus";
      
      const modeBtn = document.getElementById("pomodoro-mode-toggle");
      const label = document.getElementById("pomodoro-state-label");
      
      if (this.pomodoroMode === "focus") {
        this.pomodoroMinutes = 25;
        modeBtn.innerText = "Switch to Break";
        label.innerText = "FOCUS SESSION";
      } else {
        this.pomodoroMinutes = 5;
        modeBtn.innerText = "Switch to Focus";
        label.innerText = "SHORT BREAK";
      }
      this.pomodoroSeconds = 0;
      this.updateTimerUI();
    },

    startPomodoro: function () {
      const startBtn = document.getElementById("pomodoro-start-btn");
      if (this.pomodoroIsRunning) {
        this.pausePomodoro();
      } else {
        this.pomodoroIsRunning = true;
        startBtn.innerText = "Pause";
        
        this.pomodoroInterval = setInterval(() => {
          if (this.pomodoroSeconds === 0) {
            if (this.pomodoroMinutes === 0) {
              this.completePomodoroSession();
              return;
            }
            this.pomodoroMinutes--;
            this.pomodoroSeconds = 59;
          } else {
            this.pomodoroSeconds--;
          }
          this.updateTimerUI();
        }, 1000);
        
        window.StudyPilotDB.addNotification(`Timer started: ${this.pomodoroMode === 'focus' ? 'Focusing' : 'Resting'}.`, "info");
      }
    },

    pausePomodoro: function () {
      this.pomodoroIsRunning = false;
      clearInterval(this.pomodoroInterval);
      document.getElementById("pomodoro-start-btn").innerText = "Start";
    },

    resetPomodoro: function () {
      this.pausePomodoro();
      this.pomodoroMinutes = this.pomodoroMode === "focus" ? 25 : 5;
      this.pomodoroSeconds = 0;
      this.updateTimerUI();
    },

    updateTimerUI: function () {
      const display = document.getElementById("pomodoro-timer-display");
      const ringFill = document.querySelector(".timer-ring-fill");
      if (!display || !ringFill) return;

      const m = this.pomodoroMinutes.toString().padStart(2, '0');
      const s = this.pomodoroSeconds.toString().padStart(2, '0');
      display.innerText = `${m}:${s}`;

      const totalSeconds = this.pomodoroMode === "focus" ? 25 * 60 : 5 * 60;
      const secondsLeft = (this.pomodoroMinutes * 60) + this.pomodoroSeconds;
      const progress = secondsLeft / totalSeconds;
      
      const circumference = 603.18;
      const offset = circumference * (1 - progress);
      ringFill.style.strokeDashoffset = offset;
    },

    completePomodoroSession: function () {
      this.pausePomodoro();
      if (this.pomodoroMode === "focus") {
        window.StudyPilotDB.addNotification("Pomodoro focus session completed!", "success");
        this.togglePomodoroMode();
      } else {
        window.StudyPilotDB.addNotification("Rest break completed. Ready to focus?", "info");
        this.togglePomodoroMode();
      }
    },

    changeAmbientSound: function () {
      const sound = document.getElementById("timer-ambient-select").value;
      if (sound !== "none") {
        window.StudyPilotDB.addNotification(`Ambient sound "${sound}" playing in background.`, "info");
      }
    },

    // ======================================================== 
    // Tool: Quick Keep-style Notes
    // ========================================================
    selectNoteColor: function (color) {
      this.selectedNoteColor = color;
      const dots = document.querySelectorAll(".color-dot");
      dots.forEach(d => {
        if (d.getAttribute("data-color") === color) {
          d.classList.add("active");
        } else {
          d.classList.remove("active");
        }
      });
    },

    saveNote: function () {
      const title = document.getElementById("note-title-input").value.trim();
      const body = document.getElementById("note-body-input").value.trim();

      if (!body) {
        alert("Please write something inside your note body.");
        return;
      }

      window.StudyPilotDB.addNote(title, body, this.selectedNoteColor);
      
      document.getElementById("note-title-input").value = "";
      document.getElementById("note-body-input").value = "";
      this.selectNoteColor("default");
      
      this.renderNotes();
      window.StudyPilotDB.addNotification(`Note "${title || 'Untitled'}" saved.`, "success");
    },

    renderNotes: function () {
      const container = document.getElementById("notes-grid-container");
      if (!container) return;

      const notes = window.StudyPilotDB.getNotes();
      if (notes.length === 0) {
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-light); font-size: 0.85rem;">No notes saved yet. Compose one above!</div>';
        return;
      }

      container.innerHTML = notes.map(n => {
        return `
          <div class="note-card note-bg-${n.color}">
            <div class="note-header">
              <h4>${escapeHTML(n.title)}</h4>
              <button style="background:none;border:none;color:inherit;cursor:pointer;" onclick="window.StudyPilotToolbox.deleteNote('${n.id}')">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
            <div class="note-desc">${escapeHTML(n.body)}</div>
            <div class="note-footer">
              <span class="note-time">${n.updatedAt}</span>
            </div>
          </div>
        `;
      }).join("");

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    deleteNote: function (id) {
      if (confirm("Delete this note?")) {
        window.StudyPilotDB.deleteNote(id);
        this.renderNotes();
      }
    },

    // ======================================================== 
    // Tool: Document Summarizer (OCR Scanner Mock)
    // ========================================================
    triggerMockOCR: function () {
      const dragZone = document.getElementById("ocr-drag-zone");
      const progressWrap = document.getElementById("ocr-progress-container");
      const progressFill = document.getElementById("ocr-progress-fill");
      const progressPct = document.getElementById("ocr-progress-pct");
      const results = document.getElementById("ocr-results");

      dragZone.classList.add("hidden");
      progressWrap.classList.remove("hidden");
      results.classList.add("hidden");

      let pct = 0;
      clearInterval(this.ocrProgressInterval);
      
      const profile = window.StudyPilotDB.getProfile();
      
      this.ocrProgressInterval = setInterval(() => {
        pct += 10;
        progressFill.style.width = `${pct}%`;
        progressPct.innerText = `${pct}%`;

        if (pct >= 100) {
          clearInterval(this.ocrProgressInterval);
          progressWrap.classList.add("hidden");
          results.classList.remove("hidden");
          
          this.renderOCRSummary(profile.grade, profile.stream);
        }
      }, 150);
    },

    renderOCRSummary: function (grade, stream) {
      const titleEl = document.getElementById("ocr-summary-chapter-title");
      const bodyEl = document.getElementById("ocr-summary-results-body");
      
      if (!titleEl || !bodyEl) return;

      let html = "";
      if (grade === "12") {
        titleEl.innerHTML = `<i data-lucide="file-check"></i> Extracted Summary: Physics Chapter 2 (Electricity)`;
        html = `
          <h5>Key Concepts</h5>
          <ul>
            <li><strong>Kirchhoff's Current Law (KCL):</strong> The junction rule states that current entering is equal to current leaving.</li>
            <li><strong>Kirchhoff's Voltage Law (KVL):</strong> The loop rule states that the potential sum in a closed network is zero.</li>
          </ul>
          <h5>Important Formulas</h5>
          <p class="formula-box">\\[\\sum I_{in} = \\sum I_{out}\\]</p>
          <p class="formula-box">\\[\\sum V = 0\\]</p>
        `;
      } else if (grade === "prekg" || grade === "lkg" || grade === "ukg") {
        titleEl.innerHTML = `<i data-lucide="file-check"></i> Extracted Summary: English Numbers & Alphabet`;
        html = `
          <h5>Key Concepts</h5>
          <ul>
            <li><strong>Tracing Lines:</strong> Practice straight vertical lines (standing) and horizontal lines (sleeping).</li>
            <li><strong>Fruits Counting:</strong> Associate numbers with physical objects (2 apples, 3 oranges).</li>
          </ul>
        `;
      } else {
        // Grade 7 default
        titleEl.innerHTML = `<i data-lucide="file-check"></i> Extracted Summary: Curiosity Chapter 3 (Electricity)`;
        html = `
          <h5>Key Concepts</h5>
          <ul>
            <li><strong>Electric Current:</strong> The flow of electric charge through a conductor (e.g. copper wire).</li>
            <li><strong>Fuses:</strong> Overheats and melts to break the circuit in short circuit scenarios.</li>
            <li><strong>Electromagnets:</strong> Coil turns of wire wrapped around iron nail carrying voltage.</li>
          </ul>
          <h5>Important Formulas</h5>
          <p class="formula-box">\\[\\text{Current } (I) = \\frac{\\text{Charge } (Q)}{\\text{Time } (t)}\\]</p>
        `;
      }

      bodyEl.innerHTML = html;
      
      window.StudyPilotDB.addNotification("OCR scan complete. Summary card loaded.", "success");
      
      if (window.renderMathInElement) {
        window.renderMathInElement(bodyEl);
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    saveOCRAsNote: function () {
      const profile = window.StudyPilotDB.getProfile();
      let title = "OCR Summary: Electricity";
      let body = "Electricity details:\n- Current (I) = Q / t\n- Fuses break excessive current networks.";
      
      if (profile.grade === "12") {
        title = "OCR Summary: Kirchhoff's Network";
        body = "Kirchhoff network rules:\n- Loop rule: Sum of voltage is zero.\n- Junction rule: Sum of entering current equals leaving current.";
      } else if (profile.grade === "prekg" || profile.grade === "lkg" || profile.grade === "ukg") {
        title = "OCR Summary: Numbers & ABCs";
        body = "Writing guidelines:\n- Letter A uses diagonal lines.\n- Circle shapes are round.";
      }

      window.StudyPilotDB.addNote(title, body, "blue");
      window.StudyPilotDB.addNotification("OCR summary saved to Notes!", "success");
      
      this.renderNotes();
    },

    // ======================================================== 
    // Tool: Career Guidance Mode
    // ========================================================
    syncCareerGoalInfo: function () {
      const profile = window.StudyPilotDB.getProfile();
      const goalSpan = document.getElementById("career-user-goal");

      if (goalSpan) {
        goalSpan.innerText = profile.goal;
      }

      const optInView = document.getElementById("career-opt-in-view");
      const activeView = document.getElementById("career-active-view");
      if (optInView && activeView) {
        if (profile.careerUnlocked) {
          optInView.classList.add("hidden");
          activeView.classList.remove("hidden");
          this.renderCareerRoadmaps();
        } else {
          optInView.classList.remove("hidden");
          activeView.classList.add("hidden");
        }
      }
    },

    unlockCareerMode: function () {
      const profile = window.StudyPilotDB.getProfile();
      profile.careerUnlocked = true;
      window.StudyPilotDB.saveProfile(profile);
      this.syncCareerGoalInfo();
    },

    resetCareerOptIn: function () {
      const profile = window.StudyPilotDB.getProfile();
      profile.careerUnlocked = false;
      window.StudyPilotDB.saveProfile(profile);
      this.syncCareerGoalInfo();
    },

    renderCareerRoadmaps: function () {
      const container = document.getElementById("career-cards-grid");
      if (!container) return;

      const profile = window.StudyPilotDB.getProfile();
      // Default to Science streams if Humanities/Commerce not present
      const stream = profile.stream || "Science";
      const careers = CAREER_DATABASE[stream] || CAREER_DATABASE["Science"];

      container.innerHTML = careers.map(c => {
        return `
          <div class="career-card">
            <div class="career-title-row">
              <h4>${escapeHTML(c.title)}</h4>
              <span class="badge badge-indigo">95% Match Match</span>
            </div>
            <p class="career-desc">${escapeHTML(c.desc)}</p>
            
            <div class="career-skills">
              <span class="text-muted">Skills:</span>
              ${c.skills.map(s => `<span class="badge badge-accent">${escapeHTML(s)}</span>`).join("")}
            </div>

            <div class="career-roadmap-timeline">
              ${c.roadmap.map(step => {
                let stepClass = step.status === "completed" ? "completed" : (step.status === "active" ? "active" : "");
                return `
                  <div class="career-step ${stepClass}">
                    <div class="step-node"></div>
                    <div class="step-label">${escapeHTML(step.label)}</div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }).join("");
    }
  };

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
