/* ======================================================== */
/* StudyPilot Overdue Reminder Service                      */
/* ======================================================== */

(function () {
  const STORAGE_SNOOZE_UNTIL = "studypilot_alarm_snooze_until";
  const STORAGE_LAST_DIGEST = "studypilot_alarm_last_digest";
  const STORAGE_LAST_ALERT = "studypilot_alarm_last_alert";
  const CHECK_INTERVAL_MS = 30000;
  const SNOOZE_MINUTES = 10;

  const state = {
    initialized: false,
    scanTimer: null,
    audioContext: null,
    beepTimer: null,
    stopTimer: null,
    overlayBound: false,
    snoozeUntil: 0,
    lastDigest: "",
    audioUnlocked: false,
  };

  function parseIsoDate(value) {
    if (!value) return null;
    const match = String(value).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const date = new Date(year, month, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function todayAtMidnight() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function parseTimeToMinutes(timeValue, fallback) {
    const raw = String(timeValue || fallback || "18:00");
    const match = raw.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return 18 * 60;
    return Number(match[1]) * 60 + Number(match[2]);
  }

  function minutesNow() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function getProfile() {
    return window.StudyPilotDB && typeof window.StudyPilotDB.getProfile === "function"
      ? window.StudyPilotDB.getProfile()
      : null;
  }

  function getTasks() {
    return window.StudyPilotDB && typeof window.StudyPilotDB.getTasks === "function"
      ? window.StudyPilotDB.getTasks()
      : [];
  }

  function getExams() {
    return window.StudyPilotDB && typeof window.StudyPilotDB.getExams === "function"
      ? window.StudyPilotDB.getExams()
      : [];
  }

  function formatDateLabel(dateValue) {
    const date = parseIsoDate(dateValue);
    if (!date) return "soon";
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildReminderFeed() {
    const profile = getProfile();
    const reminderTime = parseTimeToMinutes(profile && profile.reminder_time ? profile.reminder_time : "18:00", "18:00");
    const now = new Date();
    const nowMinutesValue = minutesNow();
    const today = todayAtMidnight();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const inThreeDays = new Date(today);
    inThreeDays.setDate(inThreeDays.getDate() + 3);

    const items = [];

    getTasks().forEach(task => {
      const dueDate = parseIsoDate(task && task.date);
      if (!dueDate || task.completed) return;

      const dueAtOrBeforeToday = dueDate.getTime() < today.getTime() || (dueDate.getTime() === today.getTime() && nowMinutesValue >= reminderTime);
      const dueTomorrow = dueDate.getTime() === tomorrow.getTime();
      const dueSoon = dueDate.getTime() > tomorrow.getTime() && dueDate.getTime() <= inThreeDays.getTime();

      if (dueAtOrBeforeToday) {
        items.push({
          severity: "urgent",
          type: "task",
          title: task.title || "Untitled task",
          message: `Overdue task: ${task.title || "Untitled task"}.`,
          badge: "Due now",
          dateLabel: formatDateLabel(task.date),
          sourceId: task.id,
        });
      } else if (dueTomorrow) {
        items.push({
          severity: "soon",
          type: "task",
          title: task.title || "Untitled task",
          message: `Due tomorrow: ${task.title || "Untitled task"}.`,
          badge: "Tomorrow",
          dateLabel: formatDateLabel(task.date),
          sourceId: task.id,
        });
      } else if (dueSoon) {
        items.push({
          severity: "info",
          type: "task",
          title: task.title || "Untitled task",
          message: `Coming up soon: ${task.title || "Untitled task"}.`,
          badge: "Soon",
          dateLabel: formatDateLabel(task.date),
          sourceId: task.id,
        });
      }
    });

    getExams().forEach(exam => {
      const examDate = parseIsoDate(exam && exam.date);
      if (!examDate) return;

      const daysAway = Math.round((examDate.getTime() - today.getTime()) / 86400000);
      if (daysAway < 0) return;

      if (daysAway === 0) {
        items.push({
          severity: "urgent",
          type: "exam",
          title: exam.subject || "Exam",
          message: `Exam today: ${exam.topic || exam.subject || "Assessment"}.`,
          badge: "Today",
          dateLabel: formatDateLabel(exam.date),
          sourceId: exam.id,
        });
      } else if (daysAway === 1) {
        items.push({
          severity: "soon",
          type: "exam",
          title: exam.subject || "Exam",
          message: `Exam tomorrow: ${exam.topic || exam.subject || "Assessment"}.`,
          badge: "Tomorrow",
          dateLabel: formatDateLabel(exam.date),
          sourceId: exam.id,
        });
      } else if (daysAway <= 3) {
        items.push({
          severity: "info",
          type: "exam",
          title: exam.subject || "Exam",
          message: `Exam in ${daysAway} days: ${exam.topic || exam.subject || "Assessment"}.`,
          badge: `${daysAway} days`,
          dateLabel: formatDateLabel(exam.date),
          sourceId: exam.id,
        });
      }
    });

    items.sort((a, b) => {
      const rank = { urgent: 0, soon: 1, info: 2 };
      return rank[a.severity] - rank[b.severity];
    });

    return items;
  }

  function renderReminderPanel(items) {
    const container = document.getElementById("dashboard-reminders");
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '<div class="upcoming-empty">No urgent reminders right now. Keep going!</div>';
      return;
    }

    container.innerHTML = items.slice(0, 4).map(item => `
      <div class="upcoming-item ${item.severity === "urgent" ? "urgent" : ""}">
        <div class="upcoming-info">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.message)}</p>
        </div>
        <span class="upcoming-days badge ${item.severity === "urgent" ? "badge-red" : item.severity === "soon" ? "badge-indigo" : "badge-accent"}">${escapeHTML(item.badge)}</span>
      </div>
    `).join("");
  }

  function getAlarmDigest(items) {
    return items
      .filter(item => item.severity === "urgent")
      .map(item => `${item.type}:${item.sourceId}:${item.badge}`)
      .join("|");
  }

  function ensureOverlay() {
    const overlay = document.getElementById("overdue-alarm-overlay");
    const stopBtn = document.getElementById("alarm-stop-btn");
    const snoozeBtn = document.getElementById("alarm-snooze-btn");

    if (!state.overlayBound) {
      state.overlayBound = true;
      if (stopBtn) {
        stopBtn.addEventListener("click", () => stopAlarm(true));
      }
      if (snoozeBtn) {
        snoozeBtn.addEventListener("click", () => snoozeAlarm());
      }
    }

    return overlay;
  }

  function unlockAudio() {
    if (state.audioUnlocked) return;
    state.audioUnlocked = true;
    try {
      if (!state.audioContext) {
        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (state.audioContext && state.audioContext.state === "suspended") {
        state.audioContext.resume();
      }
    } catch {
      // Audio is optional; the visual overlay still works.
    }
  }

  function playTone(frequency, durationMs) {
    if (!state.audioContext) return;
    const oscillator = state.audioContext.createOscillator();
    const gain = state.audioContext.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.45;
    oscillator.connect(gain);
    gain.connect(state.audioContext.destination);
    oscillator.start();
    oscillator.stop(state.audioContext.currentTime + durationMs / 1000);
  }

  function startAlarmSound() {
    stopAlarmSound();
    unlockAudio();

    if (!state.audioContext) return;

    const pattern = [1200, 0, 900, 0, 1200, 0, 700, 0];
    let index = 0;

    state.beepTimer = window.setInterval(() => {
      const frequency = pattern[index % pattern.length];
      if (frequency > 0) {
        playTone(frequency, 250);
      }
      index += 1;
    }, 280);
  }

  function stopAlarmSound() {
    if (state.beepTimer) {
      clearInterval(state.beepTimer);
      state.beepTimer = null;
    }
    if (state.stopTimer) {
      clearTimeout(state.stopTimer);
      state.stopTimer = null;
    }
  }

  function showAlarm(items) {
    const urgentItems = items.filter(item => item.severity === "urgent");
    if (!urgentItems.length) return;

    const digest = getAlarmDigest(items);
    const now = Date.now();
    const snoozeUntil = Number(localStorage.getItem(STORAGE_SNOOZE_UNTIL) || "0");
    if (now < snoozeUntil) return;

    const lastDigest = localStorage.getItem(STORAGE_LAST_DIGEST) || "";
    const lastAlert = Number(localStorage.getItem(STORAGE_LAST_ALERT) || "0");
    if (digest && digest === lastDigest && now - lastAlert < 10 * 60 * 1000) return;

    localStorage.setItem(STORAGE_LAST_DIGEST, digest);
    localStorage.setItem(STORAGE_LAST_ALERT, String(now));

    const overlay = ensureOverlay();
    if (!overlay) return;

    const title = document.getElementById("alarm-title");
    const message = document.getElementById("alarm-message");
    if (title) {
      title.textContent = urgentItems.length > 1 ? "Multiple tasks are overdue" : "Task overdue";
    }
    if (message) {
      const topItems = urgentItems.slice(0, 3).map(item => item.message).join(" ");
      message.textContent = topItems || "You have something due right now.";
    }

    overlay.classList.remove("hidden");
    document.body.classList.add("alarm-active");
    startAlarmSound();

    state.stopTimer = window.setTimeout(() => {
      stopAlarm(false);
    }, 12000);

    if (window.StudyPilotDB && typeof window.StudyPilotDB.addNotification === "function") {
      window.StudyPilotDB.addNotification(
        urgentItems.map(item => item.message).join(" "),
        "alarm"
      );
    }
  }

  function stopAlarm(keepDigest) {
    stopAlarmSound();
    const overlay = document.getElementById("overdue-alarm-overlay");
    if (overlay) overlay.classList.add("hidden");
    document.body.classList.remove("alarm-active");
    if (!keepDigest) {
      localStorage.removeItem(STORAGE_LAST_DIGEST);
    }
  }

  function snoozeAlarm() {
    const snoozeUntil = Date.now() + SNOOZE_MINUTES * 60 * 1000;
    localStorage.setItem(STORAGE_SNOOZE_UNTIL, String(snoozeUntil));
    stopAlarm(true);
    if (window.StudyPilotDB && typeof window.StudyPilotDB.addNotification === "function") {
      window.StudyPilotDB.addNotification(`Alarm snoozed for ${SNOOZE_MINUTES} minutes.`, "info");
    }
  }

  function scan() {
    const items = buildReminderFeed();
    renderReminderPanel(items);
    showAlarm(items);
  }

  function init() {
    if (state.initialized) return;
    state.initialized = true;

    state.snoozeUntil = Number(localStorage.getItem(STORAGE_SNOOZE_UNTIL) || "0");
    state.lastDigest = localStorage.getItem(STORAGE_LAST_DIGEST) || "";

    document.addEventListener("pointerdown", unlockAudio, { passive: true });
    document.addEventListener("keydown", unlockAudio, { passive: true });

    window.addEventListener("studypilot_data_updated", () => scan());
    window.addEventListener("studypilot_profile_updated", () => scan());

    scan();
    state.scanTimer = window.setInterval(scan, CHECK_INTERVAL_MS);
  }

  window.StudyPilotReminderService = {
    init,
    scan,
    stopAlarm,
    snoozeAlarm,
    renderReminderPanel,
    buildReminderFeed,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(), { once: true });
  } else {
    init();
  }
})();
