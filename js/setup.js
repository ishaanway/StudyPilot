/* ======================================================== */
/* StudyPilot Onboarding Wizard Handlers                    */
/* ======================================================== */

(function () {
  function getLocalISODate(date = new Date()) {
    const local = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return local.toISOString().slice(0, 10);
  }

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

      // Add click listener on subject chips to toggle checked classes
      const chips = document.querySelectorAll(".subject-chip");
      chips.forEach(chip => {
        const checkbox = chip.querySelector('input[type="checkbox"]');
        chip.addEventListener("click", (e) => {
          // If they clicked the chip label itself, toggle checkbox
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
      
      // Trigger Lucide icons reload for arrows inside steps
      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    completeSetup: function () {
      const name = document.getElementById("setup-name").value.trim();
      const grade = document.getElementById("setup-grade").value;
      const board = document.getElementById("setup-board").value;
      
      // Gather selected subjects
      const subjects = [];
      const checkboxes = document.querySelectorAll('.subjects-grid input[type="checkbox"]:checked');
      checkboxes.forEach(cb => {
        subjects.push(cb.value);
      });
      
      if (subjects.length === 0) {
        alert("Please select at least one subject to study!");
        return;
      }

      const dailyHours = parseFloat(document.getElementById("setup-hours").value);
      
      // Gather selected goal
      const goalRadio = document.querySelector('input[name="setup-goal"]:checked');
      const goal = goalRadio ? goalRadio.value : "Improve overall grades";
      const dreamCareerInput = document.getElementById("setup-dream-career");
      const dreamCareer = dreamCareerInput ? dreamCareerInput.value.trim() : "";

      // Save to Database
      const profile = window.StudyPilotDB.getProfile();
      profile.name = name;
      profile.grade = grade;
      profile.board = board;
      profile.subjects = subjects;
      profile.dailyHours = dailyHours;
      profile.goal = goal;
      profile.dreamCareer = dreamCareer;
      profile.setupComplete = true;
      profile.streak = 1;
      profile.lastActive = getLocalISODate();

      window.StudyPilotDB.saveProfile(profile);

      // Hide wizard
      document.getElementById("setup-wizard").classList.add("hidden");

      // Notify user
      window.StudyPilotDB.addNotification(`Welcome to StudyPilot, ${name}! Your Grade ${grade} (${board}) space is ready.`, "info");

      // Refresh parent app view
      if (window.StudyPilotApp) {
        window.StudyPilotApp.loadUserProfile();
        window.StudyPilotApp.switchScreen("dashboard");
      }
    }
  };

  // Run init when DOM is loaded
  const bootSetup = () => {
    window.StudyPilotSetup.init();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootSetup, { once: true });
  } else {
    bootSetup();
  }
})();
