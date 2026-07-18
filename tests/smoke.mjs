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

for (const screen of ["followup", "memory", "timeline", "model", "results"]) {
  assert.match(html, new RegExp(`data-screen="${screen}"`), `missing ${screen} screen`);
}
for (const screen of ["followup", "memory", "timeline", "model"]) {
  assert.match(html, new RegExp(`data-go="${screen}"`), `missing ${screen} navigation`);
}

for (const control of [
  "onboarding-dialog",
  "locale-select",
  "market-select",
  "adult-consent",
  "continue-button",
  "skip-button",
  "followup-toggle",
  "memory-dialog",
  "confirm-delete-button",
  "keep-update-button",
  "restore-button",
  "cannot-complete-button",
  "survey-form",
  "beta-interest",
  "result-dialog",
  "copy-result-button",
  "download-result-button",
  "reset-button",
]) {
  assert.match(html, new RegExp(`id="${control}"`), `missing ${control}`);
}

const enStart = js.indexOf('"en-US": {');
const zhStart = js.indexOf('"zh-CN": {');
const dictionaryEnd = js.indexOf("\n    },\n  };", zhStart);
assert.ok(enStart >= 0 && zhStart > enStart && dictionaryEnd > zhStart, "bilingual dictionaries are missing");
const enDictionary = js.slice(enStart, zhStart);
const zhDictionary = js.slice(zhStart, dictionaryEnd);
const htmlKeys = new Set([
  ...Array.from(html.matchAll(/data-i18n="([^"]+)"/g), (match) => match[1]),
  ...Array.from(html.matchAll(/data-i18n-(?:placeholder|aria)="([^"]+)"/g), (match) => match[1]),
]);
for (const key of htmlKeys) {
  const pattern = new RegExp(`\\b${key}:`);
  assert.match(enDictionary, pattern, `English translation missing: ${key}`);
  assert.match(zhDictionary, pattern, `Chinese translation missing: ${key}`);
}

assert.match(html, /not a human or a live AI service/i, "missing English AI identity disclosure");
assert.match(js, /不是真人/, "missing Chinese AI identity disclosure");
assert.match(js, /ATLAS-UT1-/, "anonymous result-code prefix missing");
assert.match(js, /automatic_upload:\s*false/, "automatic-upload boundary missing");
assert.match(css, /width:\s*min\(100%,\s*460px\)/, "mobile-width shell missing");
assert.doesNotMatch(html, /https?:\/\/(?!www\.w3\.org)/, "prototype HTML must not load third-party resources");
assert.doesNotMatch(js, /fetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/, "prototype must not make network calls");

console.log(`Companion prototype smoke test passed: 5 screens, ${htmlKeys.size} bilingual keys, no network submission.`);
