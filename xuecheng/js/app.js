/* 学程 — 表现层：装配与视图控制 */
(function () {
  'use strict';

  var NS = window.Xuecheng = window.Xuecheng || {};
  NS.version = '1.0.1';

  var T = NS.task;
  var S = NS.store;
  var SCH = NS.scheduler;
  var N = NS.notify;

  var tasks = [];
  var settings = {};

  var PRIORITY_LABEL = { high: '高', medium: '中', low: '低' };
  var DIFFICULTY_LABEL = { easy: '简单', medium: '中等', hard: '困难' };

  // DOM 引用
  var todoList = document.querySelector('[data-view="todo-list"]');
  var todoEmpty = document.querySelector('[data-view="todo-empty"]');
  var todoCount = document.getElementById('todo-count');
  var timeline = document.querySelector('[data-view="timeline"]');
  var timelineEmpty = document.querySelector('[data-view="timeline-empty"]');
  var timelineWindow = document.getElementById('timeline-window');
  var fab = document.querySelector('.fab');
  var btnSettings = document.getElementById('btn-settings');

  // 任务弹窗
  var taskModal = document.querySelector('[data-view="modal"]');
  var taskForm = document.getElementById('task-form');
  var taskErrors = document.querySelector('[data-view="form-errors"]');
  var taskCancel = document.querySelector('[data-action="cancel"]');
  var taskClose = taskModal.querySelector('.modal__close');
  var taskBackdrop = taskModal.querySelector('.modal__backdrop');

  // 设置弹窗
  var settingsModal = document.querySelector('[data-view="settings-modal"]');
  var settingsForm = document.getElementById('settings-form');
  var settingsErrors = document.querySelector('[data-view="settings-errors"]');
  var settingsBackdrop = settingsModal.querySelector('.modal__backdrop');
  var btnTestRemind = document.getElementById('btn-test-remind');

  function saveTasks() {
    S.saveTasks(tasks);
  }

  function saveSettings() {
    S.saveSettings(settings);
  }

  var reminderTimers = [];

  function clearReminders() {
    for (var r = 0; r < reminderTimers.length; r++) {
      clearTimeout(reminderTimers[r]);
    }
    reminderTimers = [];
  }

  function scheduleReminders(result) {
    clearReminders();
    var now = new Date();
    var nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    result.blocks.forEach(function (b) {
      if (b.kind !== 'study' && b.kind !== 'break') {
        return;
      }
      var delayMin = b.startMin - nowMin;
      if (delayMin < 0) {
        return;
      }
      var title;
      var body;
      if (b.kind === 'study') {
        title = '该学习了';
        body = '开始「' + b.subject + '」（' + SCH.toHHMM(b.startMin) + '–' + SCH.toHHMM(b.endMin) + '）';
      } else {
        title = '休息一下';
        body = '休息 ' + b.durationMin + ' 分钟';
      }
      reminderTimers.push(setTimeout(function () {
        N.show(title, body);
      }, Math.round(delayMin * 60 * 1000)));
    });
  }

  function renderTodo() {
    var order = { high: 0, medium: 1, low: 2 };
    var sorted = tasks.slice().sort(function (a, b) {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return order[a.priority] - order[b.priority];
    });

    todoList.innerHTML = '';
    sorted.forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'todo-item' + (t.completed ? ' is-done' : '');
      li.dataset.id = t.id;

      var check = document.createElement('button');
      check.type = 'button';
      check.className = 'todo-check';
      check.setAttribute('aria-label', t.completed ? '标记未完成' : '标记完成');
      check.textContent = t.completed ? '✓' : '';

      var body = document.createElement('div');
      body.className = 'todo-body';

      var title = document.createElement('div');
      title.className = 'todo-subject';
      title.textContent = t.subject;

      var meta = document.createElement('div');
      meta.className = 'todo-meta';
      var parts = [
        t.durationMin + ' 分钟',
        '优先级 ' + PRIORITY_LABEL[t.priority],
        '难度 ' + DIFFICULTY_LABEL[t.difficulty]
      ];
      if (t.deadline) {
        parts.push('截止 ' + t.deadline);
      }
      if (t.restAfterMin > 0) {
        parts.push('休 ' + t.restAfterMin + ' 分钟');
      }
      meta.textContent = parts.join(' · ');

      body.appendChild(title);
      body.appendChild(meta);

      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'todo-del';
      del.setAttribute('aria-label', '删除');
      del.textContent = '🗑';

      li.appendChild(check);
      li.appendChild(body);
      li.appendChild(del);
      todoList.appendChild(li);
    });

    var has = tasks.length > 0;
    todoList.hidden = !has;
    todoEmpty.hidden = has;
    todoCount.textContent = tasks.length + ' 项';
  }

  function renderTimeline() {
    timelineWindow.textContent = settings.availableStart + '–' + settings.availableEnd;
    var result = SCH.schedule(tasks, settings, Date.now());

    timeline.innerHTML = '';
    result.blocks.forEach(function (b) {
      var li = document.createElement('li');
      li.className = 'tl-item ' + (b.kind === 'break' ? 'tl-item--break' : 'tl-item--study');

      var time = document.createElement('span');
      time.className = 'tl-time';
      time.textContent = SCH.toHHMM(b.startMin) + '–' + SCH.toHHMM(b.endMin);

      var label = document.createElement('span');
      label.className = 'tl-label';
      label.textContent = b.kind === 'break' ? '休息' : b.subject;

      li.appendChild(time);
      li.appendChild(label);
      timeline.appendChild(li);
    });

    if (result.unscheduled.length) {
      var note = document.createElement('li');
      note.className = 'tl-unsched';
      note.textContent = '⚠ 有 ' + result.unscheduled.length + ' 项任务超出可用时间，未排入';
      timeline.appendChild(note);
    }

    var has = result.blocks.length > 0 || result.unscheduled.length > 0;
    timeline.hidden = !has;
    timelineEmpty.hidden = has;
    scheduleReminders(result);
  }

  function render() {
    renderTodo();
    renderTimeline();
  }

  // —— 待办：勾选 / 删除 ——
  todoList.addEventListener('click', function (e) {
    var item = e.target.closest('.todo-item');
    if (!item) {
      return;
    }
    var id = item.dataset.id;
    var task = null;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        task = tasks[i];
        break;
      }
    }
    if (!task) {
      return;
    }

    if (e.target.classList.contains('todo-check')) {
      task.completed = !task.completed;
      if (task.completed) {
        task.completedAt = Date.now();
      } else {
        delete task.completedAt;
      }
      saveTasks();
      render();
    } else if (e.target.classList.contains('todo-del')) {
      if (window.confirm('确定删除「' + task.subject + '」吗？')) {
        tasks = tasks.filter(function (t) {
          return t.id !== id;
        });
        saveTasks();
        render();
      }
    }
  });

  // —— 任务弹窗 ——
  function openTaskForm() {
    taskForm.reset();
    taskErrors.hidden = true;
    taskModal.hidden = false;
    document.getElementById('f-subject').focus();
  }

  function closeTaskForm() {
    taskModal.hidden = true;
    taskErrors.hidden = true;
  }

  fab.addEventListener('click', openTaskForm);
  taskCancel.addEventListener('click', closeTaskForm);
  taskClose.addEventListener('click', closeTaskForm);
  taskBackdrop.addEventListener('click', closeTaskForm);

  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var res = T.create({
      subject: taskForm.elements.subject.value,
      durationMin: taskForm.elements.durationMin.value,
      deadline: taskForm.elements.deadline.value,
      priority: taskForm.elements.priority.value,
      difficulty: taskForm.elements.difficulty.value,
      restAfterMin: taskForm.elements.restAfterMin.value
    });

    if (!res.ok) {
      taskErrors.textContent = res.errors.join('；');
      taskErrors.hidden = false;
      return;
    }

    tasks.push(res.task);
    saveTasks();
    render();
    closeTaskForm();
  });

  // —— 设置弹窗 ——
  function openSettings() {
    settingsForm.elements.availableStart.value = settings.availableStart;
    settingsForm.elements.availableEnd.value = settings.availableEnd;
    settingsForm.elements.pomodoroFocusMin.value = settings.pomodoroFocusMin;
    settingsForm.elements.pomodoroBreakMin.value = settings.pomodoroBreakMin;
    settingsErrors.hidden = true;
    settingsModal.hidden = false;
  }

  function closeSettings() {
    settingsModal.hidden = true;
    settingsErrors.hidden = true;
  }

  btnSettings.addEventListener('click', openSettings);
  settingsBackdrop.addEventListener('click', closeSettings);
  var closeSettingsBtns = settingsModal.querySelectorAll('[data-action="close-settings"]');
  for (var k = 0; k < closeSettingsBtns.length; k++) {
    closeSettingsBtns[k].addEventListener('click', closeSettings);
  }

  settingsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var start = settingsForm.elements.availableStart.value;
    var end = settingsForm.elements.availableEnd.value;
    var focus = Number(settingsForm.elements.pomodoroFocusMin.value);
    var brk = Number(settingsForm.elements.pomodoroBreakMin.value);

    if (!start || !end) {
      settingsErrors.textContent = '请填写可用开始与结束时间';
      settingsErrors.hidden = false;
      return;
    }
    if (SCH.toMin(end) <= SCH.toMin(start)) {
      settingsErrors.textContent = '结束时间必须晚于开始时间';
      settingsErrors.hidden = false;
      return;
    }
    if (!isFinite(focus) || focus <= 0) {
      settingsErrors.textContent = '番茄专注时长必须是正整数';
      settingsErrors.hidden = false;
      return;
    }
    if (!isFinite(brk) || brk < 0) {
      settingsErrors.textContent = '番茄休息时长不能为负';
      settingsErrors.hidden = false;
      return;
    }

    settings.availableStart = start;
    settings.availableEnd = end;
    settings.pomodoroFocusMin = Math.round(focus);
    settings.pomodoroBreakMin = Math.round(brk);
    saveSettings();
    render();
    closeSettings();
  });

  if (btnTestRemind) {
    btnTestRemind.addEventListener('click', function () {
      N.request().then(function () {
        N.show('测试提醒', '页面内提示始终可用；浏览器通知视权限而定');
      });
    });
  }

  // —— 初始化 ——
  tasks = S.loadTasks();
  var saved = S.loadSettings() || {};
  settings = {
    availableStart: saved.availableStart || SCH.defaults.availableStart,
    availableEnd: saved.availableEnd || SCH.defaults.availableEnd,
    pomodoroFocusMin: (saved.pomodoroFocusMin != null) ? saved.pomodoroFocusMin : SCH.defaults.pomodoroFocusMin,
    pomodoroBreakMin: (saved.pomodoroBreakMin != null) ? saved.pomodoroBreakMin : SCH.defaults.pomodoroBreakMin
  };
  render();
  console.info('[学程] 加载完成 v' + NS.version + '，任务数 ' + tasks.length);
})();
