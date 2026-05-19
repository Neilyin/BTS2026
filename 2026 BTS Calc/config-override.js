/**
 * config-override.js
 * 本地：從 localStorage 讀取管理員修改過的設定，蓋掉 bts-config.js 的預設值
 * Firebase：之後只需把 loadOverride() 換成 Firestore 讀取即可，其餘不變
 *
 * 引入順序：bts-config.js → config-override.js
 */

const CONFIG_STORAGE_KEY = 'bts_config_2026';

// 深層合併：把 src 的值蓋進 target（只蓋已存在的 key，不新增）
function _deepMerge(target, src) {
  if (!src || typeof src !== 'object') return;
  Object.keys(src).forEach(k => {
    if (k in target) {
      if (typeof target[k] === 'object' && !Array.isArray(target[k])
          && typeof src[k] === 'object' && !Array.isArray(src[k])) {
        _deepMerge(target[k], src[k]);
      } else {
        target[k] = src[k];
      }
    }
  });
}

// 讀取本地覆蓋值（未來換 Firebase 時只改這裡）
function loadConfigOverride() {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return;
    const override = JSON.parse(raw);
    _deepMerge(window.BTS_CONFIG, override);
    console.log('[BTS] 已套用本地設定覆蓋');
  } catch (e) {
    console.warn('[BTS] 讀取本地設定失敗，使用預設值', e);
  }
}

// 儲存完整設定（由 admin.html 呼叫）
function saveConfigOverride(configObj) {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configObj));
    console.log('[BTS] 設定已儲存');
    return true;
  } catch (e) {
    console.error('[BTS] 儲存設定失敗', e);
    return false;
  }
}

// 清除本地覆蓋，回復預設
function clearConfigOverride() {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
  console.log('[BTS] 已清除本地設定，回復預設值');
}

// 取得目前生效的完整設定（管理員頁面讀取用）
function getActiveConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

// ── 自動執行 ──
loadConfigOverride();
