/* ======================================================== */
/* Legacy StudyPilot syllabus shim                          */
/* The app now uses js/curriculum.js + backend syllabus API */
/* ======================================================== */

(function () {
  if (window.StudyPilotCurriculum && !window.StudyPilotSyllabus) {
    window.StudyPilotSyllabus = window.StudyPilotCurriculum;
  }
})();
