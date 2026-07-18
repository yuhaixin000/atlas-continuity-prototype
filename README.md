# Atlas Companion continuity prototype

这是用于“先做再验证”的手机尺寸 Web 可用性原型，不是正式 MVP，不是 Android APK 或 iOS IPA，也不代表 Atlas 把冻结的正式前端技术栈从 Flutter 改成了静态 Web。

## 范围

原型只验证四个假设流程：

1. Yesterday Follow-up：来源可见、继续/跳过、主动跟进边界；
2. Memory Ledger：查看、纠正、删除及下一次使用权限；
3. Relationship Timeline：从有意义的事件理解今天为什么被续接；
4. Model Change Preview / Restore：更新前比较行为并保留恢复选择。

全部内容是虚构的 `Alex` 场景。本目录没有账号、后端、真实 LLM、支付、埋点、持久化或生产安全能力；刷新页面会丢失操作状态。

依据：[`PRD-002`](../../../docs/framework-edition/product/PRD-002.md)、[`PRD-003`](../../../docs/framework-edition/product/PRD-003.md)、[`PRD-004`](../../../docs/framework-edition/product/PRD-004.md) 与竞争研究 [`CR-008`](../../../evidence/competitive-research/CR-008-SPRINT-REPORT.md)。正式平台顺序仍以 [`MB-004`](../../../docs/framework-edition/market/MB-004.md) 为准：Web 优先，PMF 后 iOS，Android 延后；正式前端技术仍以 [`ENG-001`](../../../docs/framework-edition/engineering/ENG-001.md) 的 Flutter 决策为准。

## 运行

从仓库根目录运行：

```bash
python3 -m http.server 4173 --directory atlas_os/apps/companion/prototype
```

浏览器访问 `http://127.0.0.1:4173`。无需安装依赖；也可以直接打开 `index.html`。

## 原型访谈

测试前点击右上角 Reset，使每位参与者从相同虚构状态开始。访谈员应使用 [`ES-003 四屏测试协议`](../../../evidence/interviews/validation/PROTOTYPE_TEST_PROTOCOL.md)，不要先解释控件或功能价值。

建议记录版本为：`continuity-web-prototype-v0.1`。

## 验证

```bash
node atlas_os/apps/companion/prototype/tests/smoke.mjs
```

结构测试只证明四个流程、关键控件与本地资源存在，不证明真实可用性、无障碍完整性、留存或支付意愿。
