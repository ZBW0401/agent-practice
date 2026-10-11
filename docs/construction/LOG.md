# Work Log — 学程

Append-only. Latest first.

---

## 2026-10-11 10:11 / Phase 5 / Work Log

### Plan Replay
提醒：notify.js（浏览器通知 + 页面内 Toast）+ 到点触发。

### Actual Changes
- 新增 xuecheng/js/notify.js（浏览器通知 + 页面内 Toast 兜底）
- app.js：scheduleReminders 按时间轴到点调度 setTimeout 提醒；首次点击请求通知权限
- index.html：新增 Toast 元素、设置弹窗「测试提醒」按钮、加载 notify.js
- style.css：Toast 样式、btn--full

### Files Changed
xuecheng/js/notify.js、app.js、index.html、css/style.css

### Test Log
- `git diff --check`：通过（exit 0）
- 手动走查：设置弹窗「测试提醒」按钮触发页面内 Toast（用户确认 ok）

### Failures
无。

### Fixes
无。

### Retests
无。

### Documentation Drift
无。已知限制已在产品需求「假设登记」与 HANDOFF「风险」中标注。

### Git Status
- 分支：feature/xuecheng
- 基线：eff1acb
- 提交：7763c77（已推送 origin/feature/xuecheng）
- 未跟踪项 .claude/、claude 保持不触碰

### Rollback Judgment
无需回退。

### Risks
- 到点提醒仅在页面打开时触发；锁屏/后台/页面关闭不推送（纯前端无后端 + Service Worker 推送，技术边界）。
- 浏览器系统通知在 file:// 下可能受限（需 HTTPS/localhost）；页面内 Toast 为主力兜底。

### Next Step
Phase 6：打磨与验证。

---

## 2026-10-11 10:05 / Phase 4 / Work Log

### Plan Replay
时间轴自动排布 + 番茄钟：scheduler.js + 设置 UI + 时间轴渲染。

### Actual Changes
- 新增 xuecheng/js/scheduler.js（排程引擎：排序、切番茄钟段、插休息、超时标记）
- 新增 xuecheng/test/scheduler.test.html（11 个单元断言）
- store.js 增加设置持久化（loadSettings/saveSettings）
- index.html 增加设置按钮、设置弹窗、时间轴窗口提示
- style.css 增加时间轴样式、图标按钮
- app.js 增加时间轴渲染 + 设置逻辑

### Files Changed
xuecheng/js/scheduler.js、store.js、app.js、index.html、css/style.css、test/scheduler.test.html

### Test Log
- `git diff --check`：通过（exit 0）
- 浏览器单元测试 scheduler.test.html：通过 11 / 失败 0（用户确认「ok」）
- 手动走查：排布 / 设置改配比 / 刷新持久化 / 超时标记，正常

### Failures
无。

### Fixes
无。

### Retests
无。

### Documentation Drift
无。

### Git Status
- 分支：feature/xuecheng
- 基线：1815e64
- 提交：9b6f545（已推送 origin/feature/xuecheng）
- 未跟踪项 .claude/、claude 保持不触碰

### Rollback Judgment
无需回退。

### Risks
无新增。

### Next Step
Phase 5：提醒（notify.js）。

---

## 2026-10-11 09:59 / Phase 3 / Work Log

### Plan Replay
待办清单视图：渲染 + 勾选完成 + 新建表单 + 删除。

### Actual Changes
- index.html：新增新建任务弹窗（科目/时长/截止/优先级/难度/休息时长）
- style.css：清单项、弹窗、表单样式
- app.js：重写为视图控制器（渲染、事件委托勾选/删除、表单提交校验）

### Files Changed
xuecheng/index.html、xuecheng/css/style.css、xuecheng/js/app.js

### Test Log
- `git diff --check`：通过（exit 0）
- 浏览器手动走查：新建/勾选/删除/刷新持久化/空科目报错，全部正常（用户确认 ok）
- 自动化框架：未建立（DOM 逻辑无 CLI 运行环境，手动验证）

### Failures
无。

### Fixes
无。

### Retests
无。

### Documentation Drift
无。

### Git Status
- 分支：feature/xuecheng
- 基线：c82f98d
- 提交：d4af3e6（已推送 origin/feature/xuecheng）
- 未跟踪项 .claude/、claude 保持不触碰

### Rollback Judgment
无需回退。

### Risks
无新增。

### Next Step
Phase 4：时间轴自动排布 + 番茄钟。

---

## 2026-10-11 09:54 / Phase 2 / Work Log

### Plan Replay
定义 Task 模型 + localStorage 持久化，用浏览器单元测试页验证。

### Actual Changes
- 新增 xuecheng/js/task.js（Task 模型：create + 校验，枚举 priority/difficulty）
- 新增 xuecheng/js/store.js（localStorage 适配：loadTasks/saveTasks，损坏数据容错）
- 新增 xuecheng/test/task.test.html（9 个单元断言）
- 修改 index.html（按序加载 task.js → store.js → app.js）
- 修改 app.js（版本 0.2.0 + 数据层冒烟日志）

### Files Changed
xuecheng/js/task.js、store.js、app.js、xuecheng/test/task.test.html、xuecheng/index.html

### Test Log
- `git diff --check`：通过（exit 0）
- 浏览器单元测试 task.test.html：通过 9 / 失败 0（用户确认「全绿」）
- 自动化框架：未建立（无 Node，用浏览器测试页替代）

### Failures
无。

### Fixes
无。

### Retests
无（一次通过）。

### Documentation Drift
无。

### Git Status
- 分支：feature/xuecheng
- 基线：56bf5d7
- 提交：8983f4e（已推送 origin/feature/xuecheng）
- 未跟踪项 .claude/、claude 保持不触碰

### Rollback Judgment
无需回退。

### Risks
无新增。

### Next Step
Phase 3：待办清单视图（渲染 + 勾选完成 + 新建表单）。

---

## 2026-10-11 09:44 / Phase 1 / Work Log

### Plan Replay
建立手机优先静态壳子 + 施工文档，确立视觉基调。分支 feature/xuecheng，备份分支已推送。

### Actual Changes
- 新增 xuecheng/index.html（顶部栏 / 待办清单 / 今日时间轴 / 新建按钮）
- 新增 xuecheng/css/style.css（清爽风、手机优先响应式）
- 新增 xuecheng/js/app.js（入口占位，全局命名空间 window.Xuecheng）
- 新增 AGENTS.md 与 docs/（PRODUCT_REQUIREMENTS / ARCHITECTURE / CONSTRUCTION_PLAN / DEV_PROGRESS / TEST_METRICS）

### Files Changed
AGENTS.md、docs/（6 份）、xuecheng/index.html、xuecheng/css/style.css、xuecheng/js/app.js

### Test Log
- `git diff --check`：通过（exit 0）
- 文件与引用完整性：通过（index.html 引用的 css/style.css、js/app.js 均存在）
- 自动化测试框架：未建立（纯静态、无构建链）；node 不可用，JS 语法检查跳过
- 浏览器手动验证：待真机打开

### Failures
无（本轮无失败）。

### Fixes
无。

### Retests
无（无需复测）。

### Documentation Drift
无。

### Git Status
- 分支：feature/xuecheng
- 基线：7283af0
- 备份分支：backup/pre-xuecheng-20261011（已推送）
- 提交：fcf0cb6（已推送 origin/feature/xuecheng）
- 未跟踪项 .claude/、claude 保持不触碰

### Rollback Judgment
无需回退。如需回退可 `git revert fcf0cb6` 或切回 backup/pre-xuecheng-20261011。

### Risks
提醒的锁屏/后台推送限制（待 Phase 5 真机验证）。

### Next Step
Phase 2：任务数据模型 + 本地存储。
