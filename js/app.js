/* ======================================================== */
/* StudyPilot Main Application Coordinator & Routing JS     */
/* ======================================================== */

(function () {
  window.StudyPilotApp = {
    activeScreen: "dashboard",
    currentTheme: "light",
    themePickerBound: false,

    init: function () {
      this.loadTheme();
      this.initThemePicker();
      this.checkOnboarding();
      this.initNavigation();
      this.initThemeToggle();
      this.initNotifications();
      this.initGlobalSearch();
      if (window.StudyPilotReminderService && typeof window.StudyPilotReminderService.init === "function") {
        window.StudyPilotReminderService.init();
      }
      
      // Load user profile details initially
      this.loadUserProfile();

      window.addEventListener("studypilot_profile_updated", () => {
        this.loadUserProfile();
      });
      
      // Listen to database notification changes to redraw badge
      window.addEventListener("studypilot_notification", () => {
        this.updateNotificationBadge();
      });
    },

    checkOnboarding: function () {
      const profile = window.StudyPilotDB.getProfile();
      const setupWizard = document.getElementById("setup-wizard");
      
      if (!profile || !profile.setupComplete) {
        // Show onboarding wizard overlay
        setupWizard.classList.remove("hidden");
      } else {
        setupWizard.classList.add("hidden");
        // Initialize dashboard immediately
        window.StudyPilotDashboard.init();
      }
    },

    loadUserProfile: function () {
      const profile = window.StudyPilotDB.getProfile();
      if (!profile.setupComplete) return;

      // Update Dashboard Header greeting
      const greetEl = document.getElementById("dashboard-welcome");
      if (greetEl) {
        greetEl.innerText = `Hello, ${profile.name}!`;
      }

      // Update header avatar fallback initials
      const headerAvatar = document.getElementById("header-avatar");
      if (headerAvatar) {
        headerAvatar.innerText = profile.name.substring(0, 2).toUpperCase();
      }

      // Update Profile screen details
      const profAvatarLg = document.getElementById("profile-avatar-lg");
      if (profAvatarLg) {
        profAvatarLg.innerText = profile.name.substring(0, 2).toUpperCase();
      }
      
      document.getElementById("profile-fullname").innerText = profile.name;
      document.getElementById("profile-details").innerText = `Grade ${profile.grade} Student • ${profile.board} Board`;
      document.getElementById("profile-goal-badge").innerText = profile.goal;

      // Populate profile edit form values
      document.getElementById("profile-edit-name").value = profile.name;
      document.getElementById("profile-edit-grade").value = profile.grade;
      document.getElementById("profile-edit-board").value = profile.board;
      document.getElementById("profile-edit-goal").value = profile.goal;

      // Set today's date label (consistent demo date)
      document.getElementById("dashboard-date").innerText = "Monday, 22 June 2026";
    },

    // Navigation (Sidebar and Mobile Navigation)
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

      // Hide active screen viewport
      document.getElementById(`screen-${this.activeScreen}`).classList.add("hidden");
      
      // Show target screen viewport
      document.getElementById(`screen-${screenId}`).classList.remove("hidden");
      this.activeScreen = screenId;

      // Update active nav button indicators (sidebar and mobile bar)
      const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
      navItems.forEach(item => {
        if (item.getAttribute("data-screen") === screenId) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      // Trigger redraws for specific screen managers when visited
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

      // Re-run Lucide icons drawer
      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    // Light/Dark Theme Toggles
    initThemeToggle: function () {
      const btn = document.getElementById("theme-toggle-btn");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const menu = document.getElementById("theme-picker-menu");
        if (menu) {
          menu.classList.toggle("hidden");
        }
      });
    },

    initThemePicker: function () {
      if (this.themePickerBound) return;
      this.themePickerBound = true;

      document.addEventListener("click", (event) => {
        const wrap = document.querySelector(".theme-picker-wrap");
        const menu = document.getElementById("theme-picker-menu");
        if (!wrap || !menu) return;
        if (!wrap.contains(event.target)) {
          menu.classList.add("hidden");
        }
      });

      document.addEventListener("click", (event) => {
        const option = event.target.closest ? event.target.closest(".theme-option") : null;
        if (!option) return;
        const theme = option.getAttribute("data-theme");
        if (theme) {
          this.setTheme(theme);
          const menu = document.getElementById("theme-picker-menu");
          if (menu) menu.classList.add("hidden");
        }
      });
    },

    setTheme: function (theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute("data-theme", theme);
      
      // Update toggle button contents
      const sun = document.querySelector("#theme-toggle-btn .sun-icon");
      const moon = document.querySelector("#theme-toggle-btn .moon-icon");
      const text = document.querySelector("#theme-toggle-btn span");

      const themeLabels = {
        light: "Light Mode",
        dark: "Dark Mode",
        midnight: "Midnight",
        ocean: "Ocean",
        forest: "Forest",
        sunset: "Sunset",
        aurora: "Aurora",
      };

      const darkLikeThemes = new Set(["dark", "midnight"]);
      if (darkLikeThemes.has(theme)) {
        sun.classList.add("hidden");
        moon.classList.remove("hidden");
      } else {
        sun.classList.remove("hidden");
        moon.classList.add("hidden");
      }
      text.innerText = themeLabels[theme] || "Light Mode";

      document.querySelectorAll(".theme-option").forEach(option => {
        option.classList.toggle("active", option.getAttribute("data-theme") === theme);
      });
      
      localStorage.setItem("studypilot_theme", theme);
    },

    loadTheme: function () {
      const savedTheme = localStorage.getItem("studypilot_theme");
      const allowedThemes = new Set(["light", "dark", "midnight", "ocean", "forest", "sunset", "aurora"]);
      // Respect OS system preferences if no saved theme
      if (!savedTheme || !allowedThemes.has(savedTheme)) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.setTheme(prefersDark ? "dark" : "light");
      } else {
        this.setTheme(savedTheme);
      }
    },

    // Header Notification Bell dropdown
    initNotifications: function () {
      const bell = document.getElementById("notification-bell");
      const dropdown = document.getElementById("notification-dropdown");
      if (!bell || !dropdown) return;

      bell.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("hidden");
        this.renderNotifications();
      });

      // Close dropdown if user clicks elsewhere
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

    // Global Search filter
    initGlobalSearch: function () {
      const searchInput = document.getElementById("global-search");
      if (!searchInput) return;

      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length > 2) {
          // Quick search mock feedback overlay
          console.log(`Global search querying: ${query}`);
          // Redirecting query directly to tutor chat helper if it looks like a study question
          if (query.includes("acid") || query.includes("change") || query.includes("electric") || query.includes("expression")) {
            this.switchScreen("tutor");
            window.StudyPilotTutor.askQuestion(query);
            searchInput.value = "";
          }
        }
      });
    },

    // Profile updates
    saveProfileEdits: function () {
      const name = document.getElementById("profile-edit-name").value.trim();
      const grade = document.getElementById("profile-edit-grade").value;
      const board = document.getElementById("profile-edit-board").value;
      const goal = document.getElementById("profile-edit-goal").value;

      if (!name) {
        alert("Name cannot be blank!");
        return;
      }

      const profile = window.StudyPilotDB.getProfile();
      profile.name = name;
      profile.grade = grade;
      profile.board = board;
      profile.goal = goal;

      window.StudyPilotDB.saveProfile(profile);
      this.loadUserProfile();
      
      window.StudyPilotDB.addNotification("Profile settings updated successfully.", "success");
      alert("Settings saved successfully!");
    },

    // Wipe local storage
    resetApp: function () {
      if (confirm("This will clear all your tasks, notes, calendar events, and profile data. Are you sure?")) {
        window.StudyPilotDB.clearAll();
        // Reload page to re-trigger wizard onboarding
        window.location.reload();
      }
    }
  };

  // Run automatically when DOM loaded
  const bootApp = () => {
    window.StudyPilotApp.init();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootApp, { once: true });
  } else {
    bootApp();
  }

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
