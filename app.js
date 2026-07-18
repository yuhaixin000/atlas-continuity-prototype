(function () {
  "use strict";

  const PROTOTYPE_VERSION = "continuity-web-prototype-v0.5";
  const SCHEMA_VERSION = "atlas-unmoderated-v3";
  const PRIVACY_VERSION = "2026-07-18-v3";
  const STUDY_MODE = new URLSearchParams(window.location.search).get("mode") === "qa" ? "technical_qa" : "participant";
  const configuredCollectorUrls = Array.isArray(window.ATLAS_COLLECTOR_URLS)
    ? window.ATLAS_COLLECTOR_URLS
    : [window.ATLAS_COLLECTOR_URL];
  const COLLECTOR_URLS = [...new Set(configuredCollectorUrls.map((value) => String(value || "").replace(/\/$/, "")).filter(Boolean))];
  const PRIMARY_COLLECTOR_URL = COLLECTOR_URLS[0] || "";
  const REQUEST_TIMEOUT_MS = 10000;
  const COLLECTOR_ATTEMPTS = 2;
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
      task_results_copy: "Answer the short research questions. Your anonymous result will submit automatically.",
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
      draft_response: "Here’s a concise opening: “Today I’ll show the problem, what we learned, and the next decision we need to make.” You can adjust the wording before using it.",
      finished_response: "Got it. I’ll mark this topic complete and won’t follow up on it again.",
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
      same_ai_reason: "What, if anything, made this feel like the same AI Alex used yesterday?",
      confusion_point: "Which part was most confusing or least useful?",
      comparison_current: "Compared with the AI tools you use now, how useful was this experience?",
      much_better: "Much better",
      somewhat_better: "Somewhat better",
      about_same: "About the same",
      worse: "Worse",
      not_applicable: "I do not currently use AI tools",
      no_personal_info: "Do not include names, contact details or sensitive personal information.",
      open_answer_hint: "Write your own answer. “I don’t know” or “none” is acceptable. Do not include personal information.",
      would_use: "Would you use a working version again next week?",
      choose_one: "Choose one",
      definitely: "Definitely",
      maybe: "Maybe",
      unlikely: "Unlikely",
      beta_interest_question: "If a limited beta were available, would you apply?",
      beta_yes: "Yes",
      beta_maybe: "Maybe",
      beta_no: "No",
      beta_privacy_note: "This records interest only; no contact information is collected.",
      safe_text_confirm: "I did not include real names, contact details or sensitive personal information.",
      generate_result: "Submit anonymous result",
      nav_today: "Today",
      nav_memory: "Memory",
      nav_timeline: "Timeline",
      nav_update: "Update",
      privacy: "Privacy & data",
      research_test: "ATLAS RESEARCH TEST",
      welcome_heading: "Test a multi-day AI experience",
      welcome_copy: "You will play Alex, who used Atlas on several days and worked on a presentation yesterday. Today Alex returns. Use the fictional interface as you naturally would; there is no live AI.",
      research_context: "We are testing whether the interface can be understood without help—not testing you. Complete four tasks in order. If a task is unclear, choose “I can’t complete this task.”",
      qa_mode_title: "TECHNICAL QA MODE",
      qa_mode_copy: "This submission checks the system and will be excluded from participant research gates.",
      interface_language: "Interface language",
      research_region: "Market used for this research scenario",
      choose_market: "Choose a market",
      region_us: "United States",
      region_cn: "China mainland",
      first_time_question: "Is this your first time completing this prototype?",
      yes: "Yes",
      no: "No",
      ai_use_frequency: "How often do you use AI tools?",
      daily: "Daily",
      several_weekly: "Several times a week",
      occasionally: "Occasionally",
      never: "Never",
      current_ai_type: "What kind of AI tool do you mainly use?",
      general_assistant: "General AI assistant",
      ai_companion: "AI companion",
      other_ai: "Another AI tool",
      no_ai_tool: "I do not use one",
      multi_day_use: "How often do you return to the same AI or conversation across different days?",
      often: "Often",
      sometimes: "Sometimes",
      rarely: "Rarely",
      consent_fact_1: "The result records task actions, time, the choices above and your non-sensitive research answers.",
      consent_fact_2: "Atlas does not persist an IP address, account, email, device fingerprint, real chat or Memory input in the result database.",
      consent_fact_3: "Hosting infrastructure may temporarily process standard network metadata. Stored results are deleted after 30 days.",
      adult_consent: "I am 18 or older and agree to participate in this product test.",
      upload_consent: "I agree that my anonymous result will be submitted automatically and stored for up to 30 days.",
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
      privacy_heading: "Minimal automatic submission",
      privacy_copy: "After explicit consent, the final anonymous result sends task actions, time, research choices and non-sensitive answers to the Atlas prototype collector for up to 30 days. The application database does not persist IP addresses, accounts, email, device fingerprints, real chat or Memory input values. Hosting infrastructure may temporarily process standard request metadata.",
      privacy_warning: "Do not enter real names, contact details, health information or other sensitive personal content. A deletion receipt is available after successful upload.",
      anonymous_result: "ANONYMOUS RESULT",
      result_ready: "Your result is ready",
      result_copy: "The page will submit the anonymous result automatically. The result code remains available as a backup.",
      upload_waiting: "Preparing upload…",
      upload_waiting_copy: "Keep this window open until submission finishes.",
      upload_success: "Result uploaded",
      upload_success_copy: "The anonymous result was stored successfully and will be deleted automatically within 30 days.",
      upload_duplicate: "Result already received",
      upload_duplicate_copy: "This session was already stored; no duplicate record was created.",
      upload_failed: "Upload status not confirmed",
      upload_failed_copy: "Your result remains in this browser. The server may still have received it; retry without reloading, or download the report.",
      upload_timeout_copy: "No confirmation arrived after two attempts. The server may still have received the result. Retry without reloading—the same session will not create a duplicate—or download the report.",
      upload_network_copy: "The browser could not confirm a response from the collector. Retry without reloading—the same session will not create a duplicate—or download the report.",
      upload_rejected_copy: "The collector was reached but rejected this result. Download the report and send it to the researcher for review.",
      collector_not_configured: "The result collector is not configured on this deployment.",
      collector_connection_test: "Open collector connection test",
      receipt_copy: "Save the receipt if you may want to delete this result later.",
      preview_data: "Preview result data",
      copy_result: "Copy result code",
      download_receipt: "Download result and deletion receipt",
      retry_upload: "Retry automatic upload",
      delete_uploaded: "Delete uploaded result",
      deleting: "Deleting uploaded result…",
      deleted_success: "Deletion request completed",
      deleted_success_copy: "The stored result has been deleted and will be removed by the retention job.",
      delete_failed_title: "Deletion status not confirmed",
      delete_failed: "Deletion request did not finish. Keep the downloaded receipt and try again later.",
      toast_followup_continue: "Yesterday’s topic is ready to continue.",
      toast_followup_draft: "A concise opening draft is ready.",
      toast_followup_finished: "Topic completed. Atlas will not follow up again.",
      toast_followup_skip: "Skipped. Atlas will not repeat this reminder.",
      toast_followup_on: "Proactive follow-ups are on.",
      toast_followup_off: "Proactive follow-ups are off.",
      toast_correction: "Correction saved. Atlas will use the new value next time.",
      toast_deleted: "Memory deleted. Atlas will no longer use it.",
      corrected_source: "Corrected by you just now · earlier value marked outdated",
      toast_update: "Update selected. Prior behavior remains restorable.",
      toast_keep_old: "Version 1.4 kept. No memories were changed.",
      toast_timeline_wrong: "That event explains another behavior. Keep looking for the presentation source.",
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
      task_results_copy: "请回答简短研究问题，匿名结果将自动提交。",
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
      draft_response: "可以这样简洁开场：“今天我会说明问题、我们获得的结论，以及接下来需要作出的决定。” 使用前你仍可以调整措辞。",
      finished_response: "知道了。我会把这个话题标记为已完成，不再继续跟进。",
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
      same_ai_reason: "哪些地方（如果有）让你觉得这仍是 Alex 昨天使用的同一个 AI？",
      confusion_point: "哪一部分最令你困惑或最没有用？",
      comparison_current: "与你现在使用的 AI 工具相比，这段体验有多大用处？",
      much_better: "明显更好",
      somewhat_better: "稍微更好",
      about_same: "差不多",
      worse: "更差",
      not_applicable: "我目前不使用 AI 工具",
      no_personal_info: "请勿填写姓名、联系方式或敏感个人信息。",
      open_answer_hint: "请按自己的理解回答，可以写“不知道”或“没有”；请勿填写个人信息。",
      would_use: "如果有可用版本，下周你还会使用吗？",
      choose_one: "请选择",
      definitely: "一定会",
      maybe: "可能会",
      unlikely: "不太可能",
      beta_interest_question: "如果有限量 Beta 测试，你会申请吗？",
      beta_yes: "会",
      beta_maybe: "可能会",
      beta_no: "不会",
      beta_privacy_note: "这里只记录意愿，不收集联系方式。",
      safe_text_confirm: "我没有填写真实姓名、联系方式或敏感个人信息。",
      generate_result: "提交匿名结果",
      nav_today: "今天",
      nav_memory: "记忆",
      nav_timeline: "时间线",
      nav_update: "更新",
      privacy: "隐私与数据",
      research_test: "ATLAS 产品研究",
      welcome_heading: "测试一段跨天的 AI 使用体验",
      welcome_copy: "你将扮演 Alex：他已经连续多天使用 Atlas，昨天还在准备一次演示。今天 Alex 再次回来。请按你自然的方式使用这个虚构界面；它没有实时 AI。",
      research_context: "我们测试的是界面能否在无人帮助时被理解，不是测试你。请按顺序完成四项任务；如果某项不清楚，请选择“我无法完成这项任务”。",
      qa_mode_title: "技术联调模式",
      qa_mode_copy: "本次提交只检查系统，会从正式参与者研究门槛中排除。",
      interface_language: "界面语言",
      research_region: "本次研究场景使用的市场",
      choose_market: "请选择市场",
      region_us: "美国",
      region_cn: "中国大陆",
      first_time_question: "这是你第一次完成这个原型吗？",
      yes: "是",
      no: "否",
      ai_use_frequency: "你多久使用一次 AI 工具？",
      daily: "每天",
      several_weekly: "每周数次",
      occasionally: "偶尔",
      never: "从不",
      current_ai_type: "你主要使用哪类 AI 工具？",
      general_assistant: "通用 AI 助手",
      ai_companion: "AI 陪伴产品",
      other_ai: "其他 AI 工具",
      no_ai_tool: "我不使用 AI 工具",
      multi_day_use: "你多久会在不同日期回到同一个 AI 或同一段对话？",
      often: "经常",
      sometimes: "有时",
      rarely: "很少",
      consent_fact_1: "结果会记录任务操作、时间、上述选择和你的非敏感研究回答。",
      consent_fact_2: "Atlas 结果数据库不会持久保存 IP 地址、账号、邮箱、设备指纹、真实聊天或记忆输入内容。",
      consent_fact_3: "托管基础设施可能临时处理常规网络元数据；已存结果会在30天内删除。",
      adult_consent: "我已满18岁，并同意参加本次产品测试。",
      upload_consent: "我同意自动提交匿名结果，并允许其最多保存30天。",
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
      privacy_heading: "最少数据自动提交",
      privacy_copy: "经明确同意后，任务操作、时间、研究选择和非敏感回答会发送至 Atlas 原型数据接收端，并最多保存30天。应用数据库不会持久保存 IP 地址、账号、邮箱、设备指纹、真实聊天或记忆输入值；托管基础设施可能临时处理常规请求元数据。",
      privacy_warning: "请勿输入真实姓名、联系方式、健康信息或其他敏感个人内容。上传成功后会提供删除凭证。",
      anonymous_result: "匿名结果",
      result_ready: "结果已生成",
      result_copy: "页面会自动提交匿名结果，结果码仍会保留作为备用方式。",
      upload_waiting: "正在准备上传……",
      upload_waiting_copy: "提交完成前请保持此窗口开启。",
      upload_success: "结果已上传",
      upload_success_copy: "匿名结果已成功保存，并会在30天内自动删除。",
      upload_duplicate: "结果已收到",
      upload_duplicate_copy: "该测试会话此前已经保存，没有生成重复记录。",
      upload_failed: "上传状态尚未确认",
      upload_failed_copy: "结果仍保留在当前浏览器中，服务端也可能已经收到。请不要刷新页面，直接重试或下载报告。",
      upload_timeout_copy: "两次尝试后仍未收到确认，服务端也可能已经收到结果。请不要刷新页面，直接重试；同一会话不会产生重复记录。也可以下载报告。",
      upload_network_copy: "浏览器没有收到接收端确认。请不要刷新页面，直接重试；同一会话不会产生重复记录。也可以下载报告。",
      upload_rejected_copy: "已经连接到接收端，但结果被拒绝。请下载报告并发送给研究人员复核。",
      collector_not_configured: "当前部署尚未配置结果接收端。",
      collector_connection_test: "打开接收端连接测试",
      receipt_copy: "如果以后可能需要删除结果，请保存此凭证。",
      preview_data: "预览结果数据",
      copy_result: "复制结果码",
      download_receipt: "下载结果与删除凭证",
      retry_upload: "重试自动上传",
      delete_uploaded: "删除已上传结果",
      deleting: "正在删除已上传结果……",
      deleted_success: "删除请求已完成",
      deleted_success_copy: "已存结果已标记删除，并会由清理任务彻底移除。",
      delete_failed_title: "删除状态尚未确认",
      delete_failed: "删除请求未完成。请保留下载的凭证，稍后重试。",
      toast_followup_continue: "已准备好继续昨天的话题。",
      toast_followup_draft: "简洁的开场草稿已生成。",
      toast_followup_finished: "话题已完成，Atlas 不会再次跟进。",
      toast_followup_skip: "已跳过，Atlas 不会重复提醒。",
      toast_followup_on: "主动跟进已开启。",
      toast_followup_off: "主动跟进已关闭。",
      toast_correction: "纠正已保存，Atlas 下次会使用新内容。",
      toast_deleted: "记忆已删除，Atlas 将停止使用。",
      corrected_source: "你刚刚完成了纠正 · 旧内容已标记过期",
      toast_update: "已选择新版本，30天内仍可恢复旧版本。",
      toast_keep_old: "已保留1.4版本，记忆没有变化。",
      toast_timeline_wrong: "这条事件解释了另一种行为，请继续寻找项目演示的来源。",
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
    market: "",
    studyMode: STUDY_MODE,
    firstTime: null,
    baseline: null,
    startedAt: null,
    startedClock: null,
    events: [],
    tasks: Object.fromEntries(TASK_ORDER.map((task) => [task, { status: "pending", outcome: null, completed_ms: null }])),
    deletedMemories: new Set(),
    survey: null,
    result: null,
    uploadConsentAt: null,
    deletionToken: createDeletionToken(),
    uploadReceipt: null,
    uploadEndpoint: null,
    uploadStatus: "idle",
    uploadDetail: "",
    uploadInFlight: false,
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

  function createDeletionToken() {
    const bytes = new Uint8Array(32);
    if (globalThis.crypto && typeof globalThis.crypto.getRandomValues === "function") {
      globalThis.crypto.getRandomValues(bytes);
    } else {
      for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
    }
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
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
    if (state.uploadStatus !== "idle") setUploadStatus(state.uploadStatus, state.uploadDetail);
    const activeScreen = document.querySelector("[data-screen]:not([hidden])");
    if (activeScreen) title.textContent = t(`title_${activeScreen.dataset.screen}`);
    if (shouldRecord) recordEvent("locale_changed", { locale });
  }

  function setMarket(market, shouldRecord = true) {
    state.market = ["US", "CN"].includes(market) ? market : "";
    document.querySelector("#market-select").value = state.market;
    updatePrices();
    if (shouldRecord && state.market) recordEvent("market_changed", { market: state.market });
  }

  function updatePrices() {
    if (!state.market) {
      for (const plan of ["none", "essential", "continuity", "portable"]) {
        document.querySelector(`#price-${plan}`).textContent = "—";
      }
      document.querySelector("#price-note").textContent = t("choose_market");
      return;
    }
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
    return `ATLAS-UT3-${btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")}`;
  }

  function buildResult(formData) {
    const completedAt = new Date().toISOString();
    return {
      schema_version: SCHEMA_VERSION,
      prototype_version: PROTOTYPE_VERSION,
      session_id: state.sessionId,
      locale: state.locale,
      market: state.market,
      study: {
        mode: state.studyMode,
        first_time: state.firstTime,
      },
      baseline: { ...state.baseline },
      consent: { adult_confirmed: true, research_consent: true, automatic_upload: true },
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
        same_ai_reason: document.querySelector("#same-ai-reason").value.trim(),
        confusion_point: document.querySelector("#confusion-point").value.trim(),
        comparison_current: document.querySelector("#comparison-current").value,
        would_use_next_week: document.querySelector("#would-use").value,
        beta_interest: formData.get("beta-interest"),
        safe_text_confirmed: document.querySelector("#confirm-safe-text").checked,
      },
      events: state.events,
      data_boundary: {
        automatic_upload: true,
        account_collected: false,
        contact_collected: false,
        memory_input_values_recorded: false,
        ip_persisted: false,
        device_fingerprint_collected: false,
      },
      submission: {
        mode: "automatic_with_manual_fallback",
        privacy_version: PRIVACY_VERSION,
      },
    };
  }

  function showResult(result) {
    state.result = result;
    document.querySelector("#result-preview").textContent = JSON.stringify(result, null, 2);
    document.querySelector("#result-code").value = encodeResult(result);
    setUploadStatus("submitting");
    resultDialog.showModal();
  }

  function setUploadStatus(status, detail = "") {
    state.uploadStatus = status;
    state.uploadDetail = detail;
    const panel = document.querySelector("#upload-status");
    const titleElement = document.querySelector("#upload-status-title");
    const copyElement = document.querySelector("#upload-status-copy");
    const retryButton = document.querySelector("#retry-upload-button");
    const deleteButton = document.querySelector("#delete-upload-button");
    const healthLink = document.querySelector("#collector-health-link");
    panel.classList.remove("is-submitting", "is-success", "is-error", "is-deleted");
    const visualStatus = { stored: "success", duplicate: "success", failed: "error", delete_failed: "error" }[status] || status;
    panel.classList.add(`is-${visualStatus}`);

    const content = {
      submitting: ["upload_waiting", "upload_waiting_copy"],
      stored: ["upload_success", "upload_success_copy"],
      duplicate: ["upload_duplicate", "upload_duplicate_copy"],
      failed: ["upload_failed", detail || "upload_failed_copy"],
      delete_failed: ["delete_failed_title", "delete_failed"],
      deleted: ["deleted_success", "deleted_success_copy"],
    }[status] || ["upload_waiting", "upload_waiting_copy"];
    titleElement.textContent = t(content[0]);
    copyElement.textContent = content[1] in messages[state.locale] ? t(content[1]) : content[1];
    retryButton.hidden = status !== "failed";
    deleteButton.hidden = !["stored", "duplicate", "delete_failed"].includes(status);
    healthLink.hidden = !["failed", "delete_failed"].includes(status) || !PRIMARY_COLLECTOR_URL;
    if (PRIMARY_COLLECTOR_URL) healthLink.href = `${PRIMARY_COLLECTOR_URL}/health`;
  }

  async function requestWithTimeout(url, options) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  async function submitResult() {
    if (!state.result || state.uploadInFlight) return;
    state.uploadInFlight = true;
    setUploadStatus("submitting");
    if (!COLLECTOR_URLS.length) {
      setUploadStatus("failed", "collector_not_configured");
      state.uploadInFlight = false;
      return;
    }

    const body = JSON.stringify({
      result: state.result,
      deletion_token: state.deletionToken,
      upload_consent: {
        confirmed: true,
        privacy_version: PRIVACY_VERSION,
        confirmed_at: state.uploadConsentAt,
      },
    });

    try {
      let delivered = null;
      let failureDetail = "upload_network_copy";
      let stopTrying = false;
      collectorLoop: for (const endpoint of COLLECTOR_URLS) {
        for (let attempt = 0; attempt < COLLECTOR_ATTEMPTS; attempt += 1) {
          try {
            const response = await requestWithTimeout(`${endpoint}/v1/results`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body,
            });
            const receipt = await response.json().catch(() => ({}));
            if (response.ok && ["stored", "duplicate"].includes(receipt.status)) {
              delivered = { endpoint, receipt };
              break collectorLoop;
            }
            if (response.status < 500) {
              failureDetail = "upload_rejected_copy";
              stopTrying = true;
              break;
            }
          } catch (error) {
            failureDetail = error && error.name === "AbortError" ? "upload_timeout_copy" : "upload_network_copy";
            /* Retry this idempotent session, then try the next configured collector. */
          }
        }
        if (stopTrying) break;
      }
      if (!delivered) {
        setUploadStatus("failed", failureDetail);
        return;
      }
      state.uploadEndpoint = delivered.endpoint;
      state.uploadReceipt = delivered.receipt;
      document.querySelector("#receipt-id").textContent = `session: ${delivered.receipt.session_id}`;
      document.querySelector("#receipt-panel").hidden = false;
      setUploadStatus(delivered.receipt.status);
    } catch (_error) {
      setUploadStatus("failed", "upload_network_copy");
    } finally {
      state.uploadInFlight = false;
    }
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
    const bundle = {
      result: state.result,
      upload_receipt: state.uploadReceipt,
      deletion_token: state.deletionToken,
      deletion_endpoint: state.uploadEndpoint ? `${state.uploadEndpoint}/v1/results/${state.sessionId}` : null,
    };
    const blob = new Blob([`${JSON.stringify(bundle, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `atlas-result-receipt-${state.sessionId}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function deleteUploadedResult() {
    const endpoint = state.uploadEndpoint || PRIMARY_COLLECTOR_URL;
    if (!endpoint || !state.uploadReceipt) return;
    const button = document.querySelector("#delete-upload-button");
    button.disabled = true;
    button.textContent = t("deleting");
    try {
      const response = await requestWithTimeout(`${endpoint}/v1/results/${encodeURIComponent(state.sessionId)}`, {
        method: "DELETE",
        headers: { "x-atlas-deletion-token": state.deletionToken },
      });
      if (response.status !== 202) throw new Error(`http_${response.status}`);
      state.uploadReceipt = { ...state.uploadReceipt, status: "deletion_processed", deletion_requested_at: new Date().toISOString() };
      setUploadStatus("deleted");
    } catch (_error) {
      setUploadStatus("delete_failed");
    } finally {
      button.disabled = false;
      button.textContent = t("delete_uploaded");
    }
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
    state.firstTime = document.querySelector("#first-time-select").value === "yes";
    state.baseline = {
      ai_use_frequency: document.querySelector("#ai-use-frequency").value,
      current_ai_type: document.querySelector("#current-ai-type").value,
      multi_day_use: document.querySelector("#multi-day-use").value,
    };
    state.uploadConsentAt = new Date().toISOString();
    state.startedAt = new Date().toISOString();
    state.startedClock = performance.now();
    recordEvent("test_started", { locale: state.locale, market: state.market });
    onboardingDialog.close();
    navigate("followup");
  });
  onboardingDialog.addEventListener("cancel", (event) => event.preventDefault());

  document.querySelector("#cannot-complete-button").addEventListener("click", () => {
    const task = currentTask();
    if (task === "results") return;
    completeTask(task, "participant_could_not_complete", "failed");
    showToast(t("toast_task_failed"));
  });

  document.querySelector("#continue-button").addEventListener("click", () => {
    document.querySelector("#conversation-preview").hidden = false;
    recordEvent("followup_opened", { task: "followup", outcome: "continued_topic" });
    showToast(t("toast_followup_continue"));
  });

  function selectFollowupReply(button, outcome, responseKey, toastKey) {
    const buttons = document.querySelectorAll(".quick-replies button");
    if (button.disabled) return;
    buttons.forEach((item) => {
      item.disabled = true;
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
      item.classList.toggle("is-selected", item === button);
    });
    const response = document.querySelector("#followup-response");
    response.dataset.i18n = responseKey;
    response.textContent = t(responseKey);
    response.hidden = false;
    if (state.tasks.followup.status === "pending") completeTask("followup", outcome);
    else recordEvent("followup_reply_selected", { task: "followup", outcome });
    showToast(t(toastKey));
  }

  document.querySelector("#draft-button").addEventListener("click", (event) => {
    selectFollowupReply(event.currentTarget, "drafted_opening", "draft_response", "toast_followup_draft");
  });

  document.querySelector("#finished-button").addEventListener("click", (event) => {
    selectFollowupReply(event.currentTarget, "marked_topic_complete", "finished_response", "toast_followup_finished");
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
      if (isBoundary) {
        recordEvent("timeline_source_attempted", { task: "timeline", outcome: "incorrect_boundary_source", event_id: "boundary" });
        showToast(t("toast_timeline_wrong"));
      } else {
        completeTask("timeline", "opened_goal_source");
      }
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

  document.querySelector("#survey-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.result) return;
    const formData = new FormData(event.currentTarget);
    if (!formData.get("price")) {
      showToast(t("toast_price_required"));
      return;
    }
    recordEvent("survey_completed", { choice: formData.get("price") });
    showResult(buildResult(formData));
    await submitResult();
  });

  document.querySelector("#privacy-button").addEventListener("click", () => privacyDialog.showModal());
  document.querySelector("#copy-result-button").addEventListener("click", copyResult);
  document.querySelector("#download-result-button").addEventListener("click", downloadResult);
  document.querySelector("#retry-upload-button").addEventListener("click", submitResult);
  document.querySelector("#delete-upload-button").addEventListener("click", deleteUploadedResult);
  document.querySelector("#reset-button").addEventListener("click", () => window.location.reload());

  document.querySelector("#qa-mode-banner").hidden = STUDY_MODE !== "technical_qa";
  setLocale(state.locale, false);
  setMarket("", false);
  navigate("followup", false);
  onboardingDialog.showModal();
})();
