# Construction Plan — 学程

开发分支：`feature/xuecheng`　备份分支：`backup/pre-xuecheng-20261011`　基线：`7283af0`

---

## Phase 1: 静态壳子

### Goal
建立可打开的手机优先页面骨架，确立「学程」的清爽视觉基调与整体布局。

### Included
- index.html 结构（顶部标题栏 / 待办清单区 / 时间轴区 / 新建任务按钮）
- style.css（手机优先响应式、清爽风）
- app.js 入口占位（装配空模块）

### Excluded
任务数据模型、localStorage、真实待办渲染、时间轴排布算法、提醒。

### Dependencies
无。

### Planned Deliverables
`xuecheng/index.html`、`xuecheng/css/style.css`、`xuecheng/js/app.js`

### Tests
浏览器手动打开 index.html 检查布局与响应式；`git diff --check`。

### Acceptance Criteria
页面可打开、无控制台报错、手机宽度布局正常、视觉清爽。

### Rollback Point
`backup/pre-xuecheng-20261011`

---

## Phase 2: 任务数据模型 + 本地存储

### Goal
定义 Task 模型 + localStorage 持久化。

### Included
`task.js`（Task 模型、字段校验）、`store.js`（CRUD + 序列化）。

### Excluded
UI 渲染、时间轴、提醒。

### Dependencies
Phase 1。

### Tests
控制台手动增删改查 + 刷新验证不丢；`git diff --check`。

### Acceptance Criteria
数据刷新不丢、字段校验生效、非法输入被拒。

### Rollback Point
Phase 1 提交。

---

## Phase 3: 待办清单视图

### Goal
第一眼看到的待办清单：渲染 + 勾选完成 + 新建任务表单。

### Included
任务表单（全字段）、清单渲染、勾选切换完成、删除。

### Excluded
时间轴、提醒。

### Dependencies
Phase 2。

### Tests
手动增/改/删/勾选 + 刷新验证；`git diff --check`。

### Acceptance Criteria
清单正确显示、操作即时反映并持久化。

### Rollback Point
Phase 2 提交。

---

## Phase 4: 时间轴自动排布 + 番茄钟

### Goal
核心算法：按可用时间段 + 任务时长自动排布，插入番茄钟休息。

### Included
`scheduler.js`（排序、打包、插入 25/5 休息）、可用时间段设置、时间轴渲染、配比可配置。

### Excluded
提醒。

### Dependencies
Phase 2/3。

### Tests
多种输入（超时任务、空清单、跨日）验证排布；`git diff --check`。

### Acceptance Criteria
排布合理、休息自动插入、配比可改。

### Rollback Point
Phase 3 提交。

---

## Phase 5: 提醒

### Goal
到点提醒。

### Included
`notify.js`（Notification API + 页面内提示）、到点触发。

### Excluded
后台推送（技术不可行，记为限制）。

### Dependencies
Phase 4。

### Tests
页面打开时到点提醒；`git diff --check`。

### Acceptance Criteria
页面打开时提醒到点触发；明确记录锁屏/后台不推送的限制。

### Rollback Point
Phase 4 提交。

---

## Phase 6: 打磨与验证

### Goal
界面整洁、响应式、数据不丢的最终验证。

### Included
视觉打磨、边界情况、跨设备检查、文档漂移修正。

### Excluded
任何新功能。

### Dependencies
Phase 1–5。

### Tests
完整手动回归 + `git diff --check` + 数据不丢验证。

### Acceptance Criteria
成功标准三条全部满足。

### Rollback Point
Phase 5 提交。
