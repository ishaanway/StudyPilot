import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "assets", "books", "ncert");
const plannerOutputDir = path.join(outputDir, "planner_chapters");
const manifestPath = path.join(outputDir, "library.json");

const BOOKS = [
  // Grade 6
  {
    id: "g6_math",
    title: "Ganita Prakash",
    grade: 6,
    subject: "Mathematics",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/fegp1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?fegp1=0-10",
    localPdfFile: "grade6-mathematics-ganita-prakash.pdf",
  },
  {
    id: "g6_science",
    title: "Curiosity",
    grade: 6,
    subject: "Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/fesc1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?fesc1=0-12",
    localPdfFile: "grade6-science-curiosity.pdf",
  },
  {
    id: "g6_social",
    title: "Exploring Society: India and Beyond",
    grade: 6,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/fess1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?fess1=0-14",
    localPdfFile: "grade6-social-science.pdf",
  },
  {
    id: "g6_english",
    title: "Poorvi",
    grade: 6,
    subject: "English",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/fepr1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?fepr1=0-5",
    localPdfFile: "grade6-english-poorvi.pdf",
  },

  // Grade 7
  {
    id: "g7_science",
    title: "Curiosity",
    grade: 7,
    subject: "Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gecu1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gecu1=0-12",
    localPdfFile: "grade7-science-curiosity.pdf",
  },
  {
    id: "g7_math",
    title: "Mathematics",
    grade: 7,
    subject: "Mathematics",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gemh1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gemh1=0-15",
    localPdfFile: "grade7-mathematics.pdf",
  },
  {
    id: "g7_social_p1",
    title: "Exploring Society: India and Beyond Part 1",
    grade: 7,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gees1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gees1=0-12",
    localPdfFile: "grade7-social-science-part1.pdf",
  },
  {
    id: "g7_social_p2",
    title: "Exploring Society: India and Beyond Part 2",
    grade: 7,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gees2ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gees2=0-8",
    localPdfFile: "grade7-social-science-part2.pdf",
  },
  {
    id: "g7_english",
    title: "Poorvi",
    grade: 7,
    subject: "English",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gepr1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gepr1=0-11",
    localPdfFile: "grade7-english-poorvi.pdf",
  },

  // Grade 8
  {
    id: "g8_math",
    title: "Mathematics",
    grade: 8,
    subject: "Mathematics",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/hemh1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?hemh1=0-13",
    localPdfFile: "grade8-mathematics.pdf",
  },
  {
    id: "g8_science",
    title: "Science",
    grade: 8,
    subject: "Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/hesc1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?hesc1=0-13",
    localPdfFile: "grade8-science.pdf",
  },
  {
    id: "g8_english",
    title: "Honeydew",
    grade: 8,
    subject: "English",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/hehd1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?hehd1=0-10",
    localPdfFile: "grade8-english-honeydew.pdf",
  },
  {
    id: "g8_social",
    title: "Social Science",
    grade: 8,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/hess1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?hess1=0-10",
    localPdfFile: "grade8-social-science.pdf",
  },

  // Grade 9
  {
    id: "g9_math",
    title: "Mathematics",
    grade: 9,
    subject: "Mathematics",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/iemh1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?iemh1=0-12",
    localPdfFile: "grade9-mathematics.pdf",
  },
  {
    id: "g9_science",
    title: "Science",
    grade: 9,
    subject: "Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/iesc1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?iesc1=0-12",
    localPdfFile: "grade9-science.pdf",
  },
  {
    id: "g9_english",
    title: "Beehive",
    grade: 9,
    subject: "English",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/iebe1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?iebe1=0-11",
    localPdfFile: "grade9-english-beehive.pdf",
  },
  {
    id: "g9_social",
    title: "Social Science",
    grade: 9,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/iess1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?iess1=0-6",
    localPdfFile: "grade9-social-science.pdf",
  },

  // Grade 10
  {
    id: "g10_math",
    title: "Mathematics",
    grade: 10,
    subject: "Mathematics",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/jemh1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?jemh1=0-14",
    localPdfFile: "grade10-mathematics.pdf",
  },
  {
    id: "g10_science",
    title: "Science",
    grade: 10,
    subject: "Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/jesc1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?jesc1=1-16",
    localPdfFile: "grade10-science.pdf",
  },
  {
    id: "g10_english",
    title: "First Flight",
    grade: 10,
    subject: "English",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/jeff1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?jeff1=0-11",
    localPdfFile: "grade10-english-first-flight.pdf",
  },
  {
    id: "g10_social",
    title: "Social Science",
    grade: 10,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/jess1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?jess1=0-5",
    localPdfFile: "grade10-social-science.pdf",
  },
];

async function downloadFile(url, outputPath) {
  const attempts = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      console.log(`Downloading ${url} -> ${outputPath} (Attempt ${attempt})...`);
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 500) {
        throw new Error(`Downloaded file too small (${buffer.length} bytes), likely error response`);
      }
      await fs.writeFile(outputPath, buffer);
      console.log(`Successfully saved ${outputPath} (${buffer.length} bytes)`);
      return;
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt < attempts) {
        await new Promise(resolve => setTimeout(resolve, 1500 * attempt));
      }
    }
  }

  throw lastError;
}

// Generate a valid minimal PDF fallback if remote NCERT download is unreachable
function createFallbackPdfContent(title, grade, subject) {
  const pdfText = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kinds [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /Resources <</Font <</F1 4 0 R>>>> /MediaBox [0 0 612 792] /Contents 5 0 R>> endobj
4 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
5 0 obj <</Length 200>> stream
BT
/F1 24 Tf
50 700 Td
(NCERT Grade ${grade} ${subject}) Tj
0 -40 Td
/F1 16 Tf
(${title} - Official Textbook) Tj
0 -30 Td
/F1 12 Tf
(StudyPilot Offline Library PDF) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000114 00000 n
0000000244 00000 n
0000000313 00000 n
trailer <</Size 6 /Root 1 0 R>>
startxref
560
%%EOF`;
  return Buffer.from(pdfText);
}

async function pathExists(targetPath) {
  try {
    const stat = await fs.stat(targetPath);
    return stat.size > 1000;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(plannerOutputDir, { recursive: true });

  const manifest = [];
  for (const book of BOOKS) {
    const localPdfUrl = `/assets/books/ncert/${book.localPdfFile}`;
    const outputPath = path.join(outputDir, book.localPdfFile);
    if (!(await pathExists(outputPath))) {
      try {
        await downloadFile(book.officialPdfUrl, outputPath);
      } catch (err) {
        console.warn(`Failed to download ${book.officialPdfUrl}, creating standalone offline PDF fallback...`);
        const fallbackPdf = createFallbackPdfContent(book.title, book.grade, book.subject);
        await fs.writeFile(outputPath, fallbackPdf);
      }
    }
    manifest.push({
      id: book.id,
      title: book.title,
      grade: book.grade,
      subject: book.subject,
      localPdfUrl,
      officialPdfUrl: book.officialPdfUrl,
      officialPageUrl: book.officialPageUrl,
      localPdfFile: book.localPdfFile,
    });
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Wrote local NCERT manifest to ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
