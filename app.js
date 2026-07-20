import {
  PRODUCT_VERSION,
  STORAGE_KEY,
  advanceDay,
  completeConversation,
  confirmContext,
  createInitialState,
  createRelationship,
  deleteContext,
  getProductView,
  isValidState,
  refreshDerivedState,
  rejectContext,
  runDomainSelfTests,
  sendMessage,
  setFault,
  setProactiveFollowups,
  startConversation,
  updateContext,
} from "./domain.mjs";

const I18N = {
  "zh-CN": {
    productSandbox: "关系产品沙盒", localOnly: "仅保存在本机", qaMode: "工程自测模式", qaModeCopy: "测试时钟、故障注入和状态检查与产品界面隔离。", openConsole: "打开控制台",
    beginRelationship: "开始一段关系", emptyHomeTitle: "先从一件今天真实重要的事开始", emptyHomeCopy: "Atlas 会先与你对话；候选背景由你确认后才会成为关系的一部分。", startConversation: "开始 Conversation",
    relationshipNow: "此刻的 Relationship", todaysContinuation: "今天值得继续的事", continueTogether: "继续聊这件事", viewSource: "查看来源", todayComplete: "今天的关系进展", sameDayTitle: "重要的内容已经留下，不需要为了提醒而继续聊天", sameDayCopy: "你可以继续 Conversation，或在 Relationship 中检查 Atlas 获得了哪些理解。", continueConversation: "继续 Conversation", recentMoment: "最近的共同经历", openJourney: "查看 Shared Journey",
    conversationIdentity: "与你共同理解和推进，而不是等待下一条提醒", conversationPrompt: "今天什么事情最值得我们认真聊一会儿？", conversationBoundary: "这是真实可输入的本地功能沙盒；没有连接线上模型，内容不会上传。", promptGoal: "我想推进一个目标", promptReflection: "我想梳理今天的感受", promptPreference: "我想调整你与我交流的方式",
    candidateContext: "候选 Context · 尚未保存", atlasUnderstanding: "Atlas 的理解", confirmBoundary: "只有确认后，未来的 Conversation 和 Follow-up 才能使用它。", confirmContext: "确认这项理解", dontKeep: "不要保留", messageLabel: "给 Atlas 的消息", messagePlaceholder: "说说你正在经历什么……", endConversation: "结束这次 Conversation",
    timelineTitle: "我们真正一起经历了什么", timelineIntro: "这里只保留有意义的 Relationship Event，不是全部聊天记录。", noEvents: "还没有共同经历", noEventsCopy: "完成一次有意义的 Conversation 后，第一条 Event 会出现在这里。", daysTogether: "天共同经历", relationshipSummary: "关系成长来自你们共同经历和确认过的理解，而不是消息数量。",
    confirmedUnderstanding: "Atlas 可以使用的已确认理解", contextControlCopy: "系统负责整理，你拥有查看、修改和删除的最终控制权。", noContext: "还没有确认过的 Context。", proactiveFollowups: "允许主动 Follow-up", followupSettingCopy: "只根据已确认且仍有效的 Context 生成。",
    profileTitle: "账号与数据控制", sandboxNotice: "当前是无账号、无云端存储的产品沙盒。所有输入只存在这个浏览器的 localStorage 中。", exportData: "导出本地数据 JSON", deleteAllData: "删除全部本地数据", buildVersion: "构建版本",
    navHome: "首页", navConversation: "对话", navTimeline: "旅程", navRelationship: "关系", navProfile: "我的",
    selfTestConsole: "Sprint 1 自测试控制台", selfTestBoundary: "控制台只验证确定性的领域规则、状态迁移、异常降级和数据边界，不冒充真人的价值判断。", runAllTests: "运行全部自动测试", seedScenario: "装载完整首日场景", advanceDay: "推进到下一天", resetSandbox: "重置沙盒", manualChecks: "可观察的手动功能检查", contextDeleteCheck: "Context 删除", contextDeleteCheckCopy: "装载已确认 Context，关闭控制台并直接打开 Relationship。", openRelationshipCheck: "打开 Relationship 检查", modelFailure: "模型不可用", modelFailureHow: "自动触发一次消息；应看到“暂时无法生成回复”，消息仍保留。", contextFailure: "Context 检索失败", contextFailureHow: "自动触发一次消息；应明确说明不知道，且不引用已确认 Context。", networkFailure: "网络不可用", networkFailureHow: "自动触发一次消息；应显示本地保留与可重试状态。", runScenario: "运行场景", advancedFaults: "高级：持续故障开关", advancedFaultsCopy: "开关保持生效，直到手动清除；用于连续输入和 Analytics 检查。", clearFaults: "清除故障", activeFault: "当前故障注入已开启", testResults: "自动测试结果", notRun: "未运行", notRunCopy: "点击“运行全部自动测试”后才会产生 PASS/FAIL；页面加载不会自动执行。", inspectState: "检查当前领域状态与 Analytics",
    onboardingTitle: "先建立关系边界，再开始聊天", onboardingCopy: "这是本地功能沙盒，不是真人，也没有连接线上 AI。你输入的内容不会上传。", displayName: "希望 Atlas 如何称呼你？", namePlaceholder: "例如：小宇", styleLegend: "你更希望 Atlas 怎样回应？", styleBalanced: "平衡：理解与行动并重", styleDirect: "直接：尽快进入重点", styleGentle: "温和：先理解感受", createRelationship: "建立 Relationship",
    sourceTrace: "来源追溯", whyFollowup: "为什么 Atlas 今天提起这件事？", close: "关闭", editUnderstanding: "修改 Atlas 的理解", saveChange: "保存修改", cancel: "取消", deleteContextTitle: "删除这项 Context？", deleteContextCopy: "删除后，未来回复和 Follow-up 都不能再引用它。", confirmDelete: "确认删除",
    greetingMorning: "早上好", greetingAfternoon: "下午好", greetingEvening: "晚上好", day: "第 {n} 天", noLatestEvent: "从一次有意义的 Conversation 开始。", followupTitle: "继续上次真正重要的方向", followupCopy: "Atlas 使用的是你亲自确认的 Context，而不是猜测或随机提醒。", contextGoal: "目标", contextPreference: "互动偏好", contextIdentity: "个人背景", edit: "修改", delete: "删除", confirmed: "已确认", sourceConversation: "来源 Conversation", sourceEvent: "来源 Event", sourceContext: "引用 Context", sourceDay: "发生日期", testPassed: "{pass}/{total} 通过", saved: "已保存在本机", contextConfirmed: "Context 已确认", contextRejected: "候选理解未保存", conversationCompleted: "Conversation 已完成，并按规则生成 Relationship Event", noCandidateWarning: "仍有候选 Context 未处理；它不会进入长期背景。", advanced: "测试时钟已推进一天", seeded: "首日闭环场景已装载", resetDone: "沙盒已重置", contextDeleted: "Context 已删除，后续不可引用", contextUpdated: "Context 已更新", followupsOn: "主动 Follow-up 已开启", followupsOff: "主动 Follow-up 已关闭", exported: "本地数据已导出", userYou: "你", localEngine: "Atlas · 本地规则引擎", currentGoalPrompt: "我想在这个月完成第一版产品，并把最小闭环真正跑起来。", reflectionPrompt: "我今天有些焦虑，想先理清为什么。", preferencePrompt: "请直接一些，但不要反复提醒我。", faultTestPrompt: "请根据我已经确认的目标，帮我继续推进下一步。", faultScenarioReady: "故障场景已触发；查看 Conversation 中的可观察结果。", allFaultsCleared: "故障注入已全部清除", notUploaded: "没有任何研究问卷或自动上传。",
  },
  "en-US": {
    productSandbox: "Relationship product sandbox", localOnly: "Stored on this device", qaMode: "Engineering self-test mode", qaModeCopy: "Test clock, fault injection, and state inspection are isolated from the product UI.", openConsole: "Open console",
    beginRelationship: "BEGIN A RELATIONSHIP", emptyHomeTitle: "Start with something that genuinely matters today", emptyHomeCopy: "Atlas talks with you first. Candidate background becomes part of the relationship only after you confirm it.", startConversation: "Start Conversation",
    relationshipNow: "RELATIONSHIP NOW", todaysContinuation: "WORTH CONTINUING TODAY", continueTogether: "Continue together", viewSource: "View source", todayComplete: "TODAY’S RELATIONSHIP PROGRESS", sameDayTitle: "What mattered has been kept; there is no need to keep chatting for a reminder", sameDayCopy: "Continue the Conversation, or inspect what Atlas understood in Relationship.", continueConversation: "Continue Conversation", recentMoment: "RECENT SHARED MOMENT", openJourney: "Open Shared Journey",
    conversationIdentity: "Understand and move things forward with you—not wait to send the next reminder", conversationPrompt: "What deserves a real conversation today?", conversationBoundary: "This is a local, free-input product sandbox. No live model is connected and nothing is uploaded.", promptGoal: "I want to move a goal forward", promptReflection: "I want to make sense of how today felt", promptPreference: "I want to adjust how you talk with me",
    candidateContext: "CANDIDATE CONTEXT · NOT SAVED", atlasUnderstanding: "Atlas’s understanding", confirmBoundary: "Future Conversations and Follow-ups may use this only after you confirm it.", confirmContext: "Confirm this understanding", dontKeep: "Do not keep", messageLabel: "Message to Atlas", messagePlaceholder: "Share what you are going through…", endConversation: "End this Conversation",
    timelineTitle: "What we have genuinely experienced together", timelineIntro: "Only meaningful Relationship Events appear here—not every chat message.", noEvents: "No shared moments yet", noEventsCopy: "The first Event appears after a meaningful Conversation is completed.", daysTogether: "days together", relationshipSummary: "A relationship grows through shared experiences and confirmed understanding—not message volume.",
    confirmedUnderstanding: "Confirmed understanding Atlas may use", contextControlCopy: "The system organizes it; you retain final control to view, edit, or delete.", noContext: "No confirmed Context yet.", proactiveFollowups: "Allow proactive Follow-ups", followupSettingCopy: "Generated only from confirmed Context that remains active.",
    profileTitle: "Account and data control", sandboxNotice: "This sandbox has no account or cloud storage. All input remains in this browser’s localStorage.", exportData: "Export local data JSON", deleteAllData: "Delete all local data", buildVersion: "Build version",
    navHome: "Home", navConversation: "Talk", navTimeline: "Journey", navRelationship: "Relationship", navProfile: "Me",
    selfTestConsole: "Sprint 1 self-test console", selfTestBoundary: "The console verifies deterministic domain rules, state transitions, graceful failure, and data boundaries. It does not impersonate human value judgment.", runAllTests: "Run all automated tests", seedScenario: "Seed completed Day 1", advanceDay: "Advance one day", resetSandbox: "Reset sandbox", manualChecks: "Observable manual function checks", contextDeleteCheck: "Context deletion", contextDeleteCheckCopy: "Seed confirmed Context, close the console, and open Relationship directly.", openRelationshipCheck: "Open Relationship check", modelFailure: "Model unavailable", modelFailureHow: "Triggers one message; expect a visible unavailable response while the message remains.", contextFailure: "Context retrieval failure", contextFailureHow: "Triggers one message; expect an explicit no-context response with no confirmed Context used.", networkFailure: "Network unavailable", networkFailureHow: "Triggers one message; expect a local retention and retry state.", runScenario: "Run scenario", advancedFaults: "Advanced: persistent fault switches", advancedFaultsCopy: "A switch stays active until cleared, for repeated input and Analytics inspection.", clearFaults: "Clear faults", activeFault: "Fault injection is active", testResults: "Automated test results", notRun: "Not run", notRunCopy: "PASS/FAIL appears only after you click “Run all automated tests”; loading the page does not execute tests.", inspectState: "Inspect current domain state and Analytics",
    onboardingTitle: "Set relationship boundaries before talking", onboardingCopy: "This is a local feature sandbox, not a person or a live AI. Nothing you type is uploaded.", displayName: "What should Atlas call you?", namePlaceholder: "For example: Alex", styleLegend: "How would you like Atlas to respond?", styleBalanced: "Balanced: understanding and action", styleDirect: "Direct: get to the point", styleGentle: "Gentle: understand feelings first", createRelationship: "Create Relationship",
    sourceTrace: "SOURCE TRACE", whyFollowup: "Why did Atlas bring this up today?", close: "Close", editUnderstanding: "Edit Atlas’s understanding", saveChange: "Save change", cancel: "Cancel", deleteContextTitle: "Delete this Context?", deleteContextCopy: "Future replies and Follow-ups will no longer be allowed to use it.", confirmDelete: "Confirm delete",
    greetingMorning: "Good morning", greetingAfternoon: "Good afternoon", greetingEvening: "Good evening", day: "Day {n}", noLatestEvent: "Begin with one meaningful Conversation.", followupTitle: "Continue the direction that genuinely mattered", followupCopy: "Atlas is using Context you confirmed yourself—not a guess or random reminder.", contextGoal: "Goal", contextPreference: "Interaction preference", contextIdentity: "Personal background", edit: "Edit", delete: "Delete", confirmed: "Confirmed", sourceConversation: "Source Conversation", sourceEvent: "Source Event", sourceContext: "Referenced Context", sourceDay: "Event day", testPassed: "{pass}/{total} passed", saved: "Saved on this device", contextConfirmed: "Context confirmed", contextRejected: "Candidate understanding was not saved", conversationCompleted: "Conversation completed and a Relationship Event was created according to the rules", noCandidateWarning: "A candidate Context is still unresolved; it will not enter lasting background.", advanced: "Test clock advanced one day", seeded: "Completed Day 1 scenario loaded", resetDone: "Sandbox reset", contextDeleted: "Context deleted and blocked from future use", contextUpdated: "Context updated", followupsOn: "Proactive Follow-ups enabled", followupsOff: "Proactive Follow-ups disabled", exported: "Local data exported", userYou: "You", localEngine: "Atlas · local rule engine", currentGoalPrompt: "I want to finish the first product slice this month and make the core loop genuinely work.", reflectionPrompt: "I feel anxious today and want to understand why first.", preferencePrompt: "Please be direct, but do not remind me repeatedly.", faultTestPrompt: "Use my confirmed goal and help me move to the next step.", faultScenarioReady: "Fault scenario triggered; inspect the observable result in Conversation.", allFaultsCleared: "All fault injection cleared", notUploaded: "No research survey or automatic upload is present.",
  },
};

const params = new URLSearchParams(window.location.search);
const QA_MODE = params.get("qa") === "1" || params.get("mode") === "qa";
let screen = "home";
let pendingDeleteContextId = null;
let toastTimer = null;
let automatedTestResults = null;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (isValidState(parsed)) return refreshDerivedState(parsed);
  } catch (_error) { /* start clean */ }
  return createInitialState({ locale: navigator.language?.startsWith("en") ? "en-US" : "zh-CN" });
}

let state = loadState();

function t(key, replacements = {}) {
  let value = I18N[state.locale]?.[key] || I18N["zh-CN"][key] || key;
  Object.entries(replacements).forEach(([name, replacement]) => { value = value.replace(`{${name}}`, String(replacement)); });
  return value;
}

function persist(nextState, { render = true } = {}) {
  state = refreshDerivedState(nextState);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (render) renderAll();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
}

function applyTranslations() {
  document.documentElement.lang = state.locale;
  document.querySelectorAll("[data-t]").forEach((element) => { element.textContent = t(element.dataset.t); });
  document.querySelectorAll("[data-t-placeholder]").forEach((element) => { element.placeholder = t(element.dataset.tPlaceholder); });
  document.querySelectorAll(".locale-button").forEach((button) => button.classList.toggle("is-active", button.dataset.locale === state.locale));
}

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? t("greetingMorning") : hour < 18 ? t("greetingAfternoon") : t("greetingEvening");
}

function navigate(nextScreen) {
  screen = nextScreen;
  document.querySelectorAll("[data-screen]").forEach((section) => { section.hidden = section.dataset.screen !== screen; });
  document.querySelectorAll("[data-nav]").forEach((button) => button.classList.toggle("is-active", button.dataset.nav === screen));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome(view) {
  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat(state.locale, { month: "long", day: "numeric", weekday: "long", timeZone: "UTC" }).format(new Date(`${state.clock.today}T00:00:00Z`));
  document.querySelector("#home-greeting").textContent = `${greeting()}${state.profile ? `，${state.profile.displayName}` : ""}`;
  document.querySelector("#home-day").textContent = state.relationship ? t("day", { n: view.relationshipDays }) : "";
  const hasRelationshipProgress = Boolean(state.relationshipEvents.length);
  document.querySelector("#empty-home").hidden = hasRelationshipProgress;
  document.querySelector("#active-home").hidden = !hasRelationshipProgress;
  if (!hasRelationshipProgress) return;
  document.querySelector("#home-stage").textContent = view.relationshipStage;
  document.querySelector("#home-latest-event").textContent = view.latestEvent?.title || t("noLatestEvent");
  document.querySelector("#followup-card").hidden = !view.followup;
  document.querySelector("#same-day-card").hidden = Boolean(view.followup);
  if (view.followup) {
    document.querySelector("#followup-title").textContent = t("followupTitle");
    document.querySelector("#followup-copy").textContent = `${t("followupCopy")}「${view.followup.contextSnapshot}」`;
  }
  document.querySelector("#recent-moment").hidden = !view.latestEvent;
  if (view.latestEvent) {
    document.querySelector("#recent-moment-title").textContent = view.latestEvent.title;
    document.querySelector("#recent-moment-copy").textContent = view.latestEvent.summary;
  }
}

function renderConversation(view) {
  document.querySelector("#conversation-day").textContent = state.relationship ? t("day", { n: view.relationshipDays }) : "";
  document.querySelector("#conversation-stage").textContent = state.relationship ? view.relationshipStage : "";
  const enabledFaults = Object.entries(state.faults).filter(([, enabled]) => enabled).map(([name]) => t(`${name}Failure`));
  document.querySelector("#fault-status").hidden = enabledFaults.length === 0;
  document.querySelector("#fault-status-copy").textContent = enabledFaults.join(" · ");
  const thread = document.querySelector("#conversation-thread");
  thread.replaceChildren();
  const messages = view.activeConversation?.messages || [];
  messages.forEach((message) => {
    const article = document.createElement("article");
    article.className = `message ${message.role === "user" ? "user-message" : "assistant-message"}`;
    const label = document.createElement("small");
    label.textContent = message.role === "user" ? t("userYou") : t("localEngine");
    const copy = document.createElement("p"); copy.textContent = message.text;
    article.append(label, copy); thread.append(article);
  });
  document.querySelector("#conversation-empty").hidden = messages.length > 0;
  document.querySelector("#complete-conversation").hidden = !messages.some((item) => item.role === "user");
  const candidate = view.candidates.find((item) => item.sourceConversationId === view.activeConversation?.id) || null;
  const card = document.querySelector("#candidate-card");
  card.hidden = !candidate;
  card.dataset.contextId = candidate?.id || "";
  if (candidate) {
    document.querySelector("#candidate-type").textContent = t(`context${candidate.type[0].toUpperCase()}${candidate.type.slice(1)}`);
    document.querySelector("#candidate-value").value = candidate.value;
  }
}

function renderTimeline(view) {
  document.querySelector("#timeline-empty").hidden = view.events.length > 0;
  const list = document.querySelector("#timeline-list"); list.replaceChildren();
  view.events.forEach((event) => {
    const article = document.createElement("article"); article.className = "timeline-event";
    const meta = document.createElement("p"); meta.className = "eyebrow"; meta.textContent = `${event.day} · ${event.type}`;
    const title = document.createElement("h2"); title.textContent = event.title;
    const summary = document.createElement("p"); summary.textContent = event.summary;
    const source = document.createElement("small"); source.textContent = `${t("sourceConversation")}: ${event.sourceConversationId}`;
    article.append(meta, title, summary, source); list.append(article);
  });
}

function renderRelationship(view) {
  document.querySelector("#relationship-stage").textContent = state.relationship ? view.relationshipStage : t("noLatestEvent");
  document.querySelector("#relationship-days").textContent = view.relationshipDays;
  document.querySelector("#context-count").textContent = view.contexts.length;
  document.querySelector("#context-empty").hidden = view.contexts.length > 0;
  document.querySelector("#followup-switch").checked = state.preferences.proactiveFollowups;
  const list = document.querySelector("#context-list"); list.replaceChildren();
  view.contexts.forEach((context) => {
    const article = document.createElement("article"); article.className = "context-item";
    const heading = document.createElement("div"); heading.className = "context-heading";
    const type = document.createElement("span"); type.className = "candidate-type"; type.textContent = t(`context${context.type[0].toUpperCase()}${context.type.slice(1)}`);
    const status = document.createElement("small"); status.textContent = t("confirmed"); heading.append(type, status);
    const value = document.createElement("p"); value.textContent = context.value;
    const source = document.createElement("small"); source.textContent = `${t("sourceConversation")}: ${context.sourceConversationId}`;
    const actions = document.createElement("div"); actions.className = "action-row";
    const edit = document.createElement("button"); edit.className = "quiet-button"; edit.type = "button"; edit.dataset.editContext = context.id; edit.textContent = t("edit");
    const remove = document.createElement("button"); remove.className = "danger-button compact-action"; remove.type = "button"; remove.dataset.deleteContext = context.id; remove.textContent = t("delete");
    actions.append(edit, remove); article.append(heading, value, source, actions); list.append(article);
  });
}

function renderQa() {
  document.querySelector("#qa-banner").hidden = !QA_MODE;
  document.querySelectorAll("[data-fault]").forEach((input) => { input.checked = Boolean(state.faults[input.dataset.fault]); });
  document.querySelector("#state-inspector").textContent = JSON.stringify(state, null, 2);
  renderTestResults();
}

function renderAll() {
  applyTranslations();
  const view = getProductView(state);
  renderHome(view); renderConversation(view); renderTimeline(view); renderRelationship(view); renderQa(); navigate(screen);
}

function showSource() {
  const followup = getProductView(state).followup;
  if (!followup) return;
  const event = state.relationshipEvents.find((item) => item.id === followup.sourceEventId);
  const context = state.contexts.find((item) => item.id === followup.contextId);
  const detail = document.querySelector("#source-detail"); detail.replaceChildren();
  [[t("sourceEvent"), `${event?.title || "—"} · ${event?.id || "—"}`], [t("sourceContext"), context?.value || "—"], [t("sourceDay"), event?.day || "—"], [t("sourceConversation"), event?.sourceConversationId || "—"]].forEach(([term, value]) => {
    const dt = document.createElement("dt"); dt.textContent = term; const dd = document.createElement("dd"); dd.textContent = value; detail.append(dt, dd);
  });
  document.querySelector("#source-dialog").showModal();
}

function renderTestResults() {
  const list = document.querySelector("#test-results"); list.replaceChildren();
  const note = document.querySelector("#not-run-note");
  if (!automatedTestResults) {
    document.querySelector("#test-summary").textContent = t("notRun");
    note.hidden = false;
    return;
  }
  note.hidden = true;
  automatedTestResults.forEach((result) => {
    const item = document.createElement("li"); item.className = result.status;
    const name = document.createElement("span"); name.textContent = result.name;
    const status = document.createElement("strong"); status.textContent = result.status === "pass" ? "PASS" : `FAIL · ${result.detail}`;
    item.append(name, status); list.append(item);
  });
  const pass = automatedTestResults.filter((result) => result.status === "pass").length;
  document.querySelector("#test-summary").textContent = t("testPassed", { pass, total: automatedTestResults.length });
}

function runTests() {
  automatedTestResults = runDomainSelfTests();
  renderTestResults();
}

function closeQaConsole() {
  document.querySelector("#qa-console").hidden = true;
}

function clearAllFaults(input = state) {
  return ["model", "context", "network"].reduce((current, fault) => setFault(current, fault, false), input);
}

function buildConfirmedScenario() {
  if (state.relationship && getProductView(state).contexts.length > 0) return clearAllFaults(state);
  let prepared = createRelationship(createInitialState({ locale: state.locale, today: state.clock.today }), { name: state.locale === "zh-CN" ? "测试用户" : "Test user" });
  const sent = sendMessage(prepared, t("currentGoalPrompt"));
  prepared = confirmContext(sent.state, sent.candidate.id);
  return completeConversation(prepared);
}

function openContextCheck() {
  persist(buildConfirmedScenario());
  closeQaConsole();
  navigate("relationship");
}

function runFaultScenario(fault) {
  let prepared = buildConfirmedScenario();
  prepared = clearAllFaults(prepared);
  prepared = setFault(prepared, fault, true);
  prepared = startConversation(prepared);
  const result = sendMessage(prepared, t("faultTestPrompt"));
  persist(result.state);
  closeQaConsole();
  navigate("conversation");
  showToast(t("faultScenarioReady"));
}

function clearFaults() {
  persist(clearAllFaults());
  showToast(t("allFaultsCleared"));
}

function resetSandbox() {
  const locale = state.locale;
  state = createInitialState({ locale });
  localStorage.removeItem(STORAGE_KEY);
  screen = "home";
  persist(state);
  if (!QA_MODE) document.querySelector("#onboarding-dialog").showModal();
  showToast(t("resetDone"));
}

document.querySelectorAll("[data-nav]").forEach((button) => button.addEventListener("click", () => {
  if (!state.relationship && button.dataset.nav !== "home" && button.dataset.nav !== "profile") document.querySelector("#onboarding-dialog").showModal();
  else navigate(button.dataset.nav);
}));
document.querySelector("#brand-home").addEventListener("click", () => navigate("home"));
document.querySelectorAll(".locale-button").forEach((button) => button.addEventListener("click", () => { state.locale = button.dataset.locale; persist(state); }));
document.querySelector("#start-first-conversation").addEventListener("click", () => {
  if (!state.relationship) document.querySelector("#onboarding-dialog").showModal(); else navigate("conversation");
});
document.querySelector("#continue-today").addEventListener("click", () => navigate("conversation"));
document.querySelector("#home-relationship-card").addEventListener("click", () => navigate("relationship"));
document.querySelector("#continue-followup").addEventListener("click", () => {
  const followup = getProductView(state).followup;
  if (!followup) return;
  persist(startConversation(state, { followupId: followup.id })); navigate("conversation");
});
document.querySelector("#view-followup-source").addEventListener("click", showSource);
document.querySelector("#onboarding-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const style = new FormData(event.currentTarget).get("style");
  persist(createRelationship(state, { name: document.querySelector("#display-name").value, style }));
  document.querySelector("#onboarding-dialog").close(); navigate("conversation");
});
document.querySelector("#onboarding-dialog").addEventListener("cancel", (event) => event.preventDefault());
document.querySelectorAll("[data-prompt]").forEach((button) => button.addEventListener("click", () => {
  const key = button.dataset.prompt === "goal" ? "currentGoalPrompt" : button.dataset.prompt === "reflection" ? "reflectionPrompt" : "preferencePrompt";
  document.querySelector("#message-input").value = t(key); document.querySelector("#message-input").focus();
}));
document.querySelector("#composer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!state.relationship) { document.querySelector("#onboarding-dialog").showModal(); return; }
  const input = document.querySelector("#message-input");
  try {
    const result = sendMessage(state, input.value); persist(result.state); input.value = "";
    if (result.error) showToast(result.error.replaceAll("_", " "));
  } catch (error) { showToast(error.message); }
});
document.querySelector("#confirm-candidate").addEventListener("click", () => {
  const id = document.querySelector("#candidate-card").dataset.contextId;
  persist(confirmContext(state, id, document.querySelector("#candidate-value").value)); showToast(t("contextConfirmed"));
});
document.querySelector("#reject-candidate").addEventListener("click", () => {
  const id = document.querySelector("#candidate-card").dataset.contextId;
  persist(rejectContext(state, id)); showToast(t("contextRejected"));
});
document.querySelector("#complete-conversation").addEventListener("click", () => {
  if (getProductView(state).candidates.some((item) => item.sourceConversationId === state.activeConversationId)) showToast(t("noCandidateWarning"));
  persist(completeConversation(state)); navigate("home"); showToast(t("conversationCompleted"));
});
document.querySelector("#context-list").addEventListener("click", (event) => {
  const editId = event.target.closest("[data-edit-context]")?.dataset.editContext;
  const deleteId = event.target.closest("[data-delete-context]")?.dataset.deleteContext;
  if (editId) {
    const context = state.contexts.find((item) => item.id === editId); document.querySelector("#edit-context-id").value = editId; document.querySelector("#edit-context-value").value = context.value; document.querySelector("#edit-dialog").showModal();
  }
  if (deleteId) { pendingDeleteContextId = deleteId; document.querySelector("#delete-dialog").showModal(); }
});
document.querySelector("#edit-context-form").addEventListener("submit", (event) => {
  event.preventDefault(); persist(updateContext(state, document.querySelector("#edit-context-id").value, document.querySelector("#edit-context-value").value)); document.querySelector("#edit-dialog").close(); showToast(t("contextUpdated"));
});
document.querySelector("#confirm-delete-context").addEventListener("click", () => {
  if (!pendingDeleteContextId) return; persist(deleteContext(state, pendingDeleteContextId)); pendingDeleteContextId = null; document.querySelector("#delete-dialog").close(); showToast(t("contextDeleted"));
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
document.querySelector("#followup-switch").addEventListener("change", (event) => { persist(setProactiveFollowups(state, event.target.checked)); showToast(t(event.target.checked ? "followupsOn" : "followupsOff")); });
document.querySelector("#export-state").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([`${JSON.stringify(state, null, 2)}\n`], { type: "application/json" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = `atlas-local-sandbox-${state.clock.today}.json`; anchor.click(); URL.revokeObjectURL(url); showToast(t("exported"));
});
document.querySelector("#delete-state").addEventListener("click", resetSandbox);
document.querySelector("#toggle-qa").addEventListener("click", () => { document.querySelector("#qa-console").hidden = false; renderQa(); });
document.querySelector("#close-qa").addEventListener("click", closeQaConsole);
document.querySelector("#run-self-tests").addEventListener("click", runTests);
document.querySelector("#reset-sandbox").addEventListener("click", resetSandbox);
document.querySelector("#seed-scenario").addEventListener("click", () => {
  let seeded = createRelationship(createInitialState({ locale: state.locale, today: state.clock.today }), { name: state.locale === "zh-CN" ? "测试用户" : "Test user" });
  const sent = sendMessage(seeded, t("currentGoalPrompt")); seeded = confirmContext(sent.state, sent.candidate.id); seeded = completeConversation(seeded); persist(seeded); closeQaConsole(); navigate("home"); showToast(t("seeded"));
});
document.querySelector("#advance-day").addEventListener("click", () => { persist(advanceDay(state)); closeQaConsole(); navigate("home"); showToast(t("advanced")); });
document.querySelector("#open-context-test").addEventListener("click", openContextCheck);
document.querySelectorAll("[data-run-fault]").forEach((button) => button.addEventListener("click", () => runFaultScenario(button.dataset.runFault)));
document.querySelector("#clear-faults").addEventListener("click", clearFaults);
document.querySelector("#clear-faults-inline").addEventListener("click", clearFaults);
document.querySelectorAll("[data-fault]").forEach((input) => input.addEventListener("change", () => persist(setFault(state, input.dataset.fault, input.checked))));

document.querySelector("#qa-banner").hidden = !QA_MODE;
renderAll();
if (!state.relationship && !QA_MODE) document.querySelector("#onboarding-dialog").showModal();
console.info(`${PRODUCT_VERSION}: ${t("notUploaded")}`);
