/* ======================================================== */
/* StudyPilot Main Application Coordinator & Routing JS     */
/* ======================================================== */

(function () {
  window.StudyPilotApp = {
    activeScreen: "dashboard",
    currentTheme: "light",

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

      // Rerender progress when updates trigger
      window.addEventListener("studypilot_lesson_update", () => {
        if (this.activeScreen === "dashboard") {
          window.StudyPilotDashboard.init();
        }
      });
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

      // Handle profile stream box visibility
      this.handleProfileGradeChange(profile.grade);
      if (profile.grade === "11" || profile.grade === "12") {
        document.getElementById("profile-edit-stream").value = profile.stream || "Science";
      }

      // Populate API Key
      document.getElementById("profile-api-key").value = profile.geminiApiKey || "";

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
        window.StudyPilotPlanner.init();
      } else if (screenId === "tutor") {
        window.StudyPilotTutor.init();
      } else if (screenId === "toolbox") {
        window.StudyPilotToolbox.init();
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

      window.StudyPilotDB.saveProfile(profile);
      this.loadUserProfile();
      
      // Force reload other screens
      if (window.StudyPilotPlanner) window.StudyPilotPlanner.init();
      if (window.StudyPilotTutor) window.StudyPilotTutor.init();
      
      window.StudyPilotDB.addNotification("Profile settings updated successfully.", "success");
      alert("Settings saved successfully!");
    },

    saveApiKey: function () {
      const key = document.getElementById("profile-api-key").value.trim();
      const profile = window.StudyPilotDB.getProfile();
      profile.geminiApiKey = key;
      window.StudyPilotDB.saveProfile(profile);

      window.StudyPilotDB.addNotification("Gemini Live AI Key updated.", "success");
      alert("Gemini API Key saved! Live AI Tutor mode is now active.");
      
      if (window.StudyPilotTutor) {
        window.StudyPilotTutor.updateTutorWelcomeLabels();
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
