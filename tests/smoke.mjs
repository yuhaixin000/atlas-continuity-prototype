import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const [html, css, js] = await Promise.all([
  readFile(path.join(root, "index.html"), "utf8"),
  readFile(path.join(root, "styles.css"), "utf8"),
  readFile(path.join(root, "app.js"), "utf8"),
]);

for (const screen of ["followup", "memory", "timeline", "model"]) {
  assert.match(html, new RegExp(`data-screen="${screen}"`), `missing ${screen} screen`);
  assert.match(html, new RegExp(`data-go="${screen}"`), `missing ${screen} navigation`);
}

for (const control of [
  "continue-button",
  "skip-button",
  "followup-toggle",
  "memory-dialog",
  "confirm-delete-button",
  "keep-update-button",
  "restore-button",
  "reset-button",
]) {
  assert.match(html, new RegExp(`id="${control}"`), `missing ${control}`);
}

assert.match(html, /not a human or a live AI service/i, "missing AI identity disclosure");
assert.match(html, /Correct/, "missing memory correction action");
assert.match(html, /Delete/, "missing memory deletion action");
assert.match(js, /showModal\(\)/, "dialogs are not wired");
assert.match(js, /Memory deleted/, "memory deletion feedback missing");
assert.match(css, /width:\s*min\(100%,\s*460px\)/, "mobile-width shell missing");
assert.doesNotMatch(js, /fetch\s*\(|XMLHttpRequest|WebSocket/, "prototype must not make network calls");

console.log("Companion prototype smoke test passed: 4 screens and key controls present.");
