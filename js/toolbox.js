/* ======================================================== */
/* StudyPilot Toolbox Tools: Pomodoro, Notes, Career         */
/* ======================================================== */

(function () {
  window.StudyPilotToolbox = {
    // 1. Pomodoro Timer State
    pomodoroInterval: null,
    pomodoroMinutes: 25,
    pomodoroSeconds: 0,
    pomodoroIsRunning: false,
    pomodoroMode: "focus", // "focus" or "break"
    
    // 2. Note Composer State
    selectedNoteColor: "default",

    profileListenerBound: false,
    careerRecommendations: [],
    careerSummary: "",
    careerActionPlan: [],
    careerLoading: false,
    careerError: "",
    careerProfileSignature: "",
    careerRequestPromise: null,

    init: function () {
      this.bindProfileListener();
      this.initToolNavigation();
      this.renderNotes();
      this.resetPomodoro();
      this.syncCareerGoalInfo();
    },

    bindProfileListener: function () {
      if (this.profileListenerBound) return;
      this.profileListenerBound = true;

      window.addEventListener("studypilot_profile_updated", () => {
        this.renderNotes();
        this.syncCareerGoalInfo();
      });
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

    getApiBaseUrl: function () {
      if (window.StudyPilotApi && typeof window.StudyPilotApi.getBaseUrl === "function") {
        return window.StudyPilotApi.getBaseUrl();
      }
      if (window.StudyPilotTutor && typeof window.StudyPilotTutor.getApiBaseUrl === "function") {
        return window.StudyPilotTutor.getApiBaseUrl();
      }
      if (window.STUDYPILOT_API_BASE && String(window.STUDYPILOT_API_BASE).trim()) {
        return String(window.STUDYPILOT_API_BASE).replace(/\/+$/, "");
      }
      if (window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return window.location.origin;
      }
      return "http://127.0.0.1:5000";
    },

    getStudyToolContext: function () {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const analytics = window.StudyPilotDB.getStudyAnalytics ? window.StudyPilotDB.getStudyAnalytics() : {};
      const analyticsSummary = window.StudyPilotDB.getStudyAnalyticsSummary ? window.StudyPilotDB.getStudyAnalyticsSummary() : {};
      const history = window.StudyPilotDB.getTutorHistory ? window.StudyPilotDB.getTutorHistory(12) : [];
      const subjects = Array.isArray(profile && profile.subjects) ? profile.subjects : [];
      return {
        profile,
        analytics,
        analyticsSummary,
        history,
        subject: (profile && Array.isArray(profile.favoriteSubjects) && profile.favoriteSubjects[0]) || subjects[0] || "Science",
        grade: profile ? profile.grade : "10",
      };
    },

    requestAiStudyPack: function (tool, extra = {}) {
      const context = this.getStudyToolContext();
      const payload = {
        tool,
        subject: extra.subject || context.subject,
        chapter: extra.chapter || "",
        difficulty: extra.difficulty || "medium",
        count: extra.count || 5,
        profile: context.profile,
        analytics: context.analytics,
        analytics_summary: context.analyticsSummary,
        history: context.history,
        provider: window.StudyPilotTutor ? window.StudyPilotTutor.selectedModelProvider : "auto",
        model: window.StudyPilotTutor ? window.StudyPilotTutor.selectedModelName : "",
      };

      return fetch(`${this.getApiBaseUrl()}/api/study-tools/generate`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(async res => {
        if (!res.ok) throw new Error("Study tool unavailable");
        return res.json();
      });
    },

    generateAiNotes: function () {
      const context = this.getStudyToolContext();
      this.requestAiStudyPack("notes", { subject: context.subject, count: 1 })
        .then(data => {
          const notes = data && data.data ? data.data.notes || data.data.summary || "" : "";
          const title = `${context.subject} AI Notes`;
          window.StudyPilotDB.addNote(title, notes || "No notes were returned by the model.", "blue");
          if (window.StudyPilotDB && typeof window.StudyPilotDB.trackRevisionSession === "function") {
            window.StudyPilotDB.trackRevisionSession(context.subject, title);
          }
          this.renderNotes();
          window.StudyPilotDB.addNotification("AI notes generated.", "success");
        })
        .catch(() => {
          window.StudyPilotDB.addNotification("AI notes could not be generated right now.", "info");
        });
    },

    generateAiSummary: function () {
      const context = this.getStudyToolContext();
      this.requestAiStudyPack("summary", { subject: context.subject, count: 1 })
        .then(data => {
          const summary = data && data.data ? data.data.revision_summary || data.data.summary || data.data.notes || "" : "";
          const title = `${context.subject} Summary`;
          window.StudyPilotDB.addNote(title, summary || "No summary was returned by the model.", "green");
          if (window.StudyPilotDB && typeof window.StudyPilotDB.trackRevisionSession === "function") {
            window.StudyPilotDB.trackRevisionSession(context.subject, title);
          }
          this.renderNotes();
          window.StudyPilotDB.addNotification("AI summary generated.", "success");
        })
        .catch(() => {
          window.StudyPilotDB.addNotification("AI summary could not be generated right now.", "info");
        });
    },

    generateAiPracticeQuestions: function () {
      const context = this.getStudyToolContext();
      this.requestAiStudyPack("practice", { subject: context.subject, count: 5 })
        .then(data => {
          const questions = data && data.data ? data.data.practice_questions || [] : [];
          const body = questions.map((item, index) => `${index + 1}. ${item.question || ""}${item.hint ? `\nHint: ${item.hint}` : ""}`).join("\n\n");
          const title = `${context.subject} Practice Questions`;
          window.StudyPilotDB.addNote(title, body || "No practice questions were returned by the model.", "purple");
          if (window.StudyPilotDB && typeof window.StudyPilotDB.trackRevisionSession === "function") {
            window.StudyPilotDB.trackRevisionSession(context.subject, title);
          }
          this.renderNotes();
          window.StudyPilotDB.addNotification("Practice questions generated.", "success");
        })
        .catch(() => {
          window.StudyPilotDB.addNotification("Practice questions could not be generated right now.", "info");
        });
    },

    renderNotes: function () {
      const container = document.getElementById("notes-grid-container");
      if (!container) return;

      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      const grade = profile ? String(profile.grade || "10") : "10";
      const notes = window.StudyPilotDB.getNotes(grade);
      if (notes.length === 0) {
        container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-light); font-size: 0.85rem;">No notes saved yet for Grade ${escapeHTML(grade)}. Compose one above!</div>`;
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
            <div class="note-grade">Grade ${escapeHTML(n.grade || grade)}</div>
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
    // Tool: Career Guidance Mode
    // ========================================================
    syncCareerGoalInfo: function () {
      const profile = window.StudyPilotDB.getProfile();
      const goalSpan = document.getElementById("career-user-goal");
      const dreamSpan = document.getElementById("career-user-dream");
      const signature = this.buildCareerProfileSignature(profile);

      if (goalSpan) {
        goalSpan.innerText = profile.goal || "Improve overall grades";
      }
      if (dreamSpan) {
        dreamSpan.innerText = profile.dreamCareer ? profile.dreamCareer : "Not set";
      }

      // Check if unlocked and fetch recommendations only when needed.
      if (profile.careerUnlocked) {
        document.getElementById("career-opt-in-view").classList.add("hidden");
        document.getElementById("career-active-view").classList.remove("hidden");
        if (!this.careerRecommendations.length || this.careerProfileSignature !== signature) {
          this.loadCareerGuidance();
        } else {
          this.renderCareerRecommendations();
        }
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
      this.loadCareerGuidance();
      window.StudyPilotDB.addNotification("Career Guidance Mode unlocked! Ollama will generate personalised suggestions.", "success");
    },

    resetCareerOptIn: function () {
      const profile = window.StudyPilotDB.getProfile();
      profile.careerUnlocked = false;
      window.StudyPilotDB.saveProfile(profile);
      
      this.careerRecommendations = [];
      this.careerSummary = "";
      this.careerActionPlan = [];
      this.careerError = "";
      this.syncCareerGoalInfo();
    },

    buildCareerProfileSignature: function (profile) {
      if (!profile) return "none";
      const subjects = Array.isArray(profile.subjects) ? profile.subjects.join("|") : "";
      const favoriteSubjects = Array.isArray(profile.favoriteSubjects) ? profile.favoriteSubjects.join("|") : "";
      const weakSubjects = Array.isArray(profile.weakSubjects) ? profile.weakSubjects.join("|") : "";
      const interests = Array.isArray(profile.interests) ? profile.interests.join("|") : "";
      const hobbies = Array.isArray(profile.hobbies) ? profile.hobbies.join("|") : "";
      const learningGoals = Array.isArray(profile.learningGoals) ? profile.learningGoals.join("|") : "";
      return [
        profile.grade || "",
        profile.goal || "",
        profile.dreamCareer || "",
        subjects,
        favoriteSubjects,
        weakSubjects,
        interests,
        hobbies,
        learningGoals,
      ].join("::");
    },

    buildCareerProgressSnapshot: function () {
      const profile = window.StudyPilotDB.getProfile();
      const chapterSummary = window.StudyPilotDB.getChapterCompletionSummary ? window.StudyPilotDB.getChapterCompletionSummary() : null;
      const tasks = window.StudyPilotDB.getAllTasks ? window.StudyPilotDB.getAllTasks() : [];
      const exams = window.StudyPilotDB.getAllExams ? window.StudyPilotDB.getAllExams() : [];
      const grade = profile ? String(profile.grade || "10") : "10";

      return {
        grade,
        chapter_summary: chapterSummary || {},
        task_count: tasks.filter(task => String(task.grade || "10") === grade).length,
        completed_tasks: tasks.filter(task => String(task.grade || "10") === grade && task.completed).length,
        exam_count: exams.filter(exam => String(exam.grade || "10") === grade).length,
        subjects: window.StudyPilotCurriculum && typeof window.StudyPilotCurriculum.getSubjectsForGrade === "function"
          ? window.StudyPilotCurriculum.getSubjectsForGrade(grade)
          : [],
      };
    },

    getApiBaseUrl: function () {
      if (window.StudyPilotTutor && typeof window.StudyPilotTutor.getApiBaseUrl === "function") {
        return window.StudyPilotTutor.getApiBaseUrl();
      }
      if (window.STUDYPILOT_API_BASE && String(window.STUDYPILOT_API_BASE).trim()) {
        return String(window.STUDYPILOT_API_BASE).replace(/\/+$/, "");
      }
      if (window.location && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return window.location.origin;
      }
      return "http://127.0.0.1:5000";
    },

    loadCareerGuidance: function () {
      const profile = window.StudyPilotDB.getProfile();
      if (!profile || !profile.careerUnlocked) return Promise.resolve();

      const signature = this.buildCareerProfileSignature(profile);
      if (this.careerRequestPromise && this.careerProfileSignature === signature) {
        return this.careerRequestPromise;
      }

      this.careerLoading = true;
      this.careerError = "";
      this.renderCareerRecommendations();

      const payload = {
        profile,
        progress: this.buildCareerProgressSnapshot(),
        analytics: window.StudyPilotDB.getStudyAnalytics ? window.StudyPilotDB.getStudyAnalytics() : {},
        analytics_summary: window.StudyPilotDB.getStudyAnalyticsSummary ? window.StudyPilotDB.getStudyAnalyticsSummary() : {},
        history: window.StudyPilotDB.getTutorHistory ? window.StudyPilotDB.getTutorHistory(12) : [],
      };

      const request = fetch(`${this.getApiBaseUrl()}/api/career/recommendations`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async res => {
          if (!res.ok) throw new Error("Career API unavailable");
          return res.json();
        })
        .then(data => {
          this.careerSummary = data && data.summary ? String(data.summary) : "";
          this.careerRecommendations = Array.isArray(data && data.recommendations) ? data.recommendations : [];
          this.careerActionPlan = Array.isArray(data && data.action_plan) ? data.action_plan : [];
          this.careerProfileSignature = signature;
          this.careerLoading = false;
          this.careerError = "";
          this.renderCareerRecommendations();
        })
        .catch(error => {
          this.careerSummary = "";
          this.careerRecommendations = [];
          this.careerActionPlan = [];
          this.careerProfileSignature = signature;
          this.careerLoading = false;
          this.careerError = error && error.message ? error.message : "Career coach is temporarily unavailable.";
          this.renderCareerRecommendations();
        });

      this.careerRequestPromise = request;
      return request;
    },

    buildFallbackCareerRecommendations: function (profile) {
      return [];
    },

    renderCareerRecommendations: function () {
      const container = document.getElementById("career-cards-grid");
      if (!container) return;

      const summaryEl = document.getElementById("career-summary-copy");
      const actionEl = document.getElementById("career-action-list");
      const statusEl = document.getElementById("career-status-badge");

      if (statusEl) {
        statusEl.innerText = this.careerLoading ? "Thinking..." : (this.careerRecommendations.length ? "Ready" : "Waiting");
      }

      if (summaryEl) {
        summaryEl.innerText = this.careerLoading
          ? "Ollama is writing your career map now."
          : (this.careerError
              ? this.careerError
              : (this.careerSummary || "Your career map will appear here after the AI reads your profile."));
      }

      if (actionEl) {
        actionEl.innerHTML = (this.careerActionPlan || []).map(step => `<li>${escapeHTML(step)}</li>`).join("");
      }

      if (this.careerLoading) {
        container.innerHTML = `
          <div class="career-loading-card">
            <div class="career-loading-spinner"></div>
            <p>Ollama is reviewing your profile, subjects, and dream career.</p>
          </div>
        `;
        return;
      }

      if (this.careerError) {
        container.innerHTML = `
          <div class="career-loading-card">
            <p>${escapeHTML(this.careerError)}</p>
          </div>
        `;
        return;
      }

      const recommendations = Array.isArray(this.careerRecommendations) ? this.careerRecommendations : [];
      if (!recommendations.length) {
        container.innerHTML = `
          <div class="career-loading-card">
            <p>Waiting for Ollama to return career recommendations from your profile data.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = recommendations.map(c => {
        const bestSubjects = Array.isArray(c.required_subjects) ? c.required_subjects : (Array.isArray(c.best_subjects) ? c.best_subjects : []);
        const skills = Array.isArray(c.skills) ? c.skills : [];
        const nextSteps = Array.isArray(c.next_steps) ? c.next_steps : [];
        return `
          <div class="career-card">
            <div class="career-title-row">
              <h4>${escapeHTML(c.title)}</h4>
              <span class="badge badge-indigo">${escapeHTML(String(c.match_score || c.fit_score || 70))}% Match</span>
            </div>
            <p class="career-desc">${escapeHTML(c.why || c.summary || c.why_it_fits || "")}</p>
            
            <div class="career-skills">
              <span class="text-muted">Best subjects:</span>
              ${bestSubjects.map(s => `<span class="badge badge-accent">${escapeHTML(s)}</span>`).join("")}
            </div>

            <div class="career-skills">
              <span class="text-muted">Skills:</span>
              ${skills.map(s => `<span class="badge badge-soft">${escapeHTML(s)}</span>`).join("")}
            </div>

            <p class="career-fit-note">${escapeHTML(c.future_demand ? `Future demand: ${c.future_demand}` : "")}</p>
            <p class="career-fit-note">${escapeHTML(c.pathway || "")}</p>
            <p class="career-fit-note">${escapeHTML(c.why_it_fits || "")}</p>

            <div class="career-roadmap-timeline">
              ${nextSteps.map((step, index) => {
                const stepClass = index === 0 ? "completed" : index === 1 ? "active" : "";
                return `
                  <div class="career-step ${stepClass}">
                    <div class="step-node"></div>
                    <div class="step-label">${escapeHTML(step)}</div>
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
