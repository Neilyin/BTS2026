// 試算表ID
const SPREADSHEET_ID = '1FXKzkVUmxSDsV0ZKkNRugacIfcGl5_32not4jmF3174';
const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Apple板 BTS 代購資訊')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
}

// 獲取代購資料
function getData() {
  try {
    Logger.log('開始獲取代購資料');
    
    // 使用設定的試算表ID
    const sheet = ss.getSheetByName('BTS代購') || ss.getActiveSheet();
    
    if (!sheet) {
      Logger.log('找不到工作表');
      return [];
    }
    
    const lastRow = sheet.getLastRow();
    Logger.log('最後一行: ' + lastRow);
    
    if (lastRow < 2) {
      Logger.log('沒有資料行');
      return [];
    }
    
    // 擴展範圍包含所有需要的欄位 (B-I)
    const dataRange = sheet.getRange('B2:I' + lastRow);
    const data = dataRange.getValues();
    Logger.log('獲取到資料行數: ' + data.length);
    
    // 過濾掉空行
    const filteredData = data.filter(row => row[0] && row[0].toString().trim() !== '');
    Logger.log('過濾後資料行數: ' + filteredData.length);

    // 獲取評價數據
    const ratingSheet = ss.getSheetByName('評價紀錄');
    
    if (ratingSheet) {
      Logger.log('找到評價紀錄表格');
      const ratingData = ratingSheet.getDataRange().getValues();
      // 跳過標題行
      if (ratingData.length > 1) {
        ratingData.shift(); 
        
        // 為每個賣家計算評價次數
        const ratingCounts = {};
        
        ratingData.forEach(row => {
          const sellerName = row[0]; // 賣家名稱在A欄
          if (sellerName && sellerName.toString().trim() !== '') {
            const name = sellerName.toString().trim();
            ratingCounts[name] = (ratingCounts[name] || 0) + 1;
          }
        });
        
        Logger.log('評價統計: ' + JSON.stringify(ratingCounts));
        
        // 將評價次數添加到數據中
        filteredData.forEach(row => {
          const sellerName = row[0] ? row[0].toString().trim() : ''; // 賣家名稱在B欄（現在是索引0）
          row[8] = ratingCounts[sellerName] || 0; // 添加到第9欄（索引8）
        });
      } else {
        Logger.log('評價紀錄表格沒有資料');
        filteredData.forEach(row => {
          row[8] = 0;
        });
      }
    } else {
      Logger.log('沒有評價紀錄表格，設置評價為0');
      // 如果沒有評價紀錄表，設置評價為0
      filteredData.forEach(row => {
        row[8] = 0;
      });
    }
    
    Logger.log('最終返回資料行數: ' + filteredData.length);
    return filteredData;
  } catch (error) {
    Logger.log('獲取資料時出錯: ' + error.toString());
    return [];
  }
}

// 發送郵件功能，接受郵件地址和郵件內容
function sendEmail(email, emailBody) {
  try {
    if (!email || email.toString().trim() === '') {
      return "發送失敗: 郵件地址為空";
    }
    
    var subject = "Apple板 BTS 代購聯繫請求";
    
    // 直接使用前端傳來的完整郵件內容
    MailApp.sendEmail(email.toString().trim(), subject, emailBody);
    Logger.log('郵件已發送至: ' + email);
    return "郵件已發送";
  } catch (error) {
    Logger.log('發送郵件時出錯: ' + error.toString());
    return "發送失敗: " + error.toString();
  }
}

// 發送確認郵件給用戶
function sendConfirmationEmail(userEmail, sellerName, contactMethod) {
  try {
    if (!userEmail || userEmail.toString().trim() === '') {
      return "確認郵件發送失敗: 郵件地址為空";
    }
    
    var subject = "Apple板 BTS 代購 - 聯繫請求已送出";
    
    var emailBody = `親愛的用戶您好，\n\n` +
                   `我們已經收到您的代購聯繫請求，並已通知代購「${sellerName}」。\n\n` +
                   `請求詳情：\n` +
                   `代購人員：${sellerName}\n` +
                   `您選擇的聯繫方式：${contactMethod}\n\n` +
                   `代購人員將盡快透過您提供的聯繫方式與您聯繫。\n\n` +
                   `如有任何問題，歡迎透過以下方式聯繫我們：\n` +
                   `• 官網：https://neil.tw\n` +
                   `• Dcard：https://www.dcard.tw/@neilyinnnnnnn\n` +
                   `• Instagram：https://www.instagram.com/neil.tw_/\n` +
                   `• Neil的蘋果互助會：
https://line.me/ti/g2/MOo9NqsHqjfW421BLRl3EbGg0DE6DTzY7vq8xA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default\n\n` +
                   `感謝您使用 Apple板 BTS 代購服務！\n\n` +
                   `此郵件由系統自動發送。\n` +
                   `Apple板 BTS 代購資訊團隊`;
    
    MailApp.sendEmail(userEmail.toString().trim(), subject, emailBody);
    Logger.log('確認郵件已發送至: ' + userEmail);
    return "確認郵件已發送";
  } catch (error) {
    Logger.log('發送確認郵件時出錯: ' + error.toString());
    return "確認郵件發送失敗: " + error.toString();
  }
}

// 發送聯繫請求（支援發送確認郵件）
function sendContactRequest(sellerEmail, sellerName, contactMethod, contactDetail, userInfo) {
  try {
    Logger.log('開始發送聯繫請求: ' + sellerName);
    
    if (!sellerEmail || sellerEmail.toString().trim() === '') {
      return "發送失敗: 代購郵件地址為空";
    }
    
    if (!contactDetail || contactDetail.toString().trim() === '') {
      return "發送失敗: 聯繫方式為空";
    }
    
    // 1. 發送郵件給代購（原有功能）
    const emailBody = `${sellerName}您好，我是BTS代購小幫手\n\n` +
                     `有用戶想通過 ${contactMethod} 聯繫您進行 Apple BTS 代購。\n\n` +
                     `用戶聯繫方式: ${contactDetail}\n\n` +
                     `用戶留言:\n${userInfo || '無'}\n\n` +
                     `此郵件由 Apple板 BTS 代購資訊系統自動發送。\n謝謝！\nApple板 BTS 代購資訊團隊`;
    
    const result1 = sendEmail(sellerEmail, emailBody);
    Logger.log('發送給代購結果: ' + result1);
    
    // 2. 如果用戶選擇EMAIL聯繫，也發送確認郵件給用戶
    let result2 = "";
    if (contactMethod === "EMAIL") {
      result2 = sendConfirmationEmail(contactDetail, sellerName, contactMethod);
      Logger.log('發送確認郵件結果: ' + result2);
    }
    
    // 3. 返回結果
    if (result1.includes("成功") || result1.includes("已發送")) {
      if (contactMethod === "EMAIL") {
        if (result2.includes("成功") || result2.includes("已發送")) {
          return "聯繫請求已發送，確認郵件也已發送給您";
        } else {
          return "聯繫請求已發送，但確認郵件發送失敗";
        }
      } else {
        return "聯繫請求已發送";
      }
    } else {
      return result1; // 返回錯誤訊息
    }
    
  } catch (error) {
    Logger.log('發送聯繫請求時出錯: ' + error.toString());
    return "發送失敗: " + error.toString();
  }
}

// 添加評價功能
function addRating(sellerName, socialId) {
  try {
    Logger.log('開始添加評價: ' + sellerName + ', ' + socialId);
    
    if (!sellerName || sellerName.toString().trim() === '') {
      return "評價失敗: 代購名稱為空";
    }
    
    if (!socialId || socialId.toString().trim() === '') {
      return "評價失敗: 社群ID為空";
    }
    
    // 獲取或創建評價紀錄表格
    let ratingSheet = ss.getSheetByName('評價紀錄');
    
    if (!ratingSheet) {
      Logger.log('創建評價紀錄表格');
      ratingSheet = ss.insertSheet('評價紀錄');
      // 添加標題行
      ratingSheet.appendRow(['代購人名稱', '評價者社群ID', '評價時間']);
    }
    
    // 添加新評價
    ratingSheet.appendRow([
      sellerName.toString().trim(),
      socialId.toString().trim(),
      new Date()
    ]);
    
    Logger.log('評價添加成功');
    return "評價成功";
  } catch (error) {
    Logger.log('添加評價時出錯: ' + error.toString());
    return "評價失敗: " + error.toString();
  }
}

// 記錄引導統計
function recordTutorial(action) {
  try {
    Logger.log('記錄引導統計: ' + action);
    
    // 獲取或創建引導統計表格
    let tutorialSheet = ss.getSheetByName('引導統計');
    
    if (!tutorialSheet) {
      tutorialSheet = ss.insertSheet('引導統計');
      // 添加標題行
      tutorialSheet.appendRow(['日期', '動作', '時間戳記']);
    }
    
    // 記錄統計
    tutorialSheet.appendRow([
      new Date().toDateString(),
      action.toString(), // 'viewed' 或 'skipped'
      new Date()
    ]);
    
    Logger.log('引導統計記錄成功');
    return "記錄成功";
  } catch (error) {
    Logger.log('記錄引導統計時出錯: ' + error.toString());
    return "記錄失敗: " + error.toString();
  }
}

// 紀錄點擊次數（按日期記錄）
function recordClick(buttonType) {
  try {
    Logger.log('記錄點擊: ' + buttonType);
    
    let sheet = ss.getSheetByName('點擊紀錄');
    
    if (!sheet) {
      Logger.log('創建點擊紀錄表格');
      sheet = ss.insertSheet('點擊紀錄');
      // 添加標題行
      sheet.appendRow(['日期', '新增代購', '引導教學', '聯繫代購', '優質評價', '重新整理', 'YouTube', 'Dcard', 'Instagram', '官網']);
    }
    
    // 獲取今天的日期 (YYYY-MM-DD 格式)
    const today = new Date();
    const todayString = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    
    // 查找今天是否已有記錄
    const data = sheet.getDataRange().getValues();
    let todayRowIndex = -1;
    
    for (let i = 1; i < data.length; i++) { // 從第2行開始（跳過標題行）
      if (data[i][0] === todayString) {
        todayRowIndex = i + 1; // 轉換為實際的行號
        break;
      }
    }
    
    // 如果今天沒有記錄，創建新的一行
    if (todayRowIndex === -1) {
      sheet.appendRow([todayString, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      todayRowIndex = sheet.getLastRow();
      Logger.log('創建今天的新記錄行: ' + todayRowIndex);
    }
    
    // 根據按鈕類型決定要更新的欄位
    let columnIndex;
    
    switch(buttonType) {
      case 'add':
        columnIndex = 2; // B欄：新增代購
        break;
      case 'guide':
        columnIndex = 3; // C欄：引導教學
        break;
      case 'contact':
        columnIndex = 4; // D欄：聯繫代購
        break;
      case 'rate':
        columnIndex = 5; // E欄：優質評價
        break;
      case 'refresh':
        columnIndex = 6; // F欄：重新整理
        break;
      case 'youtube':
        columnIndex = 7; // G欄：YouTube
        break;
      case 'dcard':
        columnIndex = 8; // H欄：Dcard
        break;
      case 'instagram':
        columnIndex = 9; // I欄：Instagram
        break;
      case 'website':
        columnIndex = 10; // J欄：官網
        break;
      default:
        Logger.log('未知的按鈕類型: ' + buttonType);
        return false;
    }
    
    // 更新對應欄位的值
    const range = sheet.getRange(todayRowIndex, columnIndex);
    const currentValue = range.getValue() || 0;
    range.setValue(currentValue + 1);
    
    Logger.log('點擊次數記錄成功: ' + todayString + ' - ' + buttonType + ' = ' + (currentValue + 1));
    return true;
    
  } catch (error) {
    Logger.log('記錄點擊次數時出錯: ' + error.toString());
    return false;
  }
}