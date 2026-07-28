/* ======================================================== */
/* StudyPilot Parent Portal Coordinator JS                  */
/* ======================================================== */

(function () {
  window.StudyPilotParents = {
    backendProgress: null,
    backendHomework: [],

    init: function () {
      this.backendProgress = null;
      this.backendHomework = [];
      this.initChat();
      this.renderParentDashboard();
      this.renderAlertsAndTips();
      void this.loadBackendMetrics();
    },

    loadBackendMetrics: async function () {
      const profile = window.StudyPilotDB.getProfile();
      if (!profile.backendStudentId) return;

      try {
        const apiBase = window.getStudyPilotApiBaseUrl();
        const [progressRes, homeworkRes] = await Promise.all([
          fetch(`${apiBase}/api/progress?student_id=${profile.backendStudentId}`),
          fetch(`${apiBase}/api/homework?student_id=${profile.backendStudentId}`)
        ]);

        if (progressRes.ok) {
          const progressData = await progressRes.json();
          if (progressData && progressData.ok) {
            this.backendProgress = progressData;
          }
        }

        if (homeworkRes.ok) {
          const homeworkData = await homeworkRes.json();
          if (homeworkData && homeworkData.ok && Array.isArray(homeworkData.items)) {
            this.backendHomework = homeworkData.items;
            if (window.StudyPilotDB && typeof window.StudyPilotDB.saveHomework === "function") {
              window.StudyPilotDB.saveHomework(homeworkData.items);
            }
          }
        }
      } catch (err) {
        console.warn("[StudyPilotParents] Unable to load backend metrics:", err);
      }

      this.renderParentDashboard();
      this.renderAlertsAndTips();
    },

    renderParentDashboard: function () {
      const container = document.getElementById("parent-task-completer-list");
      if (!container) return;

      const tasks = window.StudyPilotDB.getTasks() || [];
      if (tasks.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
            <i data-lucide="check-circle-2" style="width: 2.5rem; height: 2.5rem; color: var(--accent); margin-bottom: 0.5rem;"></i>
            <p>No study tasks scheduled yet.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      container.innerHTML = tasks.map(task => {
        const isDone = task.completed || task.status === "completed" || task.status === "submitted" || task.status === "done";
        const badgeClass = isDone ? "badge-success" : "badge-warning";
        const badgeLabel = isDone ? "Completed" : "Pending";
        const iconName = isDone ? "check-circle" : "circle";
        const iconColor = isDone ? "var(--accent)" : "var(--text-muted)";

        return `
          <div class="upcoming-item" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <i data-lucide="${iconName}" style="color: ${iconColor}; width: 1.25rem; height: 1.25rem;"></i>
              <div>
                <div style="font-weight: 600; font-size: 0.9rem;">${escapeHTML(task.title)}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHTML(task.subject || "General")} &bull; Due: ${escapeHTML(task.due_date || task.date || "Today")}</div>
              </div>
            </div>
            <span class="badge ${badgeClass}">${badgeLabel}</span>
          </div>
        `;
      }).join("");

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    renderAlertsAndTips: function () {
      // Quick prompts for AI Chat
      const quickPromptsBox = document.getElementById("parent-quick-prompts");
      if (quickPromptsBox) {
        const prompts = [
          "How can I help my child manage study time?",
          "What can I do if they are struggling with a subject?",
          "How to support their Grade 7 exam preparation?",
          "What are some ways to encourage daily study habits?"
        ];
        quickPromptsBox.innerHTML = prompts.map(pr => {
          return `<button class="parent-prompt-btn" onclick="window.StudyPilotParents.askQuestion('${escapeHTML(pr)}')">
            <i data-lucide="help-circle" style="width:14px;height:14px;color:var(--primary);"></i>
            <span>${escapeHTML(pr)}</span>
          </button>`;
        }).join("");
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    initChat: function () {
      const input = document.getElementById("parent-chat-input");
      if (!input) return;

      input.onkeypress = (e) => {
        if (e.key === "Enter") {
          this.sendQuery();
        }
      };
    },

    askQuestion: function (q) {
      document.getElementById("parent-chat-input").value = q;
      this.sendQuery();
    },

    sendQuery: async function () {
      const input = document.getElementById("parent-chat-input");
      if (!input) return;

      const query = input.value.trim();
      if (!query) return;

      input.value = "";
      this.appendMessage(query, "user");

      const loader = this.appendMessage("AI Coach is analyzing dashboard logs...", "bot temp");

      const profile = window.StudyPilotDB.getProfile();
      const tasks = window.StudyPilotDB.getTasks() || [];
      const exams = window.StudyPilotDB.getExams() || [];
      const progress = window.StudyPilotDB.getLessonProgress() || {};

      try {
        const apiBase = window.getStudyPilotApiBaseUrl();
        const response = await fetch(`${apiBase}/api/parents/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            question: query,
            profile: profile,
            tasks: tasks,
            exams: exams,
            progress: progress
          })
        });

        if (loader) loader.remove();

        if (!response.ok) {
          throw new Error("Backend query failed");
        }

        const data = await response.json();
        this.appendMessage(data.answer, "bot");

      } catch (err) {
        console.warn("API error, falling back to local heuristic response:", err);
        if (loader) loader.remove();
        this.handleLocalFallback(query);
      }
    },

    handleLocalFallback: function (query) {
      const profile = window.StudyPilotDB.getProfile();
      const tasks = window.StudyPilotDB.getTasks() || [];
      const lower = query.toLowerCase();

      let answer = "";

      if (lower.includes("time") || lower.includes("schedule") || lower.includes("habit")) {
        answer = `<p>To help <strong>${profile.name}</strong> manage study time better, encourage them to use the Pomodoro timer in the Student Toolbox. You can sit with them for a 25-minute focus session and ensure they take a full 5-minute break. Consistent daily blocks build better habits.</p>`;
      } else if (lower.includes("struggling") || lower.includes("subject") || lower.includes("weak")) {
        answer = `<p>If <strong>${profile.name}</strong> is struggling with a subject, sit together and review the flashcards in the AI Tutor tab. Asking them to "teach" a concept back to you is highly effective for reinforcing knowledge.</p>`;
      } else {
        answer = `<p>The best way to support <strong>${profile.name}</strong> is to establish a quiet study area, praise their consistent study streak, and review their completed tasks daily. Open communication about their learning goals keeps them motivated!</p>`;
      }

      this.appendMessage(answer, "bot");
    },

    appendMessage: function (htmlContent, type) {
      const container = document.getElementById("parent-coach-messages");
      if (!container) return null;

      const msgDiv = document.createElement("div");
      msgDiv.className = `parent-message ${type}`;
      msgDiv.innerHTML = type.includes("bot") ? htmlContent : `<p>${escapeHTML(htmlContent)}</p>`;
      
      container.appendChild(msgDiv);
      container.scrollTop = container.scrollHeight;

      if (window.lucide) {
        window.lucide.createIcons();
      }

      return msgDiv;
    }
  };

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
