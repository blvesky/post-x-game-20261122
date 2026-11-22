// Entry point for the make.fun bounty "post-x-the-agent-builds-a-game-from-20261122-1709".
// Node 22, standard library only. It does exactly one job: copy POST.json from
// the bot directory into the output directory, where the make.fun gate reads it
// to find the X post that carries this entry's video.
//
// Local test run (mirrors the grader's /bot -> /output layout):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

if (!existsSync(source)) {
  console.error(`POST.json not found in bot dir: ${source}`);
  process.exit(1);
}

// Refuse to hand the gate an unreadable placeholder-shaped file by accident:
// the file must at least parse as JSON with a string "url" field.
let post;
try {
  post = JSON.parse(readFileSync(source, "utf8"));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof post?.url !== "string" || post.url.length === 0) {
  console.error(`POST.json has no string "url" field: ${source}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`Failed to copy POST.json to ${target}: ${(err as Error).message}`);
  process.exit(1);
}
console.log(`POST.json copied: ${source} -> ${target} (url: ${post.url})`);
