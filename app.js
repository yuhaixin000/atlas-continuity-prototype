(function () {
  "use strict";

  const PROTOTYPE_VERSION = "continuity-web-prototype-v0.2";
  const SCHEMA_VERSION = "atlas-unmoderated-v1";
  const TASK_ORDER = ["followup", "memory", "timeline", "model"];

  const messages = {
    "en-US": {
      prototype_label: "ATLAS · WEB PROTOTYPE",
      title_followup: "Good morning, Alex",
      title_memory: "Your saved context",
      title_timeline: "Eighteen days together",
      title_model: "Protect your continuity",
      title_results: "Complete the test",
      reset: "Reset prototype data",
      close: "Close",
      identity_notice: "This is an AI product concept using fictional data. It is not a human or a live AI service.",
      about_minutes: "8–12 min",
      current_task: "CURRENT TASK",
      go_to_task: "Go to task",
      cannot_complete: "I can’t complete this task",
      finish_test: "Finish test",
      task_followup_title: "Choose what to do with yesterday’s unfinished topic.",
      task_followup_copy: "Use the prototype as you normally would. There is no single preferred choice.",
      task_memory_title: "A saved presentation time is wrong.",
      task_memory_copy: "Find it, then correct Friday 10:00 AM to Monday 2:00 PM—or delete it.",
      task_timeline_title: "Find why today’s conversation refers to the presentation.",
      task_timeline_copy: "Use the shared history to identify the source moment.",
      task_model_title: "A model update may change the conversation style.",
      task_model_copy: "Review the difference and decide whether to use the update or keep the prior version.",
      task_results_title: "All four tasks are complete.",
      task_results_copy: "Make a price choice and generate your anonymous result code.",
      relationship_day: "Relationship day 18",
      growing_together: "Growing together",
      from_yesterday: "FROM YESTERDAY",
      followup_heading: "Ready to shape the opening?",
      followup_copy: "You were preparing a short project presentation. You wanted one concise check-in today—no repeated reminders.",
      followup_source: "Source: Yesterday’s conversation · 4:42 PM",
      continue_this: "Continue this",
      not_now: "Not now",
      review_memory: "Review what Atlas remembered",
      conversation: "CONVERSATION",
      assistant_followup: "Yesterday you wanted a concise opening. Would you like to draft the first two sentences now?",
      draft_with_me: "Draft with me",
      already_finished: "I already finished it",
      your_boundary: "YOUR BOUNDARY",
      proactive_followups: "Proactive follow-ups",
      boundary_copy: "Ask once about unfinished topics. Never repeat a skipped reminder.",
      allow_followups: "Allow proactive follow-ups",
      memory_ledger: "MEMORY LEDGER",
      what_atlas_may_use: "What Atlas may use",
      saved_count: "{count} saved",
      memory_control_copy: "You control every saved detail. Changes take effect in the next conversation.",
      current_goal: "CURRENT GOAL",
      allowed: "Allowed",
      project_presentation: "Project presentation",
      presentation_old_time: "Friday at 10:00 AM",
      from_july_16: "From your conversation on July 16",
      confirmed_july_16: "Confirmed by you on July 16",
      personal_context: "PERSONAL CONTEXT",
      your_dog: "Your dog",
      communication: "COMMUNICATION",
      checkin_style: "Check-in style",
      concise_style: "Concise; no long motivational messages",
      interaction_boundary: "INTERACTION BOUNDARY",
      followup_preference: "Follow-up preference",
      ask_once: "Ask once the next day; do not repeat",
      correct: "Correct",
      delete: "Delete",
      relationship_timeline: "RELATIONSHIP TIMELINE",
      shared_journey: "Our shared journey",
      eighteen_days: "18 days",
      timeline_copy: "Meaningful moments—not a transcript of every message.",
      all: "All",
      goals: "Goals",
      relationship: "Relationship",
      date_day_17: "JUL 16 · DAY 17",
      presentation_goal_began: "Presentation goal began",
      presentation_goal_copy: "You asked Atlas to help make the opening practical and concise.",
      why_matters: "See why this matters",
      date_day_11: "JUL 10 · DAY 11",
      boundary_event: "You set a communication boundary",
      boundary_event_copy: "Atlas should keep check-ins brief and avoid repeated reminders.",
      view_source_control: "View source and control",
      date_day_1: "JUN 29 · DAY 1",
      first_conversation: "Your first conversation",
      first_conversation_copy: "You chose practical support and user-controlled memory.",
      model_change: "MODEL CHANGE",
      review_before_switching: "Review before switching",
      preview: "Preview",
      model_change_copy: "An update may change tone or recall behavior. Your memories and timeline remain yours.",
      current: "CURRENT",
      available: "AVAILABLE",
      what_may_change: "What may feel different",
      change_shorter: "Shorter opening responses",
      change_confirm: "Stricter confirmation before saving context",
      change_memory: "Existing memories remain visible and editable",
      same_moment: "SAME MOMENT, TWO STYLES",
      comparison_prompt: "You say: “I’m nervous about the presentation.”",
      current_response: "1.4 · CURRENT",
      response_14: "That makes sense. Yesterday you wanted a concise opening—should we rehearse just those two lines?",
      preview_response: "1.5 · PREVIEW",
      response_15: "Let’s focus on the opening you planned yesterday. Want to rehearse the first two lines?",
      use_update: "Use the update",
      keep_old_version: "Keep version 1.4",
      restore_note: "You can restore the prior version for 30 days. No memories are deleted.",
      final_step: "FINAL STEP",
      your_choice: "Your choice",
      tasks_complete: "Tasks complete",
      survey_intro: "These are research concepts, not a sales offer. Choose what you would do today.",
      price_question: "Which option, if any, would you choose?",
      price_none: "No subscription",
      price_none_copy: "Keep using current tools",
      price_essential_copy: "Follow-up + memory controls",
      price_continuity_copy: "Essential + timeline + update protection",
      price_portable_copy: "Continuity + export and migration",
      price_note_us: "US research concept · monthly · USD",
      price_note_cn: "China research concept · monthly · CNY · exploratory only",
      choice_reason: "What is the main reason for your choice?",
      value_summary: "In one sentence, what do you think Atlas is for?",
      no_personal_info: "Do not include names, contact details or sensitive personal information.",
      would_use: "Would you use a working version again next week?",
      choose_one: "Choose one",
      definitely: "Definitely",
      maybe: "Maybe",
      unlikely: "Unlikely",
      beta_interest: "I would join a limited beta for the option I selected. No contact information is collected here.",
      safe_text_confirm: "I did not include real names, contact details or sensitive personal information.",
      generate_result: "Generate anonymous result",
      nav_today: "Today",
      nav_memory: "Memory",
      nav_timeline: "Timeline",
      nav_update: "Update",
      privacy: "Privacy & data",
      research_test: "ATLAS RESEARCH TEST",
      welcome_heading: "Help test relationship continuity",
      welcome_copy: "This 8–12 minute prototype uses fictional data. It has no live AI and will not automatically upload your answers.",
      interface_language: "Interface language",
      research_region: "Research region",
      region_us: "United States",
      region_cn: "China mainland",
      consent_fact_1: "Only task actions and time are recorded in the result.",
      consent_fact_2: "No account, email, IP address, device fingerprint or real chat is collected by this page.",
      consent_fact_3: "You decide whether to copy or download the result at the end.",
      adult_consent: "I am 18 or older and agree to participate in this product test.",
      start_test: "Start test",
      correct_memory: "CORRECT MEMORY",
      update_detail: "Update saved detail",
      what_use_next: "What should Atlas use next time?",
      old_marked_outdated: "The earlier value will be marked outdated, not silently merged.",
      save_correction: "Save correction",
      cancel: "Cancel",
      delete_memory: "DELETE MEMORY",
      stop_using: "Stop using this detail?",
      delete_description: "Atlas will stop using “{value}” in future conversations. Reset restores the fictional data.",
      timeline_source: "TIMELINE SOURCE",
      detail_source: "Source · July 16 conversation · Confirmed by Alex",
      presentation_detail: "This event explains why today’s conversation refers back to the presentation opening.",
      boundary_detail: "This event explains why today’s follow-up is concise and will not repeat after you skip it.",
      done: "Done",
      privacy_heading: "Your result stays with you",
      privacy_copy: "This page does not automatically send results anywhere. It stores the current test only in memory, plus your language preference in local browser storage. At the end you can preview, copy or download the result.",
      privacy_warning: "Do not enter real names, contact details, health information or other sensitive personal content.",
      anonymous_result: "ANONYMOUS RESULT",
      result_ready: "Your result is ready",
      result_copy: "Send the result code to the researcher. You can preview exactly what it contains first.",
      preview_data: "Preview result data",
      copy_result: "Copy result code",
      download_json: "Download JSON",
      toast_followup_continue: "Yesterday’s topic is ready to continue.",
      toast_followup_skip: "Skipped. Atlas will not repeat this reminder.",
      toast_followup_on: "Proactive follow-ups are on.",
      toast_followup_off: "Proactive follow-ups are off.",
      toast_correction: "Correction saved. Atlas will use the new value next time.",
      toast_deleted: "Memory deleted. Atlas will no longer use it.",
      corrected_source: "Corrected by you just now · earlier value marked outdated",
      toast_update: "Update selected. Prior behavior remains restorable.",
      toast_keep_old: "Version 1.4 kept. No memories were changed.",
      toast_task_complete: "Task complete. The next task is ready.",
      toast_task_failed: "Recorded as not completed. Continue to the next task.",
      toast_all_tasks: "All four tasks are complete. Please finish the short survey.",
      toast_price_required: "Choose a price option before continuing.",
      toast_copied: "Result code copied.",
      toast_copy_failed: "Copy was blocked. Select the code and copy it manually.",
      update_selected: "Update selected",
      old_selected: "Version 1.4 selected",
    },
    "zh-CN": {
      prototype_label: "ATLAS · 网页验证原型",
      title_followup: "早上好，Alex",
      title_memory: "你保存的情境",
      title_timeline: "共同走过18天",
      title_model: "保护关系连续性",
      title_results: "完成测试",
      reset: "重置原型数据",
      close: "关闭",
      identity_notice: "这是使用虚构数据的 AI 产品概念原型，不是真人，也不提供实时 AI 服务。",
      about_minutes: "约8–12分钟",
      current_task: "当前任务",
      go_to_task: "前往任务",
      cannot_complete: "我无法完成这项任务",
      finish_test: "完成测试",
      task_followup_title: "决定如何处理昨天没有完成的话题。",
      task_followup_copy: "请按照你平时的方式操作，没有唯一正确选择。",
      task_memory_title: "演示时间被记错了。",
      task_memory_copy: "找到这条记忆，把周五上午10点改成周一下午2点，或者删除它。",
      task_timeline_title: "找出今天的对话为什么会提到演示。",
      task_timeline_copy: "请从共同经历中找到对应的来源事件。",
      task_model_title: "模型更新可能改变对话风格。",
      task_model_copy: "查看差异，然后决定使用更新还是保留旧版本。",
      task_results_title: "四项任务均已完成。",
      task_results_copy: "请选择一个价格概念，并生成匿名结果码。",
      relationship_day: "关系第18天",
      growing_together: "共同成长中",
      from_yesterday: "来自昨天",
      followup_heading: "继续完善开场吗？",
      followup_copy: "你正在准备一个简短的项目演示。你希望今天只收到一次简洁跟进，不要重复提醒。",
      followup_source: "来源：昨天的对话 · 下午4:42",
      continue_this: "继续这个话题",
      not_now: "暂时不继续",
      review_memory: "查看 Atlas 记住了什么",
      conversation: "对话",
      assistant_followup: "昨天你希望开场简洁一些。现在要一起起草开头两句话吗？",
      draft_with_me: "一起起草",
      already_finished: "我已经完成了",
      your_boundary: "你的互动边界",
      proactive_followups: "主动跟进",
      boundary_copy: "未完成话题只询问一次；跳过后不再重复提醒。",
      allow_followups: "允许主动跟进",
      memory_ledger: "记忆账本",
      what_atlas_may_use: "Atlas 可以使用的内容",
      saved_count: "已保存 {count} 条",
      memory_control_copy: "每一条长期信息都由你控制，修改会从下一次对话开始生效。",
      current_goal: "当前目标",
      allowed: "允许使用",
      project_presentation: "项目演示",
      presentation_old_time: "周五上午10:00",
      from_july_16: "来自7月16日的对话",
      confirmed_july_16: "你已在7月16日确认",
      personal_context: "个人情境",
      your_dog: "你的狗",
      communication: "交流方式",
      checkin_style: "跟进风格",
      concise_style: "保持简洁，不要长篇鼓励",
      interaction_boundary: "互动边界",
      followup_preference: "跟进偏好",
      ask_once: "第二天询问一次，不要重复",
      correct: "纠正",
      delete: "删除",
      relationship_timeline: "关系时间线",
      shared_journey: "我们的共同经历",
      eighteen_days: "18天",
      timeline_copy: "这里只记录有意义的时刻，而不是复制所有聊天记录。",
      all: "全部",
      goals: "目标",
      relationship: "关系",
      date_day_17: "7月16日 · 第17天",
      presentation_goal_began: "开始准备项目演示",
      presentation_goal_copy: "你希望 Atlas 帮助你把开场做得务实而简洁。",
      why_matters: "查看这件事为何重要",
      date_day_11: "7月10日 · 第11天",
      boundary_event: "你设定了交流边界",
      boundary_event_copy: "Atlas 的跟进应保持简短，而且不能重复提醒。",
      view_source_control: "查看来源和控制方式",
      date_day_1: "6月29日 · 第1天",
      first_conversation: "第一次对话",
      first_conversation_copy: "你选择了务实支持和用户可控记忆。",
      model_change: "模型变更",
      review_before_switching: "切换前先查看变化",
      preview: "预览",
      model_change_copy: "更新可能改变语气或回忆方式，但记忆与时间线仍由你掌控。",
      current: "当前版本",
      available: "可用更新",
      what_may_change: "可能感受到的变化",
      change_shorter: "开场回复更简短",
      change_confirm: "保存情境前进行更严格的确认",
      change_memory: "已有记忆仍然可见、可编辑",
      same_moment: "同一时刻，两种风格",
      comparison_prompt: "你说：“我对演示有点紧张。”",
      current_response: "1.4 · 当前版本",
      response_14: "这种紧张很正常。昨天你希望开场简洁一些——要不要只排练那两句话？",
      preview_response: "1.5 · 更新预览",
      response_15: "先专注昨天准备的开场吧。要排练前两句话吗？",
      use_update: "使用新版本",
      keep_old_version: "保留1.4版本",
      restore_note: "30天内可以恢复旧版本，不会删除任何记忆。",
      final_step: "最后一步",
      your_choice: "你的选择",
      tasks_complete: "任务已完成",
      survey_intro: "这些只是研究概念，不是销售报价。请选择你今天真正会做的选择。",
      price_question: "如果现在选择，你会使用哪一个方案？",
      price_none: "不订阅",
      price_none_copy: "继续使用现有工具",
      price_essential_copy: "昨日续接 + 记忆控制",
      price_continuity_copy: "基础版 + 时间线 + 更新保护",
      price_portable_copy: "连续性版 + 导出与迁移",
      price_note_us: "美国研究价格概念 · 月付 · 美元",
      price_note_cn: "中国市场探索价格概念 · 月付 · 人民币 · 非最终定价",
      choice_reason: "你这样选择的主要原因是什么？",
      value_summary: "请用一句话说明你认为 Atlas 是做什么的。",
      no_personal_info: "请勿填写姓名、联系方式或敏感个人信息。",
      would_use: "如果有可用版本，下周你还会使用吗？",
      choose_one: "请选择",
      definitely: "一定会",
      maybe: "可能会",
      unlikely: "不太可能",
      beta_interest: "我愿意参加所选方案的限量 Beta 测试；本页面不会收集联系方式。",
      safe_text_confirm: "我没有填写真实姓名、联系方式或敏感个人信息。",
      generate_result: "生成匿名结果",
      nav_today: "今天",
      nav_memory: "记忆",
      nav_timeline: "时间线",
      nav_update: "更新",
      privacy: "隐私与数据",
      research_test: "ATLAS 产品研究",
      welcome_heading: "帮助测试关系连续性",
      welcome_copy: "测试约需8–12分钟，全部使用虚构数据，没有实时 AI，也不会自动上传你的答案。",
      interface_language: "界面语言",
      research_region: "研究地区",
      region_us: "美国",
      region_cn: "中国大陆",
      consent_fact_1: "结果只记录任务操作和时间。",
      consent_fact_2: "本页面不收集账号、邮箱、IP地址、设备指纹或真实聊天内容。",
      consent_fact_3: "测试结束时由你决定是否复制或下载结果。",
      adult_consent: "我已满18岁，并同意参加本次产品测试。",
      start_test: "开始测试",
      correct_memory: "纠正记忆",
      update_detail: "修改已保存信息",
      what_use_next: "Atlas 下次应该使用什么内容？",
      old_marked_outdated: "旧内容会被标记为已过期，不会与新内容悄悄合并。",
      save_correction: "保存纠正",
      cancel: "取消",
      delete_memory: "删除记忆",
      stop_using: "停止使用这条信息？",
      delete_description: "Atlas 将停止在未来对话中使用“{value}”。重置原型可以恢复虚构数据。",
      timeline_source: "时间线来源",
      detail_source: "来源 · 7月16日对话 · Alex 已确认",
      presentation_detail: "这件事说明了今天的对话为什么会继续提到项目演示的开场。",
      boundary_detail: "这件事说明了为什么今天的跟进很简短，而且在你跳过后不会重复。",
      done: "完成",
      privacy_heading: "结果由你掌控",
      privacy_copy: "本页面不会自动发送结果。当前测试只保存在浏览器内存中，语言偏好会保存在本地浏览器。测试结束后，你可以预览、复制或下载结果。",
      privacy_warning: "请勿输入真实姓名、联系方式、健康信息或其他敏感个人内容。",
      anonymous_result: "匿名结果",
      result_ready: "结果已生成",
      result_copy: "请把结果码发给研究人员。发送前可以先预览其中的全部内容。",
      preview_data: "预览结果数据",
      copy_result: "复制结果码",
      download_json: "下载JSON",
      toast_followup_continue: "已准备好继续昨天的话题。",
      toast_followup_skip: "已跳过，Atlas 不会重复提醒。",
      toast_followup_on: "主动跟进已开启。",
      toast_followup_off: "主动跟进已关闭。",
      toast_correction: "纠正已保存，Atlas 下次会使用新内容。",
      toast_deleted: "记忆已删除，Atlas 将停止使用。",
      corrected_source: "你刚刚完成了纠正 · 旧内容已标记过期",
      toast_update: "已选择新版本，30天内仍可恢复旧版本。",
      toast_keep_old: "已保留1.4版本，记忆没有变化。",
      toast_task_complete: "任务已完成，可以继续下一项。",
      toast_task_failed: "已记录为未完成，请继续下一项任务。",
      toast_all_tasks: "四项任务均已完成，请填写简短问卷。",
      toast_price_required: "请先选择一个价格方案。",
      toast_copied: "结果码已复制。",
      toast_copy_failed: "浏览器阻止了复制，请手动选择并复制结果码。",
      update_selected: "已选择新版本",
      old_selected: "已选择1.4版本",
    },
  };

  const state = {
    sessionId: createSessionId(),
    locale: preferredLocale(),
    market: "US",
    startedAt: null,
    startedClock: null,
    events: [],
    tasks: Object.fromEntries(TASK_ORDER.map((task) => [task, { status: "pending", outcome: null, completed_ms: null }])),
    deletedMemories: new Set(),
    survey: null,
    result: null,
  };

  let activeMemoryId = null;
  let pendingDeleteId = null;
  let toastTimer = null;

  const title = document.querySelector("#screen-title");
  const toast = document.querySelector("#toast");
  const onboardingDialog = document.querySelector("#onboarding-dialog");
  const memoryDialog = document.querySelector("#memory-dialog");
  const memoryInput = document.querySelector("#memory-input");
  const confirmDialog = document.querySelector("#confirm-dialog");
  const detailDialog = document.querySelector("#detail-dialog");
  const privacyDialog = document.querySelector("#privacy-dialog");
  const resultDialog = document.querySelector("#result-dialog");

  function createSessionId() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") return globalThis.crypto.randomUUID();
    if (globalThis.crypto && typeof globalThis.crypto.getRandomValues === "function") {
      const bytes = new Uint8Array(16);
      globalThis.crypto.getRandomValues(bytes);
      return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
    }
    return `fallback-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }

  function preferredLocale() {
    let saved = null;
    try { saved = localStorage.getItem("atlas.prototype.locale"); } catch (_error) { /* storage is optional */ }
    if (messages[saved]) return saved;
    return navigator.language && navigator.language.toLowerCase().startsWith("zh") ? "zh-CN" : "en-US";
  }

  function t(key, replacements = {}) {
    let value = messages[state.locale][key] || messages["en-US"][key] || key;
    for (const [name, replacement] of Object.entries(replacements)) {
      value = value.replaceAll(`{${name}}`, String(replacement));
    }
    return value;
  }

  function setLocale(locale, shouldRecord = true) {
    if (!messages[locale]) return;
    state.locale = locale;
    try { localStorage.setItem("atlas.prototype.locale", locale); } catch (_error) { /* storage is optional */ }
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      element.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const text = t(element.dataset.i18nAria);
      element.setAttribute("aria-label", text);
      element.title = text;
    });
    document.querySelectorAll(".language-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.locale === locale);
    });
    document.querySelector("#locale-select").value = locale;
    updateMemoryCount();
    updateGuide();
    updatePrices();
    const activeScreen = document.querySelector("[data-screen]:not([hidden])");
    if (activeScreen) title.textContent = t(`title_${activeScreen.dataset.screen}`);
    if (shouldRecord) recordEvent("locale_changed", { locale });
  }

  function setMarket(market, shouldRecord = true) {
    state.market = market === "CN" ? "CN" : "US";
    document.querySelector("#market-select").value = state.market;
    updatePrices();
    if (shouldRecord) recordEvent("market_changed", { market: state.market });
  }

  function updatePrices() {
    const prices = state.market === "CN"
      ? { none: "¥0", essential: "¥39", continuity: "¥69", portable: "¥99" }
      : { none: "$0", essential: "$9.99", continuity: "$14.99", portable: "$19.99" };
    for (const [plan, value] of Object.entries(prices)) {
      document.querySelector(`#price-${plan}`).textContent = value;
    }
    document.querySelector("#price-note").textContent = t(state.market === "CN" ? "price_note_cn" : "price_note_us");
  }

  function elapsedMs() {
    return state.startedClock === null ? 0 : Math.max(0, Math.round(performance.now() - state.startedClock));
  }

  function recordEvent(name, details = {}) {
    if (state.startedAt === null) return;
    const safeDetails = {};
    for (const key of ["screen", "task", "outcome", "locale", "market", "choice", "event_id"]) {
      if (details[key] !== undefined) safeDetails[key] = details[key];
    }
    state.events.push({ event: name, t_ms: elapsedMs(), ...safeDetails });
  }

  function navigate(screenName, shouldRecord = true) {
    const target = document.querySelector(`[data-screen="${screenName}"]`);
    if (!target) return;
    document.querySelectorAll("[data-screen]").forEach((screen) => {
      const isTarget = screen === target;
      screen.hidden = !isTarget;
      screen.classList.toggle("is-active", isTarget);
    });
    document.querySelectorAll(".nav-button").forEach((button) => {
      const isTarget = button.dataset.go === screenName;
      button.classList.toggle("is-active", isTarget);
      if (isTarget) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    title.textContent = t(`title_${screenName}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (shouldRecord) recordEvent("screen_viewed", { screen: screenName });
  }

  function currentTask() {
    return TASK_ORDER.find((task) => state.tasks[task].status === "pending") || "results";
  }

  function updateGuide() {
    const completed = TASK_ORDER.filter((task) => state.tasks[task].status !== "pending").length;
    const task = currentTask();
    document.querySelector("#progress-label").textContent = `${completed} / ${TASK_ORDER.length}`;
    document.querySelector("#progress-fill").style.width = `${(completed / TASK_ORDER.length) * 100}%`;
    document.querySelector("#task-heading").textContent = t(`task_${task}_title`);
    document.querySelector("#task-instruction").textContent = t(`task_${task}_copy`);
    const button = document.querySelector("#go-task-button");
    button.dataset.target = task;
    button.textContent = t(task === "results" ? "finish_test" : "go_to_task");
    document.querySelector("#cannot-complete-button").hidden = task === "results";
  }

  function completeTask(task, outcome, status = "independent_success") {
    if (state.tasks[task].status !== "pending") return;
    state.tasks[task] = { status, outcome, completed_ms: elapsedMs() };
    recordEvent("task_completed", { task, outcome });
    updateGuide();
    if (currentTask() === "results") {
      showToast(t("toast_all_tasks"));
      window.setTimeout(() => navigate("results"), 700);
    } else {
      showToast(t("toast_task_complete"));
    }
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 2600);
  }

  function memoryCard(id) {
    return document.querySelector(`[data-memory-id="${id}"]`);
  }

  function updateMemoryCount() {
    const count = document.querySelectorAll(".memory-card:not([hidden])").length;
    document.querySelector("#memory-count").textContent = t("saved_count", { count });
  }

  function openMemoryEditor(id) {
    const card = memoryCard(id);
    if (!card) return;
    activeMemoryId = id;
    document.querySelector("#memory-dialog-title").textContent = t("update_detail");
    memoryInput.value = card.querySelector(".memory-value").textContent.trim();
    memoryDialog.showModal();
    memoryInput.focus();
    memoryInput.select();
    recordEvent("memory_editor_opened", { task: "memory" });
  }

  function encodeResult(result) {
    const bytes = new TextEncoder().encode(JSON.stringify(result));
    let binary = "";
    for (let index = 0; index < bytes.length; index += 8192) {
      binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
    }
    return `ATLAS-UT1-${btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")}`;
  }

  function buildResult(formData) {
    const completedAt = new Date().toISOString();
    return {
      schema_version: SCHEMA_VERSION,
      prototype_version: PROTOTYPE_VERSION,
      session_id: state.sessionId,
      locale: state.locale,
      market: state.market,
      consent: { adult_confirmed: true, research_consent: true, automatic_upload: false },
      timing: {
        started_at: state.startedAt,
        completed_at: completedAt,
        duration_seconds: Math.round(elapsedMs() / 1000),
      },
      tasks: JSON.parse(JSON.stringify(state.tasks)),
      survey: {
        price_choice: formData.get("price"),
        choice_reason: document.querySelector("#choice-reason").value.trim(),
        value_summary: document.querySelector("#value-summary").value.trim(),
        would_use_next_week: document.querySelector("#would-use").value,
        beta_interest: document.querySelector("#beta-interest").checked,
        safe_text_confirmed: document.querySelector("#confirm-safe-text").checked,
      },
      events: state.events,
      data_boundary: {
        automatic_upload: false,
        account_collected: false,
        contact_collected: false,
        memory_input_values_recorded: false,
      },
    };
  }

  function showResult(result) {
    state.result = result;
    document.querySelector("#result-preview").textContent = JSON.stringify(result, null, 2);
    document.querySelector("#result-code").value = encodeResult(result);
    resultDialog.showModal();
  }

  async function copyResult() {
    const field = document.querySelector("#result-code");
    try {
      await navigator.clipboard.writeText(field.value);
      showToast(t("toast_copied"));
    } catch (_error) {
      field.focus();
      field.select();
      const copied = document.execCommand("copy");
      showToast(t(copied ? "toast_copied" : "toast_copy_failed"));
    }
  }

  function downloadResult() {
    if (!state.result) return;
    const blob = new Blob([`${JSON.stringify(state.result, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `atlas-${state.sessionId}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.go));
  });

  document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => setLocale(button.dataset.locale));
  });

  document.querySelector("#locale-select").addEventListener("change", (event) => setLocale(event.target.value));
  document.querySelector("#market-select").addEventListener("change", (event) => setMarket(event.target.value));

  document.querySelector("#onboarding-form").addEventListener("submit", (event) => {
    event.preventDefault();
    setLocale(document.querySelector("#locale-select").value, false);
    setMarket(document.querySelector("#market-select").value, false);
    state.startedAt = new Date().toISOString();
    state.startedClock = performance.now();
    recordEvent("test_started", { locale: state.locale, market: state.market });
    onboardingDialog.close();
    navigate("followup");
  });
  onboardingDialog.addEventListener("cancel", (event) => event.preventDefault());

  document.querySelector("#go-task-button").addEventListener("click", (event) => navigate(event.currentTarget.dataset.target));
  document.querySelector("#cannot-complete-button").addEventListener("click", () => {
    const task = currentTask();
    if (task === "results") return;
    completeTask(task, "participant_could_not_complete", "failed");
    showToast(t("toast_task_failed"));
  });

  document.querySelector("#continue-button").addEventListener("click", () => {
    document.querySelector("#conversation-preview").hidden = false;
    completeTask("followup", "continued_topic");
    showToast(t("toast_followup_continue"));
  });

  document.querySelector("#skip-button").addEventListener("click", () => {
    document.querySelector(".hero-card").hidden = true;
    completeTask("followup", "skipped_topic");
    showToast(t("toast_followup_skip"));
  });

  document.querySelector("#followup-toggle").addEventListener("change", (event) => {
    completeTask("followup", event.target.checked ? "followup_enabled" : "followup_disabled");
    showToast(t(event.target.checked ? "toast_followup_on" : "toast_followup_off"));
  });

  document.querySelectorAll(".edit-memory").forEach((button) => {
    button.addEventListener("click", () => openMemoryEditor(button.dataset.memory));
  });

  document.querySelectorAll(".delete-memory").forEach((button) => {
    button.addEventListener("click", () => {
      pendingDeleteId = button.dataset.memory;
      const value = memoryCard(pendingDeleteId).querySelector(".memory-value").textContent.trim();
      document.querySelector("#delete-description").textContent = t("delete_description", { value });
      confirmDialog.showModal();
      recordEvent("memory_delete_opened", { task: "memory" });
    });
  });

  document.querySelector("#memory-form").addEventListener("submit", (event) => {
    if (event.submitter && event.submitter.value === "cancel") return;
    event.preventDefault();
    const newValue = memoryInput.value.trim();
    if (!newValue || !activeMemoryId) return;
    const card = memoryCard(activeMemoryId);
    const valueElement = card.querySelector(".memory-value");
    valueElement.removeAttribute("data-i18n");
    valueElement.textContent = newValue;
    card.querySelector(".memory-source").removeAttribute("data-i18n");
    card.querySelector(".memory-source").textContent = t("corrected_source");
    memoryDialog.close();
    completeTask("memory", "corrected_memory");
    showToast(t("toast_correction"));
  });

  document.querySelector("#confirm-delete-button").addEventListener("click", (event) => {
    event.preventDefault();
    const card = memoryCard(pendingDeleteId);
    if (card) {
      card.hidden = true;
      state.deletedMemories.add(pendingDeleteId);
    }
    confirmDialog.close();
    updateMemoryCount();
    completeTask("memory", "deleted_memory");
    showToast(t("toast_deleted"));
    pendingDeleteId = null;
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-selected", item === button));
      document.querySelectorAll(".timeline-event").forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.kind !== filter;
      });
      recordEvent("timeline_filtered", { task: "timeline", outcome: filter });
    });
  });

  document.querySelectorAll(".event-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const isBoundary = button.dataset.event === "boundary";
      document.querySelector("#detail-title").textContent = t(isBoundary ? "boundary_event" : "presentation_goal_began");
      document.querySelector("#detail-copy").textContent = t(isBoundary ? "boundary_detail" : "presentation_detail");
      detailDialog.showModal();
      completeTask("timeline", isBoundary ? "opened_boundary_source" : "opened_goal_source");
    });
  });

  document.querySelector("#keep-update-button").addEventListener("click", (event) => {
    event.currentTarget.setAttribute("aria-pressed", "true");
    event.currentTarget.textContent = t("update_selected");
    completeTask("model", "accepted_update");
    showToast(t("toast_update"));
  });

  document.querySelector("#restore-button").addEventListener("click", (event) => {
    event.currentTarget.setAttribute("aria-pressed", "true");
    event.currentTarget.textContent = t("old_selected");
    completeTask("model", "kept_prior_version");
    showToast(t("toast_keep_old"));
  });

  document.querySelector("#survey-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get("price")) {
      showToast(t("toast_price_required"));
      return;
    }
    recordEvent("survey_completed", { choice: formData.get("price") });
    showResult(buildResult(formData));
  });

  document.querySelector("#privacy-button").addEventListener("click", () => privacyDialog.showModal());
  document.querySelector("#copy-result-button").addEventListener("click", copyResult);
  document.querySelector("#download-result-button").addEventListener("click", downloadResult);
  document.querySelector("#reset-button").addEventListener("click", () => window.location.reload());

  setLocale(state.locale, false);
  setMarket("US", false);
  navigate("followup", false);
  onboardingDialog.showModal();
})();
