# Architecture — 学程

## Architectural Goal
最简的静态前端：零依赖、无构建、双击 index.html 即可运行。分层清晰，为将来「多人/云同步」留出替换边界，但第一版绝不实现后端。

## Current Stack
- 纯 HTML + CSS + JavaScript（无框架、无打包器）
- 存储：浏览器 localStorage
- 通知：Notification API + 页面内提示

## Deployment Shape
单目录静态文件 `xuecheng/`，本地双击打开（file:// 协议）。为兼容 file://，不使用 ES modules，改用普通 `<script>` 顺序加载 + 单一全局命名空间 `window.Xuecheng`。

## Layer Overview
| 层 | 文件 | 职责 | 允许依赖 | 禁止依赖 |
|---|---|---|---|---|
| 表现层 | index.html, css/style.css, js/app.js | 视图渲染、事件绑定、装配 | 领域层、数据访问层、通知层 | 直接改 localStorage 数据结构 |
| 领域层 | js/task.js, js/scheduler.js | 任务模型与校验、排程算法（自动排布+番茄钟） | 无（纯逻辑） | DOM、localStorage、通知 |
| 数据访问层 | js/store.js | localStorage 读写、序列化、CRUD | 无 | DOM、领域层逻辑 |
| 通知层 | js/notify.js | 到点提醒（通知+页面内） | 数据访问层（读数据） | 领域层算法 |

依赖方向：表现层 → 领域层 → 数据访问层；通知层被表现层调用。

## Data Flow
1. 用户操作 → 表现层事件 → 领域层处理（校验/排程）→ 数据访问层写入 localStorage。
2. 页面加载 → 数据访问层读取 → 领域层排程 → 表现层渲染。

## File and Storage Flow
- 任务数据以 JSON 数组存于 `localStorage['xuecheng.tasks']`。
- 设置（可用时间段、番茄钟配比）存于 `localStorage['xuecheng.settings']`。
- 无文件上传、无后端存储。

## Authentication Boundary
第一版无认证。数据模型预留 `owner` 字段与 `store` 层接口边界，供未来多人/云同步替换。

## Integration Boundary
第一版无第三方集成。

## Testing Strategy
- 纯静态、无包管理器 → 自动化测试框架「未建立」。
- 每 Phase：浏览器手动验证 + `git diff --check` + 关键路径控制台手测。
- 成功标准验收集中在 Phase 6 回归。

## Future Extension Points
- `store.js` 是唯一数据出入口：未来换后端 API 只改这一层。
- `task.js` 模型可加字段不破坏旧数据（向后兼容序列化）。
- 表现层视图可独立演进。
