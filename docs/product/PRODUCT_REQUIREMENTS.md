# Product Requirements — 学程

## Identity
- 产品名：学程 (Xuecheng)
- Owner：zhang binwei
- 品牌：学程

## Product One-Liner
一个帮你把学习任务自动排进时间轴、并合理安排番茄钟休息的本地学习规划工具。

## Problem
手动规划学习时间费劲，学习与休息节奏难以兼顾；需要一个工具自动排布任务并插入番茄钟休息。

## Primary User
第一版：用户自己（单机本地使用）。未来：可能开放给多人。

## Core Product Object
学习任务 + 时间轴（任务挂在当天时间轴上，系统自动排布 + 自动插入休息）。

## Supporting Content
待办清单、提醒、番茄钟休息规则 —— 均服务于「时间轴排布」这个核心，不可喧宾夺主。

## Main User Journey
1. 打开页面 → 第一眼看到待办清单。
2. 新建/查看学习任务（科目、预计时长、截止时间、优先级、难度、完成后休息时长）。
3. 系统按当天可用时间段 + 各任务预计时长，自动排成时间轴并插入番茄钟休息。
4. 到点提醒、勾选完成，数据存 localStorage，刷新不丢。

## First-Release Scope
- 任务 CRUD（字段全量）
- 待办清单视图
- 当天时间轴（自动排布 + 自动插番茄钟休息）
- 提醒
- localStorage 本地持久化

## Explicit Non-Goals
多用户/账号/云同步、社交分享、学习数据统计报告、后端服务器/数据库。

## Permissions
单人本地，无账号、无权限分级（第一版）。

## Taxonomy
任务按「科目」归类；优先级 / 难度作为任务字段。

## Delivery or Download Model
本地网页：双击 index.html 即可在浏览器打开，无下载、无付费。

## Future Extension Points
- 多用户/账号（数据模型预留 `owner` 概念，但不实现）
- 云同步（存储层预留替换为后端接口的边界）

## Success Criteria
1. 基本功能正常运行。
2. 数据刷新不丢。
3. 界面整洁清爽（对标「不背单词」App）。

## Decision Log
| 决策 | 理由 | 被否方案 | 日期 | Owner |
|---|---|---|---|---|
| 产品名「学程」 | 用户确认 | 学习表 / StudyFlow | 2026-10-11 | zhang binwei |
| 番茄钟默认 25/5 且可配置 | 用户确认「默认就可以」 | 固定不可配 / 50/10 | 2026-10-11 | zhang binwei |
| 未来多人只留扩展点、不实现 | 用户确认「可以」 | 第一版就做账号/后端 | 2026-10-11 | zhang binwei |
| 核心对象 = 任务 + 时间轴结合 | 用户选择 | 纯清单 / 纯时间轴 / 纯番茄钟 | 2026-10-11 | zhang binwei |
| 形态 = 本地网页（纯 HTML+CSS+JS） | 用户选择 | CLI / 联网 Web / 桌面 | 2026-10-11 | zhang binwei |
| 在 agent-practice 仓库新分支施工 | 用户选择 | 新开独立仓库 | 2026-10-11 | zhang binwei |
| 不用 ES modules，用普通 `<script>` 顺序加载 | 保证 file:// 双击打开可用（ES modules 在 file:// 下受 CORS 限制） | ES modules / 打包工具 | 2026-10-11 | 实现决策 |

## Assumption Register
| 假设 | 不确定性 | 错了的影响 | 如何验证 | 状态 |
|---|---|---|---|---|
| 提醒=浏览器通知+页面内提示；锁屏/后台不推送 | 高 | 用户误以为能后台提醒 | 真机测试 | 已标记风险 |
| 自动排布=给定可用时间段+任务时长，按截止/优先级排序填入 | 中 | 排布不符预期 | Phase 4 出样例 | 待验证 |
| 视觉可对标「不背单词」清爽简洁风 | 中 | 视觉不符 | Phase 1 静态壳子给用户看 | 待验证 |
