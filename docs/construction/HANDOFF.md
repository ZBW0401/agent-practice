# Handoff — 学程

## Current State
v1.0.2（修复休息块插入位置）已完成，待合并回 main。

## Completed
- Phase 1–6 全部完成（壳子 / 模型与存储 / 待办清单 / 时间轴+番茄钟 / 提醒 / 打磨验证）
- v1.0.1：通知权限显式请求、时间轴锚定当前时间
- v1.0.2：休息只认队首紧前的已完成任务

## Incomplete
无。

## Next Tasks
无（v1.0.2 合并回 main 后即最新）。

## Required Reading
docs/product/PRODUCT_REQUIREMENTS.md → docs/construction/ARCHITECTURE.md → docs/construction/CONSTRUCTION_PLAN.md → 本文件

## Important Files
xuecheng/index.html、xuecheng/js/app.js（视图控制器）、xuecheng/js/scheduler.js（排程引擎）、xuecheng/js/task.js、xuecheng/js/store.js、xuecheng/js/notify.js、xuecheng/test/*.html

## Test Baseline
自动化未建立；浏览器测试页 task 9/9、scheduler 16/16 全绿，手动回归通过。

## Git State
分支 fix/xuecheng-v1.0.2（基于 main d31ffd7）。

## Backup Branch
backup/pre-xuecheng-20261011（已推送）

## Latest Commit
d185a55（v1.0.2 修复，待推送）

## Push Status
待推送

## Working Tree
仅剩未跟踪项 .claude/、claude（不触碰）

## Risks
- 到点提醒仅页面打开时触发；锁屏/后台/页面关闭不推送（纯前端无后端）。
- 浏览器系统通知在 file:// 下可能受限；页面内 Toast 为主力兜底。
