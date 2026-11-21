// main.ts — copies POST.json from the repository into the output directory.
// The house reads the post from X itself; this program only hands in the
// post's address. It runs on Node 22 with no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const post = JSON.parse(readFileSync(join(botDir, "POST.json"), "utf8"));
if (typeof post.url !== "string" || !/^https:\/\/(x\.com|twitter\.com)\/\w+\/status\/\d+$/.test(post.url)) {
  throw new Error("POST.json has no valid X post url");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), JSON.stringify(post, null, 2) + "\n");
console.log(`wrote ${join(outDir, "POST.json")}`);
