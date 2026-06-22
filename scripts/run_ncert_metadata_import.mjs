import { runImport } from './import_ncert_syllabus.mjs';

const gradeFilter = process.env.GRADE_FILTER
  ? new Set(
      process.env.GRADE_FILTER.split(',')
        .map(value => Number(value.trim()))
        .filter(Number.isFinite)
    )
  : null;

const downloadPdfs = String(process.env.DOWNLOAD_PDFS || 'false').toLowerCase() === 'true';
const append = String(process.env.APPEND || 'false').toLowerCase() === 'true';

await runImport({ gradeFilter, downloadPdfs, append });
