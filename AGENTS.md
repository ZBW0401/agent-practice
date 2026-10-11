# Project Agent Instructions

## Project Identity
- Project: 学程 (Xuecheng) — 学习任务表
- Owner: zhang binwei
- Brand: 学程
- Repository: https://github.com/ZBW0401/agent-practice

## Instruction Priority
1. Latest user instruction
2. Master requirements (docs/construction/CONSTRUCTION_PLAN.md)
3. Product requirements (docs/product/PRODUCT_REQUIREMENTS.md)
4. Other construction documents
5. Existing code

## Required Reading
1. docs/product/PRODUCT_REQUIREMENTS.md
2. docs/construction/ARCHITECTURE.md
3. docs/construction/CONSTRUCTION_PLAN.md
4. docs/construction/HANDOFF.md

## Start Rules
- Inspect repository and Git.
- Read HANDOFF.md.
- Write a start plan in DEV_PROGRESS.md.
- Ensure the backup branch exists and is pushed.
- Do not overwrite unknown changes.

## Finish Rules
- Run tests; record failures and fixes.
- Correct documentation drift.
- Update HANDOFF.md.
- Commit and push.

## Current Phase
v1.0.0 已合并 main；项目完成（后续改动从 main 开新分支）

## Prohibitions
- No force push.
- No destructive cleanup (git reset --hard / clean -fd / checkout --).
- No fabricated test results.
- No secrets in the repository.
- No backend / 账号 / 云同步 in v1 (仅预留扩展点).
