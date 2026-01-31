# Gemini Chrome Extension - Copilot Instructions

## Project Overview

這是一個 Chrome/Edge Manifest V3 擴充功能，用於透過 URL `prompt` 參數自動填入並送出 Google Gemini 查詢。主要整合 Flow Launcher 使用。

## Architecture

```
content.js      # 核心 content script - 所有邏輯都在這裡
manifest.json   # MV3 擴充功能設定
```

單檔架構：所有功能封裝在 `content.js` 的 IIFE 中，無外部相依套件。

## Key Patterns

### DOM 輪詢策略 (content.js)
使用 `setInterval` + 計數器模式等待動態載入的 DOM 元素：
```javascript
const intervalId = setInterval(() => {
    const element = findElement();
    if (element || attempts >= MAX_ATTEMPTS) clearInterval(intervalId);
}, POLL_INTERVAL_MS);
```

### 多語系選擇器 Fallback
Gemini UI 有中英文版本，選擇器必須涵蓋兩者：
```javascript
'button[aria-label="Send message"]'  // 英文
'button[aria-label="傳送訊息"]'       // 中文
```

### 安全考量
- 使用 `createTextNode()` 而非 `innerHTML` 防止 XSS
- `CONFIG.MAX_PROMPT_LENGTH` 限制輸入長度 (10000 字)
- CSP 設定在 `manifest.json`

## Configuration (content.js)

修改行為時調整 `CONFIG` 物件：
```javascript
const CONFIG = {
    MAX_PROMPT_LENGTH: 10000,        // prompt 最大長度
    MAX_POLLING_ATTEMPTS: 20,        // 最大輪詢次數
    POLL_INTERVAL_MS: 500,           // 輪詢間隔
    BUTTON_READY_MAX_WAIT_MS: 5000,  // 按鈕等待超時
    BUTTON_READY_POLL_INTERVAL_MS: 100
};
```

## Development Workflow

### 安裝到瀏覽器測試
1. 開啟 `chrome://extensions` 或 `edge://extensions`
2. 啟用「開發人員模式」
3. 點擊「載入未封裝項目」選擇專案資料夾

### 測試 URL 格式
```
https://gemini.google.com/app?prompt=測試訊息
```

### 偵錯
開啟 Gemini 頁面的 DevTools Console，搜尋 `[My Safe Gemini]` 前綴的 log。

## When Modifying Code

1. **選擇器失效時**：Google 會更新 Gemini UI，需更新 `findInputBox()` 和 `findSendButton()` 中的選擇器
2. **新增語系支援**：在 `findSendButton()` 的 `selectors` 陣列新增對應 `aria-label`
3. **調整超時**：修改 `CONFIG` 物件，不要硬編碼數值

## Naming Conventions

- Console log 統一使用 `[My Safe Gemini]` 前綴
- 函式命名：`findXxx()` 用於 DOM 查詢，`waitForXxx()` 用於 Promise-based 等待

## Selector Change History

當 Google 更新 Gemini UI 導致選擇器失效時，請在此記錄變更：

| 日期 | 變更項目 | 舊選擇器 | 新選擇器 | 備註 |
|------|----------|----------|----------|------|
| 2026-01-31 | 初始版本 | - | - | 建立選擇器變更記錄機制 |

## Conventions

- 一律使用正體中文 (#zh-TW) 回應與撰寫記錄
- Commit 訊息遵循 [Conventional Commits 1.0.0](https://www.conventionalcommits.org/zh-hant/v1.0.0/) 規範
  - 範例：`fix: 更新送出按鈕選擇器以修復自動送出失效`
  - 範例：`feat: 新增日文介面支援`
