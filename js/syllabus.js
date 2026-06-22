/* ======================================================== */
/* Legacy StudyPilot syllabus shim                          */
/* The app now uses js/curriculum.js + backend syllabus API */
/* ======================================================== */

(function () {
  if (window.StudyPilotCurriculum && !window.CBSE7Syllabus) {
    window.CBSE7Syllabus = window.StudyPilotCurriculum;
  }
})();
