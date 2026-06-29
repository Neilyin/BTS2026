/**
 * config-override.js
 * 本地：從 localStorage 讀取管理員修改過的設定，蓋掉 bts-config.js 的預設值
 * Firebase：之後只需把 loadOverride() 換成 Firestore 讀取即可，其餘不變
 *
 * 引入順序：bts-config.js → config-override.js
 */

const CONFIG_STORAGE_KEY = 'bts_config_2026';

// 深層合併：把 src 的值蓋進 target（只蓋已存在的 key，不新增）
// 若型別不相容（例如預設是物件、舊存檔卻是陣列），保留預設值不覆蓋，
// 避免舊版本存檔破壞新的資料結構導致整個後台/計算機渲染失敗。
function _deepMerge(target, src) {
  if (!src || typeof src !== 'object') return;
  Object.keys(src).forEach(k => {
    if (!(k in target)) return;
    const tv = target[k], sv = src[k];
    const tObj = tv && typeof tv === 'object';
    const sObj = sv && typeof sv === 'object';
    const tArr = Array.isArray(tv), sArr = Array.isArray(sv);
    if (tObj && sObj && tArr === sArr) {
      if (tArr) target[k] = sv;       // 陣列：整批取代
      else _deepMerge(tv, sv);        // 純物件：往下遞迴
    } else if (!tObj && !sObj) {
      target[k] = sv;                 // 純值：直接覆蓋
    }
    // 其餘為型別不相容（物件↔陣列、物件↔純值）：保留預設值，略過
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
