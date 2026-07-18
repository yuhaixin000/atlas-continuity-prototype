(function () {
  "use strict";

  const PROTOTYPE_VERSION = "continuity-web-prototype-v0.6";
  const SCHEMA_VERSION = "atlas-unmoderated-v4";
  const PRIVACY_VERSION = "2026-07-18-v4";
  const STUDY_MODE = new URLSearchParams(window.location.search).get("mode") === "qa" ? "technical_qa" : "participant";
  const configuredCollectorUrls = Array.isArray(window.ATLAS_COLLECTOR_URLS) ? window.ATLAS_COLLECTOR_URLS : [window.ATLAS_COLLECTOR_URL];
  const COLLECTOR_URLS = [...new Set(configuredCollectorUrls.map((value) => String(value || "").replace(/\/$/, "")).filter(Boolean))];
  const PRIMARY_COLLECTOR_URL = COLLECTOR_URLS[0] || "";
  const REQUEST_TIMEOUT_MS = 10000;
  const COLLECTOR_ATTEMPTS = 2;
  const TASK_ORDER = ["conversation", "returning", "relationship", "model"];

  const messages = {
    "en-US": {
      prototype_label: "ATLAS · PRODUCT PROTOTYPE",
      title_conversation: "Conversation",
      title_relationship: "Relationship",
      title_model: "Continuity preview",
      title_paywall: "Continue growing",
      title_results: "Your feedback",
      reset: "Reset prototype data",
      close: "Close",
      identity_notice: "This is a scripted AI product concept using fictional data. It is not a human or a live AI service.",
      about_minutes: "8–12 min",
      current_task: "CURRENT TASK",
      cannot_complete: "I can’t complete this task",
      task_conversation_title: "Have a short conversation as Alex.",
      task_conversation_copy: "Choose what Alex would ask for. There is no preferred answer.",
      task_returning_title: "Return the next day and respond to Atlas.",
      task_returning_copy: "Decide naturally whether to continue, finish or skip yesterday’s topic.",
      task_relationship_title: "Understand what carried across days—and take control.",
      task_relationship_copy: "Open yesterday’s shared moment, then correct the wrong presentation time or delete it.",
      task_model_title: "Decide whether an update should change this relationship.",
      task_model_copy: "Preview the same moment in both versions, then choose one.",
      task_results_title: "The product experience is complete.",
      task_results_copy: "Choose a continuity option and answer the short research questions.",
      relationship_day_17: "Relationship day 17",
      relationship_day_18: "Relationship day 18",
      growing_together: "Growing together",
      scripted_companion: "Scripted companion experience",
      yesterday: "YESTERDAY",
      today: "TODAY",
      opening_prompt: "Good to see you, Alex. What would be most useful while you prepare for Wednesday’s presentation?",
      choice_draft: "Help me make the opening sound natural",
      choice_reassure: "Talk through why I’m nervous",
      choice_checkin: "Ask me about it tomorrow",
      user_draft: "Help me make the opening sound natural—not too formal.",
      user_reassure: "Can we talk through why I’m nervous before we work on the opening?",
      user_checkin: "I’m done for today. Ask me once tomorrow how the opening is going.",
      response_draft: "Absolutely. Let’s start with the point you most want people to remember, then make the opening sound like you.",
      response_reassure: "Of course. We can slow down first. What part feels hardest—the room, the opening, or being judged?",
      response_checkin: "I’ll ask once tomorrow and won’t repeat it if you skip. The presentation stays an active goal until you say it’s done.",
      return_tomorrow: "End today and return tomorrow",
      next_day: "THE NEXT DAY",
      context_carried: "Atlas carries forward only the fictional context Alex allowed.",
      good_morning_alex: "GOOD MORNING, ALEX",
      todays_followup: "TODAY’S FOLLOW-UP",
      home_followup_draft_heading: "Ready to make the opening sound like you?",
      home_followup_draft_copy: "Continue the presentation work you started yesterday.",
      home_followup_reassure_heading: "Want to make the opening easier to deliver?",
      home_followup_reassure_copy: "Yesterday you talked through the nerves around Wednesday’s presentation.",
      home_followup_checkin_heading: "How is the presentation opening going?",
      home_followup_checkin_copy: "This is the one check-in you asked for yesterday.",
      continue_conversation: "Continue conversation",
      recent_milestone: "Recent milestone",
      presentation_goal: "Presentation goal",
      returning_draft: "Welcome back, Alex. Yesterday you wanted the opening to sound natural, not too formal. Want to shape the first two lines together?",
      returning_reassure: "Welcome back, Alex. Yesterday the opening and being judged were weighing on you. Should we make the first two lines feel safer to deliver?",
      returning_checkin: "You asked me to check in once today: how is the presentation opening going?",
      from_yesterday_source: "From yesterday’s conversation · View source",
      continue_together: "Continue together",
      already_handled: "I’ve handled it",
      not_today: "Not today",
      return_continue_response: "Let’s continue from the point you left. We can work only on the first two lines.",
      return_complete_response: "Got it. I’ll mark the presentation follow-up complete and won’t ask again.",
      return_skip_response: "No problem. I won’t repeat this reminder. You can return to the presentation whenever you choose.",
      your_boundary: "YOUR BOUNDARY",
      ask_once_boundary: "Ask once about unfinished topics; do not repeat a skipped reminder.",
      allow_followups: "Allow proactive follow-ups",
      see_relationship: "See how this relationship is growing",
      relationship: "RELATIONSHIP",
      relationship_summary_copy: "Atlas is learning how to support Alex while keeping important context visible and controllable.",
      days_together: "days together",
      shared_moments: "shared moments",
      shared_journey: "SHARED JOURNEY",
      what_we_experienced: "What we experienced",
      journey_copy: "Meaningful moments, not a transcript of every message.",
      yesterday_day_17: "YESTERDAY · DAY 17",
      presentation_moment: "You prepared for Wednesday’s presentation",
      presentation_moment_copy: "Alex asked Atlas to keep the support practical and natural.",
      moment_draft_copy: "You chose to make the presentation opening sound natural. Atlas kept the goal and support style—not the full transcript.",
      moment_reassure_copy: "You talked through the nerves around the presentation. Atlas kept the active goal and the request for gentle, practical support.",
      moment_checkin_copy: "You asked Atlas for one next-day check-in about the presentation and set a no-repeat boundary.",
      open_shared_moment: "Open this shared moment",
      context_control: "CONTEXT CONTROL",
      what_atlas_may_use: "What Atlas may use",
      confirmed: "Confirmed",
      context_copy: "The system organizes context; Alex keeps final control.",
      current_goal: "CURRENT GOAL",
      allowed: "Allowed",
      project_presentation: "Project presentation",
      wrong_presentation_time: "Friday at 10:00 AM",
      corrected_presentation_time: "Monday at 2:00 PM",
      context_source: "From yesterday’s conversation · Confirmed by Alex",
      correct_to_monday: "Correct to Monday at 2:00 PM",
      delete_context: "Delete",
      context_deleted: "This context was deleted. Atlas will stop using it.",
      review_update: "Review an upcoming Atlas update",
      continuity_check: "CONTINUITY CHECK",
      update_without_starting_over: "Update without starting over",
      model_change_copy: "Atlas 1.5 may respond more directly. Alex’s approved context and shared journey will remain.",
      current: "CURRENT",
      available: "AVAILABLE",
      preview_same_moment: "Preview the same moment in both versions",
      comparison_prompt: "Alex says: “I’m nervous about the presentation.”",
      current_response: "1.4 · CURRENT",
      response_14: "That makes sense. Yesterday you wanted the opening to sound natural—should we work through those first two lines together?",
      preview_response: "1.5 · PREVIEW",
      response_15: "Let’s return to the natural opening you wanted yesterday. Want to rehearse the first two lines?",
      use_update: "Use the update",
      keep_old_version: "Keep version 1.4",
      restore_note: "The prior version can be restored for 30 days. Approved context is not deleted.",
      see_continuity_options: "See continuity options",
      relationship_continuity: "RELATIONSHIP CONTINUITY",
      continue_growing: "Continue growing together",
      paywall_value: "Keep the conversations, shared journey and support style connected across days—with Alex in control.",
      choose_today: "What would you choose today?",
      keep_current_tools: "Keep my current tools",
      keep_current_copy: "Do not use Atlas",
      price_zero: "$0",
      free_copy: "Basic conversation, relationship and recent shared moments",
      plus_copy: "Full relationship history, deeper context, advanced follow-up and update protection",
      price_note_us: "US research concept · monthly · USD",
      price_note_cn: "China research concept · monthly · CNY · exploratory only",
      continue_to_feedback: "Continue to feedback",
      final_step: "FINAL STEP",
      tell_us_what_landed: "Tell us what came through",
      experience_complete: "Experience complete",
      survey_intro: "Answer in your own words. “I don’t know” and negative feedback are useful.",
      value_summary: "In one sentence, what do you think Atlas is for?",
      same_ai_reason: "What, if anything, made this feel like the same AI across the two days?",
      strongest_moment: "Which moment best showed Atlas’s value?",
      moment_conversation: "The first conversation",
      moment_followup: "The next-day follow-up",
      moment_relationship: "The shared journey",
      moment_context: "Correcting or deleting context",
      moment_update: "Previewing the model update",
      moment_none: "None of these",
      relationship_believability: "Did the experience feel like a relationship that could grow over time?",
      clearly: "Clearly",
      somewhat: "Somewhat",
      not_really: "Not really",
      comparison_current: "Compared with the AI tools you use now, how useful was this experience?",
      much_better: "Much better",
      somewhat_better: "Somewhat better",
      about_same: "About the same",
      worse: "Worse",
      not_applicable: "I do not currently use AI tools",
      choice_reason: "What is the main reason for your plan choice?",
      confusion_point: "Which part was most confusing or least useful?",
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
      submit_result: "Submit anonymous result",
      open_answer_hint: "Write your own answer. “I don’t know” or “none” is acceptable. Do not include personal information.",
      confusion_hint: "For example: the conversation, next-day transition, Relationship, context control, update or plan choice. Write “none” if nothing was confusing.",
      nav_conversation: "Conversation",
      nav_relationship: "Relationship",
      privacy: "Privacy & data",
      research_test: "ATLAS PRODUCT RESEARCH",
      welcome_heading: "Experience two days with an AI companion",
      welcome_copy: "You will play Alex in a compressed, fictional two-day experience. Use the interface naturally; all conversation choices are scripted and no live AI is connected.",
      research_context: "We are testing the product, not you. Complete four tasks without outside help. If something is unclear, choose “I can’t complete this task.”",
      qa_mode_title: "TECHNICAL QA MODE",
      qa_mode_copy: "This submission checks the system and is excluded from participant research gates.",
      interface_language: "Interface language",
      research_region: "Where would you mainly use this product?",
      choose_market: "Choose a market",
      region_us: "United States",
      region_cn: "China mainland",
      first_time_question: "Is this your first time completing this product prototype?",
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
      multi_day_use: "How often do you return to the same AI across different days?",
      often: "Often",
      sometimes: "Sometimes",
      rarely: "Rarely",
      consent_fact_1: "The result records task actions, time, selections and non-sensitive research answers—not the fictional Context choice value.",
      consent_fact_2: "Atlas does not persist an IP address, account, email, device fingerprint or real chat in the result database.",
      consent_fact_3: "Hosting infrastructure may temporarily process standard network metadata. Stored results are deleted within 30 days.",
      adult_consent: "I am 18 or older and agree to participate in this product test.",
      upload_consent: "I agree that my anonymous result will be submitted automatically and stored for up to 30 days.",
      start_test: "Start experience",
      source: "SOURCE",
      yesterday_conversation: "Yesterday’s conversation",
      source_boundary: "Fictional source · Approved for next-day follow-up · Ask once",
      shared_moment: "SHARED MOMENT",
      moment_not_transcript: "Created from a meaningful event, not a full transcript.",
      done: "Done",
      stop_using_detail: "Stop using this detail?",
      delete_context_copy: "Atlas will not use the fictional presentation time in future conversations.",
      delete: "Delete",
      cancel: "Cancel",
      privacy_heading: "Minimal automatic submission",
      privacy_copy: "After explicit consent, task actions, time, research selections and non-sensitive answers are stored for up to 30 days. The result database does not persist IP addresses, accounts, email, device fingerprints, real chat or Context input values.",
      privacy_warning: "Do not enter real names, contact details, health information or other sensitive personal content. A deletion receipt is available after upload.",
      anonymous_result: "ANONYMOUS RESULT",
      result_ready: "Your result is ready",
      result_copy: "The page submits the anonymous result automatically. The result code remains available as a backup.",
      upload_waiting: "Preparing upload…",
      upload_waiting_copy: "Keep this window open until submission finishes.",
      upload_success: "Result uploaded",
      upload_success_copy: "The anonymous result was stored successfully and will be deleted automatically within 30 days.",
      upload_duplicate: "Result already received",
      upload_duplicate_copy: "This session was already stored; no duplicate record was created.",
      upload_failed: "Upload status not confirmed",
      upload_failed_copy: "Your result remains in this browser. Retry without reloading, or download the report.",
      upload_timeout_copy: "The collector did not confirm within 10 seconds. Retry or download the report.",
      upload_network_copy: "The browser could not confirm the collector connection. Retry or download the report.",
      upload_rejected_copy: "The collector rejected this result. Download the report for controlled review.",
      collector_not_configured: "Automatic upload is not configured. Download the result report.",
      collector_connection_test: "Open collector connection test",
      retry_upload: "Retry automatic upload",
      delete_uploaded: "Delete uploaded result",
      deleting: "Deleting…",
      deleted_success: "Deletion request completed",
      deleted_success_copy: "The stored result was marked for deletion and will no longer be exported.",
      delete_failed_title: "Deletion not confirmed",
      delete_failed: "Keep your receipt and retry when the collector is reachable.",
      preview_data: "Preview result data",
      receipt_copy: "Save the receipt if you may want to delete this result later.",
      copy_result: "Copy result code",
      download_receipt: "Download result and deletion receipt",
      toast_conversation_complete: "Yesterday’s conversation is complete. Return tomorrow to continue.",
      toast_return_complete: "The next-day choice is recorded. Continue to Relationship.",
      toast_need_moment: "Now open yesterday’s shared moment to finish this task.",
      toast_need_context: "Now correct or delete the wrong presentation time.",
      toast_relationship_complete: "You reviewed the shared moment and controlled its context.",
      toast_context_corrected: "The fictional time was corrected. Future conversations will use Monday at 2:00 PM.",
      toast_context_deleted: "The fictional time was deleted and will no longer be used.",
      toast_preview_first: "Preview both versions before choosing.",
      toast_model_complete: "Your version choice is recorded. Continue to the continuity options.",
      toast_task_failed: "Recorded as not completed. Continue to the next part.",
      toast_copied: "Result code copied.",
      toast_copy_failed: "Copy was blocked. Select and copy the result code manually.",
      update_selected: "Atlas 1.5 selected",
      old_selected: "Atlas 1.4 kept"
    },
    "zh-CN": {
      prototype_label: "ATLAS · 产品形态原型",
      title_conversation: "对话",
      title_relationship: "关系",
      title_model: "连续性预览",
      title_paywall: "继续共同成长",
      title_results: "你的反馈",
      reset: "重置原型数据",
      close: "关闭",
      identity_notice: "这是使用虚构数据和脚本回复的 AI 产品概念，不是真人，也不是实时 AI 服务。",
      about_minutes: "约8–12分钟",
      current_task: "当前任务",
      cannot_complete: "我无法完成这项任务",
      task_conversation_title: "以 Alex 的身份完成一段简短对话。",
      task_conversation_copy: "选择 Alex 会需要的帮助，没有标准答案。",
      task_returning_title: "第二天回来，并回应 Atlas。",
      task_returning_copy: "按你的自然判断继续、结束或跳过昨天的话题。",
      task_relationship_title: "理解哪些内容跨天延续，并进行控制。",
      task_relationship_copy: "打开昨天的共同经历，然后纠正错误的演示时间或将它删除。",
      task_model_title: "决定一次更新是否应该改变这段关系。",
      task_model_copy: "先比较同一个时刻在两个版本中的表现，再作出选择。",
      task_results_title: "产品体验已经完成。",
      task_results_copy: "选择连续性方案并回答简短研究问题。",
      relationship_day_17: "关系第17天",
      relationship_day_18: "关系第18天",
      growing_together: "共同成长中",
      scripted_companion: "脚本化陪伴体验",
      yesterday: "昨天",
      today: "今天",
      opening_prompt: "很高兴见到你，Alex。准备周三的演示时，现在什么帮助对你最有用？",
      choice_draft: "帮我让开场听起来自然一些",
      choice_reassure: "先聊聊我为什么紧张",
      choice_checkin: "明天问我一次进展",
      user_draft: "帮我让开场听起来自然一些，不要太正式。",
      user_reassure: "正式修改开场前，可以先聊聊我为什么紧张吗？",
      user_checkin: "今天先到这里。明天问我一次开场准备得怎么样。",
      response_draft: "当然。我们先找出你最希望大家记住的一点，再把开场改成像你自己会说的话。",
      response_reassure: "可以，我们先慢下来。最难受的是面对现场、说出开场，还是担心别人评价？",
      response_checkin: "我明天只问一次；如果你跳过，我不会重复提醒。在你说完成前，演示仍是进行中的目标。",
      return_tomorrow: "结束今天，并在第二天回来",
      next_day: "第二天",
      context_carried: "Atlas 只延续 Alex 允许使用的虚构背景。",
      good_morning_alex: "早上好，ALEX",
      todays_followup: "今天值得继续的事",
      home_followup_draft_heading: "准备好让开场更像你自己了吗？",
      home_followup_draft_copy: "继续昨天开始的演示准备。",
      home_followup_reassure_heading: "要让开场变得更容易说出口吗？",
      home_followup_reassure_copy: "昨天你谈到了周三演示带来的紧张。",
      home_followup_checkin_heading: "演示开场准备得怎么样了？",
      home_followup_checkin_copy: "这是你昨天要求的一次跟进。",
      continue_conversation: "继续对话",
      recent_milestone: "最近的共同事件",
      presentation_goal: "演示目标",
      returning_draft: "欢迎回来，Alex。昨天你希望开场自然一些、不要太正式。要一起整理前两句话吗？",
      returning_reassure: "欢迎回来，Alex。昨天你对开场和被评价感到紧张。我们要不要先把前两句话变得更容易说出口？",
      returning_checkin: "你让我今天问一次：演示开场准备得怎么样了？",
      from_yesterday_source: "来自昨天的对话 · 查看来源",
      continue_together: "一起继续",
      already_handled: "我已经处理好了",
      not_today: "今天不继续",
      return_continue_response: "我们从昨天停下的位置继续，只处理开场的前两句话。",
      return_complete_response: "明白。我会把这次跟进标记为完成，不再继续询问。",
      return_skip_response: "没问题，我不会重复提醒。你想继续演示时可以随时回来。",
      your_boundary: "你的边界",
      ask_once_boundary: "未完成话题只询问一次；跳过后不重复提醒。",
      allow_followups: "允许主动跟进",
      see_relationship: "查看这段关系如何成长",
      relationship: "关系",
      relationship_summary_copy: "Atlas 正在学习怎样支持 Alex，同时让重要背景保持可见、可控制。",
      days_together: "天的相处",
      shared_moments: "个共同经历",
      shared_journey: "共同旅程",
      what_we_experienced: "我们经历了什么",
      journey_copy: "这里只保留有意义的共同经历，不保存每一句聊天记录。",
      yesterday_day_17: "昨天 · 第17天",
      presentation_moment: "你为周三的演示做了准备",
      presentation_moment_copy: "Alex 希望 Atlas 的支持保持实用、自然。",
      moment_draft_copy: "你选择让演示开场听起来自然一些。Atlas 保留了目标和支持方式，而不是完整聊天记录。",
      moment_reassure_copy: "你谈到了演示带来的紧张。Atlas 保留了进行中的目标，以及温和、实用的支持方式。",
      moment_checkin_copy: "你要求 Atlas 第二天只跟进一次演示，并设定了不重复提醒的边界。",
      open_shared_moment: "打开这段共同经历",
      context_control: "背景控制",
      what_atlas_may_use: "Atlas 可以使用什么",
      confirmed: "已确认",
      context_copy: "系统负责整理背景，Alex 拥有最终控制权。",
      current_goal: "当前目标",
      allowed: "允许使用",
      project_presentation: "项目演示",
      wrong_presentation_time: "周五上午10:00",
      corrected_presentation_time: "周一下午2:00",
      context_source: "来自昨天的对话 · 已由 Alex 确认",
      correct_to_monday: "纠正为周一下午2:00",
      delete_context: "删除",
      context_deleted: "这项背景已删除，Atlas 将停止使用。",
      review_update: "查看即将到来的 Atlas 更新",
      continuity_check: "连续性检查",
      update_without_starting_over: "更新，但不必重新开始",
      model_change_copy: "Atlas 1.5 的回答可能更直接。Alex 已确认的背景和共同旅程会继续保留。",
      current: "当前版本",
      available: "可用版本",
      preview_same_moment: "比较同一个时刻在两个版本中的表现",
      comparison_prompt: "Alex 说：“我对演示感到紧张。”",
      current_response: "1.4 · 当前版本",
      response_14: "这很正常。昨天你希望开场自然一些——我们要不要一起处理前两句话？",
      preview_response: "1.5 · 预览版本",
      response_15: "我们回到你昨天想要的自然开场。要排练前两句话吗？",
      use_update: "使用新版本",
      keep_old_version: "保留1.4版本",
      restore_note: "30天内可以恢复旧版本，已确认的背景不会被删除。",
      see_continuity_options: "查看连续性方案",
      relationship_continuity: "关系连续性",
      continue_growing: "继续共同成长",
      paywall_value: "让对话、共同旅程和支持方式跨天延续，同时始终由 Alex 控制。",
      choose_today: "如果今天作出选择，你会怎么选？",
      keep_current_tools: "继续使用我现在的工具",
      keep_current_copy: "不使用 Atlas",
      price_zero: "¥0",
      free_copy: "基础对话、关系和近期共同经历",
      plus_copy: "完整关系历史、更深背景、高级跟进和更新保护",
      price_note_us: "美国研究概念 · 月付 · 美元",
      price_note_cn: "中国研究概念 · 月付 · 人民币 · 仅作探索",
      continue_to_feedback: "继续填写反馈",
      final_step: "最后一步",
      tell_us_what_landed: "告诉我们你真正感受到了什么",
      experience_complete: "体验完成",
      survey_intro: "请按自己的理解回答。“不知道”和负面反馈同样有价值。",
      value_summary: "用一句话说明，你认为 Atlas 是做什么的？",
      same_ai_reason: "什么让你觉得这两天面对的是同一个 AI？如果没有，也请说明。",
      strongest_moment: "哪个时刻最能体现 Atlas 的价值？",
      moment_conversation: "第一天的对话",
      moment_followup: "第二天的跟进",
      moment_relationship: "共同旅程",
      moment_context: "纠正或删除背景",
      moment_update: "预览模型更新",
      moment_none: "以上都没有",
      relationship_believability: "这段体验像一段可以持续成长的关系吗？",
      clearly: "明显是",
      somewhat: "有一些",
      not_really: "不太像",
      comparison_current: "与目前使用的 AI 工具相比，这段体验有多大价值？",
      much_better: "好很多",
      somewhat_better: "稍好一些",
      about_same: "差不多",
      worse: "更差",
      not_applicable: "我目前不使用 AI 工具",
      choice_reason: "你作出方案选择的主要原因是什么？",
      confusion_point: "哪一部分最令人困惑或最没有价值？",
      would_use: "如果有可用版本，你下周还会使用吗？",
      choose_one: "请选择一项",
      definitely: "一定会",
      maybe: "可能会",
      unlikely: "不太可能",
      beta_interest_question: "如果有限量测试，你会申请参加吗？",
      beta_yes: "会",
      beta_maybe: "可能",
      beta_no: "不会",
      beta_privacy_note: "这里只记录意向，不收集联系方式。",
      safe_text_confirm: "我没有填写真实姓名、联系方式或敏感个人信息。",
      submit_result: "提交匿名结果",
      open_answer_hint: "请用自己的话回答；“不知道”或“没有”也可以。不要填写个人信息。",
      confusion_hint: "例如：对话、第二天转换、关系页、背景控制、更新或方案选择；如果没有困惑请填写“没有”。",
      nav_conversation: "对话",
      nav_relationship: "关系",
      privacy: "隐私与数据",
      research_test: "ATLAS 产品研究",
      welcome_heading: "体验与 AI Companion 相处的两天",
      welcome_copy: "你将扮演 Alex，体验一段压缩后的虚构两日旅程。请自然使用；所有对话选项都是脚本内容，没有连接实时 AI。",
      research_context: "我们测试的是产品，不是你。请在无人帮助下完成四项任务；如果不清楚，请选择“我无法完成这项任务”。",
      qa_mode_title: "技术联调模式",
      qa_mode_copy: "本次提交只检查系统，不进入正式参与者研究门槛。",
      interface_language: "界面语言",
      research_region: "你主要会在哪个市场使用这款产品？",
      choose_market: "请选择市场",
      region_us: "美国",
      region_cn: "中国大陆",
      first_time_question: "这是你第一次完成这个产品形态原型吗？",
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
      multi_day_use: "你多久会在不同日期回到同一个 AI？",
      often: "经常",
      sometimes: "有时",
      rarely: "很少",
      consent_fact_1: "结果记录任务操作、时间、选择和非敏感研究回答，不记录虚构背景的修改值。",
      consent_fact_2: "Atlas 结果数据库不会持久保存 IP、账号、邮箱、设备指纹或真实聊天。",
      consent_fact_3: "托管基础设施可能临时处理常规网络元数据；结果会在30天内删除。",
      adult_consent: "我已满18岁，并同意参加本次产品测试。",
      upload_consent: "我同意匿名结果自动提交并最多保存30天。",
      start_test: "开始体验",
      source: "来源",
      yesterday_conversation: "昨天的对话",
      source_boundary: "虚构来源 · 已允许次日跟进 · 只询问一次",
      shared_moment: "共同经历",
      moment_not_transcript: "由有意义的事件形成，而不是完整聊天记录。",
      done: "完成",
      stop_using_detail: "停止使用这项背景？",
      delete_context_copy: "Atlas 将不会在未来对话中使用这个虚构的演示时间。",
      delete: "删除",
      cancel: "取消",
      privacy_heading: "最少数据自动提交",
      privacy_copy: "经明确同意后，任务操作、时间、研究选择和非敏感回答会保存最多30天。结果数据库不会持久保存 IP、账号、邮箱、设备指纹、真实聊天或背景修改值。",
      privacy_warning: "请勿填写真实姓名、联系方式、健康信息或其他敏感个人内容。上传后会提供删除凭证。",
      anonymous_result: "匿名结果",
      result_ready: "结果已经生成",
      result_copy: "页面会自动提交匿名结果，同时保留结果码作为备用。",
      upload_waiting: "正在准备上传…",
      upload_waiting_copy: "提交完成前请保持此窗口打开。",
      upload_success: "结果已上传",
      upload_success_copy: "匿名结果已成功保存，并会在30天内自动删除。",
      upload_duplicate: "结果已收到",
      upload_duplicate_copy: "该会话已经保存，没有创建重复记录。",
      upload_failed: "上传状态未确认",
      upload_failed_copy: "结果仍保留在浏览器中。请重试或下载报告。",
      upload_timeout_copy: "接收端10秒内没有确认，请重试或下载报告。",
      upload_network_copy: "浏览器无法确认接收端连接，请重试或下载报告。",
      upload_rejected_copy: "接收端拒绝了结果，请下载报告供受控复核。",
      collector_not_configured: "尚未配置自动上传，请下载结果报告。",
      collector_connection_test: "打开接收端连接测试",
      retry_upload: "重试自动上传",
      delete_uploaded: "删除已上传结果",
      deleting: "正在删除…",
      deleted_success: "删除请求已完成",
      deleted_success_copy: "已保存结果已标记删除，不会再被导出。",
      delete_failed_title: "删除状态未确认",
      delete_failed: "请保留凭证，并在接收端可用时重试。",
      preview_data: "预览结果数据",
      receipt_copy: "如果以后可能删除结果，请保存此凭证。",
      copy_result: "复制结果码",
      download_receipt: "下载结果和删除凭证",
      toast_conversation_complete: "昨天的对话已完成，请在第二天回来继续体验。",
      toast_return_complete: "次日选择已记录，请继续进入关系页。",
      toast_need_moment: "现在打开昨天的共同经历，以完成本项任务。",
      toast_need_context: "现在纠正或删除错误的演示时间。",
      toast_relationship_complete: "你已经查看共同经历并控制了相关背景。",
      toast_context_corrected: "虚构时间已纠正，后续对话会使用周一下午2:00。",
      toast_context_deleted: "虚构时间已删除，后续不会再使用。",
      toast_preview_first: "请先比较两个版本，再作出选择。",
      toast_model_complete: "版本选择已记录，请继续查看连续性方案。",
      toast_task_failed: "已记录为未完成，请继续下一部分。",
      toast_copied: "结果码已复制。",
      toast_copy_failed: "浏览器阻止了复制，请手动选择并复制结果码。",
      update_selected: "已选择 Atlas 1.5",
      old_selected: "已保留 Atlas 1.4"
    },
  };

  const state = {
    sessionId: createSessionId(), locale: preferredLocale(), market: "", studyMode: STUDY_MODE,
    firstTime: null, baseline: null, startedAt: null, startedClock: null, events: [],
    tasks: Object.fromEntries(TASK_ORDER.map((task) => [task, { status: "pending", outcome: null, completed_ms: null }])),
    conversationChoice: null, returnChoice: null, day: 17, relationshipUnlocked: false,
    momentViewed: false, contextControlled: false, contextAction: null, updatePreviewed: false,
    planChoice: null, result: null, uploadConsentAt: null, deletionToken: createDeletionToken(),
    uploadReceipt: null, uploadEndpoint: null, uploadStatus: "idle", uploadDetail: "", uploadInFlight: false
  };

  const title = document.querySelector("#screen-title");
  const toast = document.querySelector("#toast");
  const onboardingDialog = document.querySelector("#onboarding-dialog");
  const sourceDialog = document.querySelector("#source-dialog");
  const momentDialog = document.querySelector("#moment-dialog");
  const deleteDialog = document.querySelector("#delete-dialog");
  const privacyDialog = document.querySelector("#privacy-dialog");
  const resultDialog = document.querySelector("#result-dialog");
  let toastTimer = null;

  function createSessionId() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    const bytes = new Uint8Array(16);
    if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
    else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
  }

  function createDeletionToken() {
    const bytes = new Uint8Array(32);
    if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
    else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
    return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  }

  function preferredLocale() {
    let saved = null; try { saved = localStorage.getItem("atlas.prototype.locale"); } catch (_error) { /* optional */ }
    if (messages[saved]) return saved;
    return navigator.language?.toLowerCase().startsWith("zh") ? "zh-CN" : "en-US";
  }

  function t(key, replacements = {}) {
    let value = messages[state.locale][key] || messages["en-US"][key] || key;
    for (const [name, replacement] of Object.entries(replacements)) value = value.replaceAll(`{${name}}`, String(replacement));
    return value;
  }

  function setLocale(locale, shouldRecord = true) {
    if (!messages[locale]) return;
    state.locale = locale;
    try { localStorage.setItem("atlas.prototype.locale", locale); } catch (_error) { /* optional */ }
    document.documentElement.lang = locale;
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); element.title = t(element.dataset.i18nAria); });
    document.querySelectorAll(".language-button").forEach((button) => button.classList.toggle("is-active", button.dataset.locale === locale));
    document.querySelector("#locale-select").value = locale;
    renderDynamicCopy(); updateGuide(); updatePrices();
    const active = document.querySelector("[data-screen]:not([hidden])"); if (active) title.textContent = t(`title_${active.dataset.screen}`);
    if (state.uploadStatus !== "idle") setUploadStatus(state.uploadStatus, state.uploadDetail);
    if (shouldRecord) recordEvent("locale_changed", { locale });
  }

  function setMarket(market, shouldRecord = true) {
    state.market = ["US", "CN"].includes(market) ? market : "";
    document.querySelector("#market-select").value = state.market; updatePrices();
    if (shouldRecord && state.market) recordEvent("market_changed", { market: state.market });
  }

  function updatePrices() {
    const cn = state.market === "CN";
    document.querySelectorAll('[data-i18n="price_zero"]').forEach((element) => { element.textContent = cn ? "¥0" : "$0"; });
    document.querySelector("#plus-price").textContent = cn ? "¥69" : "$14.99";
    document.querySelector("#price-note").textContent = state.market ? t(cn ? "price_note_cn" : "price_note_us") : t("choose_market");
  }

  function renderDynamicCopy() {
    const choice = state.conversationChoice || "draft";
    document.querySelector("#day-one-user-message").textContent = t(`user_${choice}`);
    document.querySelector("#day-one-assistant-message").textContent = t(`response_${choice}`);
    document.querySelector("#home-followup-heading").textContent = t(`home_followup_${choice}_heading`);
    document.querySelector("#home-followup-copy").textContent = t(`home_followup_${choice}_copy`);
    document.querySelector("#returning-message").textContent = t(`returning_${choice}`);
    document.querySelector("#source-dialog-copy").textContent = `${t(`user_${choice}`)} ${t(`response_${choice}`)}`;
    document.querySelector("#shared-moment-copy").textContent = t(`moment_${choice}_copy`);
    document.querySelector("#moment-dialog-copy").textContent = t(`moment_${choice}_copy`);
    if (state.returnChoice) document.querySelector("#return-response").textContent = t(`return_${state.returnChoice}_response`);
    if (state.contextAction === "corrected") document.querySelector("#presentation-context-value").textContent = t("corrected_presentation_time");
    if (state.contextAction === "deleted") document.querySelector("#presentation-context-value").textContent = t("context_deleted");
    document.querySelector("#relationship-day").textContent = t(state.day === 18 ? "relationship_day_18" : "relationship_day_17");
  }

  function elapsedMs() { return state.startedClock === null ? 0 : Math.max(0, Math.round(performance.now() - state.startedClock)); }
  function recordEvent(event, details = {}) {
    if (state.startedAt === null) return;
    const safe = {}; for (const key of ["screen", "task", "outcome", "locale", "market", "choice", "event_id"]) if (details[key] !== undefined) safe[key] = details[key];
    state.events.push({ event, t_ms: elapsedMs(), ...safe });
  }

  function navigate(screenName, shouldRecord = true) {
    if (screenName === "relationship" && !state.relationshipUnlocked) return;
    const target = document.querySelector(`[data-screen="${screenName}"]`); if (!target) return;
    document.querySelectorAll("[data-screen]").forEach((screen) => { screen.hidden = screen !== target; screen.classList.toggle("is-active", screen === target); });
    document.querySelectorAll(".nav-button").forEach((button) => { const active = button.dataset.go === screenName; button.classList.toggle("is-active", active); if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current"); });
    document.querySelector("#product-nav").hidden = !["conversation", "relationship"].includes(screenName);
    document.querySelector("#test-guide").hidden = ["paywall", "results"].includes(screenName);
    title.textContent = t(`title_${screenName}`); window.scrollTo({ top: 0, behavior: "smooth" });
    if (shouldRecord) recordEvent("screen_viewed", { screen: screenName });
  }

  function currentTask() { return TASK_ORDER.find((task) => state.tasks[task].status === "pending") || "results"; }
  function updateGuide() {
    const completed = TASK_ORDER.filter((task) => state.tasks[task].status !== "pending").length;
    const task = currentTask();
    document.querySelector("#progress-label").textContent = `${completed} / ${TASK_ORDER.length}`;
    document.querySelector("#progress-fill").style.width = `${completed / TASK_ORDER.length * 100}%`;
    document.querySelector("#task-heading").textContent = t(`task_${task}_title`);
    document.querySelector("#task-instruction").textContent = t(`task_${task}_copy`);
    document.querySelector("#cannot-complete-button").hidden = task === "results";
  }

  function completeTask(task, outcome, status = "independent_success") {
    if (state.tasks[task].status !== "pending") return;
    state.tasks[task] = { status, outcome, completed_ms: elapsedMs() };
    recordEvent("task_completed", { task, outcome }); updateGuide();
  }

  function showToast(message) {
    window.clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3000);
  }

  function selectConversation(choice) {
    if (state.tasks.conversation.status !== "pending") return;
    state.conversationChoice = choice;
    document.querySelectorAll("[data-conversation-choice]").forEach((button) => { button.disabled = true; button.classList.toggle("is-selected", button.dataset.conversationChoice === choice); });
    renderDynamicCopy(); document.querySelector("#day-one-response").hidden = false; document.querySelector("#return-tomorrow-button").hidden = false;
    completeTask("conversation", `selected_${choice}`); showToast(t("toast_conversation_complete"));
  }

  function returnTomorrow() {
    if (state.day === 18) return;
    state.day = 18; document.querySelector("#day-one-thread").hidden = true; document.querySelector("#return-tomorrow-button").hidden = true;
    document.querySelector("#day-label").hidden = true; document.querySelector("#day-two-thread").hidden = false; renderDynamicCopy();
    recordEvent("returned_next_day", { screen: "conversation", outcome: state.conversationChoice || "conversation_not_completed" });
    recordEvent("home_open", { screen: "conversation", event_id: "day18_home" });
    window.scrollTo({ top: document.querySelector("#day-two-thread").offsetTop - 20, behavior: "smooth" });
  }

  function selectReturn(choice) {
    if (state.tasks.returning.status !== "pending") return;
    state.returnChoice = choice;
    document.querySelectorAll("[data-return-choice]").forEach((button) => { button.disabled = true; button.classList.toggle("is-selected", button.dataset.returnChoice === choice); });
    renderDynamicCopy(); document.querySelector("#return-response").hidden = false; document.querySelector("#followup-boundary").hidden = false; document.querySelector("#open-relationship-button").hidden = false;
    state.relationshipUnlocked = true; document.querySelector("#relationship-nav-button").disabled = false;
    completeTask("returning", `${choice}_next_day_followup`); showToast(t("toast_return_complete"));
  }

  function maybeCompleteRelationship() {
    if (state.tasks.relationship.status !== "pending") return;
    if (state.momentViewed && state.contextControlled) {
      completeTask("relationship", `viewed_shared_moment_and_${state.contextAction}_context`);
      document.querySelector("#review-update-button").hidden = false; showToast(t("toast_relationship_complete"));
    } else if (state.momentViewed) showToast(t("toast_need_context"));
    else if (state.contextControlled) showToast(t("toast_need_moment"));
  }

  function controlContext(action) {
    if (state.contextControlled) return;
    state.contextControlled = true; state.contextAction = action;
    const card = document.querySelector("#presentation-context-card");
    card.classList.add(action === "corrected" ? "is-corrected" : "is-deleted");
    document.querySelector("#correct-context-button").disabled = true; document.querySelector("#delete-context-button").disabled = true;
    renderDynamicCopy(); recordEvent("context_controlled", { task: "relationship", outcome: action });
    showToast(t(action === "corrected" ? "toast_context_corrected" : "toast_context_deleted")); maybeCompleteRelationship();
  }

  function selectModel(outcome) {
    if (!state.updatePreviewed) { showToast(t("toast_preview_first")); return; }
    if (state.tasks.model.status !== "pending") return;
    document.querySelector("#use-update-button").disabled = true; document.querySelector("#keep-old-button").disabled = true;
    const selected = outcome === "accepted_update" ? document.querySelector("#use-update-button") : document.querySelector("#keep-old-button");
    selected.classList.add("is-selected"); selected.textContent = t(outcome === "accepted_update" ? "update_selected" : "old_selected");
    completeTask("model", outcome); document.querySelector("#continue-paywall-button").hidden = false; showToast(t("toast_model_complete"));
  }

  function skipCurrentTask() {
    const task = currentTask(); if (task === "results") return;
    completeTask(task, "participant_could_not_complete", "failed"); showToast(t("toast_task_failed"));
    if (task === "conversation") { state.conversationChoice = "draft"; renderDynamicCopy(); document.querySelector("#return-tomorrow-button").hidden = false; }
    if (task === "returning") { state.relationshipUnlocked = true; document.querySelector("#relationship-nav-button").disabled = false; document.querySelector("#open-relationship-button").hidden = false; }
    if (task === "relationship") document.querySelector("#review-update-button").hidden = false;
    if (task === "model") document.querySelector("#continue-paywall-button").hidden = false;
  }

  function encodeResult(result) {
    const bytes = new TextEncoder().encode(JSON.stringify(result)); let binary = "";
    for (let index = 0; index < bytes.length; index += 8192) binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
    return `ATLAS-UT4-${btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")}`;
  }

  function buildResult(formData) {
    return {
      schema_version: SCHEMA_VERSION, prototype_version: PROTOTYPE_VERSION, session_id: state.sessionId,
      locale: state.locale, market: state.market, study: { mode: state.studyMode, first_time: state.firstTime }, baseline: { ...state.baseline },
      consent: { adult_confirmed: true, research_consent: true, automatic_upload: true },
      timing: { started_at: state.startedAt, completed_at: new Date().toISOString(), duration_seconds: Math.round(elapsedMs() / 1000) },
      tasks: JSON.parse(JSON.stringify(state.tasks)),
      survey: {
        plan_choice: state.planChoice,
        choice_reason: document.querySelector("#choice-reason").value.trim(),
        value_summary: document.querySelector("#value-summary").value.trim(),
        same_ai_reason: document.querySelector("#same-ai-reason").value.trim(),
        strongest_moment: document.querySelector("#strongest-moment").value,
        relationship_believability: document.querySelector("#relationship-believability").value,
        confusion_point: document.querySelector("#confusion-point").value.trim(),
        comparison_current: document.querySelector("#comparison-current").value,
        would_use_next_week: document.querySelector("#would-use").value,
        beta_interest: formData.get("beta-interest"), safe_text_confirmed: document.querySelector("#confirm-safe-text").checked
      },
      events: state.events,
      data_boundary: { automatic_upload: true, account_collected: false, contact_collected: false, chat_input_collected: false, context_input_values_recorded: false, ip_persisted: false, device_fingerprint_collected: false },
      submission: { mode: "automatic_with_manual_fallback", privacy_version: PRIVACY_VERSION }
    };
  }

  function showResult(result) {
    state.result = result; document.querySelector("#result-preview").textContent = JSON.stringify(result, null, 2);
    document.querySelector("#result-code").value = encodeResult(result); setUploadStatus("submitting"); resultDialog.showModal();
  }

  function setUploadStatus(status, detail = "") {
    state.uploadStatus = status; state.uploadDetail = detail;
    const panel = document.querySelector("#upload-status"), titleElement = document.querySelector("#upload-status-title"), copyElement = document.querySelector("#upload-status-copy");
    const retryButton = document.querySelector("#retry-upload-button"), deleteButton = document.querySelector("#delete-upload-button"), healthLink = document.querySelector("#collector-health-link");
    panel.classList.remove("is-submitting", "is-success", "is-error", "is-deleted");
    const visual = { stored: "success", duplicate: "success", failed: "error", delete_failed: "error" }[status] || status; panel.classList.add(`is-${visual}`);
    const content = { submitting: ["upload_waiting", "upload_waiting_copy"], stored: ["upload_success", "upload_success_copy"], duplicate: ["upload_duplicate", "upload_duplicate_copy"], failed: ["upload_failed", detail || "upload_failed_copy"], delete_failed: ["delete_failed_title", "delete_failed"], deleted: ["deleted_success", "deleted_success_copy"] }[status] || ["upload_waiting", "upload_waiting_copy"];
    titleElement.textContent = t(content[0]); copyElement.textContent = content[1] in messages[state.locale] ? t(content[1]) : content[1];
    retryButton.hidden = status !== "failed"; deleteButton.hidden = !["stored", "duplicate", "delete_failed"].includes(status);
    healthLink.hidden = !["failed", "delete_failed"].includes(status) || !PRIMARY_COLLECTOR_URL; if (PRIMARY_COLLECTOR_URL) healthLink.href = `${PRIMARY_COLLECTOR_URL}/health`;
  }

  async function requestWithTimeout(url, options) {
    const controller = new AbortController(), timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try { return await fetch(url, { ...options, signal: controller.signal }); } finally { window.clearTimeout(timeout); }
  }

  async function submitResult() {
    if (!state.result || state.uploadInFlight) return; state.uploadInFlight = true; setUploadStatus("submitting");
    if (!COLLECTOR_URLS.length) { setUploadStatus("failed", "collector_not_configured"); state.uploadInFlight = false; return; }
    const body = JSON.stringify({ result: state.result, deletion_token: state.deletionToken, upload_consent: { confirmed: true, privacy_version: PRIVACY_VERSION, confirmed_at: state.uploadConsentAt } });
    try {
      let delivered = null, failureDetail = "upload_network_copy", stopTrying = false;
      collectorLoop: for (const endpoint of COLLECTOR_URLS) {
        for (let attempt = 0; attempt < COLLECTOR_ATTEMPTS; attempt += 1) {
          try {
            const response = await requestWithTimeout(`${endpoint}/v1/results`, { method: "POST", headers: { "content-type": "application/json" }, body });
            const receipt = await response.json().catch(() => ({}));
            if (response.ok && ["stored", "duplicate"].includes(receipt.status)) { delivered = { endpoint, receipt }; break collectorLoop; }
            if (response.status < 500) { failureDetail = "upload_rejected_copy"; stopTrying = true; break; }
          } catch (error) { failureDetail = error?.name === "AbortError" ? "upload_timeout_copy" : "upload_network_copy"; }
        }
        if (stopTrying) break;
      }
      if (!delivered) { setUploadStatus("failed", failureDetail); return; }
      state.uploadEndpoint = delivered.endpoint; state.uploadReceipt = delivered.receipt;
      document.querySelector("#receipt-id").textContent = `session: ${delivered.receipt.session_id}`; document.querySelector("#receipt-panel").hidden = false; setUploadStatus(delivered.receipt.status);
    } catch (_error) { setUploadStatus("failed", "upload_network_copy"); } finally { state.uploadInFlight = false; }
  }

  async function copyResult() {
    const field = document.querySelector("#result-code");
    try { await navigator.clipboard.writeText(field.value); showToast(t("toast_copied")); }
    catch (_error) { field.focus(); field.select(); showToast(t(document.execCommand("copy") ? "toast_copied" : "toast_copy_failed")); }
  }

  function downloadResult() {
    if (!state.result) return;
    const bundle = { result: state.result, upload_receipt: state.uploadReceipt, deletion_token: state.deletionToken, deletion_endpoint: state.uploadEndpoint ? `${state.uploadEndpoint}/v1/results/${state.sessionId}` : null };
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(bundle, null, 2)}\n`], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `atlas-result-receipt-${state.sessionId}.json`; anchor.click(); URL.revokeObjectURL(url);
  }

  async function deleteUploadedResult() {
    const endpoint = state.uploadEndpoint || PRIMARY_COLLECTOR_URL; if (!endpoint || !state.uploadReceipt) return;
    const button = document.querySelector("#delete-upload-button"); button.disabled = true; button.textContent = t("deleting");
    try { const response = await requestWithTimeout(`${endpoint}/v1/results/${encodeURIComponent(state.sessionId)}`, { method: "DELETE", headers: { "x-atlas-deletion-token": state.deletionToken } }); if (response.status !== 202) throw new Error(); setUploadStatus("deleted"); }
    catch (_error) { setUploadStatus("delete_failed"); } finally { button.disabled = false; button.textContent = t("delete_uploaded"); }
  }

  document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.go)));
  document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => setLocale(button.dataset.locale)));
  document.querySelector("#locale-select").addEventListener("change", (event) => setLocale(event.target.value));
  document.querySelector("#market-select").addEventListener("change", (event) => setMarket(event.target.value));
  document.querySelector("#onboarding-form").addEventListener("submit", (event) => {
    event.preventDefault(); setLocale(document.querySelector("#locale-select").value, false); setMarket(document.querySelector("#market-select").value, false);
    state.firstTime = document.querySelector("#first-time-select").value === "yes";
    state.baseline = { ai_use_frequency: document.querySelector("#ai-use-frequency").value, current_ai_type: document.querySelector("#current-ai-type").value, multi_day_use: document.querySelector("#multi-day-use").value };
    state.uploadConsentAt = new Date().toISOString(); state.startedAt = new Date().toISOString(); state.startedClock = performance.now();
    recordEvent("test_started", { locale: state.locale, market: state.market }); onboardingDialog.close(); navigate("conversation");
  });
  onboardingDialog.addEventListener("cancel", (event) => event.preventDefault());
  document.querySelector("#cannot-complete-button").addEventListener("click", skipCurrentTask);
  document.querySelectorAll("[data-conversation-choice]").forEach((button) => button.addEventListener("click", () => selectConversation(button.dataset.conversationChoice)));
  document.querySelector("#return-tomorrow-button").addEventListener("click", returnTomorrow);
  document.querySelector("#continue-from-home-button").addEventListener("click", () => {
    document.querySelector("#return-home-card").hidden = true;
    document.querySelector("#return-conversation").hidden = false;
    recordEvent("conversation_started_from_home", { screen: "conversation", task: "returning" });
  });
  document.querySelectorAll("[data-return-choice]").forEach((button) => button.addEventListener("click", () => selectReturn(button.dataset.returnChoice)));
  document.querySelector("#followup-source-button").addEventListener("click", () => { recordEvent("followup_source_opened", { task: "returning", event_id: "day17_conversation" }); sourceDialog.showModal(); });
  document.querySelector("#followup-toggle").addEventListener("change", (event) => recordEvent("followup_boundary_changed", { task: "returning", outcome: event.target.checked ? "enabled" : "disabled" }));
  document.querySelector("#open-relationship-button").addEventListener("click", () => navigate("relationship"));
  document.querySelector("#shared-moment-button").addEventListener("click", () => { state.momentViewed = true; recordEvent("shared_moment_opened", { task: "relationship", event_id: "presentation_day17" }); momentDialog.showModal(); maybeCompleteRelationship(); });
  document.querySelector("#correct-context-button").addEventListener("click", () => controlContext("corrected"));
  document.querySelector("#delete-context-button").addEventListener("click", () => deleteDialog.showModal());
  document.querySelector("#confirm-delete-button").addEventListener("click", () => controlContext("deleted"));
  document.querySelector("#review-update-button").addEventListener("click", () => navigate("model"));
  document.querySelector("#preview-update-button").addEventListener("click", () => { state.updatePreviewed = true; document.querySelector("#update-comparison").hidden = false; document.querySelector("#preview-update-button").hidden = true; recordEvent("model_preview_opened", { task: "model" }); });
  document.querySelector("#use-update-button").addEventListener("click", () => selectModel("accepted_update"));
  document.querySelector("#keep-old-button").addEventListener("click", () => selectModel("kept_prior_version"));
  document.querySelector("#continue-paywall-button").addEventListener("click", () => navigate("paywall"));
  document.querySelector("#paywall-form").addEventListener("submit", (event) => { event.preventDefault(); state.planChoice = new FormData(event.currentTarget).get("plan"); recordEvent("plan_selected", { choice: state.planChoice }); navigate("results"); });
  document.querySelector("#survey-form").addEventListener("submit", async (event) => { event.preventDefault(); if (state.result) return; const formData = new FormData(event.currentTarget); recordEvent("survey_completed", { choice: state.planChoice }); showResult(buildResult(formData)); await submitResult(); });
  document.querySelector("#privacy-button").addEventListener("click", () => privacyDialog.showModal());
  document.querySelector("#copy-result-button").addEventListener("click", copyResult);
  document.querySelector("#download-result-button").addEventListener("click", downloadResult);
  document.querySelector("#retry-upload-button").addEventListener("click", submitResult);
  document.querySelector("#delete-upload-button").addEventListener("click", deleteUploadedResult);
  document.querySelector("#reset-button").addEventListener("click", () => window.location.reload());

  document.querySelector("#qa-mode-banner").hidden = STUDY_MODE !== "technical_qa";
  setLocale(state.locale, false); setMarket("", false); updateGuide(); navigate("conversation", false); onboardingDialog.showModal();
})();
