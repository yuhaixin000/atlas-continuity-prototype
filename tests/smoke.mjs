import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const [html, css, app, domain] = await Promise.all([
  readFile(path.join(root, "index.html"), "utf8"),
  readFile(path.join(root, "styles.css"), "utf8"),
  readFile(path.join(root, "app.js"), "utf8"),
  readFile(path.join(root, "domain.mjs"), "utf8"),
]);

for (const screen of ["home", "conversation", "timeline", "relationship", "profile"]) {
  assert.match(html, new RegExp(`data-screen="${screen}"`), `missing ${screen} product screen`);
  assert.match(html, new RegExp(`data-nav="${screen}"`), `missing ${screen} product navigation`);
}

for (const control of [
  "onboarding-dialog", "onboarding-form", "message-input", "composer-form", "candidate-card",
  "confirm-candidate", "reject-candidate", "complete-conversation", "followup-card",
  "continue-followup", "view-followup-source", "timeline-list", "context-list",
  "followup-switch", "export-state", "delete-state", "qa-console", "run-self-tests",
  "seed-scenario", "advance-day", "state-inspector",
]) assert.match(html, new RegExp(`id="${control}"`), `missing ${control}`);

assert.match(domain, /continuity-product-slice-v0\.7/, "v0.7 version missing");
assert.match(domain, /atlas-product-sandbox-v1/, "product state contract missing");
assert.match(domain, /context\.candidate_created/, "candidate Context lifecycle missing");
assert.match(domain, /context\.confirmed/, "Context confirmation missing");
assert.match(domain, /relationship\.event_created/, "Relationship Event pipeline missing");
assert.match(domain, /followup\.ready/, "source-traceable Follow-up missing");
assert.match(domain, /sourceEventId/, "Follow-up source link missing");
assert.match(domain, /status === "deleted"|status = "deleted"/, "Context deletion state missing");
assert.match(domain, /context\.retrieval_failed/, "Context failure fallback missing");
assert.match(domain, /model_unavailable/, "model failure fallback missing");
assert.match(domain, /network_unavailable/, "network failure fallback missing");
assert.match(domain, /runDomainSelfTests/, "domain self-test suite missing");
assert.match(app, /localStorage\.setItem/, "local product persistence missing");
assert.match(app, /mode"\) === "qa"/, "isolated QA mode missing");
assert.doesNotMatch(app, /\/v1\/results|ATLAS-UT|submitResult|automatic_upload/, "product sandbox must not contain research submission");
assert.doesNotMatch(html, /survey-form|test-guide|current_task|plan_choice/, "research tasks or survey leaked into product UI");
assert.doesNotMatch(html, /https?:\/\//, "product sandbox must not load third-party resources");
assert.match(css, /width:\s*min\(100%,\s*500px\)/, "mobile product frame missing");

const zhStart = app.indexOf('"zh-CN": {');
const enStart = app.indexOf('"en-US": {');
assert.ok(zhStart >= 0 && enStart > zhStart, "bilingual UI dictionaries missing");
const zh = app.slice(zhStart, enStart);
const en = app.slice(enStart, app.indexOf("\n};", enStart));
const translationKeys = new Set([
  ...Array.from(html.matchAll(/data-t="([^"]+)"/g), (match) => match[1]),
  ...Array.from(html.matchAll(/data-t-placeholder="([^"]+)"/g), (match) => match[1]),
]);
for (const key of translationKeys) {
  const pattern = new RegExp(`\\b${key}:`);
  assert.match(zh, pattern, `Chinese translation missing: ${key}`);
  assert.match(en, pattern, `English translation missing: ${key}`);
}

console.log(`Atlas v0.7 product sandbox smoke test passed: 5 product screens, ${translationKeys.size} bilingual UI keys, isolated QA console, and no research survey/upload.`);
