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
  var search = new URLSearchParams(location.search);
  var attribution = {
    source: search.get('utm_source') || null,
    medium: search.get('utm_medium') || null,
    campaign: search.get('utm_campaign') || null,
    content: search.get('utm_content') || null
  };
  var device = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' :
    (/iPad|Tablet/i.test(navigator.userAgent) ? 'tablet' : 'desktop');

  if (gaOn) {
    var g = document.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA, {
      anonymize_ip: true,
      send_page_view: true,
      user_properties: { device_category: device }
    });
  }
  window.btsTrack = function (event, params) {
    try { if (gaOn && window.gtag) gtag('event', event, params || {}); } catch (e) {}
  };

  function cleanText(value, max) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max || 100);
  }
  function pageType() {
    if (/ipad\.html$/.test(location.pathname)) return 'ipad_calculator';
    if (/macbook\.html$/.test(location.pathname)) return 'mac_calculator';
    if (/calculator\.html$/.test(location.pathname)) return 'calculator_hub';
    if (/analytics\.html$/.test(location.pathname)) return 'analytics_admin';
    return 'editorial';
  }
  var PAGE_TYPE = pageType();
  var startedAt = Date.now();
  var maxScroll = 0;
  var resultGenerated = false;
  if (/_calculator$/.test(PAGE_TYPE) || PAGE_TYPE === 'calculator_hub') {
    window.btsTrack('calculator_start', {
      calculator_type: PAGE_TYPE,
      product: search.get('product') || null
    });
  }

  // 全站導流與操作事件。
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (link) {
      var href = link.getAttribute('href') || '';
      var target;
      try { target = new URL(href, location.href); } catch (err) { return; }
      var external = target.origin !== location.origin;
      var calculator = /(?:calculator|ipad|macbook)\.html/.test(target.pathname);
      window.btsTrack(calculator ? 'select_calculator' : (external ? 'outbound_click' : 'navigation_click'), {
        link_text: cleanText(link.textContent),
        link_url: target.href,
        destination_host: target.host,
        page_type: PAGE_TYPE,
        page_path: location.pathname
      });
      return;
    }

    var option = e.target.closest && e.target.closest(
      '[id^="size-"],[id^="color-"],[id^="chip-"],[id^="compute-"],[id^="mem-"],[id^="stor-"],' +
      '[id^="power-"],[id^="disp-"],[id^="stand-"],[id^="eth-"],[id^="point-"],[id^="kbd-"],[id^="gift-item-"]'
    );
    if (option && option.id) {
      var dash = option.id.indexOf('-');
      window.btsTrack('select_option', {
        option_group: dash > 0 ? option.id.slice(0, dash) : 'other',
        option_id: dash > 0 ? option.id.slice(dash + 1) : option.id,
        option_label: cleanText(option.textContent, 150),
        page_type: PAGE_TYPE
      });
      return;
    }

    var button = e.target.closest && e.target.closest('button');
    if (button) {
      window.btsTrack('ui_click', {
        button_id: button.id || null,
        button_label: cleanText(button.textContent),
        page_type: PAGE_TYPE
      });
    }
  }, { passive: true });

  // 只記錄欄位種類與數字，不記錄 Email、密碼或自由輸入文字。
  document.addEventListener('change', function (e) {
    var input = e.target;
    if (!input || !/^(INPUT|SELECT)$/.test(input.tagName)) return;
    var key = cleanText(input.id || input.name || input.type, 80);
    var params = {
      field_name: key,
      field_type: input.type || input.tagName.toLowerCase(),
      has_value: !!input.value,
      page_type: PAGE_TYPE
    };
    if (input.type === 'number' || input.type === 'range') {
      params.numeric_value = Number(input.value) || 0;
    } else if (input.tagName === 'SELECT' || input.type === 'radio' || input.type === 'checkbox') {
      params.selected_value = cleanText(input.value, 80);
    }
    window.btsTrack('adjust_field', params);
  }, { passive: true });

  // 內容區塊曝光。
  if ('IntersectionObserver' in window) {
    var viewedSections = {};
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var sectionId = entry.target.id || entry.target.getAttribute('aria-label');
        if (!sectionId || viewedSections[sectionId]) return;
        viewedSections[sectionId] = true;
        window.btsTrack('section_view', {
          section_id: cleanText(sectionId, 80),
          page_type: PAGE_TYPE
        });
        sectionObserver.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('section[id],main[id]').forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // 捲動深度與停留時間里程碑。
  var depthSent = {};
  window.addEventListener('scroll', function () {
    var doc = document.documentElement;
    var total = Math.max(1, doc.scrollHeight - innerHeight);
    var pct = Math.min(100, Math.round((scrollY / total) * 100));
    if (pct > maxScroll) maxScroll = pct;
    [25, 50, 75, 90].forEach(function (depth) {
      if (pct >= depth && !depthSent[depth]) {
        depthSent[depth] = true;
        window.btsTrack('scroll_depth', { percent_scrolled: depth, page_type: PAGE_TYPE });
      }
    });
  }, { passive: true });
  [10, 30, 60, 120].forEach(function (seconds) {
    setTimeout(function () {
      if (document.visibilityState === 'visible') {
        window.btsTrack('engagement_milestone', { seconds_engaged: seconds, page_type: PAGE_TYPE });
      }
    }, seconds * 1000);
  });

  window.addEventListener('pagehide', function () {
    window.btsTrack('page_exit', {
      engagement_seconds: Math.round((Date.now() - startedAt) / 1000),
      max_scroll_percent: maxScroll,
      result_generated: resultGenerated,
      page_type: PAGE_TYPE,
      transport_type: 'beacon'
    });
  });

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
        schemaVersion: 2,
        eventType: 'calculator_result',
        sessionId: SID,
        page: location.pathname,
        pageUrl: location.href,
        referrer: document.referrer || null,
        attribution: attribution,
        device: device,
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

  window.btsTrackResult = function (rec) {
    rec = rec || {};
    resultGenerated = true;
    window.btsTrack('generate_recommendation', {
      product_line: rec.productLine || '',
      product: rec.product || '',
      model: rec.model || '',
      recommendation: rec.recommendation || rec.model || '',
      value: Number(rec.final) || 0,
      currency: 'TWD',
      savings: Number(rec.totalSaved) || 0
    });
    window.btsLogRecord(rec);
  };
  document.documentElement.setAttribute('data-bts-analytics', 'ready');
  document.documentElement.setAttribute('data-bts-ga', gaOn ? 'enabled' : 'disabled');
  document.documentElement.setAttribute('data-bts-database', fbOn ? 'enabled' : 'disabled');

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
