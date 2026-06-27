/* ======================================================== */
/* StudyPilot Academic Calendar Planner View JS             */
/* ======================================================== */

(function () {
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  // Mapping status to percentage weights
  function getStatusWeight(status) {
    if (status === "Initial Pass") return 25;
    if (status === "Studied") return 50;
    if (status === "Revised") return 75;
    if (status === "Fully Ready") return 100;
    return 0; // Not Started
  }

  window.StudyPilotPlanner = {
    selectedSubject: "",
    currentWeekOffset: 0, 

    init: function () {
      this.initSubjectsTabs();
      this.renderSyllabusExplorer();
      this.renderTextbookProgress();
      this.renderGrid();
      
      // Sync on lesson updates
      window.removeEventListener("studypilot_lesson_update", this.syncLessonHandler);
      this.syncLessonHandler = () => {
        this.renderSyllabusExplorer();
        this.renderTextbookProgress();
      };
      window.addEventListener("studypilot_lesson_update", this.syncLessonHandler);
    },

    // 1. Render Subject tabs
    initSubjectsTabs: function () {
      const tabsContainer = document.querySelector(".syllabus-subject-tabs");
      if (!tabsContainer) return;

      const profile = window.StudyPilotDB.getProfile();
      const subjects = profile.subjects;

      if (subjects.length === 0) {
        tabsContainer.innerHTML = "<span class='text-xs text-muted'>No subjects selected</span>";
        return;
      }

      if (!this.selectedSubject || !subjects.includes(this.selectedSubject)) {
        this.selectedSubject = subjects[0];
      }

      tabsContainer.innerHTML = subjects.map(sub => {
        const active = sub === this.selectedSubject ? "active" : "";
        return `
          <button class="tab-btn ${active}" onclick="window.StudyPilotPlanner.selectSyllabusSubject('${escapeHTML(sub)}')">${escapeHTML(sub)}</button>
        `;
      }).join("");
    },

    selectSyllabusSubject: function (subj) {
      this.selectedSubject = subj;
      this.initSubjectsTabs();
      this.renderSyllabusExplorer();
      this.renderTextbookProgress();
    },

    // 2. Syllabus Accordion & Sub-chapters Sections
    renderSyllabusExplorer: function () {
      const container = document.getElementById("syllabus-chapters-list");
      if (!container) return;

      const profile = window.StudyPilotDB.getProfile();
      const curriculum = window.StudyPilotDB.getCurriculum(profile.grade, profile.stream);
      const chapters = curriculum.chapters[this.selectedSubject] || [];

      if (chapters.length === 0) {
        container.innerHTML = `<div class="timeline-empty">No preloaded syllabus for ${escapeHTML(this.selectedSubject)}. You can add custom calendar study blocks!</div>`;
        return;
      }

      const progress = window.StudyPilotDB.getLessonProgress();

      container.innerHTML = chapters.map(ch => {
        const chSections = ch.sections || [];
        
        // Calculate average progress of sections in this chapter
        let chapterProgressSum = 0;
        chSections.forEach(sec => {
          const status = progress[sec.id] || "Not Started";
          chapterProgressSum += getStatusWeight(status);
        });
        const chapterPct = chSections.length > 0 ? Math.round(chapterProgressSum / chSections.length) : 0;
        
        let completionBadge = `<span class="badge badge-indigo btn-xs" style="font-size:9px;padding:1px 4px;">Not Started</span>`;
        if (chapterPct === 100) {
          completionBadge = `<span class="badge badge-accent btn-xs" style="font-size:9px;padding:1px 4px;background:#d1fae5;color:#0d9488;">Fully Ready</span>`;
        } else if (chapterPct > 0) {
          completionBadge = `<span class="badge badge-warning btn-xs" style="font-size:9px;padding:1px 4px;background:#fef3c7;color:#d97706;">${chapterPct}% Prepared</span>`;
        }

        return `
          <div class="chapter-accordion-item" id="ch-item-${ch.id}">
            <div class="chapter-header" onclick="window.StudyPilotPlanner.toggleChapter('${ch.id}')" style="display:flex; justify-content:space-between; align-items:center;">
              <span class="chapter-title" style="flex-grow:1; text-align:left;">Ch ${ch.num}: ${escapeHTML(ch.title)}</span>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                ${completionBadge}
                <i data-lucide="chevron-down"></i>
              </div>
            </div>
            <div class="chapter-body hidden" id="ch-body-${ch.id}" style="padding-bottom:0.75rem;">
              <p style="margin-bottom:0.75rem; font-size:0.75rem; color:var(--text-muted);">${escapeHTML(ch.desc)}</p>
              
              <!-- Sub-chapters sections dropdown status tracker (Dad's Progress feature) -->
              <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:0.75rem; background:var(--bg-app); padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
                ${chSections.map(sec => {
                  const status = progress[sec.id] || "Not Started";
                  return `
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; padding:0.25rem 0;">
                      <span style="font-weight:600; color:var(--text-main); text-align:left; max-width:65%;">${sec.num} ${escapeHTML(sec.title)}</span>
                      <select style="font-size:0.7rem; padding:0.15rem 0.35rem; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main); outline:none; cursor:pointer;" onchange="window.StudyPilotPlanner.changeSectionStatus('${sec.id}', this.value)">
                        <option value="Not Started" ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                        <option value="Initial Pass" ${status === 'Initial Pass' ? 'selected' : ''}>Initial Pass</option>
                        <option value="Studied" ${status === 'Studied' ? 'selected' : ''}>Studied</option>
                        <option value="Revised" ${status === 'Revised' ? 'selected' : ''}>Revised</option>
                        <option value="Fully Ready" ${status === 'Fully Ready' ? 'selected' : ''}>Fully Ready</option>
                      </select>
                    </div>
                  `;
                }).join("")}
              </div>

              <button class="btn btn-primary btn-xs w-full" onclick="window.StudyPilotPlanner.quickScheduleRevision('${escapeHTML(this.selectedSubject)}', ${ch.num}, '${escapeHTML(ch.title)}')">
                <i data-lucide="calendar-plus"></i> Schedule Revision
              </button>
            </div>
          </div>
        `;
      }).join("");

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    toggleChapter: function (id) {
      const body = document.getElementById(`ch-body-${id}`);
      const item = document.getElementById(`ch-item-${id}`);
      if (!body) return;

      const isHidden = body.classList.contains("hidden");
      
      document.querySelectorAll(".chapter-body").forEach(el => {
        if (el.id !== `ch-body-${id}`) el.classList.add("hidden");
      });
      document.querySelectorAll(".chapter-accordion-item").forEach(el => {
        if (el.id !== `ch-item-${id}`) el.classList.remove("expanded");
      });

      if (isHidden) {
        body.classList.remove("hidden");
        item.classList.add("expanded");
      } else {
        body.classList.add("hidden");
        item.classList.remove("expanded");
      }
    },

    changeSectionStatus: function (sectionId, status) {
      window.StudyPilotDB.updateSectionStatus(sectionId, status);
    },

    quickScheduleRevision: function (subj, chNum, chTitle) {
      this.showEventModal();
      document.getElementById("event-input-title").value = `Revision: Ch ${chNum} (${subj})`;
      document.getElementById("event-input-type").value = "study";
    },

    // 3. Textbook overall progress
    renderTextbookProgress: function () {
      const subjectLbl = document.getElementById("textbook-subject-lbl");
      const pctLbl = document.getElementById("textbook-pct-lbl");
      const fillBar = document.getElementById("textbook-progress-fill");

      if (!subjectLbl || !pctLbl || !fillBar) return;

      const profile = window.StudyPilotDB.getProfile();
      const curriculum = window.StudyPilotDB.getCurriculum(profile.grade, profile.stream);
      const chapters = curriculum.chapters[this.selectedSubject] || [];

      subjectLbl.innerText = `${this.selectedSubject} Prep`;

      if (chapters.length === 0) {
        pctLbl.innerText = "0%";
        fillBar.style.width = "0%";
        return;
      }

      const progress = window.StudyPilotDB.getLessonProgress();
      let totalSectionsCount = 0;
      let totalProgressWeightSum = 0;

      chapters.forEach(ch => {
        const chSections = ch.sections || [];
        chSections.forEach(sec => {
          totalSectionsCount++;
          const status = progress[sec.id] || "Not Started";
          totalProgressWeightSum += getStatusWeight(status);
        });
      });

      const percentage = totalSectionsCount > 0 ? Math.round(totalProgressWeightSum / totalSectionsCount) : 0;
      pctLbl.innerText = `${percentage}%`;
      fillBar.style.width = `${percentage}%`;
    },

    // 4. Calendar week navigation
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

      let headerHTML = `<div class="cal-time-label" style="grid-row: 1; grid-column: 1;"></div>`;
      DAYS.forEach((day, index) => {
        let isActive = day === "Monday" && this.currentWeekOffset === 0;
        let dateNum = 22 + index + (this.currentWeekOffset * 7);
        headerHTML += `
          <div class="cal-grid-header ${isActive ? 'active' : ''}" style="grid-row: 1; grid-column: ${index + 2};">
            ${day.substring(0, 3)} <span>${dateNum}</span>
          </div>
        `;
      });
      grid.innerHTML += headerHTML;

      let gridHTML = "";
      HOURS.forEach((hour, hIndex) => {
        const row = hIndex + 2;
        gridHTML += `<div class="cal-time-label" style="grid-row: ${row}; grid-column: 1;">${formatTime12(hour)}</div>`;

        for (let col = 2; col <= 8; col++) {
          gridHTML += `<div class="cal-grid-cell" style="grid-row: ${row}; grid-column: ${col};"></div>`;
        }
      });
      grid.innerHTML += gridHTML;

      const events = window.StudyPilotDB.getCalendarEvents();
      
      events.forEach(e => {
        const colIndex = DAYS.indexOf(e.day) + 2;
        if (colIndex < 2) return;

        const startHour = parseInt(e.start.split(":")[0]);
        const endHour = parseInt(e.end.split(":")[0]);

        const startRow = (startHour - 8) + 2;
        const endRow = (endHour - 8) + 2;
        
        if (startRow < 2 || endRow > 15) return;

        let eventClass = e.type === "class" ? "class" : (e.type === "exam" ? "exam" : "study");

        const eventEl = document.createElement("div");
        eventEl.className = `cal-event ${eventClass}`;
        eventEl.style.gridColumn = colIndex;
        eventEl.style.gridRow = `${startRow} / ${endRow}`;
        eventEl.innerHTML = `
          <div>
            <div class="cal-event-title">${escapeHTML(e.title)}</div>
            <div class="cal-event-time">${formatTime12(e.start)} - ${formatTime12(e.end)}</div>
          </div>
          <button style="background:none;border:none;color:currentColor;cursor:pointer;align-self:flex-end;font-size:10px;" onclick="window.StudyPilotPlanner.deleteEvent(event, '${e.id}')">✕</button>
        `;
        
        grid.appendChild(eventEl);
      });
    },

    deleteEvent: function (e, id) {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this event?")) {
        window.StudyPilotDB.deleteCalendarEvent(id);
        this.renderGrid();
        if (window.StudyPilotDashboard) {
          window.StudyPilotDashboard.renderTimeline();
          window.StudyPilotDashboard.renderAISuggestions();
        }
      }
    },

    autoGeneratePlan: function () {
      const events = window.StudyPilotDB.getCalendarEvents();
      
      const hasMon19 = events.some(e => e.day === "Monday" && e.start === "19:00");
      const hasTue16 = events.some(e => e.day === "Tuesday" && e.start === "16:00");

      let added = 0;
      if (!hasMon19) {
        window.StudyPilotDB.addCalendarEvent("AI Block: Arithmetic Expressions Ch 2", "Monday", "study", "19:00", "20:00");
        added++;
      }
      if (!hasTue16) {
        window.StudyPilotDB.addCalendarEvent("AI Block: Science Electricity circuits Ch 3", "Tuesday", "study", "16:00", "17:30");
        added++;
      }

      if (added > 0) {
        window.StudyPilotDB.addNotification(`AI Planner: Automatically generated ${added} study revision blocks.`, "success");
        this.renderGrid();
        if (window.StudyPilotDashboard) {
          window.StudyPilotDashboard.renderTimeline();
          window.StudyPilotDashboard.renderAISuggestions();
        }
      } else {
        alert("Your week's calendar is already fully optimized by the AI Scheduler!");
      }
    },

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
      const day = document.getElementById("event-input-day").value;
      const type = document.getElementById("event-input-type").value;
      const start = document.getElementById("event-input-start").value;
      const end = document.getElementById("event-input-end").value;

      if (!title) {
        alert("Please enter an event title.");
        return;
      }

      if (start >= end) {
        alert("Start time must be before end time!");
        return;
      }

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

  function formatTime12(time24) {
    const [hStr, mStr] = time24.split(":");
    let h = parseInt(hStr);
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    return `${h}:${mStr} ${ampm}`;
  }

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
