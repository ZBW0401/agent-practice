# Handoff — 学程

## Current State
v1.0.0 已完成并合并到 main（合并提交 80a3f38）。全部 6 个 Phase 完成，测试全绿，成功标准三条全部满足。

## Completed
- Phase 1：静态壳子 + 施工文档
- Phase 2：task.js 模型校验 + store.js localStorage + 单元测试页
- Phase 3：待办清单视图（渲染 / 勾选 / 新建 / 删除）
- Phase 4：scheduler.js 排程引擎 + 设置 + 时间轴渲染
- Phase 5：notify.js 提醒（浏览器通知 + 页面内 Toast）
- Phase 6：打磨与验证（休息=0 边界修复 + 版本 1.0.0 + 最终回归）

## Incomplete
无。

## Next Tasks
无（如需新功能/修改，从 main 开新分支继续）。

## Required Reading
docs/product/PRODUCT_REQUIREMENTS.md → docs/construction/ARCHITECTURE.md → docs/construction/CONSTRUCTION_PLAN.md → 本文件

## Important Files
xuecheng/index.html、xuecheng/js/app.js（视图控制器）、xuecheng/js/scheduler.js（排程引擎）、xuecheng/js/task.js、xuecheng/js/store.js、xuecheng/js/notify.js、xuecheng/test/*.html

## Test Baseline
自动化未建立；浏览器测试页 task 9/9、scheduler 12/12 全绿，手动全量回归通过。

## Git State
已合并到 main（80a3f38，已推送 origin/main）。开发分支 feature/xuecheng 保留。

## Backup Branch
backup/pre-xuecheng-20261011（已推送）

## Latest Commit
main: 80a3f38（merge: 学程 v1.0.0 合并到 main）

## Push Status
已推送 origin/main

## Working Tree
仅剩未跟踪项 .claude/、claude（不触碰）

## Risks
- 到点提醒仅页面打开时触发；锁屏/后台/页面关闭不推送（纯前端无后端，技术边界）。
- 浏览器系统通知在 file:// 下可能受限；页面内 Toast 为主力兜底。
