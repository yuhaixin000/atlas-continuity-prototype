# Atlas Companion bilingual continuity prototype

Version: `continuity-web-prototype-v0.6`

这是用于“先做再验证”的中英双语、手机尺寸 Web 可用性原型，不是正式 MVP、Android APK 或 iOS IPA，也不改变 [`ENG-001`](../../../docs/framework-edition/engineering/ENG-001.md) 冻结的 Flutter + FastAPI 正式技术栈。

## 现在可以验证什么

1. Conversation：通过脚本选项完成第一日的虚构对话，不采集真实聊天；
2. Home / Returning：压缩进入第二天，先看到“今天为什么值得回来”，再体验来源可追溯且遵守边界的 Follow-up；
3. Relationship：查看共同旅程，并纠正或删除 Atlas 可使用的 Context；
4. Model Change Preview / Restore：比较同一关系时刻的两个版本并保留恢复选择；
5. Paywall：在体验连续性后选择继续现有工具、Free 或 Plus；
6. 中英文分别完成相同的 8–12 分钟无人任务；
7. 首次体验、参与者/技术测试 Mode、AI 使用频率/工具/多日经历形成解释行为的基线；
8. 语言与研究地区分开记录，地区必须主动选择，Plus 概念按 US/CN 研究地区显示；
9. 未提示价值复述、同一 AI 续接原因、困惑点、现有方案比较、下周使用和 Beta 选择用于判断需求信号；
10. 明确同意后自动上传匿名结果；完成后可预览、复制 `ATLAS-UT4-*` 备用结果码、下载删除凭证或立即删除。

全部产品内容是虚构的 `Alex` 两日压缩场景。原型没有账号、真实 LLM、支付或生产用户数据；单独的 [`prototype-collector`](../prototype-collector/README.md) 只接收同意后的研究结果并最多保存30天。应用数据库不持久保存 IP、账号、邮箱、设备指纹、真实聊天或 Context 修改值；托管基础设施可能临时处理常规网络元数据。四个自由文本框明确禁止填写敏感个人信息，上传失败时保留本地结果码回退。

产品依据：[`PRD-002`](../../../docs/framework-edition/product/PRD-002.md)、[`PRD-003`](../../../docs/framework-edition/product/PRD-003.md)、[`PRD-004`](../../../docs/framework-edition/product/PRD-004.md)、[`PRD-005`](../../../docs/framework-edition/product/PRD-005.md) 与 [`CR-008`](../../../evidence/competitive-research/CR-008-SPRINT-REPORT.md)。验证方法与交付架构见 [`DEC-001`](../../../decisions/DEC-001-mixed-method-problem-solution-validation.md)、[`DEC-002`](../../../decisions/DEC-002-product-shaped-solution-validation.md) 和 [`ADR-003`](../../../decisions/ADR-003-automatic-prototype-result-collector.md)。

## 本地运行

在任意目录运行绝对路径命令，避免启动目录不同导致 404：

```bash
python3 -m http.server 4173 --bind 0.0.0.0 --directory /DATA/codex_ts/atlas_os/apps/companion/prototype
```

浏览器访问 `http://127.0.0.1:4173/`。如果端口已有旧服务，先在原终端按 `Ctrl+C` 停止。

## 公开部署

当前 GitHub 套餐不支持从私有 `atlas_os` 仓库直接发布 Pages。隔离仓库 `yuhaixin000/atlas-continuity-prototype` 只同步本目录，不发布私有仓库中的 `docs/`、`source/`、`evidence/`、其他应用代码或 `.git/` 历史。正式参与者优先使用 Cloudflare Pages 同源入口，GitHub Pages 保留为公开镜像。

- 正式参与者入口：<https://atlas-continuity-cn-test.pages.dev/>
- Founder/工程技术测试入口：<https://atlas-continuity-cn-test.pages.dev/?mode=qa>
- 公开镜像：<https://yuhaixin000.github.io/atlas-continuity-prototype/>
- Worker/API 入口：<https://atlas-prototype-result-collector.atlas-yuhaixin000.workers.dev/>（中国网络直连曾超时，不作为中国参与者入口）
- 隔离公开仓库：<https://github.com/yuhaixin000/atlas-continuity-prototype>
- 首次发布提交：`fb949b5c321762df8e96c6a161b3d82914efb4ea`
- 上一版 v0.3 发布提交：`7d133ffe1fb8717c61b5d2b385733ad73fa28914`
- 当前 v0.4 同源就绪版提交：`46c8fe981bea2465cb19e40fd06238f6fb499143`
- 当前 v0.5 私有交付提交：`3a006e709e3c1a3a01f9fe061ed8bc435841a70e`
- 当前 v0.5 隔离公开提交：`f3ba43a1d39cec82000063bec021928756cbe054`
- 当前 v0.5 Pages 部署：`f060d634.atlas-continuity-cn-test.pages.dev`（正式稳定入口仍使用上方项目域名）

## 无人测试执行

向首次测试者只发送不带参数的正式参与者 URL 和中性说明，不解释控件或产品理念。Founder 自测、网络排障和自动化只使用 `?mode=qa`，该结果不进入 Gate。执行协议、结果 Schema 与导入命令见 [`ES-003 无人测试工作区`](../../../evidence/interviews/validation/unmoderated/README.md)。

Gate 使用 `ES-003-GATE-002`：至少 10 个有效会话，`en-US` 与 `zh-CN` 各不少于 5 个。同步访谈是可选补充，不再是开工硬门槛。

## 验证

```bash
node atlas_os/apps/companion/prototype/tests/smoke.mjs
bash atlas_os/evidence/interviews/validation/tools/validate_validation.sh
```

结构测试证明双语键、参与者/QA 分流、AI 使用基线、两日 Conversation/Relationship 路径、Context 数据边界、先预览后更新、Free/Plus、未提示价值问卷、自动上传/回退和删除入口存在；接收端另有 Origin、Schema、幂等、删除与保留期测试。它们不能证明真实可用性、需求、留存或支付；只有首次外部参与者数据可以更新 Gate。
