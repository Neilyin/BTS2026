(function () {
  'use strict';

  var STORAGE_KEY = 'bts_campaign_extension_seen_v3';
  var REMIND_AFTER_MS = 5 * 24 * 60 * 60 * 1000;
  var CAMPAIGN_END_MS = new Date('2026-09-24T23:59:59+08:00').getTime();
  var overlay = null;
  var previousFocus = null;

  function hasSeen() {
    try {
      var seenAt = Number(localStorage.getItem(STORAGE_KEY));
      return Number.isFinite(seenAt) && seenAt > 0 && Date.now() - seenAt < REMIND_AFTER_MS;
    }
    catch (error) { return false; }
  }

  function remember() {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); }
    catch (error) { /* Storage may be unavailable in private browsing. */ }
  }

  function remainingDays() {
    return Math.max(0, Math.ceil((CAMPAIGN_END_MS - Date.now()) / (24 * 60 * 60 * 1000)));
  }

  function track(event, params) {
    if (window.btsTrack) window.btsTrack(event, params || {});
  }

  function closeUpdate(action) {
    if (!overlay) return;
    remember();
    track('comparison_update_action', { action: action || 'dismiss' });
    overlay.classList.remove('is-open');
    document.body.classList.remove('comparison-update-locked');
    window.setTimeout(function () {
      if (overlay) overlay.remove();
      overlay = null;
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }, 210);
  }

  function keepFocus(event) {
    if (event.key === 'Escape') { closeUpdate('escape'); return; }
    if (event.key !== 'Tab' || !overlay) return;
    var focusable = overlay.querySelectorAll('a[href], button:not([disabled])');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  function showUpdate() {
    var daysLeft = remainingDays();
    if (Date.now() > CAMPAIGN_END_MS || hasSeen() || document.querySelector('.comparison-update-overlay')) return;
    previousFocus = document.activeElement;
    overlay = document.createElement('div');
    overlay.className = 'comparison-update-overlay';
    overlay.innerHTML = '<section class="comparison-update-dialog" role="dialog" aria-modal="true" aria-labelledby="comparison-update-title" aria-describedby="comparison-update-copy">' +
      '<button class="comparison-update-close" type="button" aria-label="關閉更新通知"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<span class="comparison-update-badge">活動延長通知</span>' +
      '<h2 id="comparison-update-title">Apple BTS 延長啦！<br>活動到 9/24</h2>' +
      '<div class="comparison-update-countdown" role="status" aria-label="活動還剩 ' + daysLeft + ' 天">' +
        '<span>活動還剩</span><strong>' + daysLeft + '</strong><span>天</span>' +
      '</div>' +
      '<p id="comparison-update-copy">活動期間已延長至 <strong>2026/9/24</strong>。想知道怎麼買更划算？完成 Apple 官網優惠試算後，還能直接和 Straight A 方案比較回饋、現折與贈品。</p>' +
      '<div class="comparison-update-actions">' +
        '<a class="comparison-update-primary" href="calculator.html">開始玩方案對比 <span aria-hidden="true">→</span></a>' +
        '<button class="comparison-update-dismiss" type="button">5 天內不再顯示</button>' +
      '</div>' +
    '</section>';
    document.body.appendChild(overlay);
    document.body.classList.add('comparison-update-locked');
    track('comparison_update_view', { update_id: 'bts_extension_20260924_v3', remaining_days: daysLeft });
    overlay.addEventListener('keydown', keepFocus);
    overlay.querySelector('.comparison-update-close').addEventListener('click', function () { closeUpdate('close_button'); });
    overlay.querySelector('.comparison-update-dismiss').addEventListener('click', function () { closeUpdate('acknowledge'); });
    overlay.querySelector('.comparison-update-primary').addEventListener('click', function () {
      remember();
      track('comparison_update_action', { action: 'start_comparison' });
    });
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeUpdate('backdrop');
    });
    window.requestAnimationFrame(function () {
      overlay.classList.add('is-open');
      overlay.querySelector('.comparison-update-primary').focus();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showUpdate);
  else showUpdate();
})();
