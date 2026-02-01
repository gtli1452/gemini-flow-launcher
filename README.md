# Gemini Chrome Extension for Flow Launcher

這是一個簡單且安全的 Chrome/Edge 擴充功能，旨在優化透過 Flow Launcher 開啟 Google Gemini 時的體驗。它可以自動填入來自 URL 的查詢參數並自動送出。

## 功能

*   **安全防護**：具備嚴謹的輸入驗證與過濾，採用 `createTextNode` 插入文字，並整合內容安全政策 (CSP) 以防禦 XSS 攻擊。
*   **自動填入與送出**：讀取 URL 中的 `prompt` 參數，自動填入 Gemini 輸入框。
*   **動態等待機制**：自動偵測頁面狀態，待輸入框與送出按鈕就緒後自動執行。
*   **備援發送**：若無法定位送出按鈕，會嘗試模擬 Enter 鍵發送，提升成功率。

## 安裝

### 步驟 1：取得擴充功能檔案

從 GitHub 下載或 clone 此專案：

```bash
git clone https://github.com/gtli1452/gemini-flow-launcher.git
```

確保您的專案資料夾中包含以下檔案：
*   `manifest.json`
*   `content.js`

### 步驟 2：安裝到瀏覽器 (Chrome / Edge)

1.  開啟瀏覽器，在網址列輸入 `chrome://extensions` (Edge 請輸入 `edge://extensions`)。
2.  開啟右上角的 **「開發人員模式」 (Developer mode)**。
3.  點擊左上角的 **「載入未封裝項目」 (Load unpacked)**。
4.  選擇您下載的專案資料夾。

## 整合到 Flow Launcher

回到 Flow Launcher 的設定 (Settings) -> Plugins -> Web Searches，新增或修改一個 Web Search：

*   **Title**: Gemini (或您喜歡的名稱)
*   **Action Keyword**: `g` (或是您習慣的關鍵字)
*   **URL**: `https://gemini.google.com/app?prompt={q}`

現在，您可以在 Flow Launcher 中輸入 `g 您的問題`，瀏覽器將會開啟 Gemini，並自動填入並送出您的問題。

## 疑難排解

*   **Prompt 無反應**：為確保安全，程式碼會驗證 `prompt` 參數。請確保傳遞的是純文字且長度在 10,000 字以內。
*   **手動重新整理**：如果擴充功能沒有運作，請嘗試在擴充功能管理頁面點擊 **重新整理 (Refresh)** 按鈕，或重新載入 Gemini 頁面。
*   **DOM 結構變更**：Google 定期更新介面，若自動填入失效，可能需要更新 `content.js` 中的選擇器。本版本已包含降級 (fallback) 選擇器以增加相容性。

## 版本歷史

請參閱 [CHANGELOG.md](CHANGELOG.md) 了解詳細的版本變更記錄。

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 檔案（如有）。