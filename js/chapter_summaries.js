/* StudyPilot NCERT Chapter Summaries Master Loader */
(function () {
  window.NCERT_ALL_SUMMARIES = window.NCERT_ALL_SUMMARIES || {};

  function merge() {
    var dest = window.StudyPilotCurriculum && window.StudyPilotCurriculum.NCERT_CHAPTER_SUMMARIES;
    if (!dest) return;
    var S = window.NCERT_ALL_SUMMARIES;
    Object.keys(S).forEach(function (g) {
      if (!dest[g]) dest[g] = {};
      Object.keys(S[g]).forEach(function (s) {
        dest[g][s] = S[g][s];
      });
    });
  }

  window._mergeNCERTSummaries = merge;
  merge();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", merge);
  } else {
    setTimeout(merge, 10);
  }

  var attempts = 0;
  var tid = setInterval(function () {
    attempts++;
    if (window.StudyPilotCurriculum && window.StudyPilotCurriculum.NCERT_CHAPTER_SUMMARIES) {
      merge();
      if (attempts > 5) clearInterval(tid);
    }
  }, 100);
})();
