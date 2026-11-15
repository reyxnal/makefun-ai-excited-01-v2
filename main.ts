// ai-excited-01 — "The Library That Dreamed"
// Copies the entry image beside this file to the grader's output path.
// Node 22, standard library only. No network, no randomness, no arguments:
// running it twice writes byte-identical output.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry image missing: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Verify the copy landed whole: a truncated write must fail loudly
// instead of handing the judge a broken file.
const expected = statSync(source).size;
const written = statSync(target).size;
if (written !== expected) {
  throw new Error(`copy incomplete: wrote ${written} of ${expected} bytes`);
}
console.log(`wrote ${target} (${written} bytes)`);
