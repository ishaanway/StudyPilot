/* ======================================================== */
/* StudyPilot Academic Calendar Planner View JS             */
/* CBSE Grade 10 | Official NCERT textbook links only       */
/* ======================================================== */

(function () {

  const DAYS  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
                 "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  window.StudyPilotPlanner = {
    selectedSubject: "Science",
    currentWeekOffset: 0,

    init: function () {
      this.renderSyllabusExplorer();
      this.renderGrid();
    },

    /* ──────────────────────────────────────────
       SYLLABUS SIDEBAR — drives the accordion
    ────────────────────────────────────────── */
    selectSyllabusSubject: function (subj) {
      this.selectedSubject = subj;

      // Toggle active class on tab buttons
      document.querySelectorAll(".syllabus-subject-tabs .tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-subject") === subj);
      });

      this.renderSyllabusExplorer();
    },

    renderSyllabusExplorer: function () {
      const container = document.getElementById("syllabus-chapters-list");
      if (!container) return;

      const curriculum = window.StudyPilotCurriculum;
      const chapters = curriculum ? curriculum.getChapters(this.selectedSubject) : [];

      if (!chapters || chapters.length === 0) {
        container.innerHTML = `<p style="padding:12px;opacity:0.6;">No official Grade 10 chapters are wired for ${escapeHTML(this.selectedSubject)} yet.</p>`;
        return;
      }

      container.innerHTML = chapters.map(ch => {
        const status = curriculum && typeof curriculum.getChapterStatus === "function"
          ? curriculum.getChapterStatus(ch.id)
          : "Not Started";
        const highlights = Array.isArray(ch.highlights)
          ? `<ul class="chapter-highlights">${ch.highlights.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`
          : "";

        return `
          <div class="chapter-accordion-item" id="ch-item-${ch.id}">
            <div class="chapter-header" onclick="window.StudyPilotPlanner.toggleChapter('${ch.id}')">
              <span class="chapter-title">
                <span class="strand-badge strand-term">Official NCERT</span>
                Ch ${ch.num}: ${escapeHTML(ch.title)}
              </span>
              <span class="badge badge-indigo">${escapeHTML(status)}</span>
              <i data-lucide="chevron-down"></i>
            </div>
            <div class="chapter-body hidden" id="ch-body-${ch.id}">
              <p>${escapeHTML(ch.summary)}</p>
              ${highlights}
              <div class="chapter-action-row">
                <a class="btn btn-secondary btn-xs" href="${ch.textbookUrl}" target="_blank" rel="noopener noreferrer">Open Textbook</a>
                <a class="btn btn-outline btn-xs" href="${ch.textbookPage}" target="_blank" rel="noopener noreferrer">Open Page</a>
                <button class="btn btn-primary btn-xs" onclick="window.StudyPilotPlanner.markChapterStarted('${ch.id}')">Mark as Started</button>
                <button class="btn btn-primary btn-xs" onclick="window.StudyPilotPlanner.markChapterCompleted('${ch.id}')">Mark as Completed</button>
                <button class="btn btn-outline btn-xs" onclick="window.StudyPilotPlanner.quickScheduleRevision('${escapeHTML(this.selectedSubject)}', '${ch.num}', '${escapeHTML(ch.title).replace(/'/g,"\\'")}')">
                  <i data-lucide="calendar-plus"></i> Add Revision Task
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");

      if (window.lucide) window.lucide.createIcons();
    },

    toggleChapter: function (id) {
      const body = document.getElementById(`ch-body-${id}`);
      const item = document.getElementById(`ch-item-${id}`);
      if (!body) return;

      const isHidden = body.classList.contains("hidden");

      // Close all
      document.querySelectorAll(".chapter-body").forEach(el => el.classList.add("hidden"));
      document.querySelectorAll(".chapter-accordion-item").forEach(el => el.classList.remove("expanded"));

      if (isHidden) {
        body.classList.remove("hidden");
        item.classList.add("expanded");
      }
    },

    quickScheduleRevision: function (subj, chNum, chTitle) {
      this.showEventModal();
      const titleInput = document.getElementById("event-input-title");
      if (titleInput) {
        titleInput.value = `Revision: ${subj} Ch ${chNum} — ${chTitle}`;
      }
      const typeInput = document.getElementById("event-input-type");
      if (typeInput) typeInput.value = "study";
    },

    markChapterStarted: function (chapterId) {
      if (window.StudyPilotDB && typeof window.StudyPilotDB.markChapterStarted === "function") {
        window.StudyPilotDB.markChapterStarted(chapterId);
        this.renderSyllabusExplorer();
        if (window.StudyPilotDashboard) window.StudyPilotDashboard.init();
      }
    },

    markChapterCompleted: function (chapterId) {
      if (window.StudyPilotDB && typeof window.StudyPilotDB.markChapterCompleted === "function") {
        window.StudyPilotDB.markChapterCompleted(chapterId);
        this.renderSyllabusExplorer();
        if (window.StudyPilotDashboard) window.StudyPilotDashboard.init();
      }
    },

    /* ──────────────────────────────────────────
       WEEKLY CALENDAR GRID
    ────────────────────────────────────────── */
    navigateWeek: function (dir) {
      this.currentWeekOffset += dir;
      const rangeEl = document.getElementById("calendar-week-range");
      if (this.currentWeekOffset === 0) {
        rangeEl.innerText = "22 June - 28 June 2026";
      } else if (this.currentWeekOffset === 1) {
        rangeEl.innerText = "29 June - 05 July 2026";
      } else if (this.currentWeekOffset === -1) {
        rangeEl.innerText = "15 June - 21 June 2026";
      } else {
        rangeEl.innerText = `Week Offset ${this.currentWeekOffset}`;
      }
      this.renderGrid();
    },

    renderGrid: function () {
      const grid = document.getElementById("weekly-calendar-grid");
      if (!grid) return;
      grid.innerHTML = "";

      // Header row: empty time cell + 7 day cells
      let headerHTML = `<div class="cal-time-label" style="grid-row:1;grid-column:1;"></div>`;
      DAYS.forEach((day, index) => {
        const isActive = day === "Monday" && this.currentWeekOffset === 0;
        const dateNum  = 22 + index + (this.currentWeekOffset * 7);
        headerHTML += `
          <div class="cal-grid-header ${isActive ? "active" : ""}" style="grid-row:1;grid-column:${index + 2};">
            ${day.substring(0, 3)} <span>${dateNum}</span>
          </div>
        `;
      });
      grid.innerHTML += headerHTML;

      // Time rows + empty cells
      let gridHTML = "";
      HOURS.forEach((hour, hIndex) => {
        const row = hIndex + 2;
        gridHTML += `<div class="cal-time-label" style="grid-row:${row};grid-column:1;">${formatTime12(hour)}</div>`;
        for (let col = 2; col <= 8; col++) {
          gridHTML += `<div class="cal-grid-cell" style="grid-row:${row};grid-column:${col};"></div>`;
        }
      });
      grid.innerHTML += gridHTML;

      // Overlay events from DB
      const events = window.StudyPilotDB.getCalendarEvents();
      events.forEach(e => {
        const colIndex = DAYS.indexOf(e.day) + 2;
        if (colIndex < 2) return;

        const startHour = parseInt(e.start.split(":")[0]);
        const endHour   = parseInt(e.end.split(":")[0]);
        const startRow  = (startHour - 8) + 2;
        const endRow    = (endHour - 8) + 2;
        if (startRow < 2 || endRow > 15) return;

        const eventClass = e.type === "class" ? "class" : (e.type === "exam" ? "exam" : "study");

        const eventEl = document.createElement("div");
        eventEl.className = `cal-event ${eventClass}`;
        eventEl.style.gridColumn = colIndex;
        eventEl.style.gridRow = `${startRow} / ${endRow}`;
        eventEl.innerHTML = `
          <div>
            <div class="cal-event-title">${escapeHTML(e.title)}</div>
            <div class="cal-event-time">${formatTime12(e.start)} - ${formatTime12(e.end)}</div>
          </div>
          <button style="background:none;border:none;color:currentColor;cursor:pointer;align-self:flex-end;font-size:10px;" onclick="window.StudyPilotPlanner.deleteEvent(event,'${e.id}')">✕</button>
        `;
        grid.appendChild(eventEl);
      });
    },

    deleteEvent: function (e, id) {
      e.stopPropagation();
      if (confirm("Delete this event?")) {
        window.StudyPilotDB.deleteCalendarEvent(id);
        this.renderGrid();
        if (window.StudyPilotDashboard) {
          window.StudyPilotDashboard.renderTimeline();
          window.StudyPilotDashboard.renderAISuggestions();
        }
      }
    },

    /* ──────────────────────────────────────────
       AI AUTO-SCHEDULE REVISION
    ────────────────────────────────────────── */
    autoGeneratePlan: function () {
      const events = window.StudyPilotDB.getCalendarEvents();

      const slots = [
        { title: "AI Block: Science - Acids, Bases and Salts (Ch 2)", day: "Monday", start: "19:00", end: "20:00" },
        { title: "AI Block: Science - Light, Reflection and Refraction (Ch 9)", day: "Wednesday", start: "17:00", end: "18:00" },
        { title: "AI Block: Science - Electricity (Ch 11)", day: "Friday", start: "16:00", end: "17:00" }
      ];

      let added = 0;
      slots.forEach(slot => {
        const exists = events.some(e => e.day === slot.day && e.start === slot.start);
        if (!exists) {
          window.StudyPilotDB.addCalendarEvent(slot.title, slot.day, "study", slot.start, slot.end);
          added++;
        }
      });

      if (added > 0) {
        window.StudyPilotDB.addNotification(
          `AI Planner: Generated ${added} revision blocks for the official Grade 10 NCERT Science chapters.`,
          "success"
        );
        this.renderGrid();
        if (window.StudyPilotDashboard) {
          window.StudyPilotDashboard.renderTimeline();
          window.StudyPilotDashboard.renderAISuggestions();
        }
      } else {
        alert("Your week is already fully optimized by the AI Scheduler!");
      }
    },

    /* ──────────────────────────────────────────
       ADD EVENT MODAL
    ────────────────────────────────────────── */
    showEventModal: function () {
      const modal = document.getElementById("modal-add-event");
      if (modal) modal.classList.remove("hidden");
    },

    hideEventModal: function () {
      const modal = document.getElementById("modal-add-event");
      if (modal) modal.classList.add("hidden");
    },

    addEventSubmit: function () {
      const title = document.getElementById("event-input-title").value.trim();
      const day   = document.getElementById("event-input-day").value;
      const type  = document.getElementById("event-input-type").value;
      const start = document.getElementById("event-input-start").value;
      const end   = document.getElementById("event-input-end").value;

      if (!title) { alert("Please enter an event title."); return; }
      if (start >= end) { alert("Start time must be before end time!"); return; }

      window.StudyPilotDB.addCalendarEvent(title, day, type, start, end);
      this.hideEventModal();
      document.getElementById("event-input-title").value = "";

      this.renderGrid();
      if (window.StudyPilotDashboard) {
        window.StudyPilotDashboard.renderTimeline();
        window.StudyPilotDashboard.renderAISuggestions();
      }
    }
  };

  /* ──────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────── */
  function formatTime12(time24) {
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${mStr} ${ampm}`;
  }

  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
