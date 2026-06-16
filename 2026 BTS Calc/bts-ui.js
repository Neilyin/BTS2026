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
      background:rgba(16,18,40,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
      transition:opacity .28s ease;}
    .btsui-overlay.show{opacity:1;pointer-events:auto;}

    /* ---- calculating ---- */
    .btsui-calc-box{width:min(360px,100%);background:#fff;border-radius:24px;padding:34px 28px 30px;
      text-align:center;box-shadow:0 30px 70px rgba(16,18,40,.32);transform:scale(.94);
      transition:transform .32s cubic-bezier(.22,1,.36,1);
      font-family:'Inter','Noto Sans TC',-apple-system,sans-serif;}
    .btsui-overlay.show .btsui-calc-box{transform:scale(1);}
    .btsui-ring{width:84px;height:84px;margin:0 auto 22px;border-radius:50%;
      background:conic-gradient(from 0deg, rgba(10,102,194,0.10), #0A66C2);
      display:flex;align-items:center;justify-content:center;
      animation:btsui-spin 1s linear infinite;}
    .btsui-ring i{width:64px;height:64px;border-radius:50%;background:#fff;display:flex;
      align-items:center;justify-content:center;font-size:30px;font-style:normal;
      animation:btsui-pulse 1s ease-in-out infinite;}
    @keyframes btsui-spin{to{transform:rotate(360deg)}}
    @keyframes btsui-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
    .btsui-num{font-family:'Outfit','Noto Sans TC',sans-serif;font-size:34px;font-weight:800;
      color:#1C1C1E;letter-spacing:0;line-height:1.1;}
    .btsui-label{margin-top:8px;font-size:14px;font-weight:600;color:#6E6E73;}
    .btsui-checks{margin-top:18px;display:flex;flex-direction:column;gap:9px;text-align:left;}
    .btsui-check{display:flex;align-items:center;gap:9px;font-size:13px;font-weight:600;
      color:#9aa1b3;opacity:0;transform:translateY(6px);transition:all .35s ease;}
    .btsui-check.on{opacity:1;transform:none;color:#16203a;}
    .btsui-check .dot{width:20px;height:20px;border-radius:50%;flex:0 0 auto;background:#e6e9f5;
      display:flex;align-items:center;justify-content:center;transition:background .3s ease;}
    .btsui-check.on .dot{background:#16b364;}
    .btsui-check .dot svg{width:11px;height:11px;stroke:#fff;stroke-width:3;fill:none;
      stroke-linecap:round;stroke-linejoin:round;opacity:0;transition:opacity .3s ease;}
    .btsui-check.on .dot svg{opacity:1;}

    /* ---- printer ---- */
    .btsui-printer{display:flex;flex-direction:column;align-items:center;width:min(320px,100%);}
    .btsui-machine{position:relative;z-index:3;width:300px;max-width:100%;height:96px;
      border-radius:18px 18px 12px 12px;
      background:linear-gradient(180deg,#2a2a2e 0%,#1C1C1E 100%);
      box-shadow:0 18px 40px rgba(28,28,30,.4),inset 0 1px 0 rgba(255,255,255,.10);
      animation:btsui-print-vibe .18s linear infinite;}
    .btsui-overlay.done .btsui-machine{animation:none;}
    @keyframes btsui-print-vibe{0%,100%{transform:translateX(0)}25%{transform:translateX(-.6px)}75%{transform:translateX(.6px)}}
    .btsui-leds{position:absolute;top:14px;right:16px;display:flex;gap:7px;}
    .btsui-leds i{width:8px;height:8px;border-radius:50%;background:#3b4170;}
    .btsui-leds i:nth-child(1){background:#16b364;animation:btsui-blink .7s steps(1) infinite;}
    .btsui-leds i:nth-child(2){background:#ffb02e;animation:btsui-blink .7s steps(1) .35s infinite;}
    @keyframes btsui-blink{0%,50%{opacity:1}51%,100%{opacity:.25}}
    .btsui-screen{position:absolute;top:13px;left:16px;width:78px;height:14px;border-radius:4px;
      background:#0A66C2;opacity:.9;}
    .btsui-slot{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);
      width:240px;max-width:84%;height:8px;border-radius:6px;background:#0d0f24;
      box-shadow:inset 0 2px 4px rgba(0,0,0,.6);}
    .btsui-feed{position:relative;z-index:1;width:248px;max-width:82%;margin-top:-6px;
      overflow:hidden;background:#fff;border-radius:0 0 8px 8px;
      box-shadow:0 14px 30px rgba(16,18,40,.32);}
    .btsui-feed::after{content:"";position:absolute;left:0;right:0;top:0;height:46px;z-index:2;
      pointer-events:none;background:linear-gradient(180deg,rgba(20,22,48,.18),transparent);}
    .btsui-paper{display:block;width:100%;transform:translateY(-100%);}
    .btsui-overlay.show .btsui-paper{animation:btsui-feed-out 2.5s cubic-bezier(.45,.05,.25,1) forwards;}
    @keyframes btsui-feed-out{from{transform:translateY(-100%)}to{transform:translateY(0)}}
    .btsui-caption{margin-top:20px;font-family:'Inter','Noto Sans TC',sans-serif;font-size:14px;
      font-weight:700;color:#fff;letter-spacing:0;text-align:center;}
    .btsui-caption .ok{color:#34d399;}

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
    function font(weight, size) { return weight + ' ' + size + 'px ' + FAMILY; }
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
    function roundRect(x, y, w, h, r, fill, shadow) {
      ctx.save();
      if (shadow) { ctx.shadowColor = 'rgba(28,28,30,0.10)'; ctx.shadowBlur = 26; ctx.shadowOffsetY = 10; }
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fillStyle = fill; ctx.fill();
      ctx.restore();
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

    // background
    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#FFFFFF'); bg.addColorStop(1, '#F1F4F8');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1C1C1E'; ctx.font = font('bold', 28);
    ctx.fillText(data.title || 'BTS 購買清單', W / 2, topPad + 22);
    ctx.fillStyle = '#0A66C2';
    ctx.fillRect(W / 2 - 22, topPad + 36, 44, 3);
    ctx.fillStyle = '#8A8A8E'; ctx.font = font('normal', 13);
    ctx.fillText(data.date || new Date().toLocaleDateString('zh-TW'), W / 2, topPad + 60);

    // card
    roundRect(MARGIN, cardTop, cardW, cardH, 22, '#FFFFFF', true);

    var x0 = MARGIN + PAD, x1 = MARGIN + cardW - PAD;
    cy = cardTop + 26;

    // product image tile
    if (hasImg) {
      roundRect(MARGIN + 20, cy, cardW - 40, 200, 16, '#F4F6F9', false);
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
    ctx.fillStyle = '#1C1C1E'; ctx.font = font('bold', 24);
    ctx.fillText(data.productName || '', W / 2, cy);
    cy += 26;

    // specs + color
    ctx.fillStyle = '#6E6E73'; ctx.font = font('normal', 15);
    specLines.forEach(function (l) { ctx.fillText(l, W / 2, cy); cy += 22; });
    if (data.colorString) { ctx.fillText(data.colorString, W / 2, cy); cy += 22; }

    cy += 12;
    hline(x0, x1, cy, '#ECECEE', 1); cy += 20;

    // price rows
    rows.forEach(function (rw) {
      var muted = rw.kind === 'muted';
      ctx.textAlign = 'left'; ctx.font = font('500', 16);
      ctx.fillStyle = muted ? '#9AA0A6' : '#48484A';
      ctx.fillText(rw.label, x0, cy);
      ctx.textAlign = 'right'; ctx.font = font('600', 16);
      ctx.fillStyle = muted ? '#9AA0A6' : (rw.kind === 'deduct' ? '#0A66C2' : (rw.kind === 'free' ? '#16935f' : '#1C1C1E'));
      ctx.fillText(rw.value, x1, cy);
      cy += 32;
    });

    cy += 8;
    hline(x0, x1, cy, '#0A66C2', 2); cy += 22;

    // final price band
    roundRect(x0 - 14, cy - 6, (x1 - x0) + 28, 72, 12, 'rgba(10,102,194,0.06)', false);
    ctx.textAlign = 'left'; ctx.fillStyle = '#1C1C1E'; ctx.font = font('bold', 19);
    ctx.fillText(data.finalLabel || '實際入手價', x0, cy + 38);
    ctx.textAlign = 'right'; ctx.fillStyle = '#0A66C2'; ctx.font = font('bold', 27);
    ctx.fillText(data.finalValue || '', x1, cy + 40);
    cy += 72;

    // saved pill
    if (data.savedText) {
      cy += 6;
      ctx.font = font('bold', 14);
      var tw = ctx.measureText(data.savedText).width, pillW = tw + 36;
      roundRect(W / 2 - pillW / 2, cy - 4, pillW, 30, 15, 'rgba(22,147,95,0.12)', false);
      ctx.textAlign = 'center'; ctx.fillStyle = '#16935f';
      ctx.fillText(data.savedText, W / 2, cy + 16);
      cy += 34;
    }

    // footer
    cy += 20;
    ctx.strokeStyle = '#E2E2E4'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x1, cy); ctx.stroke(); ctx.setLineDash([]);
    cy += 24;
    ctx.textAlign = 'center';
    try { ctx.letterSpacing = '2px'; } catch (e) {}
    ctx.fillStyle = '#8A8A8E'; ctx.font = font('bold', 12);
    ctx.fillText('DESIGNED BY', W / 2, cy); cy += 30;
    try { ctx.letterSpacing = '0px'; } catch (e) {}
    ctx.fillStyle = '#1C1C1E'; ctx.font = font('bold', 26);
    ctx.fillText('Neil尼歐', W / 2, cy); cy += 18;
    ctx.fillStyle = '#0A66C2'; ctx.font = font('bold', 13);
    ctx.fillText('neil.tw  ·  @neil.tw_', W / 2, cy); cy += 16;
    ctx.fillStyle = '#8A8A8E'; ctx.font = font('normal', 12);
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
})();
