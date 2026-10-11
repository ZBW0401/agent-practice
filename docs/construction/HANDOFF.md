# Handoff — 学程

## Current State
全部 6 个 Phase 完成（含 Phase 6 打磨与验证）。分支 feature/xuecheng。功能可用、测试全绿、成功标准三条全部满足。

## Completed
- Phase 1：静态壳子 + 施工文档
- Phase 2：task.js 模型校验 + store.js localStorage + 单元测试页
- Phase 3：待办清单视图（渲染 / 勾选 / 新建 / 删除）
- Phase 4：scheduler.js 排程引擎 + 设置 + 时间轴渲染
- Phase 5：notify.js 提醒（浏览器通知 + 页面内 Toast）
- Phase 6：打磨与验证（休息=0 边界修复 + 版本 1.0.0 + 最终回归）

## Incomplete
无（功能开发完成）。

## Next Tasks
1. 将 feature/xuecheng 合并回 main（合并前先与用户确认）。

## Required Reading
docs/product/PRODUCT_REQUIREMENTS.md → docs/construction/ARCHITECTURE.md → docs/construction/CONSTRUCTION_PLAN.md → 本文件

## Important Files
xuecheng/index.html、xuecheng/js/app.js（视图控制器）、xuecheng/js/scheduler.js（排程引擎）、xuecheng/js/task.js、xuecheng/js/store.js、xuecheng/js/notify.js、xuecheng/test/*.html

## Test Baseline
自动化未建立；每 Phase 跑 `git diff --check` + 浏览器测试页/手动验证。Phase 6 最终回归：task 9/9、scheduler 12/12 全绿，手动全量通过。

## Git State
分支：feature/xuecheng

## Backup Branch
backup/pre-xuecheng-20261011（已推送）

## Latest Commit
62583d1（Phase 6，待推送）

## Push Status
待推送（本轮 docs 提交后一并推送）

## Working Tree
仅剩未跟踪项 .claude/、claude（不触碰）

## Risks
- 到点提醒仅页面打开时触发；锁屏/后台/页面关闭不推送（纯前端无后端，技术边界）。
- 浏览器系统通知在 file:// 下可能受限；页面内 Toast 为主力兜底。
