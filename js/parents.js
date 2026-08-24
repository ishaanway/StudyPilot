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
      const completedIds = window.StudyPilotBooks ? window.StudyPilotBooks.getCompletedChapterIds() : [];

      let completedChaptersHtml = "";
      if (completedIds.length > 0) {
        completedChaptersHtml = `
          <div style="background:rgba(16,185,129,0.08); border:1px solid #10b981; border-radius:10px; padding:1rem; margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h4 style="margin:0; font-size:0.95rem; font-weight:800; color:#065f46;">📖 Chapter Completion Report</h4>
                <p style="margin:0.2rem 0 0 0; font-size:0.78rem; color:#047857;">Student has completed <strong>${completedIds.length} chapter(s)</strong> completely with checkmark verification.</p>
              </div>
              <span class="badge badge-accent" style="background:#10b981; color:#ffffff; font-size:0.85rem; font-weight:800; padding:0.4rem 0.75rem;">${completedIds.length} Chapters Done ✓</span>
            </div>
            <div style="margin-top:0.75rem; display:flex; flex-wrap:wrap; gap:0.4rem;">
              ${completedIds.map(id => `<span class="badge" style="background:#d1fae5; color:#065f46; border:1px solid #a7f3d0; font-size:0.72rem;">✓ ${escapeHTML(id)}</span>`).join("")}
            </div>
          </div>
        `;
      }

      if (tasks.length === 0 && completedIds.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
            <i data-lucide="check-circle-2" style="width: 2.5rem; height: 2.5rem; color: var(--accent); margin-bottom: 0.5rem;"></i>
            <p>No study tasks or completed chapters scheduled yet.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      const taskRows = tasks.map(task => {
        const isDone = task.completed || task.status === "completed" || task.status === "submitted" || task.status === "done";
        const badgeClass = isDone ? "badge-accent" : "badge-indigo";
        const badgeLabel = isDone ? "🟢 Completed (100%)" : "🟡 Pending";
        const badgeStyle = isDone ? "background:#d1fae5; color:#065f46; font-weight:700;" : "background:#fef3c7; color:#b45309; font-weight:700;";

        return `
          <tr style="border-bottom:1px solid var(--border-color); font-size:0.82rem;">
            <td style="padding:0.6rem 0.75rem; font-weight:600; color:var(--text-main);">${escapeHTML(task.title)}</td>
            <td style="padding:0.6rem 0.75rem; color:var(--text-muted);">${escapeHTML(task.subject || "General")}</td>
            <td style="padding:0.6rem 0.75rem; color:var(--text-muted);">${escapeHTML(task.due_date || task.date || "Today")}</td>
            <td style="padding:0.6rem 0.75rem; text-align:right;">
              <span class="badge ${badgeClass}" style="${badgeStyle}">${badgeLabel}</span>
            </td>
          </tr>
        `;
      }).join("");

      const tasksTableHtml = tasks.length > 0 ? `
        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:10px; overflow-x:auto; margin-top:0.75rem;">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="background:var(--bg-app); border-bottom:2px solid var(--border-color); font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">
                <th style="padding:0.5rem 0.75rem;">Task Title</th>
                <th style="padding:0.5rem 0.75rem;">Subject</th>
                <th style="padding:0.5rem 0.75rem;">Due Date</th>
                <th style="padding:0.5rem 0.75rem; text-align:right;">Graded Status</th>
              </tr>
            </thead>
            <tbody>
              ${taskRows}
            </tbody>
          </table>
        </div>
      ` : "";

      container.innerHTML = completedChaptersHtml + tasksTableHtml;

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
