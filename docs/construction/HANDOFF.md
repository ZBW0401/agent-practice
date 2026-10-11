# Handoff — 学程

## Current State
Phase 1 完成（静态壳子 + 施工文档）。分支 feature/xuecheng，已推送。

## Completed
- 施工文档体系（AGENTS.md + docs/）
- Phase 1 静态壳子（index.html / style.css / app.js）

## Incomplete
- Phase 2–6 未开始

## Next Tasks
1. Phase 2：任务数据模型（task.js）+ localStorage（store.js）
2. Phase 3：待办清单视图
3. Phase 4：时间轴自动排布 + 番茄钟

## Required Reading
docs/product/PRODUCT_REQUIREMENTS.md → docs/construction/ARCHITECTURE.md → docs/construction/CONSTRUCTION_PLAN.md → 本文件

## Important Files
xuecheng/index.html、xuecheng/css/style.css、xuecheng/js/app.js、docs/construction/CONSTRUCTION_PLAN.md

## Test Baseline
自动化未建立；每 Phase 跑 `git diff --check` + 浏览器手动验证。

## Git State
分支：feature/xuecheng

## Backup Branch
backup/pre-xuecheng-20261011（已推送）

## Latest Commit
fcf0cb6（Phase 1）

## Push Status
已推送 origin/feature/xuecheng

## Working Tree
仅剩未跟踪项 .claude/、claude（不触碰）

## Risks
提醒锁屏/后台不推送（Phase 5 真机验证）
