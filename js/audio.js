/* ======================================================== */
/* StudyPilot Web Audio API Sound Engine (100% Offline)      */
/* ======================================================== */

(function () {
  let audioCtx = null;
  let alarmInterval = null;
  let ambientSource = null;
  let ambientGain = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function unlockAudio() {
    getAudioContext();
  }

  // Auto-unlock audio context on user interaction
  ["click", "touchstart", "keydown"].forEach(evt => {
    document.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });

  window.StudyPilotAudio = {
    unlock: unlockAudio,

    // 1. UI Click Feedback Sound
    playClickSound: function () {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) {
        console.warn("Click sound error:", e);
      }
    },

    // 2. Timer Start & Completion Chimes
    playChime: function (type = "complete") {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const freqs = type === "start" ? [440, 554.37, 659.25] : [523.25, 659.25, 783.99, 1046.50];
        
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0, now + idx * 0.1);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.45);
        });
      } catch (e) {
        console.warn("Chime sound error:", e);
      }
    },

    // 3. Super Loud Overdue Task Alarm (Dual-Tone Alternating Siren)
    playLoudAlarm: function () {
      this.stopAlarm();
      const ctx = getAudioContext();
      if (!ctx) return;

      let highTone = true;
      const playSirenStep = () => {
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          const freq = highTone ? 987.77 : 783.99; // B5 / G5 loud alternating siren
          osc.frequency.setValueAtTime(freq, now);
          
          gain.gain.setValueAtTime(0.65, now); // Super loud volume
          gain.gain.exponentialRampToValueAtTime(0.05, now + 0.22);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.23);
          highTone = !highTone;
        } catch (e) {
          console.warn("Siren step error:", e);
        }
      };

      playSirenStep();
      alarmInterval = setInterval(playSirenStep, 250);
    },

    stopAlarm: function () {
      if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
      }
    },

    // 4. Synthesized Ambient Sounds (100% Offline)
    startAmbientSound: function (soundType = "lofi") {
      this.stopAmbientSound();
      const ctx = getAudioContext();
      if (!ctx) return;

      try {
        ambientGain = ctx.createGain();
        ambientGain.gain.setValueAtTime(0.15, ctx.currentTime);
        ambientGain.connect(ctx.destination);

        if (soundType === "rain") {
          // Synthesize rain white noise
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          noise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800, ctx.currentTime);

          noise.connect(filter);
          filter.connect(ambientGain);
          noise.start();
          ambientSource = noise;
        } else if (soundType === "lofi" || soundType === "focus") {
          // Synthesize warm Lofi binaural chord pulse
          const freqs = [220, 277.18, 329.63, 440];
          const nodes = [];
          freqs.forEach(f => {
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.setValueAtTime(f, ctx.currentTime);
            osc.connect(ambientGain);
            osc.start();
            nodes.push(osc);
          });
          ambientSource = {
            stop: () => nodes.forEach(n => n.stop())
          };
        }
      } catch (e) {
        console.warn("Ambient sound error:", e);
      }
    },

    stopAmbientSound: function () {
      if (ambientSource) {
        try {
          ambientSource.stop();
        } catch (e) {}
        ambientSource = null;
      }
      if (ambientGain) {
        ambientGain = null;
      }
    }
  };

})();
