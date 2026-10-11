# Handoff — 学程

## Current State
Phase 5 完成（提醒）。分支 feature/xuecheng，已推送。

## Completed
- Phase 1：静态壳子 + 施工文档
- Phase 2：task.js 模型校验 + store.js localStorage + 单元测试页
- Phase 3：待办清单视图（渲染 / 勾选 / 新建 / 删除）
- Phase 4：scheduler.js 排程引擎 + 设置 + 时间轴渲染
- Phase 5：notify.js 提醒（浏览器通知 + 页面内 Toast）

## Incomplete
- Phase 6：打磨与验证

## Next Tasks
1. Phase 6：界面打磨 + 响应式 + 数据不丢最终回归 + 文档漂移修正

## Required Reading
docs/product/PRODUCT_REQUIREMENTS.md → docs/construction/ARCHITECTURE.md → docs/construction/CONSTRUCTION_PLAN.md → 本文件

## Important Files
xuecheng/index.html、xuecheng/js/app.js（视图控制器）、xuecheng/js/scheduler.js（排程引擎）、xuecheng/js/task.js、xuecheng/js/store.js、xuecheng/js/notify.js、xuecheng/test/*.html

## Test Baseline
自动化未建立；每 Phase 跑 `git diff --check` + 浏览器测试页/手动验证。

## Git State
分支：feature/xuecheng

## Backup Branch
backup/pre-xuecheng-20261011（已推送）

## Latest Commit
7763c77（Phase 5）

## Push Status
已推送 origin/feature/xuecheng

## Working Tree
仅剩未跟踪项 .claude/、claude（不触碰）

## Risks
- 到点提醒仅页面打开时触发；锁屏/后台/页面关闭不推送（纯前端无后端，技术边界）。
- 浏览器系统通知在 file:// 下可能受限；页面内 Toast 为主力兜底。
