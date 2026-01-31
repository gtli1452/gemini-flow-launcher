# 更新日誌

本專案的所有重要變更都會記錄在此檔案中。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
並且本專案遵循[語意化版本](https://semver.org/lang/zh-TW/)。

## [未發布]

### 變更
- 重構內容腳本程式碼結構，提高可維護性
  - 將邏輯拆分為獨立函式：`getPromptFromUrl`、`findInputBox`、`findSendButton`、`setInputValue`、`waitForButtonReady`、`sendWithEnter`
  - 將按鈕選擇器與日誌前綴提取為常數（`SEND_BUTTON_SELECTORS`、`LOG_PREFIX`）
  - 使用模板字串統一日誌格式
  - 新增 `isButtonUsable` 輔助函式以簡化按鈕狀態檢查
  - 改善程式碼流程，減少巢狀結構

### 新增
- 初始化更新日誌

### 安全性
- 完成安全性稽核
- 現有安全性功能已驗證：
  - 輸入驗證與淨化，具有長度限制（最多 10,000 字元）
  - 使用 `createTextNode` 進行安全文字插入以防護 XSS 攻擊
  - 在 manifest 中配置內容安全政策（CSP）
  - 對 prompt 參數進行型別檢查
  - 處理前進行嚴格的輸入驗證

## [1.0.0] - 2026-01-31

### 新增
- Flow Launcher 與 Google Gemini 整合的 Chrome/Edge 擴充功能
- 從 URL 參數自動填入提示詞
- 具有動態等待機制的自動送出功能
- 使用 Enter 鍵模擬的備援發送機制
- 多語言支援（英文與中文）

### 安全性
- 實作嚴格的輸入驗證與過濾
- 使用 `createTextNode` 進行安全文字插入以防止 XSS 攻擊
- 整合內容安全政策（CSP）
- 最大提示詞長度限制（10,000 字元）
- 輸入型別驗證與去除空白

[未發布]: https://github.com/gtli1452/gemini-flow-launcher/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/gtli1452/gemini-flow-launcher/releases/tag/v1.0.0
