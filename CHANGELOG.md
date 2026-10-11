# Changelog — 学程

所有值得记录的产品变更（按版本倒序）。

## [1.0.2] - 2026-10-11

### Fixed
- 休息块插入位置错误：完成第二个及以后的任务会把休息错误地插到第一个任务前。
- 完成「超出可用时间（未排入）」的任务会挤空其余任务的时间。
- 根因：`pendingRestAfterCompleted` 误取「最近完成的任务」；改为取「紧挨在第一个未完成任务之前」的那个已完成任务。
- 首部休息加可用时间窗上限，避免极端休息时长排空当天。

### Tests
- `git diff --check` 通过；task 9/9、scheduler 16/16（新增 2 条）。

## [1.0.1] - 2026-10-11

### Fixed
- 通知权限反复弹窗：去掉全局「每次点击都请求权限」，改为「测试提醒」按钮显式请求一次。
- 时间轴回跳初始时间：排程锚定当前时间；勾掉任务后下一项从「当前时间 + 剩余完成后休息」继续。

### Changed
- 设置弹窗新增通知限制说明（本地 file:// 下系统通知可能受限，页面内提示兜底）。

### Tests
- `git diff --check` 通过；task 9/9、scheduler 14/14（新增 2 条）。

## [1.0.0] - 2026-10-11

### Added
- 学程首个可交付版：任务 CRUD、待办清单、时间轴自动排布 + 番茄钟休息、到点提醒、localStorage 持久化。
- 纯 HTML+CSS+JS，无后端、无构建，手机优先，本地双击即用。
- Phase 1–6 全部完成。

### Fixed
- 番茄休息设为 0 分钟时不再插入零时长休息块。

### Tests
- `git diff --check` 通过；task 9/9、scheduler 12/12、手动全量回归。

## 说明
- 完整施工日志见 `docs/construction/LOG.md`；进度见 `DEV_PROGRESS.md`；握手状态见 `HANDOFF.md`；测试基线见 `TEST_METRICS.md`。
- 分支：main（最新）、feature/xuecheng、fix/xuecheng-v1.0.1、fix/xuecheng-v1.0.2、backup/pre-xuecheng-20261011。
