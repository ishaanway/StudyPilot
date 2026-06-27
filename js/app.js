/* ======================================================== */
/* StudyPilot Main Application Coordinator & Routing JS     */
/* ======================================================== */

(function () {
  function trimApiBase(value) {
    return String(value || "").trim().replace(/\/+$/, "");
  }

  function readConfiguredApiBase() {
    const globalBase = trimApiBase(window.STUDYPILOT_API_BASE);
    if (globalBase) return globalBase;

    const meta = document.querySelector('meta[name="studypilot-api-base"]');
    if (meta) {
      const metaBase = trimApiBase(meta.getAttribute("content"));
      if (metaBase) return metaBase;
    }

    try {
      const params = new URL(window.location.href).searchParams;
      const queryBase = trimApiBase(params.get("api") || params.get("studypilotApiBase"));
      if (queryBase) return queryBase;
    } catch {
      // Ignore malformed URLs and fall back to the default resolver.
    }

    return "";
  }

  window.StudyPilotApi = window.StudyPilotApi || {
    getBaseUrl: function () {
      const configuredBase = readConfiguredApiBase();
      if (configuredBase) return configuredBase;

      if (window.location && window.location.protocol === "file:") {
        return "http://127.0.0.1:5000";
      }

      if (
        window.location &&
        ["localhost", "127.0.0.1", "::1", "0.0.0.0"].includes(window.location.hostname)
      ) {
        return window.location.origin;
      }

      return "http://127.0.0.1:5000";
    },

    getDisplayLabel: function (baseUrl) {
      const resolved = trimApiBase(baseUrl || this.getBaseUrl());
      if (!resolved) return "the local backend";

      try {
        const parsed = new URL(resolved);
        if (["localhost", "127.0.0.1", "::1", "0.0.0.0"].includes(parsed.hostname)) {
          return `${parsed.hostname}${parsed.port ? `:${parsed.port}` : ""}`;
        }
        return parsed.host || resolved;
      } catch {
        return resolved;
      }
    },

    checkHealth: async function (baseUrl, timeoutMs = 2500) {
      const resolvedBaseUrl = trimApiBase(baseUrl || this.getBaseUrl());
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(`${resolvedBaseUrl}/api/health`, {
          method: "GET",
          mode: "cors",
          signal: controller.signal,
        });
        if (!response.ok) {
          return { ok: false, status: response.status };
        }
        const data = await response.json().catch(() => ({}));
        return { ok: true, status: response.status, data };
      } catch (error) {
        return {
          ok: false,
          error: error && error.name === "AbortError" ? "timeout" : "unreachable",
        };
      } finally {
        clearTimeout(timer);
      }
    },
  };

  window.StudyPilotApp = {
    activeScreen: "dashboard",
    currentTheme: "light",
    themePickerBound: false,
    navigationBound: false,
    authStateBound: false,
    profileListenerBound: false,

    init: function () {
      this.loadTheme();
      this.initThemePicker();
      this.initThemeToggle();
      this.initNotifications();
      this.initGlobalSearch();
      this.bindAuthStateListener();

      if (window.StudyPilotReminderService && typeof window.StudyPilotReminderService.init === "function") {
        window.StudyPilotReminderService.init();
      }

      window.addEventListener("studypilot_notification", () => {
        this.updateNotificationBadge();
      });

      if (!this.checkAuthentication()) {
        return;
      }

      this.initNavigation();
      this.bindProfileListener();
      this.checkOnboarding();
      this.loadUserProfile();
    },

    bindAuthStateListener: function () {
      if (this.authStateBound) return;
      this.authStateBound = true;

      window.addEventListener("studypilot_auth_changed", () => {
        if (this.checkAuthentication()) {
          this.afterAuthSuccess();
        } else {
          this.showAuthModal();
        }
      });
    },

    checkAuthentication: function () {
      const isAuthed = window.StudyPilotAuth && typeof window.StudyPilotAuth.isAuthenticated === "function"
        ? window.StudyPilotAuth.isAuthenticated()
        : true;

      const authModal = document.getElementById("auth-wizard");
      const setupWizard = document.getElementById("setup-wizard");

      if (!isAuthed) {
        if (authModal) authModal.classList.remove("hidden");
        if (setupWizard) setupWizard.classList.add("hidden");
        document.body.classList.add("auth-locked");
        return false;
      }

      if (authModal) authModal.classList.add("hidden");
      document.body.classList.remove("auth-locked");
      return true;
    },

    showAuthModal: function () {
      const authModal = document.getElementById("auth-wizard");
      const setupWizard = document.getElementById("setup-wizard");
      if (authModal) authModal.classList.remove("hidden");
      if (setupWizard) setupWizard.classList.add("hidden");
      document.body.classList.add("auth-locked");
    },

    afterAuthSuccess: function () {
      this.checkAuthentication();
      this.initNavigation();
      this.bindProfileListener();
      this.checkOnboarding();
      this.loadUserProfile();
      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    bindProfileListener: function () {
      if (this.profileListenerBound) return;
      this.profileListenerBound = true;

      window.addEventListener("studypilot_profile_updated", () => {
        this.loadUserProfile();
      });
    },

    checkOnboarding: function () {
      if (!window.StudyPilotAuth || !window.StudyPilotAuth.isAuthenticated || !window.StudyPilotAuth.isAuthenticated()) {
        return;
      }

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
      if (!profile || !profile.setupComplete) return;

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
      const dreamBadge = document.getElementById("profile-dream-badge");
      if (dreamBadge) {
        dreamBadge.innerText = profile.dreamCareer ? `Dream: ${profile.dreamCareer}` : "Dream: Not set";
      }

      // Populate profile edit form values
      document.getElementById("profile-edit-name").value = profile.name;
      document.getElementById("profile-edit-grade").value = profile.grade;
      document.getElementById("profile-edit-board").value = profile.board;
      document.getElementById("profile-edit-goal").value = profile.goal;
      const dreamInput = document.getElementById("profile-edit-dream-career");
      if (dreamInput) {
        dreamInput.value = profile.dreamCareer || "";
      }
      this.setProfileListField("profile-edit-favorite-subjects", profile.favoriteSubjects);
      this.setProfileListField("profile-edit-weak-subjects", profile.weakSubjects);
      this.setProfileListField("profile-edit-interests", profile.interests);
      this.setProfileListField("profile-edit-hobbies", profile.hobbies);
      this.setProfileListField("profile-edit-learning-goals", profile.learningGoals);

      // Set today's date label using the user's local date.
      document.getElementById("dashboard-date").innerText = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },

    // Navigation (Sidebar and Mobile Navigation)
    initNavigation: function () {
      if (this.navigationBound) return;
      this.navigationBound = true;

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
      } else if (screenId === "books") {
        window.StudyPilotBooks.init();
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
      if (!window.StudyPilotAuth || !window.StudyPilotAuth.isAuthenticated || !window.StudyPilotAuth.isAuthenticated()) {
        alert("Please log in first.");
        return;
      }

      const name = document.getElementById("profile-edit-name").value.trim();
      const grade = document.getElementById("profile-edit-grade").value;
      const board = document.getElementById("profile-edit-board").value;
      const goal = document.getElementById("profile-edit-goal").value;
      const dreamCareerInput = document.getElementById("profile-edit-dream-career");
      const dreamCareer = dreamCareerInput ? dreamCareerInput.value.trim() : "";
      const favoriteSubjects = this.parseProfileListField("profile-edit-favorite-subjects");
      const weakSubjects = this.parseProfileListField("profile-edit-weak-subjects");
      const interests = this.parseProfileListField("profile-edit-interests");
      const hobbies = this.parseProfileListField("profile-edit-hobbies");
      const learningGoals = this.parseProfileListField("profile-edit-learning-goals");

      if (!name) {
        alert("Name cannot be blank!");
        return;
      }

      const profile = window.StudyPilotDB.getProfile();
      profile.name = name;
      profile.grade = grade;
      profile.board = board;
      profile.goal = goal;
      profile.dreamCareer = dreamCareer;
      profile.favoriteSubjects = favoriteSubjects;
      profile.weakSubjects = weakSubjects;
      profile.interests = interests;
      profile.hobbies = hobbies;
      profile.learningGoals = learningGoals;

      window.StudyPilotDB.saveProfile(profile);
      if (window.StudyPilotDB && typeof window.StudyPilotDB.getAuth === "function" && typeof window.StudyPilotDB.saveAuth === "function") {
        const auth = window.StudyPilotDB.getAuth();
        if (auth && auth.user) {
          auth.user.name = name;
          window.StudyPilotDB.saveAuth(auth);
        }
      }
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

  window.StudyPilotApp.parseProfileListField = function (id) {
    const el = document.getElementById(id);
    if (!el) return [];
    return String(el.value || "")
      .split(/[,;\n]/)
      .map(item => item.trim())
      .filter(Boolean);
  };

  window.StudyPilotApp.setProfileListField = function (id, values) {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = Array.isArray(values) ? values.join(", ") : "";
  };
})();
