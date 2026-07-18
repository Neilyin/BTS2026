(function () {
  'use strict';

  var STORAGE_KEY = 'bts_comparison_update_seen_v1';
  var overlay = null;
  var previousFocus = null;

  function hasSeen() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; }
    catch (error) { return false; }
  }

  function remember() {
    try { localStorage.setItem(STORAGE_KEY, '1'); }
    catch (error) { /* Storage may be unavailable in private browsing. */ }
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
    if (hasSeen() || document.querySelector('.comparison-update-overlay')) return;
    previousFocus = document.activeElement;
    overlay = document.createElement('div');
    overlay.className = 'comparison-update-overlay';
    overlay.innerHTML = '<section class="comparison-update-dialog" role="dialog" aria-modal="true" aria-labelledby="comparison-update-title" aria-describedby="comparison-update-copy">' +
      '<button class="comparison-update-close" type="button" aria-label="關閉更新通知"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<span class="comparison-update-badge">NEW UPDATE</span>' +
      '<h2 id="comparison-update-title">現在有對比方案<br>可以玩玩看了</h2>' +
      '<p id="comparison-update-copy">完成 Apple 官網優惠試算後，還能直接和 Straight A 活動方案比較，看看回饋、現折與贈品怎麼選。</p>' +
      '<div class="comparison-update-actions">' +
        '<a class="comparison-update-primary" href="calculator.html">開始玩方案對比 <span aria-hidden="true">→</span></a>' +
        '<button class="comparison-update-dismiss" type="button">我知道了</button>' +
      '</div>' +
    '</section>';
    document.body.appendChild(overlay);
    document.body.classList.add('comparison-update-locked');
    track('comparison_update_view', { update_id: 'straight_a_comparison_v1' });
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
