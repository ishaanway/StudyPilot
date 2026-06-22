/* ======================================================== */
/* StudyPilot Local Sign Up / Log In                        */
/* ======================================================== */

(function () {
  window.StudyPilotAuth = {
    mode: "signup",
    bound: false,

    init: function () {
      this.bind();
      this.refresh();
    },

    bind: function () {
      if (this.bound) return;
      this.bound = true;

      const signUpTab = document.getElementById("auth-tab-signup");
      const loginTab = document.getElementById("auth-tab-login");
      const signUpForm = document.getElementById("auth-panel-signup");
      const loginForm = document.getElementById("auth-panel-login");
      const closeBtn = document.getElementById("auth-modal-close");

      if (signUpTab) {
        signUpTab.addEventListener("click", () => this.setMode("signup"));
      }
      if (loginTab) {
        loginTab.addEventListener("click", () => this.setMode("login"));
      }
      if (closeBtn) {
        closeBtn.addEventListener("click", () => this.keepLocked());
      }
      if (signUpForm) {
        signUpForm.addEventListener("submit", (event) => {
          event.preventDefault();
          this.handleSignUp();
        });
      }
      if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
          event.preventDefault();
          this.handleLogin();
        });
      }

      window.addEventListener("studypilot_auth_changed", () => {
        this.refresh();
      });
    },

    isAuthenticated: function () {
      return !!(window.StudyPilotDB && typeof window.StudyPilotDB.isAuthenticated === "function" && window.StudyPilotDB.isAuthenticated());
    },

    setMode: function (mode) {
      this.mode = mode === "login" ? "login" : "signup";
      this.refresh();
    },

    refresh: function () {
      const modal = document.getElementById("auth-wizard");
      const signupPanel = document.getElementById("auth-panel-signup");
      const loginPanel = document.getElementById("auth-panel-login");
      const signupTab = document.getElementById("auth-tab-signup");
      const loginTab = document.getElementById("auth-tab-login");

      if (!modal || !signupPanel || !loginPanel || !signupTab || !loginTab) return;

      const locked = !this.isAuthenticated();
      modal.classList.toggle("hidden", !locked);

      signupPanel.classList.toggle("hidden", this.mode !== "signup");
      loginPanel.classList.toggle("hidden", this.mode !== "login");
      signupTab.classList.toggle("active", this.mode === "signup");
      loginTab.classList.toggle("active", this.mode === "login");

      document.body.classList.toggle("auth-locked", locked);
      if (window.lucide) window.lucide.createIcons();
    },

    keepLocked: function () {
      this.refresh();
    },

    handleSignUp: async function () {
      const status = document.getElementById("auth-signup-status");
      const name = document.getElementById("auth-signup-name").value.trim();
      const email = document.getElementById("auth-signup-email").value.trim();
      const password = document.getElementById("auth-signup-password").value;
      const confirmPassword = document.getElementById("auth-signup-confirm").value;

      if (!name || !email || !password) {
        this.showStatus(status, "Please fill in all sign-up fields.", true);
        return;
      }

      if (password !== confirmPassword) {
        this.showStatus(status, "Passwords do not match.", true);
        return;
      }

      try {
        await window.StudyPilotDB.signUp({ name, email, password });
        this.showStatus(status, "Account created. Welcome to StudyPilot!", false);
        this.resetForms();
        this.finishAuthFlow();
      } catch (error) {
        this.showStatus(status, error.message || "Sign up failed.", true);
      }
    },

    handleLogin: async function () {
      const status = document.getElementById("auth-login-status");
      const email = document.getElementById("auth-login-email").value.trim();
      const password = document.getElementById("auth-login-password").value;

      if (!email || !password) {
        this.showStatus(status, "Please enter your email and password.", true);
        return;
      }

      try {
        await window.StudyPilotDB.signIn({ email, password });
        this.showStatus(status, "Welcome back! Loading your workspace...", false);
        this.resetForms();
        this.finishAuthFlow();
      } catch (error) {
        this.showStatus(status, error.message || "Login failed.", true);
      }
    },

    signOut: function () {
      if (window.StudyPilotDB && typeof window.StudyPilotDB.signOut === "function") {
        window.StudyPilotDB.signOut();
      }
      this.mode = "login";
      this.refresh();
      if (window.StudyPilotApp && typeof window.StudyPilotApp.showAuthModal === "function") {
        window.StudyPilotApp.showAuthModal();
      }
    },

    finishAuthFlow: function () {
      this.refresh();
    },

    resetForms: function () {
      const signupForm = document.getElementById("auth-panel-signup");
      const loginForm = document.getElementById("auth-panel-login");
      const signupStatus = document.getElementById("auth-signup-status");
      const loginStatus = document.getElementById("auth-login-status");
      if (signupForm) signupForm.reset();
      if (loginForm) loginForm.reset();
      if (signupStatus) signupStatus.innerText = "";
      if (loginStatus) loginStatus.innerText = "";
    },

    showStatus: function (el, message, isError) {
      if (!el) return;
      el.innerText = message;
      el.classList.toggle("text-error", !!isError);
      el.classList.toggle("text-success", !isError);
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.StudyPilotAuth.init(), { once: true });
  } else {
    window.StudyPilotAuth.init();
  }
})();
