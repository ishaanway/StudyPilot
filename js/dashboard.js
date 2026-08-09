/* ======================================================== */
/* StudyPilot 24-Hour Timetable & Hourly Schedule JS         */
/* ======================================================== */

(function () {
  const HOUR_HEIGHT = 60; // 60px per hour => 1px per minute

  // Local helpers (needed because this file is its own IIFE scope)
  function escapeHTML(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function formatTime12(time24) {
    if (!time24) return "";
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr, 10);
    const m = mStr || "00";
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  const HOURS_24 = [
    { hour: 0, label: "12:00 AM" },
    { hour: 1, label: "1:00 AM" },
    { hour: 2, label: "2:00 AM" },
    { hour: 3, label: "3:00 AM" },
    { hour: 4, label: "4:00 AM" },
    { hour: 5, label: "5:00 AM" },
    { hour: 6, label: "6:00 AM" },
    { hour: 7, label: "7:00 AM" },
    { hour: 8, label: "8:00 AM" },
    { hour: 9, label: "9:00 AM" },
    { hour: 10, label: "10:00 AM" },
    { hour: 11, label: "11:00 AM" },
    { hour: 12, label: "12:00 PM" },
    { hour: 13, label: "1:00 PM" },
    { hour: 14, label: "2:00 PM" },
    { hour: 15, label: "3:00 PM" },
    { hour: 16, label: "4:00 PM" },
    { hour: 17, label: "5:00 PM" },
    { hour: 18, label: "6:00 PM" },
    { hour: 19, label: "7:00 PM" },
    { hour: 20, label: "8:00 PM" },
    { hour: 21, label: "9:00 PM" },
    { hour: 22, label: "10:00 PM" },
    { hour: 23, label: "11:00 PM" }
  ];

  window.StudyPilotDashboard = {
    currentMode: "day", // "day" | "week" | "month"
    selectedDate: new Date().toISOString().split("T")[0],
    miniYear: new Date().getFullYear(),
    miniMonth: new Date().getMonth(),
    overdueAlarmInterval: null,
    draggedTaskId: null,
    resizingTaskId: null,
    resizeStartY: 0,
    resizeOrigDuration: 60,

    init: function () {
      this.renderDailySummary();
      this.renderActiveTaskCountdown();
      this.render24HourGrid();
      this.renderMiniCalendar();
      this.startLiveTimerLoop();
    },

    // 1. Storage & Persistence
    getTasks: function () {
      try {
        const data = localStorage.getItem("studypilot_timetable_tasks") || localStorage.getItem("studypilot_scheduled_slots");
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    },

    saveTasks: function (tasks) {
      localStorage.setItem("studypilot_timetable_tasks", JSON.stringify(tasks));
      localStorage.setItem("studypilot_scheduled_slots", JSON.stringify(tasks)); // Keep synced
    },

    // 2. View Mode Switcher
    switchTimetableMode: function (mode) {
      this.currentMode = mode;
      document.querySelectorAll(".timetable-view-tabs .tab-btn").forEach(btn => btn.classList.remove("active"));
      
      const dayView = document.getElementById("timetable-day-view");
      const weekView = document.getElementById("timetable-week-view");
      const monthView = document.getElementById("timetable-month-view");

      if (dayView) dayView.classList.add("hidden");
      if (weekView) weekView.classList.add("hidden");
      if (monthView) monthView.classList.add("hidden");

      const btn = document.getElementById(`btn-view-${mode}`);
      if (btn) btn.classList.add("active");

      if (mode === "day") {
        if (dayView) dayView.classList.remove("hidden");
        this.render24HourGrid();
      } else if (mode === "week") {
        if (weekView) weekView.classList.remove("hidden");
        this.renderWeekGrid();
      } else if (mode === "month") {
        if (monthView) monthView.classList.remove("hidden");
        this.renderMiniCalendar();
      }
    },

    jumpToToday: function () {
      this.selectedDate = new Date().toISOString().split("T")[0];
      this.miniYear = new Date().getFullYear();
      this.miniMonth = new Date().getMonth();
      this.renderDailySummary();
      this.renderActiveTaskCountdown();
      this.render24HourGrid();
      this.renderMiniCalendar();
      if (window.StudyPilotAudio) window.StudyPilotAudio.playClickSound();
    },

    // 3. DAILY HOURS SUMMARY
    renderDailySummary: function () {
      const summaryEl = document.getElementById("daily-hours-summary");
      if (!summaryEl) return;

      const tasks = this.getTasks().filter(t => t.date === this.selectedDate);
      let totalMinutes = 0;
      let completedMinutes = 0;
      let missedMinutes = 0;

      tasks.forEach(t => {
        const dur = this.getTaskDurationMinutes(t);
        totalMinutes += dur;
        if (t.completed) {
          completedMinutes += dur;
        } else if (this.isSlotOverdue(t)) {
          missedMinutes += dur;
        }
      });

      const remainingMinutes = Math.max(0, totalMinutes - completedMinutes - missedMinutes);
      const freeMinutes = Math.max(0, (24 * 60) - totalMinutes);

      const toHrs = (m) => (m / 60).toFixed(1).replace(/\.0$/, "");

      summaryEl.innerHTML = `
        <div class="summary-metric-item">
          <span class="summary-metric-label">📊 Total Scheduled</span>
          <span class="summary-metric-val" style="color:var(--primary-color, #6366f1);">${toHrs(totalMinutes)} hrs</span>
        </div>
        <div class="summary-metric-item">
          <span class="summary-metric-label">✅ Completed</span>
          <span class="summary-metric-val" style="color:#10b981;">${toHrs(completedMinutes)} hrs</span>
        </div>
        <div class="summary-metric-item">
          <span class="summary-metric-label">⏳ Remaining</span>
          <span class="summary-metric-val" style="color:#3b82f6;">${toHrs(remainingMinutes)} hrs</span>
        </div>
        <div class="summary-metric-item">
          <span class="summary-metric-label">🚨 Missed / Overdue</span>
          <span class="summary-metric-val" style="color:#ef4444;">${toHrs(missedMinutes)} hrs</span>
        </div>
        <div class="summary-metric-item">
          <span class="summary-metric-label">🏖️ Free Time</span>
          <span class="summary-metric-val" style="color:#8b5cf6;">${toHrs(freeMinutes)} hrs</span>
        </div>
      `;
    },

    // 4. ACTIVE TASK STATUS & COUNTDOWN
    renderActiveTaskCountdown: function () {
      const bar = document.getElementById("active-task-countdown-bar");
      if (!bar) return;

      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const todayStr = now.toISOString().split("T")[0];

      const tasks = this.getTasks().filter(t => t.date === todayStr);

      let activeTask = null;
      let nextTask = null;
      let minFutureDiff = Infinity;

      tasks.forEach(t => {
        const startM = this.timeToMinutes(t.start);
        const endM = this.timeToMinutes(t.end);

        if (nowMinutes >= startM && nowMinutes < endM && !t.completed) {
          activeTask = { ...t, remainingM: endM - nowMinutes };
        } else if (startM > nowMinutes && !t.completed) {
          const diff = startM - nowMinutes;
          if (diff < minFutureDiff) {
            minFutureDiff = diff;
            nextTask = { ...t, countdownM: diff };
          }
        }
      });

      let activeHtml = "";
      if (activeTask) {
        activeHtml = `<span>🟢 <strong>Currently in:</strong> ${escapeHTML(activeTask.title)} (${activeTask.remainingM} mins remaining)</span>`;
      } else {
        activeHtml = `<span>⚪ <strong>Currently:</strong> Free Time</span>`;
      }

      let nextHtml = "";
      if (nextTask) {
        nextHtml = `<span>⏳ <strong>Next Task:</strong> ${escapeHTML(nextTask.title)} in ${nextTask.countdownM} mins (at ${formatTime12(nextTask.start)})</span>`;
      } else {
        nextHtml = `<span>✨ No more tasks scheduled for today!</span>`;
      }

      bar.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.5rem;">${activeHtml}</div>
        <div style="display:flex; align-items:center; gap:0.5rem; color:var(--text-muted);">${nextHtml}</div>
      `;
    },

    // 5. 24-HOUR DAY VIEW (12:00 AM to 11:00 PM)
    render24HourGrid: function () {
      const grid = document.getElementById("timetable-24h-grid");
      if (!grid) return;

      // 1. Build 24 Hour Rows (12 AM ... 11 PM)
      let html = "";
      HOURS_24.forEach(({ hour, label }) => {
        const topPos = hour * HOUR_HEIGHT;
        const hourStartStr = String(hour).padStart(2, "0") + ":00";
        const hourEndStr = String((hour + 1) % 24).padStart(2, "0") + ":00";

        html += `
          <div class="timetable-hour-slot" style="top:${topPos}px;" 
               data-hour="${hour}" 
               onclick="window.StudyPilotDashboard.openQuickSlotModal(${hour})"
               ondragover="window.StudyPilotDashboard.handleDragOver(event)"
               ondrop="window.StudyPilotDashboard.handleDrop(event, ${hour})">
            <span class="timetable-hour-label">${label}</span>
          </div>
        `;
      });

      // 2. Add Live Current Time Line
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const currentLineTop = nowMinutes * (HOUR_HEIGHT / 60);

      html += `
        <div class="timetable-current-time-line" style="top:${currentLineTop}px;">
          <span class="current-time-pill">${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span class="current-time-dot"></span>
        </div>
      `;

      // 3. Render Floating Tasks with exact stretch height and collision detection
      const tasks = this.getTasks().filter(t => t.date === this.selectedDate);
      tasks.sort((a, b) => this.timeToMinutes(a.start) - this.timeToMinutes(b.start));

      // Overlap detection
      for (let i = 0; i < tasks.length; i++) {
        const t1 = tasks[i];
        t1.isOverlapping = false;
        t1.isOverlapOffset = false;

        if (i > 0) {
          const tPrev = tasks[i - 1];
          if (this.timeToMinutes(t1.start) < this.timeToMinutes(tPrev.end)) {
            t1.isOverlapping = true;
            t1.isOverlapOffset = true;
            tPrev.isOverlapping = true;
          }
        }
      }

      tasks.forEach(t => {
        const startM = this.timeToMinutes(t.start);
        const durM = this.getTaskDurationMinutes(t);
        const top = startM * (HOUR_HEIGHT / 60);
        const height = Math.max(24, durM * (HOUR_HEIGHT / 60));

        const isOverdue = !t.completed && this.isSlotOverdue(t);
        const colorBg = this.getSubjectColor(t.subject);

        html += `
          <div class="timetable-task-block ${t.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${t.isOverlapping ? (t.isOverlapOffset ? 'overlap-offset' : 'overlapping') : ''}"
               style="top:${top}px; height:${height}px; background:${colorBg};"
               draggable="true"
               ondragstart="window.StudyPilotDashboard.handleDragStart(event, '${t.id}')">
            
            <div class="task-block-header">
              <div style="display:flex; align-items:center; gap:0.35rem; max-width:70%;">
                <input type="checkbox" ${t.completed ? 'checked' : ''} onclick="event.stopPropagation(); window.StudyPilotDashboard.toggleSlotCompleted('${t.id}')" style="cursor:pointer;">
                <span class="task-block-title">${escapeHTML(t.title)}</span>
                ${t.isOverlapping ? '<span class="badge" style="background:#ef4444; color:#fff; font-size:9px; padding:1px 3px;">⚠️ Overlap</span>' : ''}
              </div>
              <div class="task-block-actions">
                <button class="btn-icon" style="color:#ffffff; opacity:0.85;" onclick="event.stopPropagation(); window.StudyPilotDashboard.deleteSlot('${t.id}')" title="Delete Task">✕</button>
              </div>
            </div>

            <div class="task-block-time">
              ⏰ ${formatTime12(t.start)} – ${formatTime12(t.end)} (${durM}m) ${t.completed ? '✓' : ''}
            </div>

            <!-- Drag Resize Handle -->
            <div class="task-resize-handle" 
                 onmousedown="window.StudyPilotDashboard.startResize(event, '${t.id}')"
                 title="Drag to resize duration"></div>
          </div>
        `;
      });

      grid.innerHTML = html;
      this.checkOverdueScheduledTasks();
    },

    // 6. Drag & Drop to Reassign Hour
    handleDragStart: function (e, taskId) {
      this.draggedTaskId = taskId;
      e.dataTransfer.setData("text/plain", taskId);
    },

    handleDragOver: function (e) {
      e.preventDefault();
    },

    handleDrop: function (e, targetHour) {
      e.preventDefault();
      if (!this.draggedTaskId) return;

      const tasks = this.getTasks();
      const task = tasks.find(t => t.id === this.draggedTaskId);
      if (task) {
        const durM = this.getTaskDurationMinutes(task);
        const newStartM = targetHour * 60;
        const newEndM = newStartM + durM;

        task.start = this.minutesToTime(newStartM);
        task.end = this.minutesToTime(newEndM);

        this.saveTasks(tasks);
        this.render24HourGrid();
        this.renderDailySummary();
        this.renderActiveTaskCountdown();

        if (window.StudyPilotAudio) window.StudyPilotAudio.playClickSound();
        if (window.StudyPilotDB && window.StudyPilotDB.addNotification) {
          window.StudyPilotDB.addNotification(`Moved "${task.title}" to ${formatTime12(task.start)}.`, "info");
        }
      }
      this.draggedTaskId = null;
    },

    // 7. Resizing Task Duration (15m increments)
    startResize: function (e, taskId) {
      e.stopPropagation();
      e.preventDefault();
      this.resizingTaskId = taskId;
      this.resizeStartY = e.clientY;
      const task = this.getTasks().find(t => t.id === taskId);
      this.resizeOrigDuration = task ? this.getTaskDurationMinutes(task) : 60;

      const onMouseMove = (moveEvent) => {
        if (!this.resizingTaskId) return;
        const deltaY = moveEvent.clientY - this.resizeStartY;
        const deltaMinutes = Math.round((deltaY / HOUR_HEIGHT) * 60 / 15) * 15;
        const newDuration = Math.max(15, this.resizeOrigDuration + deltaMinutes);

        const tasks = this.getTasks();
        const t = tasks.find(item => item.id === this.resizingTaskId);
        if (t) {
          const startM = this.timeToMinutes(t.start);
          t.end = this.minutesToTime(startM + newDuration);
          this.saveTasks(tasks);
          this.render24HourGrid();
          this.renderDailySummary();
        }
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        this.resizingTaskId = null;
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },

    // 8. Quick Task Modal from Hour Click
    openQuickSlotModal: function (hour) {
      const startStr = String(hour).padStart(2, "0") + ":00";
      const endStr = String((hour + 1) % 24).padStart(2, "0") + ":00";

      const modal = document.getElementById("modal-schedule-timeslot");
      if (!modal) return;

      const dateInput = document.getElementById("slot-input-date");
      const startInput = document.getElementById("slot-input-start");
      const endInput = document.getElementById("slot-input-end");

      if (dateInput) dateInput.value = this.selectedDate;
      if (startInput) startInput.value = startStr;
      if (endInput) endInput.value = endStr;

      modal.classList.remove("hidden");
    },

    setPresetTask: function (title, subject, durationMinutes) {
      const titleInput = document.getElementById("slot-input-title");
      const subjInput = document.getElementById("slot-input-subject");
      if (titleInput) titleInput.value = title;
      if (subjInput) subjInput.value = subject;
      this.setQuickDuration(durationMinutes);
    },

    setQuickDuration: function (minutes) {
      const startInput = document.getElementById("slot-input-start");
      const endInput = document.getElementById("slot-input-end");
      if (!startInput || !endInput) return;

      const startM = this.timeToMinutes(startInput.value || "16:00");
      const endM = startM + minutes;
      endInput.value = this.minutesToTime(endM);
    },

    onStartTimeChanged: function () {
      const startInput = document.getElementById("slot-input-start");
      const endInput = document.getElementById("slot-input-end");
      if (!startInput || !endInput) return;

      const startM = this.timeToMinutes(startInput.value || "16:00");
      endInput.value = this.minutesToTime(startM + 60); // default 1h
    },

    showScheduleModal: function () {
      const modal = document.getElementById("modal-schedule-timeslot");
      if (!modal) return;
      const dateInput = document.getElementById("slot-input-date");
      if (dateInput) dateInput.value = this.selectedDate;
      modal.classList.remove("hidden");
    },

    hideScheduleModal: function () {
      const modal = document.getElementById("modal-schedule-timeslot");
      if (modal) modal.classList.add("hidden");
    },

    addScheduleSlotSubmit: function () {
      const title = document.getElementById("slot-input-title").value.trim();
      const subject = (document.getElementById("slot-input-subject") || {}).value || "General";
      const date = document.getElementById("slot-input-date").value;
      const start = document.getElementById("slot-input-start").value;
      const end = document.getElementById("slot-input-end").value;

      if (!title || !date || !start || !end) {
        alert("Please fill out task title, date, start time, and end time.");
        return;
      }

      const tasks = this.getTasks();
      tasks.push({
        id: "task_" + Date.now(),
        title: title,
        subject: subject,
        date: date,
        start: start,
        end: end,
        completed: false
      });

      this.saveTasks(tasks);
      this.hideScheduleModal();
      document.getElementById("slot-input-title").value = "";

      this.render24HourGrid();
      this.renderDailySummary();
      this.renderActiveTaskCountdown();
      this.renderMiniCalendar();

      if (window.StudyPilotAudio) window.StudyPilotAudio.playChime("start");
      if (window.StudyPilotDB && window.StudyPilotDB.addNotification) {
        window.StudyPilotDB.addNotification(`Scheduled "${title}" (${formatTime12(start)} – ${formatTime12(end)})`, "success");
      }
    },

    toggleSlotCompleted: function (taskId) {
      const tasks = this.getTasks();
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks(tasks);
      }
      if (window.StudyPilotAudio) {
        window.StudyPilotAudio.stopAlarm();
        window.StudyPilotAudio.playClickSound();
      }
      this.render24HourGrid();
      this.renderDailySummary();
      this.renderActiveTaskCountdown();
      this.renderMiniCalendar();
    },

    deleteSlot: function (taskId) {
      let tasks = this.getTasks();
      tasks = tasks.filter(t => t.id !== taskId);
      this.saveTasks(tasks);

      this.render24HourGrid();
      this.renderDailySummary();
      this.renderActiveTaskCountdown();
      this.renderMiniCalendar();
    },

    // 9. Week Grid Render
    renderWeekGrid: function () {
      const headerEl = document.getElementById("timetable-week-header");
      const canvasEl = document.getElementById("timetable-week-grid");
      if (!headerEl || !canvasEl) return;

      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      headerEl.innerHTML = `<div>Time</div>` + daysOfWeek.map(d => `<div>${d}</div>`).join("");

      let html = `<div class="week-time-col">`;
      HOURS_24.forEach(({ label }) => {
        html += `<div style="height:60px; font-size:10px; color:var(--text-muted); padding:4px;">${label}</div>`;
      });
      html += `</div>`;

      for (let i = 0; i < 7; i++) {
        html += `<div class="week-day-col">`;
        HOURS_24.forEach(({ hour }) => {
          html += `<div style="height:60px; border-bottom:1px solid var(--border-color); cursor:pointer;" onclick="window.StudyPilotDashboard.openQuickSlotModal(${hour})"></div>`;
        });
        html += `</div>`;
      }

      canvasEl.innerHTML = html;
    },

    // 10. Month Grid & Date Picker
    renderMiniCalendar: function () {
      const monthYearLabel = document.getElementById("mini-calendar-month-year");
      const daysGrid = document.getElementById("mini-calendar-days-grid");
      if (!monthYearLabel || !daysGrid) return;

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      monthYearLabel.innerText = `${monthNames[this.miniMonth]} ${this.miniYear}`;

      const firstDayIndex = new Date(this.miniYear, this.miniMonth, 1).getDay();
      const daysInMonth = new Date(this.miniYear, this.miniMonth + 1, 0).getDate();

      const tasks = this.getTasks();
      let gridHtml = "";

      for (let i = 0; i < firstDayIndex; i++) {
        gridHtml += `<div class="mini-cal-day empty" style="padding:0.4rem; color:transparent;">.</div>`;
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const mStr = String(this.miniMonth + 1).padStart(2, "0");
        const dStr = String(day).padStart(2, "0");
        const dateKey = `${this.miniYear}-${mStr}-${dStr}`;

        const isSelected = dateKey === this.selectedDate;
        const dayTasks = tasks.filter(t => t.date === dateKey);
        const hasTask = dayTasks.length > 0;
        const hasOverdue = dayTasks.some(t => this.isSlotOverdue(t));

        gridHtml += `
          <div class="mini-cal-day ${isSelected ? 'selected' : ''}" 
               style="padding:0.5rem; border-radius:8px; cursor:pointer; font-size:0.85rem; border: ${isSelected ? '2px solid var(--primary-color, #6366f1)' : '1px solid transparent'}; background: ${isSelected ? 'rgba(99,102,241,0.15)' : 'var(--bg-secondary, #f8fafc)'}; font-weight: ${isSelected ? '700' : '500'}; position:relative;"
               onclick="window.StudyPilotDashboard.selectMiniDate('${dateKey}')">
            ${day}
            ${hasTask ? `<span style="position:absolute; bottom:3px; left:50%; transform:translateX(-50%); width:6px; height:6px; border-radius:50%; background:${hasOverdue ? '#ef4444' : '#10b981'};"></span>` : ''}
          </div>
        `;
      }

      daysGrid.innerHTML = gridHtml;
      this.renderMiniSelectedSlots();
    },

    changeMiniMonth: function (delta) {
      this.miniMonth += delta;
      if (this.miniMonth < 0) {
        this.miniMonth = 11;
        this.miniYear -= 1;
      } else if (this.miniMonth > 11) {
        this.miniMonth = 0;
        this.miniYear += 1;
      }
      this.renderMiniCalendar();
    },

    selectMiniDate: function (dateKey) {
      this.selectedDate = dateKey;
      this.render24HourGrid();
      this.renderDailySummary();
      this.renderActiveTaskCountdown();
      this.renderMiniCalendar();
      if (window.StudyPilotAudio) window.StudyPilotAudio.playClickSound();
    },

    renderMiniSelectedSlots: function () {
      const label = document.getElementById("mini-calendar-selected-label");
      const listEl = document.getElementById("mini-calendar-slots-list");
      if (!listEl) return;

      if (label) label.innerText = `Scheduled Tasks for ${this.selectedDate}`;
      const tasks = this.getTasks().filter(t => t.date === this.selectedDate);

      if (tasks.length === 0) {
        listEl.innerHTML = `<div class="timeline-empty" style="font-size:0.8rem; color:var(--text-muted);">0 tasks scheduled for ${this.selectedDate}.</div>`;
        return;
      }

      listEl.innerHTML = tasks.map(t => {
        const isOverdue = !t.completed && this.isSlotOverdue(t);
        return `
          <div class="timeline-item" style="margin-bottom:0.5rem; padding:0.5rem; border-radius:8px; border-left:4px solid ${isOverdue ? '#ef4444' : (t.completed ? '#10b981' : '#6366f1')}; background:var(--bg-card);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:0.85rem; text-decoration:${t.completed ? 'line-through' : 'none'};">${escapeHTML(t.title)}</strong>
                <div class="text-xs text-muted">⏰ ${formatTime12(t.start)} – ${formatTime12(t.end)}</div>
              </div>
              <button class="btn btn-xs ${t.completed ? 'btn-success' : 'btn-outline'}" onclick="window.StudyPilotDashboard.toggleSlotCompleted('${t.id}')">
                ${t.completed ? '✓ Done' : 'Mark Done'}
              </button>
            </div>
          </div>
        `;
      }).join("");
    },

    // 11. Overdue Task Siren Alarm Loop
    isSlotOverdue: function (task) {
      if (!task || task.completed) return false;
      const now = new Date();
      const [h, m] = (task.end || "00:00").split(":").map(Number);
      const slotEndDate = new Date(task.date);
      slotEndDate.setHours(h, m, 0, 0);
      return now > slotEndDate;
    },

    startLiveTimerLoop: function () {
      this.checkOverdueScheduledTasks();
      if (!this.overdueAlarmInterval) {
        this.overdueAlarmInterval = setInterval(() => {
          this.renderDailySummary();
          this.renderActiveTaskCountdown();
          this.checkOverdueScheduledTasks();
        }, 10000);
      }
    },

    checkOverdueScheduledTasks: function () {
      const banner = document.getElementById("dashboard-overdue-banner");
      const tasks = this.getTasks();
      const overdueTasks = tasks.filter(t => this.isSlotOverdue(t));

      if (overdueTasks.length > 0) {
        const topOverdue = overdueTasks[0];
        if (banner) {
          banner.classList.remove("hidden");
          banner.innerHTML = `
            <div class="overdue-warning-card">
              <div style="display:flex; align-items:center; gap:0.9rem;">
                <span style="font-size:2rem;">🚨</span>
                <div>
                  <h4 style="margin:0; font-size:1.1rem; font-weight:900; letter-spacing:0.04em;">WARNING: COMPLETE YOUR TASK</h4>
                  <p style="margin:0.25rem 0 0 0; font-size:0.88rem; font-weight:600;">Task <strong>"${escapeHTML(topOverdue.title)}"</strong> scheduled on ${topOverdue.date} (${formatTime12(topOverdue.start)} - ${formatTime12(topOverdue.end)}) was NOT completed!</p>
                </div>
              </div>
              <button class="btn btn-danger btn-sm" style="font-weight:800; background:#ffffff; color:#dc2626; border:2px solid #ffffff; padding:0.5rem 1rem;" onclick="window.StudyPilotDashboard.stopOverdueAlarmAndComplete('${topOverdue.id}')">
                MUTE ALARM &amp; MARK DONE ✓
              </button>
            </div>
          `;
        }
        if (window.StudyPilotAudio) window.StudyPilotAudio.playLoudAlarm();
      } else {
        if (banner) {
          banner.classList.add("hidden");
          banner.innerHTML = "";
        }
        if (window.StudyPilotAudio) window.StudyPilotAudio.stopAlarm();
      }
    },

    stopOverdueAlarmAndComplete: function (taskId) {
      if (window.StudyPilotAudio) window.StudyPilotAudio.stopAlarm();
      this.toggleSlotCompleted(taskId);
    },

    // Helpers
    timeToMinutes: function (timeStr) {
      if (!timeStr) return 0;
      const [h, m] = timeStr.split(":").map(Number);
      return (h || 0) * 60 + (m || 0);
    },

    minutesToTime: function (mins) {
      mins = Math.max(0, Math.min(1439, mins));
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    },

    getTaskDurationMinutes: function (task) {
      const startM = this.timeToMinutes(task.start);
      const endM = this.timeToMinutes(task.end);
      return Math.max(15, endM - startM);
    },

    getSubjectColor: function (subject) {
      const map = {
        "Mathematics": "linear-gradient(135deg, #4f46e5, #6366f1)",
        "Science": "linear-gradient(135deg, #059669, #10b981)",
        "Social Science": "linear-gradient(135deg, #d97706, #f59e0b)",
        "English": "linear-gradient(135deg, #9333ea, #a855f7)",
        "Free Time": "linear-gradient(135deg, #64748b, #94a3b8)",
        "Homework": "linear-gradient(135deg, #2563eb, #3b82f6)",
        "Revision": "linear-gradient(135deg, #e11d48, #f43f5e)"
      };
      return map[subject] || "linear-gradient(135deg, #4f46e5, #6366f1)";
    }
  };
})();
