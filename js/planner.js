/* ======================================================== */
/* StudyPilot Academic Calendar Planner View JS             */
/* ======================================================== */

(function () {
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
  const DEMO_WEEK_START = new Date("2026-06-22T00:00:00");
  const PLANNER_CHAPTER_FALLBACKS = [
    { id: "ss_ch1", grade: 7, subject: "Social Science", chapter_number: 1, title: "Sources of Medieval India", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch1.pdf", downloaded: true },
    { id: "ss_ch2", grade: 7, subject: "Social Science", chapter_number: 2, title: "Emergence of New Kingdoms in North India", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch2.pdf", downloaded: true },
    { id: "ss_ch3", grade: 7, subject: "Social Science", chapter_number: 3, title: "Later Cholas and Pandyas", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch3.pdf", downloaded: true },
    { id: "ss_ch4", grade: 7, subject: "Social Science", chapter_number: 4, title: "The Delhi Sultanate", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch4.pdf", downloaded: true },
    { id: "ss_ch5", grade: 7, subject: "Social Science", chapter_number: 5, title: "Interior of the Earth", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch5.pdf", downloaded: true },
    { id: "ss_ch6", grade: 7, subject: "Social Science", chapter_number: 6, title: "Landforms", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch6.pdf", downloaded: true },
    { id: "ss_ch7", grade: 7, subject: "Social Science", chapter_number: 7, title: "Equality", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch7.pdf", downloaded: true },
    { id: "ss_ch8", grade: 7, subject: "Social Science", chapter_number: 8, title: "Political Parties", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch8.pdf", downloaded: true },
    { id: "ss_ch9", grade: 7, subject: "Social Science", chapter_number: 9, title: "Production", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/ss_ch9.pdf", downloaded: true },
    { id: "en_u1", grade: 7, subject: "English", chapter_number: 1, title: "Unit 1: Eidgah / The Computer Swallowed Grandma", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/en_u1.pdf", downloaded: true },
    { id: "en_u2", grade: 7, subject: "English", chapter_number: 2, title: "Unit 2: The Wind on Haunted Hill / The Listeners", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/en_u2.pdf", downloaded: true },
    { id: "en_u3", grade: 7, subject: "English", chapter_number: 3, title: "Unit 3: A Prayer for the Killer", pdf_url: "https://textbookcorp.in/textbook/schools/books", local_url: "/assets/books/ncert/planner_chapters/en_u3.pdf", downloaded: true },

  ];

  // Mapping status to percentage weights
  function getStatusWeight(status) {
    if (status === "Initial Pass") return 25;
    if (status === "Studied") return 50;
    if (status === "Revised") return 75;
    if (status === "Fully Ready") return 100;
    return 0; // Not Started
  }

  function addDays(source, days) {
    const copy = new Date(source.getTime());
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function formatDateIso(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatWeekRange(startDate) {
    const endDate = addDays(startDate, 6);
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = startDate.toLocaleString("en-US", { month: "long" });
    const endMonth = endDate.toLocaleString("en-US", { month: "long" });
    const year = endDate.getFullYear();
    if (startMonth === endMonth) {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
  }

  window.StudyPilotPlanner = {
    selectedSubject: "",
    currentWeekOffset: 0,
    chapterPdfCatalog: {},
    activeChapterId: "",
    activeChapterMeta: null,
    prefetchPromise: null,
    pdfZoomScale: 1.0,
    isExtendedView: false,

    toggleExtendPdfView: function () {
      this.isExtendedView = !this.isExtendedView;
      const gridEl = document.getElementById("planner-reading-grid");
      const panelEl = document.getElementById("planner-pdf-panel");
      const btnEl = document.getElementById("btn-extend-pdf");

      if (gridEl && panelEl) {
        if (this.isExtendedView) {
          gridEl.classList.add("is-extended");
          panelEl.classList.add("is-extended");
          if (btnEl) {
            btnEl.innerHTML = '<i data-lucide="minimize-2"></i> Normal View';
            btnEl.classList.replace("btn-secondary", "btn-accent");
          }
        } else {
          gridEl.classList.remove("is-extended");
          panelEl.classList.remove("is-extended");
          if (btnEl) {
            btnEl.innerHTML = '<i data-lucide="maximize-2"></i> Extend View';
            btnEl.classList.replace("btn-accent", "btn-secondary");
          }
        }
        if (window.lucide && typeof window.lucide.createIcons === "function") {
          window.lucide.createIcons();
        }
      }
    },

    zoomPdf: function (delta) {
      this.pdfZoomScale = Math.max(0.6, Math.min(2.5, this.pdfZoomScale + delta));
      const frameEl = document.getElementById("planner-pdf-frame");
      const labelEl = document.getElementById("pdf-zoom-level");
      if (frameEl) {
        frameEl.style.transform = `scale(${this.pdfZoomScale})`;
      }
      if (labelEl) {
        labelEl.innerText = `${Math.round(this.pdfZoomScale * 100)}%`;
      }
    },

    resetPdfZoom: function () {
      this.pdfZoomScale = 1.0;
      const frameEl = document.getElementById("planner-pdf-frame");
      const labelEl = document.getElementById("pdf-zoom-level");
      if (frameEl) {
        frameEl.style.transform = "scale(1)";
      }
      if (labelEl) {
        labelEl.innerText = "100%";
      }
    },

    init: function () {
      this.initSubjectsTabs();
      this.renderSyllabusExplorer();
      this.renderTextbookProgress();
      this.renderGrid();
      this.renderChapterWorkspace();
      void this.prefetchChapterPdfs();
      
      // Sync on lesson updates
      window.removeEventListener("studypilot_lesson_update", this.syncLessonHandler);
      this.syncLessonHandler = () => {
        this.renderSyllabusExplorer();
        this.renderTextbookProgress();
        this.renderChapterWorkspace();
      };
      window.addEventListener("studypilot_lesson_update", this.syncLessonHandler);
    },

    getApiBaseUrl: function () {
      return window.getStudyPilotApiBaseUrl();
    },

    getChapterById: function (chapterId, subjectOverride) {
      const profile = window.StudyPilotDB.getProfile();
      const curriculum = window.StudyPilotDB.getCurriculum(profile.grade, profile.stream);
      const subjects = subjectOverride ? [subjectOverride] : Object.keys(curriculum.chapters || {});

      for (const subjectName of subjects) {
        const chapters = curriculum.chapters[subjectName] || [];
        const match = chapters.find(ch => ch.id === chapterId);
        if (match) {
          return {
            subject: subjectName,
            chapter: match
          };
        }
      }

      const resource = this.chapterPdfCatalog[chapterId];
      const fallbackResource = PLANNER_CHAPTER_FALLBACKS.find(item => item.id === chapterId);
      const catalogResource = resource || fallbackResource;
      if (catalogResource) {
        return {
          subject: catalogResource.subject || subjectOverride || "",
          chapter: {
            id: chapterId,
            num: Number(catalogResource.chapter_number || 1) || 1,
            title: catalogResource.title || `Chapter ${catalogResource.chapter_number || 1}`,
            desc: catalogResource.title
              ? `Open ${catalogResource.title} in the planner workspace.`
              : "Open the downloaded chapter PDF in the planner workspace.",
            sections: [],
          }
        };
      }
      return null;
    },

    getWorkspaceEntry: function (chapterId) {
      return window.StudyPilotDB.getChapterWorkspaceEntry(chapterId);
    },

    getCatalogChaptersForSubject: function (subject, grade) {
      const subjectName = String(subject || "").trim();
      const gradeNumber = Number(grade) || 7;
      const liveItems = Object.values(this.chapterPdfCatalog || {})
        .filter(item => item && Number(item.grade) === gradeNumber && String(item.subject || "").trim() === subjectName)
        .sort((a, b) => Number(a.chapter_number || 0) - Number(b.chapter_number || 0));
      const fallbackItems = PLANNER_CHAPTER_FALLBACKS
        .filter(item => Number(item.grade) === gradeNumber && String(item.subject || "").trim() === subjectName)
        .sort((a, b) => Number(a.chapter_number || 0) - Number(b.chapter_number || 0))
        .map(item => ({
          id: item.id,
          num: Number(item.chapter_number || 0) || 1,
          title: item.title || `Chapter ${item.chapter_number || 1}`,
          desc: item.title ? `Open ${item.title} in the study workspace.` : "Open the downloaded chapter PDF in the study workspace.",
          sections: [],
        }));

      const source = liveItems.length > 0 ? liveItems : fallbackItems;
      return source.map(item => ({
        id: item.id,
        num: Number(item.chapter_number || item.num || 1) || 1,
        title: item.title || `Chapter ${item.chapter_number || item.num || 1}`,
        desc: item.title ? `Open ${item.title} in the study workspace.` : "Open the downloaded chapter PDF in the study workspace.",
        sections: [],
      }));
    },

    prefetchChapterPdfs: function (force) {
      if (this.prefetchPromise && !force) return this.prefetchPromise;

      const profile = window.StudyPilotDB.getProfile();
      const subjects = Array.isArray(profile.subjects)
        ? profile.subjects.filter(subject => ["Science", "Mathematics", "Social Science", "English"].includes(subject))
        : [];

      const request = fetch(`${this.getApiBaseUrl()}/api/planner/chapter-pdfs/prefetch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          grade: profile.grade,
          subjects: subjects
        })
      })
        .then(async res => {
          if (!res.ok) throw new Error("Unable to cache planner chapter PDFs.");
          return res.json();
        })
        .then(data => {
          const items = Array.isArray(data && data.items) ? data.items : [];
          this.chapterPdfCatalog = {};
          items.forEach(item => {
            if (item && item.id) {
              this.chapterPdfCatalog[item.id] = item;
            }
          });
          this.renderChapterWorkspace();
          this.renderSyllabusExplorer();
        })
        .catch(err => {
          console.warn("[StudyPilotPlanner] Failed to prefetch chapter PDFs:", err);
        });

      this.prefetchPromise = request.finally(() => {
        this.prefetchPromise = null;
      });
      return this.prefetchPromise;
    },

    // 1. Render Subject tabs
    initSubjectsTabs: function () {
      const tabsContainer = document.querySelector(".syllabus-subject-tabs");
      if (!tabsContainer) return;

      const profile = window.StudyPilotDB.getProfile();
      const subjects = Array.isArray(profile.subjects) ? [...profile.subjects] : [];

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
      const displayChapters = chapters.length > 0
        ? chapters
        : this.getCatalogChaptersForSubject(this.selectedSubject, profile.grade);

      if (displayChapters.length === 0) {
        container.innerHTML = `<div class="timeline-empty">No preloaded syllabus for ${escapeHTML(this.selectedSubject)}. You can add custom calendar study blocks!</div>`;
        return;
      }

      const progress = window.StudyPilotDB.getLessonProgress();
      const usingFallbackCatalog = chapters.length === 0;

      const chapterHtml = displayChapters.map(ch => {
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

              <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                <button class="btn btn-primary btn-xs" style="flex:1 1 180px;" onclick="window.StudyPilotPlanner.openChapterWorkspace('${ch.id}', '${escapeHTML(this.selectedSubject)}')">
                  <i data-lucide="book-open"></i> Read Chapter
                </button>
                <button class="btn btn-secondary btn-xs" style="flex:1 1 180px;" onclick="window.StudyPilotPlanner.openChapterWorkspace('${ch.id}', '${escapeHTML(this.selectedSubject)}'); window.StudyPilotPlanner.summarizeActiveChapter();">
                  <i data-lucide="sparkles"></i> AI Tutor Summary
                </button>
                <button class="btn btn-outline btn-xs" style="flex:1 1 180px;" onclick="window.StudyPilotPlanner.quickScheduleRevision('${escapeHTML(this.selectedSubject)}', ${ch.num}, '${escapeHTML(ch.title)}')">
                  <i data-lucide="calendar-plus"></i> Schedule Revision
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");

      container.innerHTML = usingFallbackCatalog
        ? `<div class="timeline-empty" style="margin-bottom:0.75rem;">Showing the downloaded chapter PDFs for ${escapeHTML(this.selectedSubject)}.</div>${chapterHtml}`
        : chapterHtml;

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

    openChapterWorkspace: function (chapterId, subjectOverride) {
      const resolved = this.getChapterById(chapterId, subjectOverride);
      if (!resolved) return;

      this.activeChapterId = chapterId;
      this.activeChapterMeta = resolved;
      this.selectedSubject = resolved.subject;
      this.initSubjectsTabs();
      this.renderSyllabusExplorer();
      this.renderTextbookProgress();
      this.renderChapterWorkspace();
      void this.prefetchChapterPdfs();
    },

    renderChapterWorkspace: function () {
      const emptyEl = document.getElementById("planner-reading-empty");
      const shellEl = document.getElementById("planner-reading-shell");
      const titleEl = document.getElementById("planner-reading-title");
      const subjectEl = document.getElementById("planner-reading-subject");
      const statusEl = document.getElementById("planner-reading-status");
      const badgeEl = document.getElementById("planner-pdf-badge");
      const frameEl = document.getElementById("planner-pdf-frame");
      const editorEl = document.getElementById("planner-answer-editor");
      const summaryEl = document.getElementById("planner-summary-box");

      if (!emptyEl || !shellEl || !titleEl || !subjectEl || !statusEl || !badgeEl || !frameEl || !editorEl || !summaryEl) return;

      if (!this.activeChapterMeta || !this.activeChapterId) {
        emptyEl.classList.remove("hidden");
        shellEl.classList.add("hidden");
        frameEl.src = "about:blank";
        return;
      }

      const chapter = this.activeChapterMeta.chapter;
      const subject = this.activeChapterMeta.subject;
      const resource = this.chapterPdfCatalog[this.activeChapterId] || null;
      const fallbackResource = resource || PLANNER_CHAPTER_FALLBACKS.find(item => item.id === this.activeChapterId) || null;
      const workspace = this.getWorkspaceEntry(this.activeChapterId);

      // Detect if this is a Google Drive hosted book
      const gdrivePdfUrl = fallbackResource && fallbackResource.pdf_url && fallbackResource.pdf_url.includes("drive.google.com")
        ? fallbackResource.pdf_url
        : null;

      // Convert Google Drive /file/d/ID/view to /file/d/ID/preview for embedding
      let gdriveEmbedUrl = null;
      if (gdrivePdfUrl) {
        const idMatch = gdrivePdfUrl.match(/\/d\/([A-Za-z0-9_-]+)/);
        if (idMatch) {
          gdriveEmbedUrl = `https://drive.google.com/file/d/${idMatch[1]}/preview`;
        }
      }

      const isDownloaded = !!((resource && resource.downloaded && resource.local_url) || (fallbackResource && fallbackResource.local_url));
      const isGoogleDrive = !!gdriveEmbedUrl;

      emptyEl.classList.add("hidden");
      shellEl.classList.remove("hidden");

      subjectEl.innerText = subject;
      titleEl.innerText = `Ch ${chapter.num}: ${chapter.title}`;

      if (isGoogleDrive) {
        statusEl.innerHTML = `Samacheer Kalvi textbook from <strong>tntextbooks.in</strong>. Read the chapter below, then use the AI Tutor or write your answer draft.`;
        badgeEl.innerText = "Samacheer Kalvi";
        badgeEl.style.background = "var(--accent, #f59e0b)";
        badgeEl.style.color = "#fff";
      } else {
        statusEl.innerText = isDownloaded
          ? "Downloaded locally. Read the chapter, ask the AI Tutor for a quick summary, and write your own answer draft beside it."
          : "Preparing the matching chapter PDF. If the cache is still warming up, the viewer will open as soon as the file is ready.";
        badgeEl.innerText = isDownloaded ? "Cached locally" : "Syncing PDF";
        badgeEl.style.background = "";
        badgeEl.style.color = "";
      }
      editorEl.value = workspace.answerDraft || "";

      if (workspace.summaryHtml) {
        summaryEl.innerHTML = workspace.summaryHtml;
      } else {
        summaryEl.innerHTML = "<p>Select <strong>AI Tutor Summary</strong> to generate a quick revision-friendly explanation from the PDF.</p>";
      }

      // Determine what to show in the iframe
      let nextSrc;
      if (isGoogleDrive) {
        // Use Google Drive embed URL for Samacheer Kalvi books
        nextSrc = gdriveEmbedUrl;
      } else if (resource && resource.local_url) {
        nextSrc = `${this.getApiBaseUrl()}${resource.local_url}`;
      } else if (fallbackResource && fallbackResource.local_url) {
        nextSrc = `${this.getApiBaseUrl()}${fallbackResource.local_url}`;
      } else {
        nextSrc = "about:blank";
      }

      if (frameEl.src !== nextSrc) {
        frameEl.src = nextSrc;
      }
    },


    buildSummaryHtml: function (chapterTitle, payload) {
      const summary = escapeHTML(payload.summary || "");
      const points = Array.isArray(payload.key_points) ? payload.key_points : [];
      const memoryHook = escapeHTML(payload.memory_hook || "");
      const revisionTip = escapeHTML(payload.revision_tip || "");

      return `
        <div>
          <span class="badge badge-accent">AI Tutor</span>
          <p><strong>${escapeHTML(chapterTitle)}</strong></p>
        </div>
        <p>${summary || "No summary was returned."}</p>
        ${points.length ? `<ul>${points.map(point => `<li>${escapeHTML(point)}</li>`).join("")}</ul>` : ""}
        ${memoryHook ? `<p><strong>Memory hook:</strong> ${memoryHook}</p>` : ""}
        ${revisionTip ? `<p><strong>Revision tip:</strong> ${revisionTip}</p>` : ""}
      `;
    },

    summarizeActiveChapter: async function () {
      if (!this.activeChapterMeta || !this.activeChapterId) {
        alert("Open a chapter first so the AI Tutor knows what to summarize.");
        return;
      }

      const summaryEl = document.getElementById("planner-summary-box");
      if (summaryEl) {
        summaryEl.innerHTML = "<p>AI Tutor is reading the chapter PDF and building a quick revision summary...</p>";
      }

      const profile = window.StudyPilotDB.getProfile();
      const chapter = this.activeChapterMeta.chapter;
      const subject = this.activeChapterMeta.subject;

      try {
        const response = await fetch(`${this.getApiBaseUrl()}/api/planner/chapter-summary`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chapter_id: this.activeChapterId,
            chapter_title: chapter.title,
            grade: profile.grade,
            subject: subject,
            profile: profile
          })
        });

        if (!response.ok) {
          throw new Error("Unable to summarize chapter PDF.");
        }

        const data = await response.json();
        const result = data && data.data ? data.data : {};
        const item = data && data.item ? data.item : {};
        const summaryHtml = this.buildSummaryHtml(chapter.title, result);
        window.StudyPilotDB.saveChapterWorkspaceEntry(this.activeChapterId, {
          summaryHtml: summaryHtml,
          summaryData: result,
          sourceItem: item
        });

        if (item && item.id) {
          this.chapterPdfCatalog[item.id] = item;
        }

        this.renderChapterWorkspace();

        if (window.StudyPilotTutor && typeof window.StudyPilotTutor.capturePlannerSummary === "function") {
          window.StudyPilotTutor.capturePlannerSummary({
            chapterId: this.activeChapterId,
            chapterTitle: chapter.title,
            subject: subject,
            summaryHtml: summaryHtml,
            summaryData: result
          });
        }
      } catch (error) {
        console.error("[StudyPilotPlanner] Summary error:", error);
        if (summaryEl) {
          summaryEl.innerHTML = "<p>The AI Tutor could not summarize this chapter right now. The PDF is still available for reading, and you can try again in a moment.</p>";
        }
      }
    },

    openWorkspaceSource: function () {
      if (!this.activeChapterId) return;
      const resource = this.chapterPdfCatalog[this.activeChapterId];
      if (!resource) return;
      const target = resource.local_url
        ? `${this.getApiBaseUrl()}${resource.local_url}`
        : resource.pdf_url;
      if (target) {
        window.open(target, "_blank", "noopener,noreferrer");
      }
    },

    saveChapterDraft: function () {
      if (!this.activeChapterId) return;
      const editorEl = document.getElementById("planner-answer-editor");
      if (!editorEl) return;

      window.StudyPilotDB.saveChapterWorkspaceEntry(this.activeChapterId, {
        answerDraft: editorEl.value
      });
      window.StudyPilotDB.addNotification("Chapter answer draft saved.", "success");
    },

    sendSummaryToTutor: function () {
      if (!this.activeChapterId || !this.activeChapterMeta) {
        alert("Open a chapter first.");
        return;
      }

      const workspace = this.getWorkspaceEntry(this.activeChapterId);
      if (!workspace.summaryHtml && window.StudyPilotTutor && typeof window.StudyPilotTutor.showPlannerChapterSummary === "function") {
        this.summarizeActiveChapter().then(() => this.sendSummaryToTutor());
        return;
      }

      if (window.StudyPilotApp) {
        window.StudyPilotApp.switchScreen("tutor");
      }

      if (window.StudyPilotTutor && typeof window.StudyPilotTutor.showPlannerChapterSummary === "function") {
        window.StudyPilotTutor.showPlannerChapterSummary({
          chapterId: this.activeChapterId,
          chapterTitle: this.activeChapterMeta.chapter.title,
          subject: this.activeChapterMeta.subject,
          summaryHtml: workspace.summaryHtml || "",
          summaryData: workspace.summaryData || {}
        });
      }
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

    getCurrentWeekDates: function () {
      const weekStart = addDays(DEMO_WEEK_START, this.currentWeekOffset * 7);
      return DAYS.map((day, index) => {
        const dateObj = addDays(weekStart, index);
        return {
          day: day,
          dateObj: dateObj,
          iso: formatDateIso(dateObj),
          dayNumber: dateObj.getDate()
        };
      });
    },

    updateWeekRangeLabel: function () {
      const rangeEl = document.getElementById("calendar-week-range");
      if (!rangeEl) return;
      const weekStart = addDays(DEMO_WEEK_START, this.currentWeekOffset * 7);
      rangeEl.innerText = formatWeekRange(weekStart);
    },

    // 4. Calendar week navigation
    navigateWeek: function (dir) {
      this.currentWeekOffset += dir;
      this.updateWeekRangeLabel();
      this.renderGrid();
    },

    renderGrid: function () {
      const grid = document.getElementById("weekly-calendar-grid");
      if (!grid) return;

      grid.innerHTML = "";
      const weekDates = this.getCurrentWeekDates();
      const weekIndex = {};
      weekDates.forEach((item, index) => {
        weekIndex[item.iso] = index + 2;
      });

      let headerHTML = `<div class="cal-time-label" style="grid-row: 1; grid-column: 1;"></div>`;
      weekDates.forEach((item, index) => {
        let isActive = item.iso === "2026-06-22" && this.currentWeekOffset === 0;
        headerHTML += `
          <div class="cal-grid-header ${isActive ? 'active' : ''}" style="grid-row: 1; grid-column: ${index + 2};">
            ${item.day.substring(0, 3)} <span>${item.dayNumber}</span>
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
        let colIndex = -1;
        if (e.date && weekIndex[e.date]) {
          colIndex = weekIndex[e.date];
        } else if (!e.date) {
          colIndex = DAYS.indexOf(e.day) + 2;
        }
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
      const weekDates = this.getCurrentWeekDates();
      const mondayDate = (weekDates.find(item => item.day === "Monday") || {}).iso || "";
      const tuesdayDate = (weekDates.find(item => item.day === "Tuesday") || {}).iso || "";
      
      const hasMon19 = events.some(e => e.day === "Monday" && e.start === "19:00");
      const hasTue16 = events.some(e => e.day === "Tuesday" && e.start === "16:00");

      let added = 0;
      if (!hasMon19) {
        window.StudyPilotDB.addCalendarEvent("AI Block: Arithmetic Expressions Ch 2", "Monday", "study", "19:00", "20:00", mondayDate, "Mathematics");
        added++;
      }
      if (!hasTue16) {
        window.StudyPilotDB.addCalendarEvent("AI Block: Science Electricity circuits Ch 3", "Tuesday", "study", "16:00", "17:30", tuesdayDate, "Science");
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

    openCalendarModal: function () {
      const modal = document.getElementById("calendar-modal");
      if (modal) {
        modal.classList.remove("hidden");
        this.updateWeekRangeLabel();
        this.renderGrid();
      }
    },

    closeCalendarModal: function () {
      const modal = document.getElementById("calendar-modal");
      if (modal) modal.classList.add("hidden");
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

      const weekDate = this.getCurrentWeekDates().find(item => item.day === day);
      window.StudyPilotDB.addCalendarEvent(title, day, type, start, end, weekDate ? weekDate.iso : "", "Planner");
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
