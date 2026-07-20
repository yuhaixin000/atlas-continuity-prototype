import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { parseHTML } from "linkedom";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const html = await readFile(path.join(root, "index.html"), "utf8");
const { document, window } = parseHTML(html);
const storage = new Map();

Object.defineProperty(window, "location", { value: new URL("https://atlas.test/?mode=qa"), configurable: true });
window.scrollTo = () => {};
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
});

globalThis.window = window;
globalThis.document = document;
Object.defineProperty(globalThis, "navigator", { value: { language: "zh-CN" }, configurable: true });
globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
};
globalThis.FormData = class {
  constructor(form) { this.form = form; }
  get(name) { return this.form?.querySelector(`[name="${name}"]:checked`)?.value ?? null; }
};
globalThis.setTimeout = () => 0;
globalThis.clearTimeout = () => {};

await import(`${pathToFileURL(path.join(root, "app.js")).href}?ui-test=${Date.now()}`);

function click(selector) {
  const element = document.querySelector(selector);
  assert.ok(element, `missing clickable element: ${selector}`);
  element.dispatchEvent(new window.Event("click", { bubbles: true }));
  return element;
}

assert.equal(document.querySelector("#test-summary").textContent, "未运行", "QA must start in a not-run state");
assert.equal(document.querySelectorAll("#test-results li").length, 0, "QA must not preload PASS rows");

click("#run-self-tests");
assert.match(document.querySelector("#test-summary").textContent, /^14\/14 通过$/, "explicit run must show the real total");
assert.equal(document.querySelectorAll("#test-results li.pass").length, 14, "all explicit domain checks should render");

click("#toggle-qa");
click("#open-context-test");
assert.equal(document.querySelector("#qa-console").hidden, true, "Context check must close the overlay");
assert.equal(document.querySelector("#screen-relationship").hidden, false, "Context check must open Relationship");
assert.ok(document.querySelector("[data-delete-context]"), "confirmed Context must expose a delete control");
click("[data-delete-context]");
assert.equal(document.querySelector("#delete-dialog").open, true, "delete confirmation dialog must open");
click("#confirm-delete-context");
assert.equal(document.querySelectorAll("[data-delete-context]").length, 0, "confirmed deletion must remove the Context control row");
assert.equal(document.querySelector("#context-empty").hidden, false, "empty Context state must be visible after deletion");

for (const [fault, expected] of [
  ["model", /暂时无法生成回复/],
  ["context", /没有足够的已确认背景/],
  ["network", /当前无法连接 Atlas/],
]) {
  click("#toggle-qa");
  click(`[data-run-fault="${fault}"]`);
  assert.equal(document.querySelector("#qa-console").hidden, true, `${fault} scenario must close the overlay`);
  assert.equal(document.querySelector("#screen-conversation").hidden, false, `${fault} scenario must open Conversation`);
  assert.match(document.querySelector("#conversation-thread").textContent, expected, `${fault} fallback must be observable`);
  assert.equal(document.querySelector("#fault-status").hidden, false, `${fault} status must be visible`);
  click("#clear-faults-inline");
  assert.equal(document.querySelector("#fault-status").hidden, true, `${fault} status must clear`);
}

console.log("Atlas v0.7.1 UI interaction test passed: explicit test run, reachable Context deletion, and three observable fault scenarios.");
