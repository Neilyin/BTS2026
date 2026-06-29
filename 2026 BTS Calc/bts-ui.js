/* ════════════════════════════════════════════════════════════════
   bts-ui.js — Shared interaction animations for the BTS calculators
   · btsCalcAnimation()  ~3s "calculating your discount" overlay
   · btsPrintAnimation()  printer prints the receipt, then downloads
   Self-contained: injects its own styles so it works on every page
   (and even with the ?classic theme). Author: Neil尼歐 (neil.tw)
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── inject styles once ──
  if (!document.getElementById('bts-ui-style')) {
    var css = `
    .btsui-overlay{position:fixed;inset:0;z-index:400;display:flex;align-items:center;
      justify-content:center;padding:24px;opacity:0;pointer-events:none;
      background:rgba(10,10,10,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
      transition:opacity .28s ease;}
    .btsui-overlay.show{opacity:1;pointer-events:auto;}

    /* ---- calculating ---- */
    .btsui-calc-box{width:min(360px,100%);background:#fff;border:3px solid #0a0a0a;border-radius:4px;
      padding:34px 28px 30px;text-align:center;box-shadow:14px 14px 0 rgba(10,10,10,.92);
      transform:translate(-6px,-6px) scale(.96);
      transition:transform .32s cubic-bezier(.16,.84,.34,1);
      font-family:'Archivo','Noto Sans TC',-apple-system,sans-serif;}
    .btsui-overlay.show .btsui-calc-box{transform:none;}
    .btsui-ring{width:84px;height:84px;margin:0 auto 22px;border-radius:50%;
      border:3px solid #0a0a0a;
      background:conic-gradient(from 0deg, rgba(0,229,255,.12), #00e5ff);
      display:flex;align-items:center;justify-content:center;
      animation:btsui-spin 1s linear infinite;}
    .btsui-ring i{width:60px;height:60px;border-radius:50%;background:#fff;border:2px solid #0a0a0a;
      display:flex;align-items:center;justify-content:center;font-size:28px;font-style:normal;
      animation:btsui-pulse 1s ease-in-out infinite;}
    @keyframes btsui-spin{to{transform:rotate(360deg)}}
    @keyframes btsui-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
    .btsui-num{font-family:'Anton','Noto Sans TC',sans-serif;font-size:38px;font-weight:400;
      color:#0a0a0a;letter-spacing:.01em;line-height:1.05;}
    .btsui-label{margin-top:10px;font-family:'Space Mono',monospace;font-size:12px;font-weight:700;
      letter-spacing:.08em;text-transform:uppercase;color:#44423d;}
    .btsui-checks{margin-top:20px;display:flex;flex-direction:column;gap:10px;text-align:left;}
    .btsui-check{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700;
      color:#9a978d;opacity:0;transform:translateY(6px);transition:all .35s ease;}
    .btsui-check.on{opacity:1;transform:none;color:#0a0a0a;}
    .btsui-check .dot{width:22px;height:22px;border-radius:50%;flex:0 0 auto;background:#fff;
      border:2px solid #0a0a0a;
      display:flex;align-items:center;justify-content:center;transition:background .3s ease;}
    .btsui-check.on .dot{background:#c6ff2e;}
    .btsui-check .dot svg{width:11px;height:11px;stroke:#0a0a0a;stroke-width:3.5;fill:none;
      stroke-linecap:round;stroke-linejoin:round;opacity:0;transition:opacity .3s ease;}
    .btsui-check.on .dot svg{opacity:1;}

    /* ---- printer ---- */
    .btsui-printer{display:flex;flex-direction:column;align-items:center;width:min(320px,100%);}
    .btsui-machine{position:relative;z-index:3;width:300px;max-width:100%;height:96px;
      border-radius:8px;border:3px solid #0a0a0a;
      background:linear-gradient(180deg,#2a2a2e 0%,#0a0a0a 100%);
      box-shadow:10px 10px 0 rgba(10,10,10,.5),inset 0 1px 0 rgba(255,255,255,.10);
      animation:btsui-print-vibe .18s linear infinite;}
    .btsui-overlay.done .btsui-machine{animation:none;}
    @keyframes btsui-print-vibe{0%,100%{transform:translateX(0)}25%{transform:translateX(-.6px)}75%{transform:translateX(.6px)}}
    .btsui-leds{position:absolute;top:14px;right:16px;display:flex;gap:7px;}
    .btsui-leds i{width:8px;height:8px;border-radius:50%;background:#3b4170;}
    .btsui-leds i:nth-child(1){background:#c6ff2e;animation:btsui-blink .7s steps(1) infinite;}
    .btsui-leds i:nth-child(2){background:#ffe600;animation:btsui-blink .7s steps(1) .35s infinite;}
    @keyframes btsui-blink{0%,50%{opacity:1}51%,100%{opacity:.25}}
    .btsui-screen{position:absolute;top:13px;left:16px;width:78px;height:14px;border-radius:3px;
      background:#00e5ff;opacity:.95;}
    .btsui-slot{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);
      width:240px;max-width:84%;height:8px;border-radius:6px;background:#000;
      box-shadow:inset 0 2px 4px rgba(0,0,0,.6);}
    .btsui-feed{position:relative;z-index:1;width:248px;max-width:82%;margin-top:-6px;
      overflow:hidden;background:#fff;border:3px solid #0a0a0a;border-top:0;border-radius:0 0 4px 4px;
      box-shadow:10px 10px 0 rgba(10,10,10,.3);}
    .btsui-feed::after{content:"";position:absolute;left:0;right:0;top:0;height:46px;z-index:2;
      pointer-events:none;background:linear-gradient(180deg,rgba(10,10,10,.14),transparent);}
    .btsui-paper{display:block;width:100%;transform:translateY(-100%);}
    .btsui-overlay.show .btsui-paper{animation:btsui-feed-out 2.5s cubic-bezier(.45,.05,.25,1) forwards;}
    @keyframes btsui-feed-out{from{transform:translateY(-100%)}to{transform:translateY(0)}}
    .btsui-caption{margin-top:20px;font-family:'Space Mono','Noto Sans TC',sans-serif;font-size:13px;
      font-weight:700;color:#fff;letter-spacing:.04em;text-align:center;text-transform:uppercase;}
    .btsui-caption .ok{color:#c6ff2e;}

    @media (prefers-reduced-motion: reduce){
      .btsui-ring,.btsui-ring i,.btsui-machine,.btsui-leds i{animation:none!important;}
      .btsui-overlay.show .btsui-paper{animation:btsui-feed-out .35s ease forwards;}
    }`;
    var st = document.createElement('style');
    st.id = 'bts-ui-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function fmt(n) { return 'NT$' + Math.round(n).toLocaleString(); }
  var CHECK_SVG = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';

  // ════════════════════════════════════════════
  //  Calculating animation (~3s) → onDone()
  // ════════════════════════════════════════════
  window.btsCalcAnimation = function (target, onDone, opts) {
    opts = opts || {};
    var dur = REDUCED ? 500 : (opts.duration || 2800);
    var steps = opts.steps || ['核對教育商店定價', '套用信用卡回饋', '計算 BTS 實際入手價'];

    var ov = document.createElement('div');
    ov.className = 'btsui-overlay';
    ov.setAttribute('role', 'status');
    ov.setAttribute('aria-live', 'polite');
    var checksHtml = steps.map(function (s) {
      return '<div class="btsui-check"><span class="dot">' + CHECK_SVG + '</span>' + s + '</div>';
    }).join('');
    ov.innerHTML =
      '<div class="btsui-calc-box">' +
        '<div class="btsui-ring"><i>💰</i></div>' +
        '<div class="btsui-num" id="btsui-num">NT$0</div>' +
        '<div class="btsui-label">正在計算你的 BTS 優惠…</div>' +
        '<div class="btsui-checks">' + checksHtml + '</div>' +
      '</div>';
    document.body.appendChild(ov);
    void ov.offsetWidth;            // force reflow so the fade-in transition fires
    ov.classList.add('show');

    var numEl = ov.querySelector('#btsui-num');
    var t0 = performance.now();
    var rollTimer = setInterval(function () {
      var t = Math.min(1, (performance.now() - t0) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      numEl.textContent = fmt(target * e);
      if (t >= 1) { numEl.textContent = fmt(target); clearInterval(rollTimer); }
    }, 33);

    var checks = ov.querySelectorAll('.btsui-check');
    checks.forEach(function (c, i) {
      setTimeout(function () { c.classList.add('on'); },
        REDUCED ? 0 : Math.round(dur * (0.28 + i * 0.22)));
    });

    setTimeout(function () {
      ov.classList.remove('show');
      setTimeout(function () {
        ov.remove();
        if (typeof onDone === 'function') onDone();
      }, 300);
    }, dur + 200);
  };

  // ════════════════════════════════════════════
  //  Printer animation → downloads dataURL
  // ════════════════════════════════════════════
  window.btsPrintAnimation = function (dataURL, filename, onDone) {
    var ov = document.createElement('div');
    ov.className = 'btsui-overlay';
    ov.innerHTML =
      '<div>' +
        '<div class="btsui-printer">' +
          '<div class="btsui-machine">' +
            '<div class="btsui-screen"></div>' +
            '<div class="btsui-leds"><i></i><i></i></div>' +
            '<div class="btsui-slot"></div>' +
          '</div>' +
          '<div class="btsui-feed"><img class="btsui-paper" id="btsui-paper" alt="BTS 購買清單"></div>' +
        '</div>' +
        '<div class="btsui-caption" id="btsui-cap">保存購買清單中…</div>' +
      '</div>';
    document.body.appendChild(ov);

    var feedMs = REDUCED ? 400 : 2500;
    var paper = ov.querySelector('#btsui-paper');
    var cap = ov.querySelector('#btsui-cap');

    function finish() {
      // actual download
      try {
        var a = document.createElement('a');
        a.download = filename;
        a.href = dataURL;
        a.click();
      } catch (e) { /* ignore */ }
      ov.classList.add('done');
      cap.innerHTML = '<span class="ok">✓ 購買清單已保存</span>';
      setTimeout(function () {
        ov.classList.remove('show');
        setTimeout(function () {
          ov.remove();
          if (typeof onDone === 'function') onDone();
        }, 300);
      }, 1200);
    }

    paper.onload = function () {
      void ov.offsetWidth;          // force reflow so the print animation fires
      ov.classList.add('show');
      setTimeout(finish, feedMs + 250);
    };
    paper.onerror = finish;
    paper.src = dataURL;
  };

  // ════════════════════════════════════════════
  //  Premium receipt renderer (shared, 2x crisp)
  //  data = { title, date, productName, productImg, specString,
  //           colorString, priceRows:[{label,value,kind}],
  //           finalLabel, finalValue, savedText, footerProduct, filename }
  //  kind: 'deduct' (blue) | 'muted' (grey —) | 'free' (green) | undefined
  // ════════════════════════════════════════════
  window.btsDrawReceipt = function (data) {
    var SCALE = 2, W = 720, PAD = 40, MARGIN = 36;
    var cardW = W - MARGIN * 2;
    var innerW = cardW - PAD * 2;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var FAMILY = '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", sans-serif';
    var MONO = '"Space Mono", ui-monospace, monospace';
    var DISPLAY = '"Anton", "Noto Sans TC", sans-serif';
    function font(weight, size) { return weight + ' ' + size + 'px ' + FAMILY; }
    function fontMono(weight, size) { return weight + ' ' + size + 'px ' + MONO; }
    function fontDisplay(size) { return size + 'px ' + DISPLAY; }
    function wrap(text, f, maxW) {
      ctx.font = f;
      var lines = [], line = '';
      for (var i = 0; i < text.length; i++) {
        var test = line + text[i];
        if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = text[i]; }
        else line = test;
      }
      if (line) lines.push(line);
      return lines;
    }
    function rrPath(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    // Editorial-zine card: hard ink offset shadow + ink border (no blur)
    function roundRect(x, y, w, h, r, fill, opts) {
      opts = (opts === true) ? { shadow: 8, border: 3 } : (opts || {});
      if (opts.shadow) { ctx.fillStyle = '#0a0a0a'; rrPath(x + opts.shadow, y + opts.shadow, w, h, r); ctx.fill(); }
      ctx.fillStyle = fill; rrPath(x, y, w, h, r); ctx.fill();
      if (opts.border) {
        ctx.lineWidth = opts.border;
        ctx.strokeStyle = opts.borderColor || '#0a0a0a';
        rrPath(x, y, w, h, r); ctx.stroke();
      }
    }
    function hline(x0, x1, y, color, w) {
      ctx.strokeStyle = color; ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    }

    var hasImg = !!data.productImg;
    var specLines = data.specString ? wrap(data.specString, font('normal', 15), innerW) : [];
    var rows = data.priceRows || [];

    // ── measure height ──
    var topPad = 38;
    var headerH = topPad + 26 + 18 + 22 + 26;  // title + accent + date + gap
    var cardTop = headerH;
    var cy = 26;                               // inside-card top pad
    if (hasImg) cy += 200 + 22;
    cy += 8 + 26;                              // name
    cy += specLines.length * 22;
    if (data.colorString) cy += 22;
    cy += 12 + 1 + 20;                         // divider
    cy += rows.length * 32;
    cy += 8 + 2 + 22;                          // strong divider
    cy += 72;                                  // final band
    if (data.savedText) cy += 40;
    cy += 20 + 1 + 24;                         // footer divider
    cy += 16 + 30 + 18 + 16 + 26;             // footer texts + bottom pad
    var cardH = cy;
    var H = cardTop + cardH + 34;

    // ── size & scale ──
    canvas.width = W * SCALE;
    canvas.height = H * SCALE;
    ctx.scale(SCALE, SCALE);
    ctx.textBaseline = 'alphabetic';

    // background — warm scanned paper
    ctx.fillStyle = '#f4f1ea'; ctx.fillRect(0, 0, W, H);

    // header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0a0a0a'; ctx.font = font('bold', 28);
    ctx.fillText(data.title || 'BTS 購買清單', W / 2, topPad + 22);
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(W / 2 - 30, topPad + 34, 60, 6);
    ctx.fillStyle = '#6b685f'; ctx.font = fontMono('bold', 12);
    ctx.fillText(data.date || new Date().toLocaleDateString('zh-TW'), W / 2, topPad + 60);

    // card — hard ink border + offset shadow
    roundRect(MARGIN, cardTop, cardW, cardH, 6, '#ffffff', { shadow: 8, border: 3 });

    var x0 = MARGIN + PAD, x1 = MARGIN + cardW - PAD;
    cy = cardTop + 26;

    // product image tile
    if (hasImg) {
      roundRect(MARGIN + 20, cy, cardW - 40, 200, 4, '#edf8fc', { border: 2 });
      try {
        var iw = data.productImg.naturalWidth || data.productImg.width;
        var ih = data.productImg.naturalHeight || data.productImg.height;
        var ratio = Math.min((cardW - 130) / iw, 156 / ih);
        var dw = iw * ratio, dh = ih * ratio;
        ctx.drawImage(data.productImg, W / 2 - dw / 2, cy + (200 - dh) / 2, dw, dh);
      } catch (e) { /* tainted/empty */ }
      cy += 200 + 22;
    }

    // name
    cy += 8 + 18;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0a0a0a'; ctx.font = font('900', 24);
    ctx.fillText(data.productName || '', W / 2, cy);
    cy += 26;

    // specs + color
    ctx.fillStyle = '#44423d'; ctx.font = font('normal', 15);
    specLines.forEach(function (l) { ctx.fillText(l, W / 2, cy); cy += 22; });
    if (data.colorString) { ctx.fillText(data.colorString, W / 2, cy); cy += 22; }

    cy += 12;
    hline(x0, x1, cy, '#0a0a0a', 2); cy += 20;

    // price rows
    rows.forEach(function (rw) {
      var muted = rw.kind === 'muted';
      ctx.textAlign = 'left'; ctx.font = font('700', 15.5);
      ctx.fillStyle = muted ? '#9a978d' : '#44423d';
      ctx.fillText(rw.label, x0, cy);
      ctx.textAlign = 'right'; ctx.font = fontMono('700', 15);
      ctx.fillStyle = muted ? '#9a978d' : (rw.kind === 'deduct' ? '#ff2e7e' : (rw.kind === 'free' ? '#0a8a3a' : '#0a0a0a'));
      ctx.fillText(rw.value, x1, cy);
      cy += 32;
    });

    cy += 8;
    hline(x0, x1, cy, '#0a0a0a', 3); cy += 22;

    // final price band — yellow slab, ink border, Anton numerals
    roundRect(x0 - 14, cy - 6, (x1 - x0) + 28, 72, 4, '#ffe600', { border: 2.5 });
    ctx.textAlign = 'left'; ctx.fillStyle = '#0a0a0a'; ctx.font = font('900', 19);
    ctx.fillText(data.finalLabel || '實際入手價', x0, cy + 40);
    ctx.textAlign = 'right'; ctx.fillStyle = '#0a0a0a'; ctx.font = fontDisplay(34);
    ctx.fillText(data.finalValue || '', x1, cy + 44);
    cy += 72;

    // saved pill — lime chip, ink border + text
    if (data.savedText) {
      cy += 6;
      ctx.font = fontMono('700', 13);
      var tw = ctx.measureText(data.savedText).width, pillW = tw + 40;
      roundRect(W / 2 - pillW / 2, cy - 5, pillW, 32, 4, '#c6ff2e', { border: 2 });
      ctx.textAlign = 'center'; ctx.fillStyle = '#0a0a0a';
      ctx.fillText(data.savedText, W / 2, cy + 16);
      cy += 36;
    }

    // footer
    cy += 20;
    ctx.strokeStyle = '#0a0a0a'; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x1, cy); ctx.stroke(); ctx.setLineDash([]);
    cy += 24;
    ctx.textAlign = 'center';
    try { ctx.letterSpacing = '2px'; } catch (e) {}
    ctx.fillStyle = '#6b685f'; ctx.font = fontMono('700', 11);
    ctx.fillText('DESIGNED BY', W / 2, cy); cy += 30;
    try { ctx.letterSpacing = '0px'; } catch (e) {}
    ctx.fillStyle = '#0a0a0a'; ctx.font = font('900', 26);
    ctx.fillText('Neil尼歐', W / 2, cy); cy += 18;
    ctx.fillStyle = '#0a52d6'; ctx.font = fontMono('700', 12);
    ctx.fillText('neil.tw  ·  @neil.tw_', W / 2, cy); cy += 16;
    ctx.fillStyle = '#6b685f'; ctx.font = font('normal', 12);
    ctx.fillText(data.footerProduct || '', W / 2, cy);

    // export → print animation
    var dataURL;
    try { dataURL = canvas.toDataURL('image/png'); }
    catch (e) { if (window.showToast) showToast('❌ 圖片生成失敗（圖片來源限制）'); return; }
    var filename = data.filename || 'BTS購買清單.png';
    if (typeof btsPrintAnimation === 'function') btsPrintAnimation(dataURL, filename);
    else { var a = document.createElement('a'); a.download = filename; a.href = dataURL; a.click(); }
    return dataURL;
  };

  // Make dynamically rendered configurator choices keyboard-accessible.
  var OPTION_SELECTOR = [
    '.opt[onclick]', '.size-opt[onclick]', '.chip-opt[onclick]',
    '.gift-item[onclick]', '.sell-opt[onclick]'
  ].join(',');

  function enhanceOptions(root) {
    var scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll(OPTION_SELECTOR).forEach(function (el) {
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      var selected = el.classList.contains('selected') || el.classList.contains('active');
      if (el.getAttribute('aria-pressed') !== String(selected)) {
        el.setAttribute('aria-pressed', String(selected));
      }
      if (el.dataset.keyboardReady) return;
      el.dataset.keyboardReady = 'true';
      el.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        el.click();
      });
    });
  }

  enhanceOptions(document);
  if ('MutationObserver' in window) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'attributes') {
          if (mutation.target.classList.contains('modal-overlay') &&
              mutation.target.classList.contains('open')) {
            var dialog = mutation.target.querySelector('[role="dialog"]');
            if (dialog) dialog.focus();
          }
          enhanceOptions(mutation.target.parentElement || document);
        } else {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) enhanceOptions(node.parentElement || node);
          });
        }
      });
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var overlay = document.querySelector('.modal-overlay.open');
    if (overlay && typeof window.closeModal === 'function') window.closeModal();
  });
})();
