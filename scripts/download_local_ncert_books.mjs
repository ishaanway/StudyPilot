import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "assets", "books", "ncert");
const plannerOutputDir = path.join(outputDir, "planner_chapters");
const manifestPath = path.join(outputDir, "library.json");

const BOOKS = [
  {
    title: "Ganita Prakash",
    grade: 6,
    subject: "Mathematics",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/fegp1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?fegp1=0-10",
    localPdfFile: "grade6-mathematics-ganita-prakash.pdf",
  },
  {
    title: "Curiosity",
    grade: 7,
    subject: "Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gecu1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gecu1=0-12",
    localPdfFile: "grade7-science-curiosity.pdf",
  },
  {
    title: "Science",
    grade: 10,
    subject: "Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/jesc1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?jesc1=1-16",
    localPdfFile: "grade10-science.pdf",
  },
  {
    title: "First Flight",
    grade: 10,
    subject: "English",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/jeff1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?jeff1=0-11",
    localPdfFile: "grade10-english-first-flight.pdf",
  },
];

const PLANNER_BOOKS = [
  {
    title: "Exploring Society: India and Beyond Part 1",
    grade: 7,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gees1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gees1=0-12",
    localPdfFile: "grade7-social-science-part1.pdf",
  },
  {
    title: "Exploring Society: India and Beyond Part 2",
    grade: 7,
    subject: "Social Science",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gees2ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gees2=0-8",
    localPdfFile: "grade7-social-science-part2.pdf",
  },
  {
    title: "Poorvi",
    grade: 7,
    subject: "English",
    officialPdfUrl: "https://ncert.nic.in/textbook/pdf/gepr1ps.pdf",
    officialPageUrl: "https://ncert.nic.in/textbook.php?gepr1=0-11",
    localPdfFile: "grade7-english-poorvi.pdf",
  },
  {
    title: "Tamil Book Part I",
    grade: 7,
    subject: "Tamil",
    officialPdfUrl: "https://www.dpsmisdoha.com/dpsdoha/userspace/username/admin/DynamicFolder/Academic/Learning_Resources/Tamil/Class%2007-Tamil-1-sama.pdf",
    officialPageUrl: "https://www.dpsmisdoha.com/dpsdoha/userspace/username/admin/DynamicFolder/Academic/Learning_Resources/Tamil/Class%2007-Tamil-1-sama.pdf",
    localPdfFile: "grade7-tamil-part1.pdf",
  },
  {
    title: "Tamil Book Part II",
    grade: 7,
    subject: "Tamil",
    officialPdfUrl: "https://www.dpsmisdoha.com/dpsdoha/userspace/username/admin/DynamicFolder/Academic/Learning_Resources/Tamil/Class%2007-Tamil-2-sama.pdf",
    officialPageUrl: "https://www.dpsmisdoha.com/dpsdoha/userspace/username/admin/DynamicFolder/Academic/Learning_Resources/Tamil/Class%2007-Tamil-2-sama.pdf",
    localPdfFile: "grade7-tamil-part2.pdf",
  },
];

async function downloadFile(url, outputPath) {
  const attempts = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(outputPath, buffer);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise(resolve => setTimeout(resolve, 1500 * attempt));
      }
    }
  }

  throw lastError;
}

async function pathExists(targetPath) {
  return fs.stat(targetPath).then(() => true).catch(() => false);
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(plannerOutputDir, { recursive: true });

  const manifest = [];
  for (const book of BOOKS) {
    const localPdfUrl = `/assets/books/ncert/${book.localPdfFile}`;
    const outputPath = path.join(outputDir, book.localPdfFile);
    if (!(await pathExists(outputPath))) {
      await downloadFile(book.officialPdfUrl, outputPath);
    }
    manifest.push({
      title: book.title,
      grade: book.grade,
      subject: book.subject,
      localPdfUrl,
      officialPdfUrl: book.officialPdfUrl,
      officialPageUrl: book.officialPageUrl,
    });
  }

  for (const book of PLANNER_BOOKS) {
    const localPdfUrl = `/assets/books/ncert/planner_chapters/${book.localPdfFile}`;
    const outputPath = path.join(plannerOutputDir, book.localPdfFile);
    if (!(await pathExists(outputPath))) {
      await downloadFile(book.officialPdfUrl, outputPath);
    }
    manifest.push({
      title: book.title,
      grade: book.grade,
      subject: book.subject,
      localPdfUrl,
      officialPdfUrl: book.officialPdfUrl,
      officialPageUrl: book.officialPageUrl,
    });
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Wrote local NCERT manifest to ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
