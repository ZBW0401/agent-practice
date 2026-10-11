/* 学程 — 表现层：装配与视图控制 */
(function () {
  'use strict';

  var NS = window.Xuecheng = window.Xuecheng || {};
  NS.version = '0.3.0';

  var T = NS.task;
  var S = NS.store;

  var tasks = [];

  var PRIORITY_LABEL = { high: '高', medium: '中', low: '低' };
  var DIFFICULTY_LABEL = { easy: '简单', medium: '中等', hard: '困难' };

  // DOM 引用
  var todoList = document.querySelector('[data-view="todo-list"]');
  var todoEmpty = document.querySelector('[data-view="todo-empty"]');
  var todoCount = document.querySelector('.card__hint');
  var fab = document.querySelector('.fab');
  var modal = document.querySelector('[data-view="modal"]');
  var form = document.getElementById('task-form');
  var formErrors = document.querySelector('[data-view="form-errors"]');
  var cancelBtn = document.querySelector('[data-action="cancel"]');
  var closeBtn = document.querySelector('.modal__close');
  var backdrop = document.querySelector('.modal__backdrop');

  function save() {
    S.saveTasks(tasks);
  }

  function render() {
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

  // 事件：勾选 / 删除（事件委托）
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
      save();
      render();
    } else if (e.target.classList.contains('todo-del')) {
      if (window.confirm('确定删除「' + task.subject + '」吗？')) {
        tasks = tasks.filter(function (t) {
          return t.id !== id;
        });
        save();
        render();
      }
    }
  });

  function openForm() {
    form.reset();
    formErrors.hidden = true;
    modal.hidden = false;
    document.getElementById('f-subject').focus();
  }

  function closeForm() {
    modal.hidden = true;
    formErrors.hidden = true;
  }

  fab.addEventListener('click', openForm);
  cancelBtn.addEventListener('click', closeForm);
  closeBtn.addEventListener('click', closeForm);
  backdrop.addEventListener('click', closeForm);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var res = T.create({
      subject: form.elements.subject.value,
      durationMin: form.elements.durationMin.value,
      deadline: form.elements.deadline.value,
      priority: form.elements.priority.value,
      difficulty: form.elements.difficulty.value,
      restAfterMin: form.elements.restAfterMin.value
    });

    if (!res.ok) {
      formErrors.textContent = res.errors.join('；');
      formErrors.hidden = false;
      return;
    }

    tasks.push(res.task);
    save();
    render();
    closeForm();
  });

  // 初始化
  tasks = S.loadTasks();
  render();
  console.info('[学程] 加载完成 v' + NS.version + '，任务数 ' + tasks.length);
})();
