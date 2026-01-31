(() => {
    // 1. 解析網址參數
    const params = new URLSearchParams(window.location.search);
    let promptText = params.get('prompt');

    // 如果沒有 prompt 參數，直接結束
    if (!promptText || promptText.trim().length === 0) return;

    // 2. 基本驗證與截斷
    const MAX_PROMPT_LENGTH = 10000;
    if (promptText.length > MAX_PROMPT_LENGTH) {
        console.warn("[My Safe Gemini] Prompt 過長，已截斷");
        promptText = promptText.substring(0, MAX_PROMPT_LENGTH);
    }

    // 2. 定義尋找輸入框的邏輯
    const findInputBox = () => {
        return (
            document.querySelector('div[contenteditable="true"][role="textbox"]') ||
            document.querySelector('textarea') ||
            document.querySelector('[role="textbox"]')
        );
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
    const POLL_INTERVAL = 500; // 毫秒
    const MAX_ATTEMPTS = 20; // 10秒
    const UI_REACTION_DELAY = 300; // 毫秒
    const SEND_RETRY_DELAY = 400; // 毫秒
    const MAX_SEND_RETRIES = 3;

    let attempts = 0;

    const intervalId = setInterval(() => {
        const inputBox = findInputBox();
        attempts++;

        if (inputBox) {
            clearInterval(intervalId); // 找到輸入框，停止輪詢

            // --- 步驟 A: 填入文字 ---
            inputBox.focus();
            inputBox.textContent = promptText;

            // 強制觸發 input 事件，確保 UI 框架知道內容變了
            inputBox.dispatchEvent(new Event('input', { bubbles: true }));

            console.log("[My Safe Gemini] 文字已填入，準備點擊送出...");

            // --- 步驟 B: 等待按鈕變亮並點擊 ---
            // 給 UI 一點時間反應 (300ms)
            const trySend = (retryCount) => {
                const sendBtn = findSendButton();
                if (sendBtn) {
                    sendBtn.click();
                    console.log("[My Safe Gemini] 已自動送出！");

                    // (選用) 清除網址參數，避免重新整理頁面時重複發送
                    // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    // window.history.replaceState({path: newUrl}, '', newUrl);
                    return;
                }

                if (retryCount < MAX_SEND_RETRIES) {
                    setTimeout(() => trySend(retryCount + 1), SEND_RETRY_DELAY);
                    return;
                }

                console.error("[My Safe Gemini] 發送失敗：按鈕未找到或仍被停用。");
            };

            setTimeout(() => trySend(0), UI_REACTION_DELAY); // 延遲 0.3 秒

        } else if (attempts >= MAX_ATTEMPTS) {
            clearInterval(intervalId);
            console.log("[My Safe Gemini] 超時：找不到輸入框。");
        }
    }, POLL_INTERVAL);
})();