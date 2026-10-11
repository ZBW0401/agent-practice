/* 学程 — 领域层：任务模型与校验 */
(function () {
  'use strict';

  var NS = window.Xuecheng = window.Xuecheng || {};

  var PRIORITIES = ['high', 'medium', 'low'];
  var DIFFICULTIES = ['easy', 'medium', 'hard'];

  function uid() {
    return 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  /**
   * 校验并归一化任务输入。
   * @param {Object} input 原始输入
   * @returns {{ok:boolean, task?:Object, errors?:string[]}}
   */
  function create(input) {
    var raw = input || {};
    var errors = [];

    var subject = typeof raw.subject === 'string' ? raw.subject.trim() : '';
    if (!subject) {
      errors.push('科目不能为空');
    }

    var durationMin = Number(raw.durationMin);
    if (!isFinite(durationMin) || durationMin <= 0) {
      errors.push('预计时长必须是大于 0 的分钟数');
    }
    durationMin = Math.round(durationMin);

    var deadline = raw.deadline ? String(raw.deadline) : null;

    var priority = PRIORITIES.indexOf(raw.priority) >= 0 ? raw.priority : 'medium';
    var difficulty = DIFFICULTIES.indexOf(raw.difficulty) >= 0 ? raw.difficulty : 'medium';

    var restAfterMin = Number(raw.restAfterMin) || 0;
    if (restAfterMin < 0) {
      errors.push('完成后休息时长不能为负');
    }
    restAfterMin = Math.round(restAfterMin);

    var completed = !!raw.completed;

    if (errors.length) {
      return { ok: false, errors: errors };
    }

    return {
      ok: true,
      task: {
        id: raw.id || uid(),
        subject: subject,
        durationMin: durationMin,
        deadline: deadline,
        priority: priority,
        difficulty: difficulty,
        restAfterMin: restAfterMin,
        completed: completed,
        createdAt: raw.createdAt || new Date().toISOString()
      }
    };
  }

  NS.task = {
    PRIORITIES: PRIORITIES,
    DIFFICULTIES: DIFFICULTIES,
    create: create,
    uid: uid
  };
})();
