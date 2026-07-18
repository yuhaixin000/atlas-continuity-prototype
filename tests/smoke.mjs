import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const [html, css, js, config] = await Promise.all([
  readFile(path.join(root, "index.html"), "utf8"),
  readFile(path.join(root, "styles.css"), "utf8"),
  readFile(path.join(root, "app.js"), "utf8"),
  readFile(path.join(root, "config.js"), "utf8"),
]);

for (const screen of ["conversation", "relationship", "model", "paywall", "results"]) {
  assert.match(html, new RegExp(`data-screen="${screen}"`), `missing ${screen} screen`);
}
for (const screen of ["conversation", "relationship"]) {
  assert.match(html, new RegExp(`data-go="${screen}"`), `missing ${screen} navigation`);
}

for (const control of [
  "onboarding-dialog",
  "locale-select",
  "market-select",
  "first-time-select",
  "ai-use-frequency",
  "current-ai-type",
  "multi-day-use",
  "adult-consent",
  "upload-consent",
  "conversation-options",
  "return-tomorrow-button",
  "day-two-thread",
  "return-home-card",
  "continue-from-home-button",
  "return-options",
  "followup-toggle",
  "open-relationship-button",
  "shared-moment-button",
  "correct-context-button",
  "delete-context-button",
  "confirm-delete-button",
  "preview-update-button",
  "use-update-button",
  "keep-old-button",
  "paywall-form",
  "cannot-complete-button",
  "survey-form",
  "same-ai-reason",
  "strongest-moment",
  "relationship-believability",
  "confusion-point",
  "comparison-current",
  "result-dialog",
  "copy-result-button",
  "download-result-button",
  "retry-upload-button",
  "delete-upload-button",
  "upload-status",
  "collector-health-link",
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
assert.match(js, /ATLAS-UT4-/, "v4 anonymous result-code prefix missing");
assert.match(js, /atlas-unmoderated-v4/, "v4 result schema missing");
assert.match(js, /technical_qa/, "technical QA separation missing");
assert.match(js, /first_time/, "first-time participant marker missing");
assert.match(js, /automatic_upload:\s*true/, "automatic-upload consent boundary missing");
assert.match(js, /automatic_with_manual_fallback/, "automatic upload fallback mode missing");
assert.match(js, /selected_\$\{choice\}/, "scripted conversation interaction missing");
assert.match(js, /returned_next_day/, "next-day transition missing");
assert.match(js, /shared_moment_opened/, "Relationship shared-moment interaction missing");
assert.match(js, /context_controlled/, "Relationship context control missing");
assert.match(js, /model_preview_opened/, "model continuity preview missing");
assert.match(html, /id="return-tomorrow-button"/, "explicit post-conversation transition missing");
assert.doesNotMatch(html, /data-go="memory"|data-go="timeline"|data-go="update"/, "support capabilities must not appear as primary product navigation");
assert.match(js, /chat_input_collected:\s*false/, "real-chat collection boundary missing");
assert.match(js, /context_input_values_recorded:\s*false/, "context-input collection boundary missing");
assert.match(js, /method:\s*"POST"/, "automatic result submission missing");
assert.match(js, /method:\s*"DELETE"/, "participant deletion request missing");
assert.match(js, /COLLECTOR_URLS/, "multiple collector endpoint support missing");
assert.match(js, /requestWithTimeout/, "collector timeout handling missing");
assert.match(js, /COLLECTOR_ATTEMPTS\s*=\s*2/, "idempotent collector retry missing");
assert.match(config, /window\.ATLAS_COLLECTOR_URL\s*=/, "collector configuration missing");
assert.match(config, /window\.ATLAS_COLLECTOR_URLS\s*=/, "collector endpoint list missing");
assert.match(config, /window\.location\.origin/, "same-origin collector routing missing");
assert.doesNotMatch(config, /api[_-]?key|bearer|password|secret/i, "public collector configuration must not contain credentials");
assert.match(css, /width:\s*min\(100%,\s*460px\)/, "mobile-width shell missing");
assert.doesNotMatch(html, /https?:\/\/(?!www\.w3\.org)/, "prototype HTML must not load third-party resources");
assert.doesNotMatch(js, /XMLHttpRequest|WebSocket|sendBeacon/, "prototype must not use undeclared network channels");

console.log(`Companion product-shaped prototype smoke test passed: 5 screens, ${htmlKeys.size} bilingual keys, two-day relationship flow, automatic upload, and participant deletion.`);
