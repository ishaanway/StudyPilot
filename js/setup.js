/* ======================================================== */
/* StudyPilot Onboarding Wizard Handlers                    */
/* ======================================================== */

(function () {
  window.StudyPilotSetup = {
    currentStep: 1,

    init: function () {
      // Setup range badge synchronization
      const rangeEl = document.getElementById("setup-hours");
      const badgeEl = document.getElementById("setupHoursVal");
      if (rangeEl && badgeEl) {
        rangeEl.addEventListener("input", (e) => {
          badgeEl.innerText = `${e.target.value} hrs`;
        });
      }
      
      // Load default subjects initially for Grade 7
      this.populateSubjectsList("7", "Science");
    },

    handleGradeChange: function (grade) {
      const streamGroup = document.getElementById("setup-stream-group");
      if (!streamGroup) return;

      if (grade === "11" || grade === "12") {
        streamGroup.classList.remove("hidden");
      } else {
        streamGroup.classList.add("hidden");
      }
      
      // Re-populate subjects selection step based on selected grade
      const stream = document.getElementById("setup-stream").value;
      this.populateSubjectsList(grade, stream);
    },

    populateSubjectsList: function (grade, stream) {
      const grid = document.getElementById("setup-subjects-grid");
      if (!grid) return;

      const curriculum = window.StudyPilotDB.getCurriculum(grade, stream);
      const subjects = curriculum.subjects;

      grid.innerHTML = subjects.map((sub) => {
        const checked = "checked";
        return `
          <label class="subject-chip ${checked ? 'checked' : ''}">
            <input type="checkbox" value="${escapeHTML(sub)}" ${checked}> ${escapeHTML(sub)}
          </label>
        `;
      }).join("");

      // Re-add click listener on newly created subject chips
      const chips = grid.querySelectorAll(".subject-chip");
      chips.forEach(chip => {
        const checkbox = chip.querySelector('input[type="checkbox"]');
        chip.addEventListener("click", (e) => {
          if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
          }
          if (checkbox.checked) {
            chip.classList.add("checked");
          } else {
            chip.classList.remove("checked");
          }
        });
      });
    },

    nextStep: function (stepNum) {
      // Validate current step before advancing
      if (stepNum === 2 && this.currentStep === 1) {
        const nameVal = document.getElementById("setup-name").value.trim();
        if (!nameVal) {
          alert("Please enter your name to proceed.");
          return;
        }
      }

      // Hide active step
      document.getElementById(`setup-step-${this.currentStep}`).classList.add("hidden");
      
      // Show next step
      document.getElementById(`setup-step-${stepNum}`).classList.remove("hidden");
      this.currentStep = stepNum;
      
      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    completeSetup: function () {
      const name = document.getElementById("setup-name").value.trim();
      const grade = document.getElementById("setup-grade").value;
      const stream = (grade === "11" || grade === "12") ? document.getElementById("setup-stream").value : "Science";
      const board = document.getElementById("setup-board").value;
      
      // Gather selected subjects
      const subjects = [];
      const checkboxes = document.querySelectorAll('#setup-subjects-grid input[type="checkbox"]:checked');
      checkboxes.forEach(cb => {
        subjects.push(cb.value);
      });
      
      if (subjects.length === 0) {
        alert("Please select at least one subject to study!");
        return;
      }

      const dailyHours = parseFloat(document.getElementById("setup-hours").value);
      const goalRadio = document.querySelector('input[name="setup-goal"]:checked');
      const goal = goalRadio ? goalRadio.value : "Improve overall grades";

      // Save to Database
      const profile = window.StudyPilotDB.getProfile();
      profile.name = name;
      profile.grade = grade;
      profile.stream = stream;
      profile.board = board;
      profile.subjects = subjects;
      profile.dailyHours = dailyHours;
      profile.goal = goal;
      profile.setupComplete = true;
      profile.streak = 1;
      profile.lastActive = "2026-06-22";

      window.StudyPilotDB.saveProfile(profile);

      // Hide wizard
      document.getElementById("setup-wizard").classList.add("hidden");

      // Notify user
      window.StudyPilotDB.addNotification(`Welcome to StudyPilot, ${name}! Your Grade ${grade === 'prekg' ? 'Pre-KG' : grade} workspace is configured.`, "info");

      // Refresh parent app view
      if (window.StudyPilotApp) {
        window.StudyPilotApp.loadUserProfile();
        window.StudyPilotApp.switchScreen("dashboard");
      }
    }
  };

  // Run init when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    window.StudyPilotSetup.init();
  });

  function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
