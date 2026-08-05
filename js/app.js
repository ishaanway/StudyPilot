/* ======================================================== */
/* StudyPilot Main Application Coordinator & Routing JS     */
/* ======================================================== */

(function () {
  const THEME_OPTIONS = [
    { id: "dawn-notes", label: "Dawn Notes", tone: "light" },
    { id: "paper-grove", label: "Paper Grove", tone: "light" },
    { id: "sunset-prep", label: "Sunset Prep", tone: "light" },
    { id: "midnight-bloom", label: "Midnight Bloom", tone: "dark" },
    { id: "deep-current", label: "Deep Current", tone: "dark" },
    { id: "ember-lab", label: "Ember Lab", tone: "dark" }
  ];

  const DEFAULT_THEME_ID = "dawn-notes";
  const THEME_STORAGE_KEY = "studypilot_theme";

  window.StudyPilotApp = {
    activeScreen: "dashboard",
    currentTheme: DEFAULT_THEME_ID,

    init: function () {
      this.loadTheme();
      this.checkOnboarding();
      this.initNavigation();
      this.initThemeToggle();
      this.initNotifications();
      this.initGlobalSearch();
      
      this.loadUserProfile();
      
      window.addEventListener("studypilot_notification", () => {
        this.updateNotificationBadge();
      });

      window.addEventListener("studypilot_bootstrap", () => {
        this.checkOnboarding();
        this.loadUserProfile();
        if (this.activeScreen === "dashboard") {
          window.StudyPilotDashboard.init();
        } else if (this.activeScreen === "planner" && window.StudyPilotPlanner) {
          window.StudyPilotPlanner.init();
        } else if (this.activeScreen === "parents" && window.StudyPilotParents) {
          window.StudyPilotParents.init();
        }
      });

      // Rerender progress when updates trigger
      window.addEventListener("studypilot_lesson_update", () => {
        if (this.activeScreen === "dashboard") {
          window.StudyPilotDashboard.init();
        }
      });
    },

    loadTheme: function () {
      let storedTheme = null;
      try {
        storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      } catch (e) {
        console.warn("[StudyPilotApp] localStorage.getItem failed:", e);
      }
      const resolvedTheme = this.getThemeOption(storedTheme) ? storedTheme : DEFAULT_THEME_ID;
      this.applyTheme(resolvedTheme, false);
    },

    initThemeToggle: function () {
      const toggleBtn = document.getElementById("theme-toggle-btn");
      const menu = document.getElementById("theme-picker-menu");
      if (!toggleBtn || !menu) return;

      toggleBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const shouldOpen = menu.classList.contains("hidden");
        this.setThemeMenuOpen(shouldOpen);
      });

      menu.querySelectorAll(".theme-option").forEach((option) => {
        option.addEventListener("click", (event) => {
          event.stopPropagation();
          const themeId = option.getAttribute("data-theme");
          if (!themeId) return;
          this.applyTheme(themeId, true);
          this.setThemeMenuOpen(false);
        });
      });

      document.addEventListener("click", () => {
        this.setThemeMenuOpen(false);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          this.setThemeMenuOpen(false);
        }
      });

      this.updateThemeToggleUI();
    },

    getThemeOption: function (themeId) {
      return THEME_OPTIONS.find((option) => option.id === themeId) || null;
    },

    applyTheme: function (themeId, persist) {
      const option = this.getThemeOption(themeId) || this.getThemeOption(DEFAULT_THEME_ID);
      if (!option) return;

      this.currentTheme = option.id;
      document.body.setAttribute("data-theme", option.id);
      document.documentElement.setAttribute("data-theme", option.id);
      document.body.setAttribute("data-theme-tone", option.tone);
      document.documentElement.setAttribute("data-theme-tone", option.tone);

      if (persist !== false) {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, option.id);
        } catch (e) {
          console.warn("[StudyPilotApp] localStorage.setItem failed:", e);
        }
      }

      this.updateThemeToggleUI();
    },

    updateThemeToggleUI: function () {
      const option = this.getThemeOption(this.currentTheme) || this.getThemeOption(DEFAULT_THEME_ID);
      if (!option) return;

      const label = document.getElementById("theme-toggle-label");
      const menu = document.getElementById("theme-picker-menu");
      const sunIcon = document.querySelector("#theme-toggle-btn .sun-icon");
      const moonIcon = document.querySelector("#theme-toggle-btn .moon-icon");

      if (label) {
        label.innerText = option.label;
      }

      if (sunIcon) {
        sunIcon.classList.toggle("hidden", option.tone !== "light");
      }
      if (moonIcon) {
        moonIcon.classList.toggle("hidden", option.tone !== "dark");
      }

      if (menu) {
        menu.querySelectorAll(".theme-option").forEach((button) => {
          button.classList.toggle("active", button.getAttribute("data-theme") === option.id);
        });
      }
    },

    setThemeMenuOpen: function (isOpen) {
      const toggleBtn = document.getElementById("theme-toggle-btn");
      const menu = document.getElementById("theme-picker-menu");
      if (!toggleBtn || !menu) return;

      menu.classList.toggle("hidden", !isOpen);
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    },

    checkOnboarding: function () {
      const profile = window.StudyPilotDB.getProfile();
      const setupWizard = document.getElementById("setup-wizard");
      
      if (!profile || !profile.setupComplete) {
        setupWizard.classList.remove("hidden");
      } else {
        setupWizard.classList.add("hidden");
        window.StudyPilotDashboard.init();
      }
    },

    loadUserProfile: function () {
      const profile = window.StudyPilotDB.getProfile();
      if (!profile.setupComplete) return;

      const greetEl = document.getElementById("dashboard-welcome");
      if (greetEl) {
        greetEl.innerText = `Hello, ${profile.name}!`;
      }

      const headerAvatar = document.getElementById("header-avatar");
      if (headerAvatar) {
        headerAvatar.innerText = profile.name.substring(0, 2).toUpperCase();
      }

      const profAvatarLg = document.getElementById("profile-avatar-lg");
      if (profAvatarLg) {
        profAvatarLg.innerText = profile.name.substring(0, 2).toUpperCase();
      }
      
      document.getElementById("profile-fullname").innerText = profile.name;
      
      const gradeDisplay = profile.grade === "prekg" ? "Pre-KG" : `Grade ${profile.grade}`;
      const streamDisplay = (profile.grade === "11" || profile.grade === "12") ? ` (${profile.stream} Stream)` : "";
      
      document.getElementById("profile-details").innerText = `${gradeDisplay}${streamDisplay} Student • ${profile.board} Board`;
      document.getElementById("profile-goal-badge").innerText = profile.goal;

      // Populate edit details values
      document.getElementById("profile-edit-name").value = profile.name;
      document.getElementById("profile-edit-grade").value = profile.grade;
      document.getElementById("profile-edit-board").value = profile.board;
      document.getElementById("profile-edit-goal").value = profile.goal;
      document.getElementById("profile-edit-target-date").value = profile.targetDate || "";
      const emailInput = document.getElementById("profile-gmail-email");
      if (emailInput) {
        emailInput.value = profile.schoolEmail || "nagaraj957@gmail.com";
      }

      // Handle profile stream box visibility
      this.handleProfileGradeChange(profile.grade);
      if (profile.grade === "11" || profile.grade === "12") {
        const streamEditInput = document.getElementById("profile-edit-stream");
        if (streamEditInput) {
          streamEditInput.value = profile.stream || "Science";
        }
      }

      // Populate Ollama Model selection
      const savedModel = profile.ollamaModel || "auto";
      const select = document.getElementById("profile-ollama-model");
      if (select) {
        if (select.options.length <= 1) {
          select.innerHTML = `<option value="${savedModel}" selected>${savedModel === 'auto' ? 'Auto (Choose best available)' : savedModel}</option>`;
        } else {
          select.value = savedModel;
        }
      }
      this.refreshOllamaModels();

      document.getElementById("dashboard-date").innerText = "Saturday, 27 June 2026"; // Adjusted to current local demo date
    },

    // Switch screens routing
    initNavigation: function () {
      const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
      navItems.forEach(item => {
        item.addEventListener("click", () => {
          const targetScreen = item.getAttribute("data-screen");
          this.switchScreen(targetScreen);
        });
      });
    },

    switchScreen: function (screenId) {
      if (this.activeScreen === screenId) return;

      document.getElementById(`screen-${this.activeScreen}`).classList.add("hidden");
      document.getElementById(`screen-${screenId}`).classList.remove("hidden");
      this.activeScreen = screenId;

      const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
      navItems.forEach(item => {
        if (item.getAttribute("data-screen") === screenId) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      if (screenId === "dashboard") {
        window.StudyPilotDashboard.init();
      } else if (screenId === "planner") {
        if (window.StudyPilotDB && typeof window.StudyPilotDB.syncCurriculumFromBackend === "function") {
          window.StudyPilotDB.syncCurriculumFromBackend().then(() => {
            window.StudyPilotPlanner.init();
          });
        } else {
          window.StudyPilotPlanner.init();
        }
      } else if (screenId === "tutor") {
        window.StudyPilotTutor.init();
      } else if (screenId === "toolbox") {
        window.StudyPilotToolbox.init();
      } else if (screenId === "parents") {
        if (window.StudyPilotDB && typeof window.StudyPilotDB.syncCurriculumFromBackend === "function") {
          window.StudyPilotDB.syncCurriculumFromBackend().then(() => {
            window.StudyPilotParents.init();
          });
        } else {
          window.StudyPilotParents.init();
        }
      } else if (screenId === "books") {
        if (window.StudyPilotBooks) {
          window.StudyPilotBooks.init();
        }
      } else if (screenId === "profile") {
        this.loadUserProfile();
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    // Profiles stream group triggers
    handleProfileGradeChange: function (grade) {
      const streamGroup = document.getElementById("profile-edit-stream-group");
      if (!streamGroup) return;

      if (grade === "11" || grade === "12") {
        streamGroup.classList.remove("hidden");
      } else {
        streamGroup.classList.add("hidden");
      }
    },

    saveProfileEdits: function () {
      const name = document.getElementById("profile-edit-name").value.trim();
      const grade = document.getElementById("profile-edit-grade").value;
      const board = document.getElementById("profile-edit-board").value;
      const goal = document.getElementById("profile-edit-goal").value;
      const stream = (grade === "11" || grade === "12") ? document.getElementById("profile-edit-stream").value : "Science";

      if (!name) {
        alert("Name cannot be blank!");
        return;
      }

      const profile = window.StudyPilotDB.getProfile();
      
      // If they changed grade, wipe the old subjects and load the defaults for the new grade
      if (profile.grade !== grade || profile.stream !== stream) {
        const curriculum = window.StudyPilotDB.getCurriculum(grade, stream);
        profile.subjects = curriculum.subjects;
      }

      profile.name = name;
      profile.grade = grade;
      profile.board = board;
      profile.goal = goal;
      profile.stream = stream;
      // schoolEmail input is removed, keep the existing value
      profile.schoolEmail = profile.schoolEmail || "nagaraj957@gmail.com";

      const targetDate = document.getElementById("profile-edit-target-date").value;
      profile.targetDate = targetDate;

      if (targetDate) {
        try {
          const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const target = new Date(targetDate + "T00:00:00");
          if (!isNaN(target.getTime())) {
            const dayName = daysOfWeek[target.getDay()];

            let events = window.StudyPilotDB.getCalendarEvents();
            events = events.filter(e => !String(e.title || "").includes("Target Exam Prep Milestone"));
            window.StudyPilotDB.saveCalendarEvents(events);

            const newEvent = window.StudyPilotDB.addCalendarEvent(
              "🎯 Target Exam Prep Milestone",
              dayName,
              "exam",
              "09:00",
              "11:00",
              targetDate,
              "Exam Prep"
            );
            
            const studentId = profile.backendStudentId;
            if (studentId) {
              fetch(`${window.getStudyPilotApiBaseUrl()}/api/calendar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  student_id: studentId,
                  title: newEvent.title,
                  subject: "Exam Prep",
                  day: newEvent.day,
                  session_date: targetDate,
                  type: newEvent.type,
                  start: newEvent.start,
                  end: newEvent.end
                })
              }).catch(err => console.warn("Failed to sync target event to backend:", err));
            }
          }
        } catch (e) {
          console.warn("Failed to auto-schedule target date event:", e);
        }
      }

      window.StudyPilotDB.saveProfile(profile);
      window.dispatchEvent(new CustomEvent("studypilot_profile_updated"));
      this.loadUserProfile();
      
      // Force reload other screens
      if (window.StudyPilotPlanner) window.StudyPilotPlanner.init();
      if (window.StudyPilotTutor) window.StudyPilotTutor.init();
      if (window.StudyPilotBooks) window.StudyPilotBooks.init();
      
      window.StudyPilotDB.addNotification("Profile settings updated successfully.", "success");
      alert("Settings saved successfully!");
    },

    saveOllamaModel: function () {
      const select = document.getElementById("profile-ollama-model");
      if (!select) return;
      const model = select.value;
      const profile = window.StudyPilotDB.getProfile();
      profile.ollamaModel = model;
      window.StudyPilotDB.saveProfile(profile);

      window.StudyPilotDB.addNotification(`Local Ollama model set to ${model === 'auto' ? 'Auto' : model}.`, "success");
      alert(`Local Ollama tutor configuration saved successfully!`);
    },

    refreshOllamaModels: async function () {
      const select = document.getElementById("profile-ollama-model");
      const statusLbl = document.getElementById("ollama-status-lbl");
      if (!select || !statusLbl) return;

      try {
        statusLbl.innerText = "Connecting...";
        statusLbl.style.color = "var(--text-muted)";

        const apiBase = window.StudyPilotTutor ? window.StudyPilotTutor.getApiBaseUrl() : "http://127.0.0.1:5000";
        const response = await fetch(`${apiBase}/api/tutor/models`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.ok) {
          const profile = window.StudyPilotDB.getProfile();
          const savedModel = profile.ollamaModel || "auto";

          // Clear choices, keep auto as fallback
          select.innerHTML = "";
          
          data.items.forEach(item => {
            const val = item.provider === "auto" ? "auto" : item.model;
            const selected = val === savedModel ? "selected" : "";
            const cleanLabel = String(item.label).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const cleanVal = String(val).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            select.innerHTML += `<option value="${cleanVal}" ${selected}>${cleanLabel}</option>`;
          });

          statusLbl.innerText = "Connected (Ollama Active)";
          statusLbl.style.color = "#166534";
        } else {
          throw new Error("Unable to fetch models");
        }
      } catch (error) {
        console.error("Failed to connect to Ollama backend:", error);
        statusLbl.innerText = "Offline (Make sure backend is running)";
        statusLbl.style.color = "var(--red-text)";
      }
    },

    // ========================================================
    // Parent Report Modal (Parent Progress feature)
    // ========================================================
    showParentReportModal: function () {
      const modal = document.getElementById("modal-parent-report");
      const body = document.getElementById("parent-report-body");
      if (!modal || !body) return;

      const profile = window.StudyPilotDB.getProfile();
      const progress = window.StudyPilotDB.getLessonProgress();
      const curriculum = window.StudyPilotDB.getCurriculum(profile.grade, profile.stream);

      function getStatusWeight(status) {
        if (status === "Initial Pass") return 25;
        if (status === "Studied") return 50;
        if (status === "Revised") return 75;
        if (status === "Fully Ready") return 100;
        return 0;
      }

      let html = `
        <div style="background:var(--primary-light); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-focus); margin-bottom:1rem; font-size:0.85rem;">
          <h4 style="color:var(--primary); font-weight:700; margin-bottom:0.25rem;">Student: ${escapeHTML(profile.name)}</h4>
          <p style="color:var(--text-muted);">Grade: <strong>${profile.grade === 'prekg' ? 'Pre-KG' : 'Class ' + profile.grade}</strong> | Board: <strong>${profile.board}</strong></p>
          <p style="color:var(--text-muted); margin-top:0.25rem;">Academic Focus Goal: <strong>${profile.goal}</strong></p>
        </div>
        <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.75rem;">Textbook Lessons Preparation Breakdown</h4>
      `;

      profile.subjects.forEach(subj => {
        const chapters = curriculum.chapters[subj] || [];
        if (chapters.length === 0) return;

        let totalSectionsCount = 0;
        let totalProgressWeightSum = 0;
        
        let completedChapters = [];
        let inProgressChapters = [];

        chapters.forEach(ch => {
          const chSections = ch.sections || [];
          let chapterProgressSum = 0;

          chSections.forEach(sec => {
            totalSectionsCount++;
            const status = progress[sec.id] || "Not Started";
            const weight = getStatusWeight(status);
            totalProgressWeightSum += weight;
            chapterProgressSum += weight;
          });

          const chapterPct = chSections.length > 0 ? Math.round(chapterProgressSum / chSections.length) : 0;
          
          if (chapterPct === 100) {
            completedChapters.push(ch);
          } else if (chapterPct > 0) {
            // Find section states inside this in-progress chapter
            const sectionStates = chSections.map(sec => {
              const status = progress[sec.id] || "Not Started";
              return { num: sec.num, title: sec.title, status: status };
            });
            inProgressChapters.push({ ch: ch, pct: chapterPct, sections: sectionStates });
          }
        });

        const pct = totalSectionsCount > 0 ? Math.round(totalProgressWeightSum / totalSectionsCount) : 0;

        html += `
          <div style="margin-bottom:1.25rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
              <strong style="font-size:0.9rem;">${escapeHTML(subj)} Textbook</strong>
              <span class="badge ${pct > 75 ? 'badge-accent' : 'badge-indigo'}" style="font-weight:700;">${pct}% Prepared</span>
            </div>
            
            <div class="quiz-progress-bar" style="height:6px; margin-bottom:0.75rem;">
              <div class="quiz-progress-fill" style="width:${pct}%; background:var(--primary);"></div>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.75rem;">
              <div>
                <span style="color:var(--color-success); font-weight:700;">✓ Fully Ready Chapters (${completedChapters.length})</span>
                <ul style="padding-left:1rem; margin-top:0.25rem; color:var(--text-muted); list-style-type:circle;">
                  ${completedChapters.length > 0 ? completedChapters.map(c => `<li>Ch ${c.num}: ${escapeHTML(c.title)}</li>`).join("") : "<li>None yet</li>"}
                </ul>
              </div>
              <div style="margin-top:0.25rem;">
                <span style="color:var(--color-warning); font-weight:700;">◴ In-Progress Chapters (${inProgressChapters.length})</span>
                <div style="padding-left:0.5rem; margin-top:0.25rem; display:flex; flex-direction:column; gap:0.4rem;">
                  ${inProgressChapters.length > 0 ? inProgressChapters.map(item => `
                    <div style="background:var(--bg-app); padding:0.5rem; border-radius:4px; border:1px solid var(--border-color);">
                      <div style="display:flex; justify-content:space-between; font-weight:600; margin-bottom:0.25rem;">
                        <span>Ch ${item.ch.num}: ${escapeHTML(item.ch.title)}</span>
                        <span>${item.pct}%</span>
                      </div>
                      <ul style="padding-left:1rem; color:var(--text-muted); list-style-type:square; font-size:0.7rem;">
                        ${item.sections.map(s => {
                          let badgeCol = "var(--text-light)";
                          if (s.status === "Fully Ready") badgeCol = "var(--color-success)";
                          else if (s.status === "Revised") badgeCol = "var(--color-warning)";
                          else if (s.status === "Studied") badgeCol = "var(--primary)";
                          else if (s.status === "Initial Pass") badgeCol = "var(--accent)";
                          
                          return `<li>${s.num} ${escapeHTML(s.title)} — <strong style="color:${badgeCol};">${s.status}</strong></li>`;
                        }).join("")}
                      </ul>
                    </div>
                  `).join("") : `<span style="color:var(--text-muted); padding-left:0.5rem;">None yet</span>`}
                </div>
              </div>
            </div>
          </div>
        `;
      });

      body.innerHTML = html;
      modal.classList.remove("hidden");

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    hideParentReportModal: function () {
      const modal = document.getElementById("modal-parent-report");
      if (modal) modal.classList.add("hidden");
    },

    // Notifications bell
    initNotifications: function () {
      const bell = document.getElementById("notification-bell");
      const dropdown = document.getElementById("notification-dropdown");
      if (!bell || !dropdown) return;

      bell.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("hidden");
        this.renderNotifications();
      };

      document.addEventListener("click", () => {
        dropdown.classList.add("hidden");
      });

      this.updateNotificationBadge();
    },

    updateNotificationBadge: function () {
      const badge = document.querySelector(".bell-badge");
      if (!badge) return;

      const notifs = window.StudyPilotDB.getNotifications();
      const unreadCount = notifs.filter(n => !n.read).length;

      if (unreadCount > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    },

    renderNotifications: function () {
      const list = document.getElementById("notification-list");
      if (!list) return;

      const notifs = window.StudyPilotDB.getNotifications();

      if (notifs.length === 0) {
        list.innerHTML = '<div class="notification-empty">No new notifications.</div>';
        return;
      }

      list.innerHTML = notifs.map(n => {
        let icon = n.type === "exam" ? "alert-circle" : "bell";
        return `
          <div class="notification-item" onclick="window.StudyPilotApp.readNotification('${n.id}')">
            <i data-lucide="${icon}"></i>
            <div>${escapeHTML(n.message)}</div>
          </div>
        `;
      }).join("");

      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    readNotification: function (id) {
      const notifs = window.StudyPilotDB.getNotifications();
      const n = notifs.find(item => item.id === id);
      if (n) {
        n.read = true;
        window.StudyPilotDB.saveNotifications(notifs);
        this.updateNotificationBadge();
        this.renderNotifications();
      }
    },

    clearNotifications: function (e) {
      e.stopPropagation();
      window.StudyPilotDB.saveNotifications([]);
      this.updateNotificationBadge();
      this.renderNotifications();
    },

    initGlobalSearch: function () {
      const searchInput = document.getElementById("global-search");
      if (!searchInput) return;

      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length > 2) {
          if (query.includes("acid") || query.includes("change") || query.includes("electric") || query.includes("expression") || query.includes("kirchhoff")) {
            this.switchScreen("tutor");
            window.StudyPilotTutor.askQuestion(query);
            searchInput.value = "";
          }
        }
      });
    },

    resetApp: function () {
      if (confirm("This will clear all your tasks, notes, calendar events, and profile data. Are you sure?")) {
        window.StudyPilotDB.clearAll();
        window.location.reload();
      }
    },

    // School Gmail Sync removed
    syncGmailSchoolEmails: function () {
      console.log("School Gmail sync features have been removed.");
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.StudyPilotApp.init();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
