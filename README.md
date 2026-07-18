# Atlas Companion · Sprint 1 产品沙盒与自测工具

Version: `continuity-product-slice-v0.7`

本目录不再是混合式“调研原型”。它由两个隔离界面组成：

1. 默认入口是中英双语产品垂直切片，没有任务提示、完成进度、问卷、价格选择或自动上传；
2. `?mode=qa` 是 Founder / 工程自测入口，增加测试时钟、场景种子、故障注入、状态检查和一键自动测试。

这是零依赖静态 Web 沙盒，不修改 [`ENG-001`](../../../docs/framework-edition/engineering/ENG-001.md) 冻结的 Flutter + FastAPI 正式技术栈。所有自由输入和领域状态只保存在当前浏览器的 `localStorage`，不会发送给研究 Collector；页面允许导出 JSON 或完全删除本地数据。

## 当前真实功能闭环

依据 [`ENG-011`](../../../docs/framework-edition/engineering/ENG-011.md) 实现 Sprint 1 的可重复闭环：

```text
Create Relationship
        ↓
Free-input Conversation
        ↓
Candidate Context → Confirm / Reject
        ↓
Relationship Event（每次最多一个）
        ↓
QA 测试时钟进入次日
        ↓
有来源的 Follow-up
        ↓
Timeline / Relationship / Context Control
```

自由输入由确定性本地规则引擎回应。它用于验证产品状态、领域规则和失败边界，不代表真实 LLM 质量。Context 只有经用户确认才能被以后对话使用；删除后立即取消相关 Follow-up，且后续回复不得引用。Timeline 只从 Relationship Event 生成，不复制完整聊天。

## 工程可以自行验证什么

`?mode=qa` 控制台可无限重复验证：

- 首次 Relationship 创建；
- Goal / Preference / Identity Candidate Context 的确认或拒绝；
- 每次 Conversation 最多生成一个 Event；
- 同一天不伪造“次日” Follow-up；
- 推进测试日期后，Follow-up 能追溯到 Event、Context 和 Conversation；
- 删除 Context 后禁止继续引用；
- 关闭主动 Follow-up 后取消待发送项；
- 模型、Context 检索和网络故障的降级；
- 状态本地持久化、JSON 导出和完全删除；
- 中英文结构与功能入口一致。

这些测试不需要新的真人，也不计入研究样本。

## 以后仍需真人回答什么

自动化不能判断回复是否自然、关系是否真实、Timeline 是否让人感到共同成长、用户是否会跨真实自然日主动回来，以及完整体验后是否愿意付费。这些问题将在核心产品闭环通过后合并成一次真人测试包，而不是为每个组件重复招募。边界和原因见 [`DEC-003`](../../../decisions/DEC-003-separate-product-sandbox-and-human-validation.md)。

## 本地运行

```bash
python3 -m http.server 4173 --bind 0.0.0.0 --directory /DATA/codex_ts/atlas_os/apps/companion/prototype
```

- 产品入口：<http://127.0.0.1:4173/>
- 自测入口：<http://127.0.0.1:4173/?mode=qa>

## 公开部署

- 产品沙盒：<https://atlas-continuity-cn-test.pages.dev/>
- Founder / 工程自测：<https://atlas-continuity-cn-test.pages.dev/?mode=qa>
- 公开镜像：<https://yuhaixin000.github.io/atlas-continuity-prototype/>

v0.6 的研究提交 API 与结果兼容代码仍保留在 [`prototype-collector`](../prototype-collector/README.md)，但 v0.7 不调用它。

- v0.7 私有主仓库提交：`3e829e0722969375de991bb0b6dea8c826f3a8e0`；
- v0.7 隔离公开提交：`17a50215ad8535045d8359df1fdaa27cf84b70a0`；
- Cloudflare Pages 部署：<https://105f486f.atlas-continuity-cn-test.pages.dev>；
- GitHub Pages 发布任务：`29646751896`（success）；
- 发布校验：Cloudflare Pages 与 GitHub Pages 的 `index.html`、`app.js`、`domain.mjs`、`styles.css` SHA-256 均与本地提交一致。

## 自动验证

```bash
node atlas_os/apps/companion/prototype/tests/domain.test.mjs
node atlas_os/apps/companion/prototype/tests/smoke.mjs
bash atlas_os/evidence/interviews/validation/tools/validate_validation.sh
bash atlas_os/tools/validate_recovery.sh
```

领域测试调用与页面相同的 [`domain.mjs`](domain.mjs)，不是对固定 HTML 文案做成功模拟。结构测试同时断言产品页面不含 v0.6 的研究问卷、结果码或上传函数。
