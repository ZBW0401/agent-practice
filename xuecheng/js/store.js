/* 学程 — 数据访问层：localStorage 适配（唯一数据出入口） */
(function () {
  'use strict';

  var NS = window.Xuecheng = window.Xuecheng || {};

  var KEYS = {
    tasks: 'xuecheng.tasks',
    settings: 'xuecheng.settings'
  };

  function storageAvailable() {
    try {
      var k = '__xuecheng_test__';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadTasks() {
    if (!storageAvailable()) {
      return [];
    }
    try {
      var raw = window.localStorage.getItem(KEYS.tasks);
      if (!raw) {
        return [];
      }
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('[学程] 读取任务数据失败，返回空列表', e);
      return [];
    }
  }

  function saveTasks(tasks) {
    if (!storageAvailable()) {
      console.warn('[学程] localStorage 不可用，数据未持久化');
      return false;
    }
    try {
      window.localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
      return true;
    } catch (e) {
      console.warn('[学程] 保存任务数据失败', e);
      return false;
    }
  }

  NS.store = {
    KEYS: KEYS,
    loadTasks: loadTasks,
    saveTasks: saveTasks
  };
})();
