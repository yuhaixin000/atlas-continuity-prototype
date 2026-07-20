export const PRODUCT_VERSION = "continuity-product-slice-v0.7.1";
export const STATE_SCHEMA = "atlas-product-sandbox-v1";
export const STORAGE_KEY = "atlas.product-sandbox.v1";

const COPY = {
  "zh-CN": {
    stageNew: "刚刚认识",
    stageGrowing: "逐渐了解彼此",
    goalReply: "这听起来不只是一个待办，而是你想认真推进的事情。我先不替你长期保存；如果下面的理解准确，你可以亲自确认。现在最需要一起拆开的，是方向、第一步，还是执行节奏？",
    preferenceReply: "我会把互动方式交给你决定。下面只是候选理解，确认后才会在以后的对话中使用。",
    identityReply: "谢谢你告诉我。我不会默认把它变成长久记忆；只有你确认后，它才会进入我们以后可以使用的背景。",
    reflectionReply: "我听见了。我们不急着把感受变成任务。你更希望我陪你理清发生了什么，还是一起找一个下一步？",
    genericReply: "我在。你希望我先陪你梳理、给出建议，还是把它变成一个可以继续推进的目标？",
    knownPrefix: "我会沿用你已经确认的背景：",
    followupPrefix: "上次我们一起留下了这个方向：",
    followupSuffix: "今天你想继续推进哪一部分？",
    noContext: "我没有足够的已确认背景，不会假装记得。你愿意从今天最重要的事情开始吗？",
    networkReply: "当前无法连接 Atlas。你的消息仍保存在本机；恢复连接后可以重试，我不会假装已经回复。",
    eventGoal: "共同目标开始形成",
    eventPreference: "互动方式得到确认",
    eventIdentity: "一项个人背景得到确认",
    eventReflection: "完成了一次有意义的梳理",
    contextGoal: "目标",
    contextPreference: "互动偏好",
    contextIdentity: "个人背景",
  },
  "en-US": {
    stageNew: "Getting acquainted",
    stageGrowing: "Growing in understanding",
    goalReply: "This sounds like more than a task—it is something you want to move forward. I will not save it long term by default. If the candidate understanding below is accurate, you can confirm it yourself. Should we start with direction, the first step, or execution rhythm?",
    preferenceReply: "You decide how we interact. The understanding below is only a candidate; it will be used in future conversations only after you confirm it.",
    identityReply: "Thank you for telling me. I will not turn it into lasting context by default. It becomes reusable background only if you confirm it.",
    reflectionReply: "I hear you. We do not need to turn the feeling into a task. Would it help more to make sense of what happened, or to find one next step together?",
    genericReply: "I’m here. Would you like me to help you think it through, offer advice, or turn it into a goal we can keep working on?",
    knownPrefix: "I’ll carry forward the background you already confirmed:",
    followupPrefix: "Last time, we kept this direction together:",
    followupSuffix: "Which part would you like to move forward today?",
    noContext: "I do not have enough confirmed background, so I will not pretend to remember. Would you like to begin with what matters most today?",
    networkReply: "Atlas cannot be reached right now. Your message remains on this device so you can retry after the connection recovers; I will not pretend a response was completed.",
    eventGoal: "A shared goal began to take shape",
    eventPreference: "An interaction preference was confirmed",
    eventIdentity: "A piece of personal background was confirmed",
    eventReflection: "We completed a meaningful reflection",
    contextGoal: "Goal",
    contextPreference: "Interaction preference",
    contextIdentity: "Personal background",
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeLocale(locale) {
  return locale === "en-US" ? "en-US" : "zh-CN";
}

function dayNumber(dateText) {
  return Math.floor(Date.parse(`${dateText}T00:00:00Z`) / 86400000);
}

function dateFromNumber(value) {
  return new Date(value * 86400000).toISOString().slice(0, 10);
}

function nextId(state, prefix) {
  state.meta.sequence += 1;
  return `${prefix}-${String(state.meta.sequence).padStart(4, "0")}`;
}

function record(state, name, properties = {}) {
  state.analytics.push({
    id: nextId(state, "analytics"),
    name,
    day: state.clock.today,
    properties,
  });
}

function cleanText(value, max = 360) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function activeContext(state, type = null) {
  return state.contexts.filter((item) => item.status === "confirmed" && (!type || item.type === type));
}

function detectCandidate(text) {
  const patterns = [
    { type: "goal", pattern: /(我要|我想|我计划|我准备|目标是|i want to|i plan to|i'm going to|my goal is)/i },
    { type: "preference", pattern: /(请直接|温和一点|不要反复|不要提醒|我更喜欢|please be direct|be gentler|don't repeat|do not remind|i prefer)/i },
    { type: "identity", pattern: /(我是.{1,24}|我的工作是|i am an? |i work as|my role is)/i },
  ];
  return patterns.find(({ pattern }) => pattern.test(text))?.type || null;
}

function detectReflection(text) {
  return /(难过|焦虑|紧张|开心|害怕|困惑|压力|sad|anxious|nervous|happy|afraid|confused|stressed)/i.test(text);
}

function ensureConversation(state) {
  let conversation = state.conversations.find((item) => item.id === state.activeConversationId && item.status === "open");
  if (!conversation) {
    conversation = {
      id: nextId(state, "conversation"),
      day: state.clock.today,
      status: "open",
      sourceFollowupId: null,
      messages: [],
      pendingEvent: null,
    };
    state.conversations.push(conversation);
    state.activeConversationId = conversation.id;
    record(state, "conversation.started", { conversation_id: conversation.id });
  }
  return conversation;
}

export function createInitialState({ locale = "zh-CN", today = new Date().toISOString().slice(0, 10) } = {}) {
  return {
    schema: STATE_SCHEMA,
    version: PRODUCT_VERSION,
    locale: normalizeLocale(locale),
    clock: { today },
    profile: null,
    relationship: null,
    conversations: [],
    activeConversationId: null,
    contexts: [],
    relationshipEvents: [],
    followups: [],
    preferences: { proactiveFollowups: true, style: "balanced" },
    faults: { model: false, context: false, network: false },
    analytics: [],
    meta: { sequence: 0, createdAt: `${today}T09:00:00.000Z` },
  };
}

export function isValidState(value) {
  return Boolean(value && value.schema === STATE_SCHEMA && value.version === PRODUCT_VERSION && value.meta && Array.isArray(value.contexts));
}

export function createRelationship(input, { name = "朋友", style = "balanced" } = {}) {
  const state = clone(input);
  const safeName = cleanText(name, 40) || (state.locale === "zh-CN" ? "朋友" : "Friend");
  state.profile = { displayName: safeName, createdDay: state.clock.today };
  state.preferences.style = ["balanced", "direct", "gentle"].includes(style) ? style : "balanced";
  state.relationship = {
    id: nextId(state, "relationship"),
    startedDay: state.clock.today,
    stage: "new",
    latestEventId: null,
  };
  record(state, "onboarding.completed", { style: state.preferences.style });
  record(state, "first_relationship.created", { relationship_id: state.relationship.id });
  return state;
}

export function startConversation(input, { followupId = null } = {}) {
  const state = clone(input);
  if (!state.relationship) throw new Error("relationship_required");
  const conversation = ensureConversation(state);
  if (followupId) {
    const followup = state.followups.find((item) => item.id === followupId && item.status === "ready");
    if (followup) {
      conversation.sourceFollowupId = followup.id;
      followup.status = "opened";
      const copy = COPY[state.locale];
      conversation.messages.push({
        id: nextId(state, "message"),
        role: "assistant",
        text: `${copy.followupPrefix}「${followup.contextSnapshot}」${copy.followupSuffix}`,
        source: { eventId: followup.sourceEventId, contextId: followup.contextId },
      });
      record(state, "followup.clicked", { followup_id: followup.id, source_event_id: followup.sourceEventId });
    }
  }
  return state;
}

export function sendMessage(input, rawText) {
  const state = clone(input);
  if (!state.relationship) throw new Error("relationship_required");
  const text = cleanText(rawText);
  if (!text) throw new Error("message_required");
  const conversation = ensureConversation(state);
  conversation.messages.push({ id: nextId(state, "message"), role: "user", text });

  if (state.faults.network) {
    const response = { id: nextId(state, "message"), role: "assistant", text: COPY[state.locale].networkReply, error: "network_unavailable" };
    conversation.messages.push(response);
    record(state, "conversation.message_failed", { reason: "network_unavailable" });
    return { state, response, candidate: null, error: "network_unavailable" };
  }
  if (state.faults.model) {
    conversation.messages.push({ id: nextId(state, "message"), role: "assistant", text: state.locale === "zh-CN" ? "我暂时无法生成回复。你的消息仍保留在本地，可以重试。" : "I can’t generate a response right now. Your message remains local so you can retry." });
    record(state, "conversation.message_failed", { reason: "model_unavailable" });
    return { state, response: conversation.messages.at(-1), candidate: null, error: "model_unavailable" };
  }

  const copy = COPY[state.locale];
  const type = detectCandidate(text);
  const reflection = detectReflection(text);
  let reply = type === "goal" ? copy.goalReply : type === "preference" ? copy.preferenceReply : type === "identity" ? copy.identityReply : reflection ? copy.reflectionReply : copy.genericReply;
  const known = state.faults.context ? [] : activeContext(state).slice(0, 1);
  if (known.length) reply = `${copy.knownPrefix}「${known[0].value}」\n\n${reply}`;
  if (state.faults.context) {
    reply = `${copy.noContext}\n\n${reply}`;
    record(state, "context.retrieval_failed", { conversation_id: conversation.id });
  }

  const response = { id: nextId(state, "message"), role: "assistant", text: reply, usedContextIds: known.map((item) => item.id) };
  conversation.messages.push(response);
  let candidate = null;
  if (type) {
    candidate = {
      id: nextId(state, "context-candidate"),
      type,
      value: text,
      status: "candidate",
      sourceConversationId: conversation.id,
      sourceMessageId: conversation.messages.at(-2).id,
      createdDay: state.clock.today,
    };
    state.contexts.push(candidate);
    record(state, "context.candidate_created", { context_id: candidate.id, type });
  }
  conversation.pendingEvent = {
    type: type === "goal" ? "Goal" : type === "preference" ? "Preference" : type === "identity" ? "Relationship" : "Reflection",
    sourceMessageId: conversation.messages.at(-2).id,
    summary: text,
    candidateId: candidate?.id || null,
  };
  record(state, "conversation.message_sent", { conversation_id: conversation.id, candidate_type: type || "none" });
  return { state, response, candidate, error: null };
}

export function confirmContext(input, contextId, editedValue = null) {
  const state = clone(input);
  const context = state.contexts.find((item) => item.id === contextId && item.status === "candidate");
  if (!context) throw new Error("candidate_not_found");
  if (editedValue !== null) context.value = cleanText(editedValue);
  if (!context.value) throw new Error("context_value_required");
  context.status = "confirmed";
  context.confirmedDay = state.clock.today;
  record(state, "context.confirmed", { context_id: context.id, type: context.type });
  return state;
}

export function rejectContext(input, contextId) {
  const state = clone(input);
  const context = state.contexts.find((item) => item.id === contextId && item.status === "candidate");
  if (!context) throw new Error("candidate_not_found");
  context.status = "rejected";
  record(state, "context.rejected", { context_id: context.id, type: context.type });
  return state;
}

export function completeConversation(input) {
  const state = clone(input);
  const conversation = state.conversations.find((item) => item.id === state.activeConversationId && item.status === "open");
  if (!conversation || !conversation.messages.some((item) => item.role === "user")) throw new Error("conversation_not_ready");
  conversation.status = "completed";
  conversation.completedDay = state.clock.today;
  const draft = conversation.pendingEvent;
  const candidate = draft?.candidateId ? state.contexts.find((item) => item.id === draft.candidateId) : null;
  const shouldCreate = draft && (!candidate || candidate.status === "confirmed");
  if (shouldCreate) {
    const copy = COPY[state.locale];
    const key = candidate?.type || "reflection";
    const title = key === "goal" ? copy.eventGoal : key === "preference" ? copy.eventPreference : key === "identity" ? copy.eventIdentity : copy.eventReflection;
    const event = {
      id: nextId(state, "event"),
      type: draft.type,
      day: state.clock.today,
      title,
      summary: candidate?.value || draft.summary,
      sourceConversationId: conversation.id,
      sourceMessageId: draft.sourceMessageId,
      contextId: candidate?.id || null,
    };
    state.relationshipEvents.push(event);
    state.relationship.latestEventId = event.id;
    state.relationship.stage = "growing";
    record(state, "relationship.event_created", { event_id: event.id, type: event.type });
  }
  state.activeConversationId = null;
  record(state, "conversation.completed", { conversation_id: conversation.id, event_created: shouldCreate });
  return state;
}

export function advanceDay(input, days = 1) {
  const state = clone(input);
  const safeDays = Math.max(1, Math.min(30, Number(days) || 1));
  state.clock.today = dateFromNumber(dayNumber(state.clock.today) + safeDays);
  prepareFollowup(state);
  record(state, "test_clock.advanced", { days: safeDays });
  return state;
}

function prepareFollowup(state) {
  if (!state.preferences.proactiveFollowups) return null;
  const latestGoal = activeContext(state, "goal").at(-1);
  if (!latestGoal) return null;
  const sourceEvent = state.relationshipEvents.find((item) => item.contextId === latestGoal.id);
  if (!sourceEvent || dayNumber(sourceEvent.day) >= dayNumber(state.clock.today)) return null;
  const existing = state.followups.find((item) => item.contextId === latestGoal.id && item.day === state.clock.today);
  if (existing) return existing;
  const followup = {
    id: nextId(state, "followup"),
    day: state.clock.today,
    status: "ready",
    contextId: latestGoal.id,
    contextSnapshot: latestGoal.value,
    sourceEventId: sourceEvent.id,
  };
  state.followups.push(followup);
  record(state, "followup.ready", { followup_id: followup.id, source_event_id: sourceEvent.id });
  return followup;
}

export function refreshDerivedState(input) {
  const state = clone(input);
  prepareFollowup(state);
  return state;
}

export function updateContext(input, contextId, rawValue) {
  const state = clone(input);
  const context = state.contexts.find((item) => item.id === contextId && item.status === "confirmed");
  if (!context) throw new Error("confirmed_context_not_found");
  const value = cleanText(rawValue);
  if (!value) throw new Error("context_value_required");
  context.value = value;
  context.editedDay = state.clock.today;
  record(state, "context.edited", { context_id: context.id });
  return state;
}

export function deleteContext(input, contextId) {
  const state = clone(input);
  const context = state.contexts.find((item) => item.id === contextId && item.status === "confirmed");
  if (!context) throw new Error("confirmed_context_not_found");
  context.status = "deleted";
  context.deletedDay = state.clock.today;
  state.followups.forEach((followup) => {
    if (followup.contextId === contextId && followup.status === "ready") followup.status = "cancelled";
  });
  record(state, "context.deleted", { context_id: context.id });
  return state;
}

export function setProactiveFollowups(input, enabled) {
  const state = clone(input);
  state.preferences.proactiveFollowups = Boolean(enabled);
  if (!enabled) state.followups.forEach((item) => { if (item.status === "ready") item.status = "cancelled"; });
  record(state, "relationship.preferences_changed", { proactive_followups: Boolean(enabled) });
  return state;
}

export function setFault(input, fault, enabled) {
  const state = clone(input);
  if (!(fault in state.faults)) throw new Error("unknown_fault");
  state.faults[fault] = Boolean(enabled);
  return state;
}

export function getProductView(state) {
  const locale = normalizeLocale(state.locale);
  const copy = COPY[locale];
  const followup = state.followups.find((item) => item.day === state.clock.today && item.status === "ready") || null;
  const events = [...state.relationshipEvents].reverse();
  const contexts = activeContext(state);
  const relationshipDays = state.relationship ? Math.max(1, dayNumber(state.clock.today) - dayNumber(state.relationship.startedDay) + 1) : 0;
  return {
    copy,
    followup,
    events,
    contexts,
    candidates: state.contexts.filter((item) => item.status === "candidate"),
    relationshipDays,
    relationshipStage: state.relationship?.stage === "growing" ? copy.stageGrowing : copy.stageNew,
    latestEvent: events[0] || null,
    activeConversation: state.conversations.find((item) => item.id === state.activeConversationId && item.status === "open") || null,
  };
}

export function runDomainSelfTests() {
  const results = [];
  const test = (name, callback) => {
    try { callback(); results.push({ name, status: "pass" }); }
    catch (error) { results.push({ name, status: "fail", detail: error.message }); }
  };
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  let state;
  let candidateId;
  let sourceEventId;

  test("首次状态不伪造关系或记忆", () => {
    state = createInitialState({ locale: "zh-CN", today: "2026-07-18" });
    assert(!state.relationship && state.contexts.length === 0, "initial state is not empty");
  });
  test("Onboarding 建立 Relationship", () => {
    state = createRelationship(state, { name: "测试用户" });
    assert(state.relationship && state.analytics.some((item) => item.name === "first_relationship.created"), "relationship missing");
  });
  test("真实输入生成候选 Context，而非自动保存", () => {
    const sent = sendMessage(state, "我想在这个月完成第一版产品");
    state = sent.state; candidateId = sent.candidate.id;
    assert(sent.candidate.type === "goal" && activeContext(state).length === 0, "candidate was auto-confirmed");
  });
  test("用户确认后 Context 才可检索", () => {
    state = confirmContext(state, candidateId);
    assert(activeContext(state, "goal").length === 1, "confirmed goal not retrievable");
  });
  test("每次 Conversation 最多生成一个高价值 Event", () => {
    state = completeConversation(state);
    assert(state.relationshipEvents.length === 1, "event count is not one");
    sourceEventId = state.relationshipEvents[0].id;
  });
  test("同一天不会伪造次日 Follow-up", () => {
    state = refreshDerivedState(state);
    assert(!getProductView(state).followup, "same-day follow-up created");
  });
  test("测试时钟进入次日后生成有来源 Follow-up", () => {
    state = advanceDay(state);
    const followup = getProductView(state).followup;
    assert(followup && followup.sourceEventId === sourceEventId && followup.contextId === candidateId, "follow-up source mismatch");
  });
  test("Follow-up 可继续到同一 Conversation", () => {
    const followup = getProductView(state).followup;
    state = startConversation(state, { followupId: followup.id });
    const conversation = getProductView(state).activeConversation;
    assert(conversation.sourceFollowupId === followup.id && conversation.messages[0].source.eventId === sourceEventId, "continuation source missing");
  });
  test("删除 Context 后下一轮不再引用", () => {
    state = deleteContext(state, candidateId);
    const sent = sendMessage(state, "今天继续聊聊");
    state = sent.state;
    assert(!sent.response.usedContextIds.includes(candidateId), "deleted context was used");
  });
  test("关闭主动 Follow-up 会取消待发送项", () => {
    let local = createRelationship(createInitialState({ today: "2026-07-18" }));
    let sent = sendMessage(local, "我计划完成一次用户测试"); local = confirmContext(sent.state, sent.candidate.id); local = completeConversation(local); local = advanceDay(local); local = setProactiveFollowups(local, false);
    assert(!getProductView(local).followup, "follow-up remained ready");
  });
  test("Context 故障时对话降级且明确不知道", () => {
    let local = setFault(state, "context", true);
    const sent = sendMessage(local, "请帮我继续");
    assert(sent.response && sent.state.analytics.some((item) => item.name === "context.retrieval_failed"), "context failure not handled");
  });
  test("模型故障保留用户消息并允许重试", () => {
    let local = setFault(state, "model", true);
    const before = getProductView(local).activeConversation.messages.length;
    const sent = sendMessage(local, "这条消息需要保留");
    assert(sent.error === "model_unavailable" && getProductView(sent.state).activeConversation.messages.length === before + 2, "model fallback failed");
  });
  test("网络故障显示可观察的本地降级回复", () => {
    let local = setFault(state, "network", true);
    const sent = sendMessage(local, "测试网络故障");
    assert(sent.error === "network_unavailable" && sent.response?.error === "network_unavailable", "network fallback was not visible");
  });
  test("状态契约可持久化往返", () => {
    const restored = JSON.parse(JSON.stringify(state));
    assert(isValidState(restored) && restored.relationship.id === state.relationship.id, "state round-trip failed");
  });
  return results;
}
