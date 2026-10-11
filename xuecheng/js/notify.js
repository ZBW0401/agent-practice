/* 学程 — 通知层：提醒（浏览器通知 + 页面内提示） */
(function () {
  'use strict';

  var NS = window.Xuecheng = window.Xuecheng || {};

  var supported = ('Notification' in window);

  function permission() {
    if (!supported) {
      return 'unsupported';
    }
    return Notification.permission;
  }

  function request() {
    if (!supported) {
      return Promise.resolve('unsupported');
    }
    if (Notification.permission === 'granted') {
      return Promise.resolve('granted');
    }
    if (Notification.permission === 'denied') {
      return Promise.resolve('denied');
    }
    try {
      return Notification.requestPermission();
    } catch (e) {
      return Promise.resolve('unsupported');
    }
  }

  function browserNotify(title, body) {
    if (supported && Notification.permission === 'granted') {
      try {
        new Notification(title, { body: body || '' });
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  function toast(message) {
    var el = document.getElementById('toast');
    if (!el) {
      return;
    }
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      el.hidden = true;
    }, 4000);
  }

  // 尽力通知：浏览器通知优先，否则页面内提示
  function show(title, body) {
    var ok = browserNotify(title, body);
    if (!ok) {
      toast((title ? title + '：' : '') + (body || ''));
    }
    return ok;
  }

  NS.notify = {
    supported: supported,
    permission: permission,
    request: request,
    show: show,
    toast: toast
  };
})();
