# 更新日誌

- 1.1.0 (2026/01/31)

  - 重構內容腳本程式碼結構，提高可維護性
    - 將邏輯拆分為獨立函式：`getPromptFromUrl`、`findInputBox`、`findSendButton`、`setInputValue`、`waitForButtonReady`、`sendWithEnter`
    - 將按鈕選擇器與日誌前綴提取為常數（`SEND_BUTTON_SELECTORS`、`LOG_PREFIX`）
    - 使用模板字串統一日誌格式
    - 新增 `isButtonUsable` 輔助函式以簡化按鈕狀態檢查
    - 改善程式碼流程，減少巢狀結構

- 1.0.0 (2026/01/31)

  - 初始版本發布
  - Flow Launcher 與 Google Gemini 整合的 Chrome/Edge 擴充功能
  - 從 URL 參數自動填入提示詞
  - 具有動態等待機制的自動送出功能
  - 使用 Enter 鍵模擬的備援發送機制
  - 多語言支援（英文與中文）
  - 實作嚴格的輸入驗證與過濾
  - 使用 `createTextNode` 進行安全文字插入以防止 XSS 攻擊
  - 整合內容安全政策（CSP）
  - 最大提示詞長度限制（10,000 字元）
