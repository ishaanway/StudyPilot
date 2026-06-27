/* ======================================================== */
/* StudyPilot Dashboard View Core JS                        */
/* ======================================================== */

(function () {
  window.StudyPilotDashboard = {
    
    init: function () {
      this.renderTimeline();
      this.renderTasks();
      this.renderProgressRing();
      this.renderUpcomingExams();
      this.renderAISuggestions();
    },

    // 1. Timeline: filter for events on Monday (demo active day)
    renderTimeline: function () {
      const timelineEl = document.getElementById("dashboard-timeline");
      if (!timelineEl) return;

      const events = window.StudyPilotDB.getCalendarEvents();
      const todayEvents = events.filter(e => e.day === "Monday");
      
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

      // Filter tasks for today's date (represented by demo date 2026-06-22)
      const tasks = window.StudyPilotDB.getTasks().filter(t => t.date === "2026-06-22");

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
      this.renderAISuggestions();
    },

    deleteTask: function (id) {
      window.StudyPilotDB.deleteTask(id);
      this.renderTasks();
      this.renderProgressRing();
      this.renderAISuggestions();
    },

    // 3. Progress Ring
    renderProgressRing: function () {
      const ring = document.querySelector(".progress-ring__circle");
      const label = document.getElementById("dashboard-progress-percent");
      const summary = document.getElementById("dashboard-progress-summary");
      const streakVal = document.getElementById("dashboard-streak-count");
      if (!ring || !label) return;

      const tasks = window.StudyPilotDB.getTasks().filter(t => t.date === "2026-06-22");
      const total = tasks.length;
      const completed = tasks.filter(t => t.completed).length;
      
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      const radius = ring.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      ring.style.strokeDasharray = `${circumference} ${circumference}`;
      
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDashoffset = offset;
      label.innerText = `${percent}%`;

      const profile = window.StudyPilotDB.getProfile();
      
      if (percent === 100 && total > 0) {
        summary.innerText = "Outstanding! Today's tasks are completed and your study ring is full! 🔥";
      } else if (percent > 0) {
        summary.innerText = `You have completed ${completed} out of ${total} tasks today. Keep it up!`;
      } else {
        summary.innerText = total > 0 
          ? "Complete your tasks to fill your study ring today!" 
          : "Add some homework tasks for today to begin tracking progress.";
      }
      
      streakVal.innerText = profile.streak;
    },

    // 4. Upcoming Exams
    renderUpcomingExams: function () {
      const container = document.getElementById("dashboard-upcoming-exams");
      if (!container) return;

      const exams = window.StudyPilotDB.getExams();
      if (exams.length === 0) {
        container.innerHTML = '<div class="upcoming-empty">No upcoming exams scheduled. Click "Add Exam" to prepare.</div>';
        return;
      }

      // Demo current date is June 22
      const demoDate = new Date("2026-06-22");
      exams.sort((a, b) => new Date(a.date) - new Date(b.date));

      container.innerHTML = exams.map(e => {
        const examDate = new Date(e.date);
        const timeDiff = examDate - demoDate;
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

      const exams = window.StudyPilotDB.getExams();
      const tasks = window.StudyPilotDB.getTasks().filter(t => t.date === "2026-06-22");
      const uncompletedTasks = tasks.filter(t => !t.completed);
      const events = window.StudyPilotDB.getCalendarEvents().filter(e => e.day === "Monday");
      
      const hasScienceExamSoon = exams.some(e => e.subject === "Science" && e.date === "2026-06-25");
      const hasStudyBlock = events.some(e => e.type === "study");
      
      let html = "";

      if (hasScienceExamSoon && uncompletedTasks.some(t => t.subject === "Science")) {
        html = `
          <p>Your <strong>CBSE Science Exam (Electricity)</strong> is in <strong>3 days</strong>! You still have preparation tasks left. Tapping 'Start Science Quiz' will help you prepare.</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotApp.switchScreen('tutor')">Start Science Quiz</button>
          </div>
        `;
      } else if (uncompletedTasks.length > 0) {
        const topTask = uncompletedTasks[0];
        html = `
          <p>You have <strong>${uncompletedTasks.length} uncompleted tasks</strong> today. I suggest starting with <strong>"${escapeHTML(topTask.title)}"</strong>. Complete it to fill your ring!</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotDashboard.markTaskDone('${topTask.id}')">Start Now</button>
            <button class="btn btn-secondary btn-xs" onclick="window.StudyPilotDashboard.rescheduleTask('${topTask.id}')">Reschedule</button>
          </div>
        `;
      } else if (!hasStudyBlock) {
        html = `
          <p>Great job! All daily tasks are finished. Let's schedule a 1-hour revision block for this evening to stay ahead of the class.</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotDashboard.scheduleStudyBlock('Revision Focus Block', '19:00', '20:00')">Schedule at 7 PM</button>
          </div>
        `;
      } else {
        html = `
          <p>Outstanding! Your daily academic schedule is perfectly optimized and all tasks are completed. Use the <strong>AI Tutor chat</strong> if you want to explore new chapters!</p>
          <div class="ai-tip-actions">
            <button class="btn btn-primary btn-xs" onclick="window.StudyPilotApp.switchScreen('tutor')">Ask Tutor</button>
          </div>
        `;
      }

      container.innerHTML = html;
    },

    markTaskDone: function (id) {
      window.StudyPilotDB.toggleTask(id);
      this.init();
      window.StudyPilotDB.addNotification("Task marked as done. Streak progress updated!", "success");
    },

    rescheduleTask: function (id) {
      const tasks = window.StudyPilotDB.getTasks();
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.date = "2026-06-23";
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
      select.innerHTML = profile.subjects.map(s => `<option value="${s}">${s}</option>`).join("");
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
      select.innerHTML = profile.subjects.map(s => `<option value="${s}">${s}</option>`).join("");
      
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
      
      if (window.StudyPilotPlanner) {
        window.StudyPilotPlanner.renderGrid();
      }
    }
  };

  function formatTime12(time24) {
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr);
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
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
