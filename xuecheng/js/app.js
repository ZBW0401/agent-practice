/* 学程 — 入口（Phase 1 静态壳子） */
(function () {
  'use strict';

  window.Xuecheng = window.Xuecheng || {};
  window.Xuecheng.version = '0.2.0';

  console.info('[学程] 加载完成 v' + window.Xuecheng.version);

  // Phase 2 冒烟：数据层可用性
  if (window.Xuecheng.store) {
    console.info('[学程] 当前任务数：' + window.Xuecheng.store.loadTasks().length);
  }
})();
