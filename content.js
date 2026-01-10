function autoRun() {
    // 1. 解析網址參數
    const params = new URLSearchParams(window.location.search);
    const promptText = params.get('prompt');

    // 如果沒有 prompt 參數，直接結束
    if (!promptText) return;

    // 2. 定義尋找輸入框的邏輯
    const findInputBox = () => {
        return document.querySelector('div[contenteditable="true"][role="textbox"]');
    };

    // 3. 定義尋找送出按鈕的邏輯
    // Gemini 的按鈕 aria-label 可能是英文 "Send message" 或中文 "傳送訊息"
    // 我們使用屬性選擇器來同時尋找這兩種可能，或者找包含 send icon 的按鈕
    const findSendButton = () => {
        const selectors = [
            'button[aria-label="Send message"]', // 英文介面
            'button[aria-label="傳送訊息"]',     // 中文介面
            'button[data-testid="send-button"]' // 若官方有提供測試ID (預留)
        ];

        for (let selector of selectors) {
            const btn = document.querySelector(selector);
            if (btn && !btn.disabled && btn.getAttribute('aria-disabled') !== 'true') {
                return btn;
            }
        }
        return null;
    };

    // 4. 開始輪詢等待輸入框出現
    let attempts = 0;
    const maxAttempts = 20; // 10秒

    const intervalId = setInterval(() => {
        const inputBox = findInputBox();
        attempts++;

        if (inputBox) {
            clearInterval(intervalId); // 找到輸入框，停止輪詢

            // --- 步驟 A: 填入文字 ---
            inputBox.focus();
            document.execCommand('insertText', false, promptText);

            // 強制觸發 input 事件，確保 UI 框架知道內容變了
            inputBox.dispatchEvent(new Event('input', { bubbles: true }));

            console.log("[My Safe Gemini] 文字已填入，準備點擊送出...");

            // --- 步驟 B: 等待按鈕變亮並點擊 ---
            // 給 UI 一點時間反應 (300ms)
            setTimeout(() => {
                const sendBtn = findSendButton();
                if (sendBtn) {
                    sendBtn.click();
                    console.log("[My Safe Gemini] 已自動送出！");

                    // (選用) 清除網址參數，避免重新整理頁面時重複發送
                    // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    // window.history.replaceState({path: newUrl}, '', newUrl);
                } else {
                    console.warn("[My Safe Gemini] 找不到送出按鈕，或按鈕仍被停用。");
                }
            }, 300); // 延遲 0.3 秒

        } else if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            console.log("[My Safe Gemini] 超時：找不到輸入框。");
        }
    }, 500);
}

// 執行
autoRun();