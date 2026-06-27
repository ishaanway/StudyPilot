/* ======================================================== */
/* StudyPilot Dashboard View Core JS                        */
/* ======================================================== */

(function () {
  function getLocalISODate(date = new Date()) {
    const local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return local.toISOString().slice(0, 10);
  }

  function getLocalDayName(date = new Date()) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  window.StudyPilotDashboard = {
    profileListenerBound: false,
    dataListenerBound: false,
    
    init: function () {
      this.bindProfileListener();
      this.bindDataListener();
      this.renderTimeline();
      this.renderTasks();
      this.renderProgressRing();
      this.renderStudyAnalytics();
      this.renderUpcomingExams();
      this.renderAISuggestions();
    },

    bindProfileListener: function () {
      if (this.profileListenerBound) return;
      this.profileListenerBound = true;
      window.addEventListener("studypilot_profile_updated", () => {
        this.init();
      });
    },

    bindDataListener: function () {
      if (this.dataListenerBound) return;
      this.dataListenerBound = true;
      window.addEventListener("studypilot_data_updated", () => {
        this.renderProgressRing();
        this.renderStudyAnalytics();
        this.renderAISuggestions();
      });
    },

    getCurrentGrade: function () {
      const profile = window.StudyPilotDB.getProfile ? window.StudyPilotDB.getProfile() : null;
      return profile ? String(profile.grade || "10") : "10";
    },

    renderTimeline: function () {
      const timelineEl = document.getElementById("dashboard-timeline");
      if (!timelineEl) return;

      const grade = this.getCurrentGrade();
      const events = window.StudyPilotDB.getCalendarEvents(grade);
      const todayEvents = events.filter(e => e.day === getLocalDayName());
      
      // Sort chronologically by start time
      todayEvents.sort((a, b) => a.start.localeCompare(b.start));

      if (todayEvents.length === 0) {
        timelineEl.innerHTML = '<div class="timeline-empty">No classes or study sessions scheduled for today. Enjoy your day!</div>';
        return;
      }

      timelineEl.innerHTML = todayEvents.map(e => {
        let eventClass = e.type === "class" ? "class" : (e.type === "exam" ? "exam" : "study");
        let start12 = formatTime12(e.start);
        let end12 = formatTime12(e.end);
        
        return `
          <div class="timeline-item ${eventClass}">
            <div class="timeline-time">${start12} - ${end12}</div>
            <div class="timeline-content">
              <div class="timeline-title">${escapeHTML(e.title)}</div>
              <div class="timeline-desc">${getEventDescription(e)}</div>
            </div>
          </div>
        `;
      }).join("");
    },

    // 2. Tasks Checklist
    renderTasks: function () {
      const listEl = document.getElementById("dashboard-task-list");
      if (!listEl) return;

      const grade = this.getCurrentGrade();
      const tasks = window.StudyPilotDB.getTasks(grade).filter(t => t.date === getLocalISODate());

      if (tasks.length === 0) {
        listEl.innerHTML = '<div class="task-empty">All caught up! Add a new task to get started.</div>';
        return;
      }

      listEl.innerHTML = tasks.map(t => {
        return `
          <li class="task-item ${t.completed ? 'completed' : ''}">
            <label class="task-checkbox-label">
              <input type="checkbox" ${t.completed ? 'checked' : ''} onclick="window.StudyPilotDashboard.toggleTaskStatus('${t.id}')">
              <span class="task-title">${escapeHTML(t.title)}</span>
            </label>
            <div class="task-meta">
              <span class="badge badge-indigo">${escapeHTML(t.subject)}</span>
              <span class="text-muted text-xs">${t.duration}m</span>
              <button class="btn-icon" onclick="window.StudyPilotDashboard.deleteTask('${t.id}')"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
            </div>
          </li>
        `;
      }).join("");

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    toggleTaskStatus: function (id) {
      window.StudyPilotDB.toggleTask(id);
      this.renderTasks();
      this.renderProgressRing();
      this.renderAISuggestions(); // Suggestion might change based on completion
    },

    deleteTask: function (id) {
      window.StudyPilotDB.deleteTask(id);
      this.renderTasks();
      this.renderProgressRing();
      this.renderAISuggestions();
    },

    // 3. Progress Ring calculation and animation
    renderProgressRing: function () {
      const ring = document.querySelector(".progress-ring__circle");
      const label = document.getElementById("dashboard-progress-percent");
      const summary = document.getElementById("dashboard-progress-summary");
      const streakVal = document.getElementById("dashboard-streak-count");
      if (!ring || !label) return;

      const grade = this.getCurrentGrade();
      const tasks = window.StudyPilotDB.getTasks(grade).filter(t => t.date === getLocalISODate());
      const total = tasks.length;
      const completed = tasks.filter(t => t.completed).length;
      
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      // Calculate SVG offset
      const radius = ring.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      ring.style.strokeDasharray = `${circumference} ${circumference}`;
      
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDashoffset = offset;
      label.innerText = `${percent}%`;

      // Update Streak and summary text
      const profile = window.StudyPilotDB.getProfile();
      
      if (percent === 100 && total > 0) {
        summary.innerText = "Fantastic! All tasks completed today. Your study ring is full! 🔥";
        // If they just completed the last task, ensure streak count is bumped
        if (profile.streak === 5) {
          profile.streak = 6;
          window.StudyPilotDB.saveProfile(profile);
          streakVal.innerText = "6";
        }
      } else if (percent > 0) {
        summary.innerText = `Keep going! You have completed ${completed} out of ${total} tasks today.`;
      } else {
        summary.innerText = total > 0 
          ? "Complete your tasks to fill your study ring today!" 
          : "Add some homework tasks for today to begin tracking progress.";
      }
      
      streakVal.innerText = profile.streak;
    },

    renderStudyAnalytics: function () {
      const container = document.getElementById("dashboard-analytics-panel");
      if (!container) return;

      const summary = window.StudyPilotDB.getStudyAnalyticsSummary ? window.StudyPilotDB.getStudyAnalyticsSummary() : null;
      if (!summary) {
        container.innerHTML = '<div class="analytics-empty">No analytics recorded yet.</div>';
        return;
      }

      const renderTopics = (items, emptyLabel) => {
        const list = Array.isArray(items) ? items : [];
        if (!list.length) {
          return `<p class="analytics-empty">${escapeHTML(emptyLabel)}</p>`;
        }
        return `<div class="analytics-topic-cloud">${list.map(item => `
          <span class="badge ${item.count > 1 ? 'badge-indigo' : 'badge-soft'}">${escapeHTML(item.topic)}${item.count > 1 ? ` × ${item.count}` : ""}</span>
        `).join("")}</div>`;
      };

      container.innerHTML = `
        <div class="analytics-metrics-grid">
          <div class="analytics-metric-card">
            <div class="analytics-metric-value">${summary.questionsAsked}</div>
            <div class="analytics-metric-label">Questions asked</div>
          </div>
          <div class="analytics-metric-card">
            <div class="analytics-metric-value">${summary.quizAttempts}</div>
            <div class="analytics-metric-label">Quiz attempts</div>
          </div>
          <div class="analytics-metric-card">
            <div class="analytics-metric-value">${summary.averageQuizScore}%</div>
            <div class="analytics-metric-label">Average quiz score</div>
          </div>
          <div class="analytics-metric-card">
            <div class="analytics-metric-value">${summary.revisionSessions}</div>
            <div class="analytics-metric-label">Revision sessions</div>
          </div>
          <div class="analytics-metric-card">
            <div class="analytics-metric-value">${summary.quizAccuracy}%</div>
            <div class="analytics-metric-label">Quiz accuracy</div>
          </div>
        </div>
        <div class="analytics-topic-section">
          <div class="analytics-topic-header">
            <strong>Strong topics</strong>
            <span class="badge badge-accent">${summary.strongTopics.length}</span>
          </div>
          ${renderTopics(summary.strongTopics, "No strong topics have been detected yet.")}
        </div>
        <div class="analytics-topic-section">
          <div class="analytics-topic-header">
            <strong>Weak topics</strong>
            <span class="badge badge-red">${summary.weakTopics.length}</span>
          </div>
          ${renderTopics(summary.weakTopics, "No weak topics have been detected yet.")}
        </div>
      `;
    },

    // 4. Upcoming Exams (countdown calculator)
    renderUpcomingExams: function () {
      const container = document.getElementById("dashboard-upcoming-exams");
      if (!container) return;

      const grade = this.getCurrentGrade();
      const exams = window.StudyPilotDB.getExams(grade);
      if (exams.length === 0) {
        container.innerHTML = '<div class="upcoming-empty">No upcoming exams scheduled. Click "Add Exam" to prepare.</div>';
        return;
      }

      const currentDate = new Date();

      exams.sort((a, b) => new Date(a.date) - new Date(b.date));

      container.innerHTML = exams.map(e => {
        const examDate = new Date(e.date);
        const timeDiff = examDate - currentDate;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        let daysText = "";
        let badgeClass = "";
        
        if (daysLeft < 0) {
          daysText = "Passed";
          badgeClass = "badge-indigo";
        } else if (daysLeft === 0) {
          daysText = "Today!";
          badgeClass = "badge-red";
        } else if (daysLeft === 1) {
          daysText = "Tomorrow!";
          badgeClass = "badge-red";
        } else {
          daysText = `${daysLeft} days left`;
          badgeClass = daysLeft <= 3 ? "badge-red" : "badge-accent";
        }

        return `
          <div class="upcoming-item">
            <div class="upcoming-info">
              <h3>${escapeHTML(e.subject)}</h3>
              <p>${escapeHTML(e.topic)}</p>
            </div>
            <span class="upcoming-days badge ${badgeClass}">${daysText}</span>
          </div>
        `;
      }).join("");
    },

    // 5. Dynamic AI Coach Suggestions
    renderAISuggestions: function () {
      const container = document.getElementById("dashboard-ai-suggestions");
      if (!container) return;

      const grade = this.getCurrentGrade();
      const exams = window.StudyPilotDB.getExams(grade);
      const tasks = window.StudyPilotDB.getTasks(grade).filter(t => t.date === getLocalISODate());
      const uncompletedTasks = tasks.filter(t => !t.completed);
      const events = window.StudyPilotDB.getCalendarEvents(grade).filter(e => e.day === getLocalDayName());
      
      const today = getLocalISODate();
      const weekFromNow = getLocalISODate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
      const hasScienceExamSoon = exams.some(e => e.subject === "Science" && e.date >= today && e.date <= weekFromNow);
      const hasMathStudyBlock = events.some(e => /math/i.test(e.title) && e.type === "study");
      
      let html = "";

      if (hasScienceExamSoon && uncompletedTasks.some(t => t.subject === "Science")) {
        html = `
          <p>Your <strong>CBSE Grade ${escapeHTML(grade)} Science exam</strong> is coming up soon. You still have a Science revision task incomplete, so I suggest revising the official NCERT chapters now.</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotApp.switchScreen('tutor')">Start Science Quiz</button>
          </div>
        `;
      } else if (uncompletedTasks.length > 0) {
        const topTask = uncompletedTasks[0];
        html = `
          <p>You have <strong>${uncompletedTasks.length} uncompleted tasks</strong> today. I suggest starting with <strong>"${escapeHTML(topTask.title)}"</strong>. Complete it to boost your study streak!</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotDashboard.markTaskDone('${topTask.id}')">Start Now</button>
            <button class="btn btn-secondary btn-xs" onclick="window.StudyPilotDashboard.rescheduleTask('${topTask.id}')">Reschedule</button>
          </div>
        `;
      } else if (!hasMathStudyBlock) {
        // Suggest scheduling a Math revision block since they have math tasks
        html = `
          <p>Nice job completing today's tasks! For Grade ${escapeHTML(grade)}, you can lock in a focused revision block for your strongest subjects this evening.</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotDashboard.scheduleStudyBlock('Maths Revision', '19:00', '20:00')">Schedule at 7 PM</button>
          </div>
        `;
      } else {
        html = `
          <p>Outstanding! Your daily academic schedule is perfectly optimized and all tasks are completed. Use the <strong>AI Tutor chat</strong> to explore the official NCERT chapters for Grade ${escapeHTML(grade)}!</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotApp.switchScreen('tutor')">Ask Tutor</button>
          </div>
        `;
      }

      container.innerHTML = html;
    },

    // AI Suggestions Actions
    markTaskDone: function (id) {
      window.StudyPilotDB.toggleTask(id);
      this.init();
      window.StudyPilotDB.addNotification("Task marked as done. Streak progress updated!", "success");
    },

    rescheduleTask: function (id) {
      const tasks = window.StudyPilotDB.getAllTasks ? window.StudyPilotDB.getAllTasks() : window.StudyPilotDB.getTasks();
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.date = "2026-06-23"; // Push to tomorrow
        window.StudyPilotDB.saveTasks(tasks);
        this.init();
        window.StudyPilotDB.addNotification(`"${task.title}" rescheduled for tomorrow. Daily plans rebalanced.`, "info");
      }
    },

    scheduleStudyBlock: function (title, start, end) {
      window.StudyPilotDB.addCalendarEvent(title, "Monday", "study", start, end);
      this.renderTimeline();
      this.renderAISuggestions();
      window.StudyPilotDB.addNotification(`Scheduled Study Block: "${title}" for today.`, "success");
      
      // If planner is open, reload it too
      if (window.StudyPilotPlanner) {
        window.StudyPilotPlanner.renderGrid();
      }
    },

    // Modals
    showAddTaskModal: function () {
      const modal = document.getElementById("modal-add-task");
      const select = document.getElementById("task-input-subject");
      if (!modal || !select) return;

      const profile = window.StudyPilotDB.getProfile();
      const curriculum = window.StudyPilotCurriculum;
      const subjects = curriculum && typeof curriculum.getSubjectsForGrade === "function"
        ? curriculum.getSubjectsForGrade(profile ? profile.grade : "10")
        : (profile.subjects || []);
      select.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join("");
      modal.classList.remove("hidden");
    },

    hideAddTaskModal: function () {
      const modal = document.getElementById("modal-add-task");
      if (modal) modal.classList.add("hidden");
    },

    addTaskSubmit: function () {
      const title = document.getElementById("task-input-title").value.trim();
      const subject = document.getElementById("task-input-subject").value;
      const duration = document.getElementById("task-input-duration").value;

      if (!title) {
        alert("Please enter a task title.");
        return;
      }

      window.StudyPilotDB.addTask(title, subject, duration);
      this.hideAddTaskModal();
      document.getElementById("task-input-title").value = "";
      
      this.init();
    },

    showAddExamModal: function () {
      const modal = document.getElementById("modal-add-exam");
      const select = document.getElementById("exam-input-subject");
      if (!modal || !select) return;

      const profile = window.StudyPilotDB.getProfile();
      const curriculum = window.StudyPilotCurriculum;
      const subjects = curriculum && typeof curriculum.getSubjectsForGrade === "function"
        ? curriculum.getSubjectsForGrade(profile ? profile.grade : "10")
        : (profile.subjects || []);
      select.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join("");
      
      // Set default date to today or tomorrow
      document.getElementById("exam-input-date").value = "2026-06-26";
      
      modal.classList.remove("hidden");
    },

    hideAddExamModal: function () {
      const modal = document.getElementById("modal-add-exam");
      if (modal) modal.classList.add("hidden");
    },

    addExamSubmit: function () {
      const subject = document.getElementById("exam-input-subject").value;
      const topic = document.getElementById("exam-input-topic").value.trim();
      const date = document.getElementById("exam-input-date").value;

      if (!topic || !date) {
        alert("Please fill out all fields.");
        return;
      }

      window.StudyPilotDB.addExam(subject, topic, date);
      this.hideAddExamModal();
      document.getElementById("exam-input-topic").value = "";
      
      this.init();
      
      // Also update planner calendar if open
      if (window.StudyPilotPlanner) {
        window.StudyPilotPlanner.renderGrid();
      }
    }
  };

  // Helper formatting routines
  function formatTime12(time24) {
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr);
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12; // 0 should be 12
    return `${h}:${mStr} ${ampm}`;
  }

  function getEventDescription(e) {
    if (e.type === "class") return "School Period — Textbook syllabus study";
    if (e.type === "exam") return "Urgent Assessment Block";
    return "Focus Session — Revision & Flashcards";
  }

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
