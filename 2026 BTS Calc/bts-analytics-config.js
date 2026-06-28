/* ════════════════════════════════════════════════════════════════
   bts-analytics-config.js — 在這裡填入你的 GA4 + Firebase 金鑰
   這些是「公開的前端金鑰」，放在前端是正常的；真正的安全由
   Firestore 安全規則 + Firebase Auth 控制（見部署說明）。
   填好後重新部署即生效；留空則整套分析自動停用（網站照常運作）。
   ════════════════════════════════════════════════════════════════ */
window.BTS_ANALYTICS_CONFIG = {
  // Google Analytics 4 — 量測 ID（GA4 → 管理 → 資料串流 → 網頁）
  gaMeasurementId: '',            // 例：'G-XXXXXXXXXX'

  // Firebase 網頁應用程式設定（Firebase 主控台 → 專案設定 → 你的應用程式）
  firebase: {
    apiKey:            'AIzaSyBkrDFHrqRTJm97e3OfiNBGmPwxR03v3yk',
    authDomain:        'bts2026-neilyin.firebaseapp.com',
    projectId:         'bts2026-neilyin',
    storageBucket:     'bts2026-neilyin.firebasestorage.app',
    messagingSenderId: '842798369233',
    appId:             '1:842798369233:web:c3d337bafd7d50f1fb38f0'
  },

  // Firestore 集合名稱（存放每一筆購買清單紀錄）
  recordsCollection: 'records'
};
