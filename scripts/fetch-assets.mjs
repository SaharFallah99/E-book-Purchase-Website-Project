import { mkdir, writeFile, access } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const books = (await import("../data/books.json", { with: { type: "json" } }))
  .default;

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "*/*",
};

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  if (await exists(dest)) return { dest, skipped: true };
  const response = await fetch(url, { headers });
  if (!response.ok || !response.body) {
    throw new Error(`${response.status} ${url}`);
  }
  await pipeline(Readable.fromWeb(response.body), createWriteStream(dest));
  return { dest, skipped: false };
}

async function runPool(items, limit, worker) {
  const queue = [...items];
  const errors = [];
  const workers = Array.from({ length: limit }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        await worker(item);
      } catch (error) {
        errors.push({ item, error: String(error) });
      }
    }
  });
  await Promise.all(workers);
  return errors;
}

const coversDir = path.join(root, "public", "covers");
const fontsDir = path.join(root, "public", "fonts");
const audioDir = path.join(root, "public", "audio");
await mkdir(coversDir, { recursive: true });
await mkdir(fontsDir, { recursive: true });
await mkdir(audioDir, { recursive: true });

const covers = books.map((book) => ({
  url: book.remoteCover,
  dest: path.join(coversDir, `${book.id}.jpg`),
}));

console.log(`Downloading ${covers.length} covers (2 at a time)...`);
const coverErrors = await runPool(covers, 2, async (item) => {
  const result = await download(item.url, item.dest);
  console.log(result.skipped ? `skip ${path.basename(item.dest)}` : `ok ${path.basename(item.dest)}`);
});

const fonts = [
  {
    url: "https://cdn.jsdelivr.net/npm/@fontsource-variable/vazirmatn@5.2.8/files/vazirmatn-arabic-wght-normal.woff2",
    dest: path.join(fontsDir, "Vazirmatn-Arabic.woff2"),
  },
  {
    url: "https://cdn.jsdelivr.net/npm/@fontsource-variable/vazirmatn@5.2.8/files/vazirmatn-latin-wght-normal.woff2",
    dest: path.join(fontsDir, "Vazirmatn-Latin.woff2"),
  },
];

console.log("Downloading Vazirmatn fonts...");
const fontErrors = [];
for (const font of fonts) {
  try {
    const result = await download(font.url, font.dest);
    console.log(result.skipped ? `skip ${path.basename(font.dest)}` : `ok ${path.basename(font.dest)}`);
  } catch (error) {
    fontErrors.push({ item: font, error: String(error) });
  }
}

const wavPath = path.join(audioDir, "sample.wav");
if (!(await exists(wavPath))) {
  const sampleRate = 22050;
  const duration = 6;
  const numSamples = sampleRate * duration;
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < numSamples; i += 1) {
    const t = i / sampleRate;
    const env = Math.min(1, t * 4) * Math.min(1, (duration - t) * 2);
    const tone =
      0.32 * Math.sin(2 * Math.PI * 392 * t) +
      0.22 * Math.sin(2 * Math.PI * 494 * t) +
      0.12 * Math.sin(2 * Math.PI * 587 * t);
    const sample = Math.max(-1, Math.min(1, tone * env * 0.55));
    buffer.writeInt16LE(Math.round(sample * 32767), 44 + i * 2);
  }
  await writeFile(wavPath, buffer);
  console.log("ok sample.wav");
} else {
  console.log("skip sample.wav");
}

if (coverErrors.length || fontErrors.length) {
  console.error("Failures:", [...coverErrors, ...fontErrors]);
  process.exitCode = 1;
} else {
  console.log("All assets ready.");
}
