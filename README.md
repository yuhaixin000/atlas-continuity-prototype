# Atlas Companion bilingual continuity prototype

Version: `continuity-web-prototype-v0.4`

这是用于“先做再验证”的中英双语、手机尺寸 Web 可用性原型，不是正式 MVP、Android APK 或 iOS IPA，也不改变 [`ENG-001`](../../../docs/framework-edition/engineering/ENG-001.md) 冻结的 Flutter + FastAPI 正式技术栈。

## 现在可以验证什么

1. Yesterday Follow-up：继续、跳过、主动跟进边界；
2. Memory Ledger：查看、纠正、删除及下一次使用权限；
3. Relationship Timeline：从有意义事件理解今天为什么被续接；
4. Model Change Preview / Restore：比较更新行为并保留恢复选择；
5. 中英文分别完成相同的 8–12 分钟无人任务；
6. 语言与研究地区分开记录，价格概念按 US/CN 研究地区显示；
7. 明确同意后自动上传匿名结果；完成后可预览、复制 `ATLAS-UT2-*` 备用结果码、下载删除凭证或立即删除。

全部产品内容是虚构的 `Alex` 场景。原型没有账号、真实 LLM、支付或生产用户数据；单独的 [`prototype-collector`](../prototype-collector/README.md) 只接收同意后的研究结果并最多保存30天。应用数据库不持久保存 IP、账号、邮箱、设备指纹、真实聊天或 Memory 输入值；托管基础设施可能临时处理常规网络元数据。两个自由文本框明确禁止填写敏感个人信息，上传失败时保留本地结果码回退。

产品依据：[`PRD-002`](../../../docs/framework-edition/product/PRD-002.md)、[`PRD-003`](../../../docs/framework-edition/product/PRD-003.md)、[`PRD-004`](../../../docs/framework-edition/product/PRD-004.md) 与 [`CR-008`](../../../evidence/competitive-research/CR-008-SPRINT-REPORT.md)。验证方法与交付架构见 [`DEC-001`](../../../decisions/DEC-001-mixed-method-problem-solution-validation.md) 和 [`ADR-003`](../../../decisions/ADR-003-automatic-prototype-result-collector.md)。

## 本地运行

在任意目录运行绝对路径命令，避免启动目录不同导致 404：

```bash
python3 -m http.server 4173 --bind 0.0.0.0 --directory /DATA/codex_ts/atlas_os/apps/companion/prototype
```

浏览器访问 `http://127.0.0.1:4173/`。如果端口已有旧服务，先在原终端按 `Ctrl+C` 停止。

## 公开部署

当前 GitHub 套餐不支持从私有 `atlas_os` 仓库直接发布 Pages。公开站点因此使用隔离仓库 `yuhaixin000/atlas-continuity-prototype`：只同步本目录，不发布私有仓库中的 `docs/`、`source/`、`evidence/`、其他应用代码或 `.git/` 历史。公开 URL 和真实 HTTP 验证结果在发布完成后登记。

- 公开测试地址：<https://yuhaixin000.github.io/atlas-continuity-prototype/>
- 隔离公开仓库：<https://github.com/yuhaixin000/atlas-continuity-prototype>
- 首次发布提交：`fb949b5c321762df8e96c6a161b3d82914efb4ea`
- 上一版 v0.3 发布提交：`7d133ffe1fb8717c61b5d2b385733ad73fa28914`

## 无人测试执行

向测试者只发送公开 URL 和中性说明，不解释控件或产品理念。执行协议、结果 Schema 与导入命令见 [`ES-003 无人测试工作区`](../../../evidence/interviews/validation/unmoderated/README.md)。

Gate 使用 `ES-003-GATE-002`：至少 10 个有效会话，`en-US` 与 `zh-CN` 各不少于 5 个。同步访谈是可选补充，不再是开工硬门槛。

## 验证

```bash
node atlas_os/apps/companion/prototype/tests/smoke.mjs
bash atlas_os/evidence/interviews/validation/tools/validate_validation.sh
```

结构测试证明双语键、核心控件、快速回复分支、自动上传/手工回退、删除入口和匿名结果边界存在；接收端另有 Origin、Schema、幂等、删除与保留期测试。上传支持多个有序接收端、单端10秒超时、失败类型与健康检查入口；中国网络提交失败的根因确认前使用下载报告/结果码回退。它们不能证明真实可用性、需求、留存或支付。
