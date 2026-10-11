/* 学程 — 领域层：排程引擎（自动排布 + 番茄钟休息） */
(function () {
  'use strict';

  var NS = window.Xuecheng = window.Xuecheng || {};

  var DEFAULTS = {
    availableStart: '09:00',
    availableEnd: '22:00',
    pomodoroFocusMin: 25,
    pomodoroBreakMin: 5
  };

  function toMin(hhmm) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || ''));
    if (!m) {
      return 0;
    }
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  }

  function toHHMM(minutes) {
    var m = ((Math.round(minutes) % 1440) + 1440) % 1440;
    var h = Math.floor(m / 60);
    var mm = m % 60;
    return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm;
  }

  /**
   * 排程：按可用时间段 + 番茄钟节奏，把未完成任务排进时间轴。
   * @param {Object[]} tasks 任务数组
   * @param {Object} settings 可用时间段 + 番茄钟配比
   * @returns {{blocks:Object[], unscheduled:string[], startMin:number, endMin:number}}
   */
  function schedule(tasks, settings) {
    var s = settings || {};
    var startMin = toMin(s.availableStart != null ? s.availableStart : DEFAULTS.availableStart);
    var endMin = toMin(s.availableEnd != null ? s.availableEnd : DEFAULTS.availableEnd);
    if (endMin <= startMin) {
      endMin = startMin;
    }

    var focus = (s.pomodoroFocusMin != null) ? Number(s.pomodoroFocusMin) : DEFAULTS.pomodoroFocusMin;
    var brk = (s.pomodoroBreakMin != null) ? Number(s.pomodoroBreakMin) : DEFAULTS.pomodoroBreakMin;
    if (!isFinite(focus) || focus <= 0) {
      focus = DEFAULTS.pomodoroFocusMin;
    }
    if (!isFinite(brk) || brk < 0) {
      brk = 0;
    }

    var order = { high: 0, medium: 1, low: 2 };
    var pending = (tasks || [])
      .filter(function (t) { return !t.completed; })
      .slice()
      .sort(function (a, b) {
        if (order[a.priority] !== order[b.priority]) {
          return order[a.priority] - order[b.priority];
        }
        if (a.deadline && b.deadline) {
          return a.deadline < b.deadline ? -1 : 1;
        }
        if (a.deadline) { return -1; }
        if (b.deadline) { return 1; }
        return (a.createdAt || '') < (b.createdAt || '') ? -1 : 1;
      });

    var blocks = [];
    var unscheduled = [];
    var cursor = startMin;

    pending.forEach(function (t) {
      var duration = Number(t.durationMin) || 0;
      if (duration <= 0) { return; }

      var chunks = Math.ceil(duration / focus);
      var internalBreak = (chunks - 1) * brk;
      var restAfter = Number(t.restAfterMin) || 0;
      var total = duration + internalBreak + restAfter;

      if (cursor + total > endMin) {
        unscheduled.push(t.id);
        return;
      }

      var remaining = duration;
      while (remaining > 0) {
        var seg = Math.min(remaining, focus);
        blocks.push({
          kind: 'study',
          taskId: t.id,
          subject: t.subject,
          startMin: cursor,
          endMin: cursor + seg,
          durationMin: seg
        });
        cursor += seg;
        remaining -= seg;
        if (remaining > 0) {
          blocks.push({
            kind: 'break',
            label: '休息',
            startMin: cursor,
            endMin: cursor + brk,
            durationMin: brk
          });
          cursor += brk;
        }
      }
      if (restAfter > 0) {
        blocks.push({
          kind: 'break',
          label: '休息',
          startMin: cursor,
          endMin: cursor + restAfter,
          durationMin: restAfter
        });
        cursor += restAfter;
      }
    });

    return { blocks: blocks, unscheduled: unscheduled, startMin: startMin, endMin: endMin };
  }

  NS.scheduler = {
    defaults: DEFAULTS,
    toMin: toMin,
    toHHMM: toHHMM,
    schedule: schedule
  };
})();
