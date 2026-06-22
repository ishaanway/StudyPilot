/* ======================================================== */
/* StudyPilot Toolbox Tools: Pomodoro, Notes, OCR, Career    */
/* ======================================================== */

(function () {
  
  // Custom Career suggestions database
  const CAREER_DATABASE = [
    {
      title: "AI & Software Systems Engineer",
      desc: "Design intelligent programs, building search systems and agent systems like StudyPilot.",
      skills: ["Problem Solving", "Coding (Python/JS)", "Logic"],
      subjects: ["Mathematics", "Computer Science"],
      roadmap: [
        { label: "BODMAS Rules", status: "completed" },
        { label: "Variables & Algebra", status: "active" },
        { label: "Basic Coding (Python)", status: "pending" },
        { label: "College Prep (B.Tech)", status: "pending" }
      ]
    },
    {
      title: "Medical Specialist / Surgeon",
      desc: "Study biology, diseases, and cures to help heal patients and save lives.",
      skills: ["Focus", "Adolescence Anatomy", "Critical Thinking"],
      subjects: ["Science (Biology)", "Chemistry"],
      roadmap: [
        { label: "World of Science", status: "completed" },
        { label: "Animal/Plant Life", status: "active" },
        { label: "Pre-Med Entry Prep", status: "pending" },
        { label: "Medical University", status: "pending" }
      ]
    },
    {
      title: "Civil & Architectural Engineer",
      desc: "Create buildings, bridges, and infrastructure using spatial designs and geometric equations.",
      skills: ["Spatial Thinking", "Constructions", "Physics"],
      subjects: ["Mathematics", "Science (Physics)"],
      roadmap: [
        { label: "Parallel Lines Ch 5", status: "completed" },
        { label: "Tilings & Shapes", status: "active" },
        { label: "Structural Physics", status: "pending" },
        { label: "Engineering Exam", status: "pending" }
      ]
    }
  ];

  window.StudyPilotToolbox = {
    // 1. Pomodoro Timer State
    pomodoroInterval: null,
    pomodoroMinutes: 25,
    pomodoroSeconds: 0,
    pomodoroIsRunning: false,
    pomodoroMode: "focus", // "focus" or "break"
    
    // 2. Note Composer State
    selectedNoteColor: "default",

    // 3. OCR Simulation State
    ocrProgressInterval: null,

    init: function () {
      this.initToolNavigation();
      this.renderNotes();
      this.resetPomodoro();
      this.syncCareerGoalInfo();
    },

    // Switch between tools in toolbox
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
        
        window.StudyPilotDB.addNotification(`Timer started: ${this.pomodoroMode === 'focus' ? 'Focusing' : 'Resting'} for ${this.pomodoroMinutes} mins.`, "info");
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

      // Calculate ring circle offset
      // Circumference = 2 * PI * r = 2 * 3.14159 * 96 = 603.18
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
        window.StudyPilotDB.addNotification("Pomodoro session complete! Great focus. Time for a 5 minute break.", "success");
        // Trigger auto switch to break
        this.togglePomodoroMode();
      } else {
        window.StudyPilotDB.addNotification("Break complete! Ready to schedule another focus session?", "info");
        this.togglePomodoroMode();
      }
    },

    changeAmbientSound: function () {
      const sound = document.getElementById("timer-ambient-select").value;
      if (sound !== "none") {
        window.StudyPilotDB.addNotification(`Sound simulator: Ambient sound "${sound}" playing in background.`, "info");
      }
    },

    // ======================================================== 
    // Tool: Quick Keep-style Notes
    // ========================================================
    selectNoteColor: function (color) {
      this.selectedNoteColor = color;
      
      // Update checked border in color picker
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
      
      // Reset inputs
      document.getElementById("note-title-input").value = "";
      document.getElementById("note-body-input").value = "";
      this.selectNoteColor("default");
      
      this.renderNotes();
      window.StudyPilotDB.addNotification(`Note "${title || 'Untitled'}" saved successfully!`, "success");
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
      
      this.ocrProgressInterval = setInterval(() => {
        pct += 10;
        progressFill.style.width = `${pct}%`;
        progressPct.innerText = `${pct}%`;

        if (pct >= 100) {
          clearInterval(this.ocrProgressInterval);
          progressWrap.classList.add("hidden");
          results.classList.remove("hidden");
          
          window.StudyPilotDB.addNotification("OCR scan complete: Summary & equations generated for Electricity circuits.", "success");
          
          // Re-render KaTeX math blocks inside the generated summary
          if (window.renderMathInElement) {
            window.renderMathInElement(results);
          }
        }
      }, 150);
    },

    saveOCRAsNote: function () {
      const title = "OCR Summary: Electricity (Ch 3)";
      const body = "Key Concepts Extracted:\n- Electric Current: Flow of electric charge through conductor.\n- Circuit components: bulb, switch, fuse.\n- Heating effect is used in irons and fuses.\n- Electromagnet strength increases with turns.\n\nFormulas:\n- Current (I) = Q / t\n- Strength of Electromagnet is proportional to coil turns.";
      
      window.StudyPilotDB.addNote(title, body, "blue");
      window.StudyPilotDB.addNotification("OCR Summary saved to Quick Notes!", "success");
      
      // If notes tab is active, redraw it
      this.renderNotes();
    },

    // ======================================================== 
    // Tool: Career Guidance Mode
    // ========================================================
    syncCareerGoalInfo: function () {
      const profile = window.StudyPilotDB.getProfile();
      const goalSpan = document.getElementById("career-user-goal");
      const menuBtn = document.getElementById("toolbox-menu-career");

      if (goalSpan) {
        goalSpan.innerText = profile.goal;
      }

      // Check if unlocked (prompt says: "Only after the AI has learned about the student should it ask... would you like career suggestions?")
      if (profile.careerUnlocked) {
        document.getElementById("career-opt-in-view").classList.add("hidden");
        document.getElementById("career-active-view").classList.remove("hidden");
        this.renderCareerRoadmaps();
      } else {
        document.getElementById("career-opt-in-view").classList.remove("hidden");
        document.getElementById("career-active-view").classList.add("hidden");
      }
    },

    unlockCareerMode: function () {
      const profile = window.StudyPilotDB.getProfile();
      profile.careerUnlocked = true;
      window.StudyPilotDB.saveProfile(profile);
      
      this.syncCareerGoalInfo();
      window.StudyPilotDB.addNotification("Career Guidance Mode unlocked! AI suggestions generated.", "success");
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

      container.innerHTML = CAREER_DATABASE.map(c => {
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
