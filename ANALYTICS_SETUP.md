# GA4 與計算結果資料庫設定

網站已接好 GA4 與 Firebase Firestore。未填設定時追蹤層會自動停用，不影響計算機。

## 1. 啟用 GA4

1. 在 Google Analytics 建立 GA4 資源與網頁資料串流。
2. 複製 `G-XXXXXXXXXX` 格式的 Measurement ID。
3. 填入 `2026 BTS Calc/bts-analytics-config.js` 的 `gaMeasurementId`。

全站會送出：

- `page_view`：頁面瀏覽。
- `navigation_click`：站內導覽。
- `select_calculator`：進入任一計算機。
- `outbound_click`：前往 Apple、導購平台或社群。
- `generate_recommendation`：完成計算並產生最終推薦。

## 2. 建立 Firebase

1. 在 Firebase Console 建立專案並新增「網頁應用程式」。
2. 啟用 Firestore Database。
3. 啟用 Authentication 的「電子郵件/密碼」登入方式。
4. 將 Firebase 網頁設定填入 `2026 BTS Calc/bts-analytics-config.js` 的 `firebase`。
5. 在 Authentication 手動建立管理員帳號。
6. 在 Firestore 建立 `admins/{管理員 UID}` 文件；內容可為 `{ "role": "admin" }`。

## 3. 部署安全規則

已提供 `firestore.rules`。規則只允許前台新增格式正確的匿名計算結果，僅 `admins` 集合內的帳號可以讀取，任何人都不能從前台修改或刪除紀錄。

```bash
firebase use YOUR_PROJECT_ID
firebase deploy --only firestore:rules
```

## 4. 查看後台

部署後開啟 `/analytics.html`，使用 Firebase Authentication 建立的管理員帳號登入。

每筆紀錄包含匿名 session、來源與 UTM、裝置、完整選項、贈品、回饋、價格、節省金額及最終推薦摘要；不記錄姓名、Email、電話或付款資料。
