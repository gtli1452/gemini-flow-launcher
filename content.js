// content.js

function fillPrompt() {
    // 1. 解析網址參數
    const params = new URLSearchParams(window.location.search);
    const promptText = params.get('prompt');

    // 如果網址沒有 prompt 參數，就什麼都不做
    if (!promptText) return;

    // 2. 定義尋找輸入框的邏輯
    // Gemini 的輸入框通常是一個 contenteditable 的 div
    const findInputBox = () => {
        return document.querySelector('div[contenteditable="true"][role="textbox"]');
    };

    // 3. 因為 Gemini 載入需要時間，我們使用輪詢 (Polling) 來等待輸入框出現
    // 設定最多嘗試 10 秒 (20次 * 500ms)
    let attempts = 0;
    const maxAttempts = 20;

    const intervalId = setInterval(() => {
        const inputBox = findInputBox();
        attempts++;

        if (inputBox) {
            // 找到輸入框了，停止輪詢
            clearInterval(intervalId);

            // --- 執行填入動作 ---

            // 聚焦輸入框
            inputBox.focus();

            // 設定文字內容
            // 注意：直接設定 innerHTML 有時不會觸發 React/Angular 的狀態更新
            // 使用 execCommand 'insertText' 模擬使用者打字是最穩定的方法
            document.execCommand('insertText', false, promptText);

            // 清除網址列的參數 (選用)，讓網址看起來乾淨一點，也不會重新整理後又填一次
            // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            // window.history.replaceState({path: newUrl}, '', newUrl);

            console.log("[My Safe Gemini] 已自動填入提示詞。");

        } else if (attempts >= maxAttempts) {
            // 超時未找到，停止嘗試
            clearInterval(intervalId);
            console.log("[My Safe Gemini] 找不到輸入框，停止執行。");
        }
    }, 500); // 每 0.5 秒檢查一次
}

// 執行主程式
fillPrompt();