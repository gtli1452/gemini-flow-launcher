# Gemini Chrome Extension for Flow Launcher

這是一個簡單的 Chrome/Edge 擴充功能，旨在優化透過 Flow Launcher 開啟 Google Gemini 時的體驗。它可以自動聚焦到輸入框並提交來自 URL 的查詢參數。

## 功能

*   **自動聚焦**：當頁面載入時，自動將游標聚焦在 Gemini 的輸入框。
*   **自動提交**：讀取 URL 中的 `prompt` 參數並自動送出查詢。

## 安裝

### 步驟 1：建立擴充功能 (如果尚未建立)

確保您的專案資料夾 (`d:\Projects\GeminiExtension`) 中包含以下檔案：
*   `manifest.json`
*   `content.js`

### 步驟 2：安裝到瀏覽器 (Chrome / Edge)

1.  開啟瀏覽器，在網址列輸入 `chrome://extensions` (Edge 請輸入 `edge://extensions`)。
2.  開啟右上角的 **「開發人員模式」 (Developer mode)**。
3.  點擊左上角的 **「載入未封裝項目」 (Load unpacked)**。
4.  選擇您的專案資料夾 (`d:\Projects\GeminiExtension`)。

## 整合到 Flow Launcher

回到 Flow Launcher 的設定 (Settings) -> Plugins -> Web Searches，新增或修改一個 Web Search：

*   **Title**: Gemini (或您喜歡的名稱)
*   **Action Keyword**: `g` (或是您習慣的關鍵字)
*   **URL**: `https://gemini.google.com/app?prompt={q}`

現在，您可以在 Flow Launcher 中輸入 `g 您的問題`，瀏覽器將會開啟 Gemini，並自動填入並送出您的問題。

## 疑難排解

*   如果擴充功能沒有運作，請嘗試在擴充功能管理頁面點擊 **重新整理 (Refresh)** 按鈕，或重新載入 Gemini 頁面。
*   Google 可能會更改其網站的 DOM 結構。如果自動填入功能失效，請檢查 `content.js` 中的選擇器是否需要更新。