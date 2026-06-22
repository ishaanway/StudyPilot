import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'docs', 'syllabus_sources');
const outputManifest = path.join(outputDir, 'ncert_manifest.json');
const pdfDir = path.join(outputDir, 'pdfs');
const edgeExecutable = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const indexUrl = 'https://ncert.nic.in/textbook.php';
function cleanText(text) {
  return String(text || '').replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function parseGrade(label) {
  const valueMatch = String(label).match(/^\d{1,2}$/);
  if (valueMatch) return Number(valueMatch[0]);

  const romanMap = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    vii: 7,
    viii: 8,
    ix: 9,
    x: 10,
    xi: 11,
    xii: 12,
  };
  const romanMatch = String(label).toLowerCase().match(/\b(xii|xi|ix|viii|vii|vi|iv|iii|ii|i)\b/);
  return romanMatch ? romanMap[romanMatch[1]] : null;
}

async function waitForOptions(page, selector) {
  await page.waitForFunction(
    sel => {
      const options = [...document.querySelectorAll(`${sel} option`)];
      return options.some(option => {
        const text = (option.textContent || '').trim();
        return text && !text.startsWith('..Select');
      });
    },
    selector,
    { timeout: 5000 }
  );
}

function parseChapterRows(renderedHtml) {
  const rows = [];
  const regex = /<tr><td[^>]*><b><span class="sty1">([^<]+)<\/span><\/b><\/td><td align="right"><a href="textbook\.php\?([^"]+)">\((Open)\)<\/a><\/td><\/tr>/g;
  let match;
  while ((match = regex.exec(renderedHtml)) !== null) {
    rows.push({
      label: cleanText(match[1]),
      pageUrl: `https://ncert.nic.in/textbook.php?${match[2]}`,
    });
  }
  return rows;
}

function derivePdfUrlFromChapterUrl(chapterUrl) {
  try {
    const url = new URL(chapterUrl);
    const entries = [...url.searchParams.entries()];
    if (!entries.length) return '';
    const [bookId, chapterSpec] = entries[0];
    const chapterId = String(chapterSpec || '').split('-')[0];
    if (!bookId || !chapterId) return '';
    const suffix = /^\d+$/.test(chapterId) ? chapterId.padStart(2, '0') : chapterId;
    return `https://ncert.nic.in/textbook/pdf/${bookId}${suffix}.pdf`;
  } catch {
    return '';
  }
}

function deriveChaptersFromBookUrl(bookPageUrl, rawHtml) {
  const url = new URL(bookPageUrl);
  const entries = [...url.searchParams.entries()];
  if (!entries.length) return [];

  const [bookId, rangeSpec] = entries[0];
  const chapterCount = Number(String(rangeSpec || '').split('-')[1]);
  if (!bookId || !Number.isFinite(chapterCount) || chapterCount < 1) {
    return [];
  }

  const chapters = [];
  const hasPrelims = /Prelims/i.test(rawHtml) || /=ps-/i.test(rawHtml);
  const hasPersist = /Persist/i.test(rawHtml) || /=pr-/i.test(rawHtml);
  const hasErrata = /Errata/i.test(rawHtml) || /=er-/i.test(rawHtml);

  if (hasPersist) {
    const chapterUrl = `https://ncert.nic.in/textbook.php?${bookId}=pr-${chapterCount}`;
    chapters.push({
      label: 'Persist',
      pageUrl: chapterUrl,
      pdfUrl: derivePdfUrlFromChapterUrl(chapterUrl),
    });
  }

  if (hasErrata) {
    const chapterUrl = `https://ncert.nic.in/textbook.php?${bookId}=er-${chapterCount}`;
    chapters.push({
      label: 'Errata',
      pageUrl: chapterUrl,
      pdfUrl: derivePdfUrlFromChapterUrl(chapterUrl),
    });
  }

  if (hasPrelims) {
    const chapterUrl = `https://ncert.nic.in/textbook.php?${bookId}=ps-${chapterCount}`;
    chapters.push({
      label: 'Prelims',
      pageUrl: chapterUrl,
      pdfUrl: derivePdfUrlFromChapterUrl(chapterUrl),
    });
  }

  const specialKavita = bookId === 'jhsp1';
  for (let chapterNumber = 1; chapterNumber <= chapterCount; chapterNumber += 1) {
    const chapterUrl = `https://ncert.nic.in/textbook.php?${bookId}=${chapterNumber}-${chapterCount}`;
    chapters.push({
      label: specialKavita && chapterNumber <= 7 ? `Kavita ${chapterNumber}` : `Chapter ${chapterNumber}`,
      pageUrl: chapterUrl,
      pdfUrl: derivePdfUrlFromChapterUrl(chapterUrl),
    });
  }

  return chapters;
}

export async function runImport({ gradeFilter = null, downloadPdfs = true, append = false } = {}) {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(pdfDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: edgeExecutable,
  });

  const page = await browser.newPage();
  await page.goto(indexUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);

  const classes = await page.locator('select[name="tclass"] option').evaluateAll(opts =>
    opts.map(o => ({ value: o.value, label: o.textContent.trim() }))
  );

  const manifest = append
    ? JSON.parse(await fs.readFile(outputManifest, 'utf8').catch(() => '{"classes":[]}'))
    : {
        source: indexUrl,
        generated_at: new Date().toISOString(),
        classes: [],
      };

  manifest.source = manifest.source || indexUrl;
  manifest.generated_at = new Date().toISOString();
  manifest.classes = Array.isArray(manifest.classes) ? manifest.classes : [];

  for (const classOption of classes) {
    const grade = parseGrade(classOption.value) ?? parseGrade(classOption.label);
    if (!grade || grade < 1 || grade > 12) continue;
    if (gradeFilter && !gradeFilter.has(grade)) continue;

    console.log(`[NCERT] Grade ${grade} - ${cleanText(classOption.label)}`);
    await page.selectOption('select[name="tclass"]', classOption.value);
    await waitForOptions(page, 'select[name="tsubject"]');

    const subjects = await page.locator('select[name="tsubject"] option').evaluateAll(opts =>
      opts.map(o => ({ label: o.textContent.trim(), value: o.value })).filter(o => o.label && !o.label.startsWith('..Select'))
    );

    const subjectEntries = [];

    for (const subjectOption of subjects) {
      console.log(`  [NCERT] Subject ${cleanText(subjectOption.label)}`);
      await page.selectOption('select[name="tsubject"]', { label: subjectOption.label });
      await waitForOptions(page, 'select[name="tbook"]');

      const books = await page.locator('select[name="tbook"] option').evaluateAll(opts =>
        opts.map(o => ({ title: o.textContent.trim(), value: o.value })).filter(o => o.title && !o.title.startsWith('..Select'))
      );

      const bookEntries = [];
      for (const book of books) {
        const bookPageUrl = book.value.startsWith('http') ? book.value : `https://ncert.nic.in/${book.value}`;
        const bookResponse = await fetch(bookPageUrl, { redirect: 'follow' });
        const renderedHtml = await bookResponse.text();
        const chapters = deriveChaptersFromBookUrl(bookPageUrl, renderedHtml);
        const chapterEntries = [];

        for (const chapter of chapters) {
          const chapterPdfUrl = chapter.pdfUrl || derivePdfUrlFromChapterUrl(chapter.pageUrl);
          let pdfPath = '';
          if (chapterPdfUrl && downloadPdfs) {
            const safeName = [
              `grade_${grade}`,
              subjectOption.label,
              book.title,
              chapter.label,
            ]
              .map(part => cleanText(part).replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, ''))
              .filter(Boolean)
              .join('__');
            pdfPath = path.join(pdfDir, `${safeName}.pdf`);
            const response = await fetch(chapterPdfUrl);
            const buffer = Buffer.from(await response.arrayBuffer());
            await fs.writeFile(pdfPath, buffer);
          }
          chapterEntries.push({
            label: chapter.label,
            page_url: chapter.pageUrl,
            pdf_url: chapterPdfUrl,
            pdf_path: pdfPath,
          });
        }

        bookEntries.push({
          title: cleanText(book.title),
          page_url: bookPageUrl,
          chapters: chapterEntries,
        });
      }

      subjectEntries.push({
        subject: cleanText(subjectOption.label),
        books: bookEntries,
      });
    }

    manifest.classes.push({
      grade,
      label: cleanText(classOption.label),
      subjects: subjectEntries,
    });
  }

  await fs.writeFile(outputManifest, JSON.stringify(manifest, null, 2), 'utf8');
  await browser.close();
  console.log(`Wrote NCERT manifest to ${outputManifest}`);
}

if (typeof process !== 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  runImport().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
