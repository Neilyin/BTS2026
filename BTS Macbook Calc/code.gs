// Google Apps Script 後端代碼
// 用於處理MacBook BTS優惠計算機的數據記錄

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// 記錄用戶選擇到Google Sheets
function recordData(data) {
  try {
    const spreadsheetId = '1_HBvIXLCleCXTwrT5Ll6cW_7vWFBjbsaKYpJmeYW6P0';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('用戶選擇記錄') || createUserChoiceSheet(spreadsheetId);
    
    // 檢查是否是第一次使用，如果是則添加標題行
    if (sheet.getLastRow() === 0) {
      const headers = [
        '記錄時間',
        'MacBook系列', 
        '尺寸',
        '款式',
        '基本配置',
        '顏色',
        'Nano-texture奈米玻璃',
        '選擇配件',
        '信用卡回饋比例',
        '導購回饋比例', 
        '是否賣贈品',
        '贈品售價',
        '最終入手價格',
        '點擊購買管道',
        '點擊社群平台'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // 設置標題行格式
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('white');
      headerRange.setBorder(true, true, true, true, true, true);
    }
    
    // 添加新數據行
    const newRow = [
      data.時間,
      data.系列,
      data.尺寸,
      data.款式,
      data.配置,
      data.顏色,
      data.奈米玻璃,
      data.配件,
      data.信用卡回饋,
      data.導購回饋,
      data.賣贈品,
      data.贈品售價,
      data.最終價格,
      data.點擊購買 || '未點擊',
      data.點擊社群 || '未點擊'
    ];
    
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, newRow.length).setValues([newRow]);
    
    // 設置新行格式
    const newRowRange = sheet.getRange(lastRow + 1, 1, 1, newRow.length);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    // 自動調整欄寬
    sheet.autoResizeColumns(1, newRow.length);
    
    console.log('數據記錄成功:', data);
    return { success: true, message: '數據記錄成功' };
    
  } catch (error) {
    console.error('記錄數據時發生錯誤:', error);
    return { success: false, message: '數據記錄失敗: ' + error.toString() };
  }
}

// 記錄點擊行為到Google Sheets
function recordClickData(clickData) {
  try {
    const spreadsheetId = '1_HBvIXLCleCXTwrT5Ll6cW_7vWFBjbsaKYpJmeYW6P0';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('點擊行為記錄') || createClickSheet(spreadsheetId);
    
    // 檢查是否是第一次使用，如果是則添加標題行
    if (sheet.getLastRow() === 0) {
      const headers = [
        '點擊時間',
        'MacBook系列', 
        '尺寸',
        '款式',
        '基本配置',
        '顏色',
        'Nano-texture奈米玻璃',
        '選擇配件',
        '信用卡回饋比例',
        '導購回饋比例',
        '是否賣贈品',
        '贈品售價',
        '最終入手價格',
        '點擊類型',
        '點擊項目'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // 設置標題行格式
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#2196F3');
      headerRange.setFontColor('white');
      headerRange.setBorder(true, true, true, true, true, true);
    }
    
    // 添加新數據行
    const newRow = [
      clickData.時間,
      clickData.系列,
      clickData.尺寸,
      clickData.款式,
      clickData.配置,
      clickData.顏色,
      clickData.奈米玻璃,
      clickData.配件,
      clickData.信用卡回饋,
      clickData.導購回饋,
      clickData.賣贈品,
      clickData.贈品售價,
      clickData.最終價格,
      clickData.點擊類型,
      clickData.點擊項目
    ];
    
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, newRow.length).setValues([newRow]);
    
    // 設置新行格式
    const newRowRange = sheet.getRange(lastRow + 1, 1, 1, newRow.length);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    // 自動調整欄寬
    sheet.autoResizeColumns(1, newRow.length);
    
    console.log('點擊記錄成功:', clickData);
    return { success: true, message: '點擊記錄成功' };
    
  } catch (error) {
    console.error('記錄點擊數據時發生錯誤:', error);
    return { success: false, message: '點擊記錄失敗: ' + error.toString() };
  }
}

// 創建用戶選擇記錄工作表
function createUserChoiceSheet(spreadsheetId) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  return spreadsheet.insertSheet('用戶選擇記錄');
}

// 創建點擊行為記錄工作表
function createClickSheet(spreadsheetId) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  return spreadsheet.insertSheet('點擊行為記錄');
}

// 測試記錄功能
function testRecord() {
  const testData = {
    時間: new Date().toLocaleString('zh-TW'),
    系列: 'MacBook Pro',
    尺寸: '14吋',
    款式: 'D款',
    配置: 'M4 Pro 24GB 512GB',
    顏色: '太空黑色',
    奈米玻璃: '否',
    配件: '巧控鍵盤（含Touch ID）',
    信用卡回饋: '1.5%',
    導購回饋: '2.0%',
    賣贈品: '是',
    贈品售價: 3000,
    最終價格: 58500,
    點擊購買: 'LINE導購購買',
    點擊社群: 'YouTube'
  };
  
  return recordData(testData);
}

// 測試點擊記錄功能
function testClickRecord() {
  const testClickData = {
    時間: new Date().toLocaleString('zh-TW'),
    系列: 'MacBook Pro',
    尺寸: '14吋',
    款式: 'D款',
    配置: 'M4 Pro 24GB 512GB',
    顏色: '太空黑色',
    奈米玻璃: '否',
    配件: '巧控鍵盤（含Touch ID）',
    信用卡回饋: '1.5%',
    導購回饋: '2.0%',
    賣贈品: '是',
    贈品售價: 3000,
    最終價格: 58500,
    點擊類型: '購買按鈕',
    點擊項目: 'LINE導購購買'
  };
  
  return recordClickData(testClickData);
}

// 獲取統計數據
function getStatistics() {
  try {
    const spreadsheetId = '1_HBvIXLCleCXTwrT5Ll6cW_7vWFBjbsaKYpJmeYW6P0';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('用戶選擇記錄');
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return { totalRecords: 0 };
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const records = data.slice(1);
    
    // 基本統計
    const stats = {
      totalRecords: records.length,
      seriesStats: {},
      sizeStats: {},
      modelStats: {},
      avgFinalPrice: 0,
      purchaseMethodStats: {},
      socialClickStats: {}
    };
    
    let totalPrice = 0;
    
    records.forEach(record => {
      const series = record[1];   // MacBook系列
      const size = record[2];     // 尺寸
      const model = record[3];    // 款式
      const finalPrice = record[12]; // 最終入手價格
      const purchaseMethod = record[13]; // 點擊購買管道
      const socialClick = record[14]; // 點擊社群平台
      
      // 統計系列
      stats.seriesStats[series] = (stats.seriesStats[series] || 0) + 1;
      
      // 統計尺寸
      stats.sizeStats[size] = (stats.sizeStats[size] || 0) + 1;
      
      // 統計款式
      stats.modelStats[model] = (stats.modelStats[model] || 0) + 1;
      
      // 統計購買管道
      if (purchaseMethod && purchaseMethod !== '未點擊') {
        stats.purchaseMethodStats[purchaseMethod] = (stats.purchaseMethodStats[purchaseMethod] || 0) + 1;
      }
      
      // 統計社群點擊
      if (socialClick && socialClick !== '未點擊') {
        stats.socialClickStats[socialClick] = (stats.socialClickStats[socialClick] || 0) + 1;
      }
      
      // 累計價格
      if (typeof finalPrice === 'number') {
        totalPrice += finalPrice;
      }
    });
    
    // 計算平均價格
    stats.avgFinalPrice = records.length > 0 ? Math.round(totalPrice / records.length) : 0;
    
    return stats;
    
  } catch (error) {
    console.error('獲取統計數據時發生錯誤:', error);
    return { error: error.toString() };
  }
}

// 獲取點擊行為統計
function getClickStatistics() {
  try {
    const spreadsheetId = '1_HBvIXLCleCXTwrT5Ll6cW_7vWFBjbsaKYpJmeYW6P0';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('點擊行為記錄');
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return { totalClicks: 0 };
    }
    
    const data = sheet.getDataRange().getValues();
    const records = data.slice(1);
    
    const clickStats = {
      totalClicks: records.length,
      clickTypeStats: {},
      clickItemStats: {}
    };
    
    records.forEach(record => {
      const clickType = record[13]; // 點擊類型
      const clickItem = record[14]; // 點擊項目
      
      // 統計點擊類型
      clickStats.clickTypeStats[clickType] = (clickStats.clickTypeStats[clickType] || 0) + 1;
      
      // 統計點擊項目
      clickStats.clickItemStats[clickItem] = (clickStats.clickItemStats[clickItem] || 0) + 1;
    });
    
    return clickStats;
    
  } catch (error) {
    console.error('獲取點擊統計數據時發生錯誤:', error);
    return { error: error.toString() };
  }
}

// 清空數據（管理員功能）
function clearAllData() {
  try {
    const spreadsheetId = '1_HBvIXLCleCXTwrT5Ll6cW_7vWFBjbsaKYpJmeYW6P0';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    // 清空用戶選擇記錄
    const userSheet = spreadsheet.getSheetByName('用戶選擇記錄');
    if (userSheet) {
      userSheet.clear();
    }
    
    // 清空點擊行為記錄
    const clickSheet = spreadsheet.getSheetByName('點擊行為記錄');
    if (clickSheet) {
      clickSheet.clear();
    }
    
    return { success: true, message: '所有數據已清空' };
    
  } catch (error) {
    console.error('清空數據時發生錯誤:', error);
    return { success: false, message: '清空數據失敗: ' + error.toString() };
  }
}