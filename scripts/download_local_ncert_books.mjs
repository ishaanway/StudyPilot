import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "assets", "books", "ncert");
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

async function downloadFile(url, outputPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, buffer);
}

async function pathExists(targetPath) {
  return fs.stat(targetPath).then(() => true).catch(() => false);
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

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

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Wrote local NCERT manifest to ${manifestPath}`);
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
