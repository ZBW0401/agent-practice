# Work Log — 学程

Append-only. Latest first.

---

## 2026-10-11 10:52 / v1.0.2 修复 / Work Log

### Plan Replay
修复休息块插入位置错误：完成非最前任务会把休息插到队首；完成未排入任务会挤空其余任务。

### Actual Changes
- scheduler.js：pendingRestAfterCompleted 改为取「第一个未完成任务紧前」的已完成任务
- scheduler.js：首部休息加可用时间窗上限（rest > endMin - cursor 时截断）
- app.js：版本 1.0.1 → 1.0.2
- scheduler.test.html：新增完成非最前任务、全部完成无孤立休息 2 条用例（14→16）

### Files Changed
xuecheng/js/scheduler.js、xuecheng/js/app.js、xuecheng/test/scheduler.test.html

### Test Log
- `git diff --check`：通过（exit 0）
- 浏览器单元测试 scheduler.test.html：通过 16 / 失败 0（用户确认「全绿」）
- 手动走查：勾掉靠后任务不再插休息到队首；勾掉未排入任务不再挤空其余任务（用户确认「全绿」）

### Failures
无（本轮为修复已上报问题）。

### Fixes
- 休息插到队首（完成非最前任务时）→ 只认队首紧前已完成任务
- 未排入任务完成后挤空其余 → 同上根因修复 + 首部休息加窗口上限

### Retests
修复后 16/16 全绿 + 手动走查通过。

### Documentation Drift
无。

### Git Status
- 分支：fix/xuecheng-v1.0.2
- 基线：d31ffd7（main）
- 提交：d185a55（待推送）

### Rollback Judgment
无需回退。

### Risks
无新增。

### Next Step
合并 fix/xuecheng-v1.0.2 回 main。

---

## 2026-10-11 10:36 / v1.0.1 修复 / Work Log

### Plan Replay
修复两个真机回归问题：通知反复弹窗 + 时间轴回跳初始时间。

### Actual Changes
- app.js：移除 document 全局 click→requestPermission；改「测试提醒」按钮显式请求一次权限
- app.js：勾选完成记录 completedAt，反选清除
- scheduler.js：schedule 增加 nowMs 参数，锚定当前时间（不往回排）；pendingRestAfterCompleted 先行排刚完成任务剩余休息
- index.html / style.css：设置弹窗增加通知限制说明（.field-hint）
- scheduler.test.html：新增 2 条用例（12→14）

### Files Changed
xuecheng/js/scheduler.js、xuecheng/js/app.js、xuecheng/index.html、xuecheng/css/style.css、xuecheng/test/scheduler.test.html

### Test Log
- `git diff --check`：通过（exit 0）
- 浏览器单元测试 scheduler.test.html：通过 14 / 失败 0（用户确认「全绿」）
- 手动走查：不再反复弹通知；勾掉任务后时间轴从当前时间+剩余休息继续（用户确认「全绿」）

### Failures
无（本轮为修复已上报问题）。

### Fixes
- 通知反复弹窗：全局自动请求权限 → 仅显式按钮请求一次
- 时间轴回跳：固定 availableStart → 锚定当前时间 + 完成后剩余休息

### Retests
修复后 14/14 全绿 + 手动走查通过。

### Documentation Drift
无。产品需求「提醒」与「自动排布」语义在 v1.0.1 澄清：时间轴锚定当前时间。

### Git Status
- 分支：fix/xuecheng-v1.0.1
- 基线：e7a2cf2（main）
- 提交：5105659（待推送）

### Rollback Judgment
无需回退。

### Risks
无新增。

### Next Step
合并 fix/xuecheng-v1.0.1 回 main。

---

## 2026-10-11 10:21 / Phase 6 / Work Log

### Plan Replay
打磨与验证：边界情况修复 + 版本定版 + 文档漂移修正 + 最终回归。

### Actual Changes
- scheduler.js：修复「番茄休息=0」时仍插入零时长休息块的边界 bug（仅 remaining>0 且 brk>0 才插休息）
- app.js：版本 0.4.0 → 1.0.0（首个可交付版）
- scheduler.test.html：新增 1 条回归用例（11 → 12）

### Files Changed
xuecheng/js/scheduler.js、xuecheng/js/app.js、xuecheng/test/scheduler.test.html

### Test Log
- `git diff --check`：通过（exit 0）
- 浏览器单元测试：task.test.html 9/9、scheduler.test.html 12/12（用户确认「全绿」）
- 手动全量回归：新建/勾选/删除/时间轴排布/番茄配比/刷新持久化/「番茄休息=0」边界，均正常（用户确认「全绿」）

### Failures
无（本轮发现的边界 bug 见下，已修复）。

### Fixes
- 番茄休息=0 时插入零时长休息块 → 改为 brk>0 才插休息段。

### Retests
修复后 scheduler.test.html 12/12 全绿；主页面「番茄休息=0」手动走查无零时长块。

### Documentation Drift
无。ARCHITECTURE.md 分层与实现完全一致；产品需求无变更。

### Git Status
- 分支：feature/xuecheng
- 基线：034ea18
- 提交：62583d1（待推送）
- 未跟踪项 .claude/、claude 保持不触碰

### Rollback Judgment
无需回退。

### Risks
无新增。既有风险（提醒仅页面打开时触发）不变。

### Next Step
全部 6 个 Phase 完成。下一步：将 feature/xuecheng 合并回 main（合并前先与用户确认）。

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
