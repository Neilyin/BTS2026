/* ════════════════════════════════════════════════════════════════
   bts-analytics.js — 共用追蹤層
   · GA4：行為事件（按了什麼）+ 內建互動時間（按多久）
   · Firestore：把「查看計算結果」的完整設定寫成一筆紀錄供後台分析
   設計：未設定金鑰時全部 no-op，不影響網站。Author: Neil尼歐
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var cfg = window.BTS_ANALYTICS_CONFIG || {};

  // ── 匿名 session id（持久、不含個資）──
  var SID;
  try {
    SID = localStorage.getItem('bts_sid');
    if (!SID) { SID = 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); localStorage.setItem('bts_sid', SID); }
  } catch (e) { SID = 's_' + Math.random().toString(36).slice(2, 12); }

  // ════════════ GA4 ════════════
  var GA = cfg.gaMeasurementId;
  var gaOn = GA && /^G-/.test(GA);
  if (gaOn) {
    var g = document.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA, { anonymize_ip: true });
  }
  window.btsTrack = function (event, params) {
    try { if (gaOn && window.gtag) gtag('event', event, params || {}); } catch (e) {}
  };

  // ════════════ Firestore ════════════
  var fb = cfg.firebase || {};
  var COLL = cfg.recordsCollection || 'records';
  var fbOn = !!(fb && fb.apiKey && fb.projectId);

  var _db = null, _ready = false, _queue = [], _readyCbs = [];
  window.btsAnalytics = {
    sessionId: SID,
    enabled: fbOn,
    get db() { return _db; },
    get auth() { return (fbOn && window.firebase && firebase.apps && firebase.apps.length) ? firebase.auth() : null; },
    get ready() { return _ready; },
    onReady: function (cb) { if (_ready) cb(); else _readyCbs.push(cb); }
  };

  function _write(rec) {
    try {
      _db.collection(COLL).add(Object.assign({
        sessionId: SID,
        page: location.pathname,
        ua: navigator.userAgent,
        lang: navigator.language,
        ts: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: Date.now()
      }, rec));
    } catch (e) { console.warn('[bts-analytics] write failed', e); }
  }
  window.btsLogRecord = function (rec) {
    rec = rec || {};
    if (!fbOn) return;            // 未設定 Firebase → 不記錄
    if (_db) _write(rec); else _queue.push(rec);
  };

  function loadScript(src, cb) {
    var s = document.createElement('script'); s.src = src;
    s.onload = cb; s.onerror = function () { console.warn('[bts-analytics] load fail', src); };
    document.head.appendChild(s);
  }

  if (fbOn) {
    var BASE = 'https://www.gstatic.com/firebasejs/10.12.2/';
    loadScript(BASE + 'firebase-app-compat.js', function () {
      loadScript(BASE + 'firebase-firestore-compat.js', function () {
        loadScript(BASE + 'firebase-auth-compat.js', function () {
          try {
            if (!firebase.apps.length) firebase.initializeApp(fb);
            _db = firebase.firestore();
            _ready = true;
            while (_queue.length) _write(_queue.shift());
            _readyCbs.forEach(function (cb) { try { cb(); } catch (e) {} });
            _readyCbs = [];
          } catch (e) { console.warn('[bts-analytics] firebase init failed', e); }
        });
      });
    });
  }
})();
