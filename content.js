(() => {
    // 1. 解析網址參數
    const params = new URLSearchParams(window.location.search);
    let promptText = params.get('prompt');

    // 如果沒有 prompt 參數，直接結束
    if (!promptText || typeof promptText !== 'string') return;

    // 2. 基本驗證與截斷
    const CONFIG = {
        MAX_PROMPT_LENGTH: 10000,
        MAX_POLLING_ATTEMPTS: 20,
        POLL_INTERVAL_MS: 500,
        BUTTON_READY_MAX_WAIT_MS: 5000,
        BUTTON_READY_POLL_INTERVAL_MS: 100
    };

    promptText = promptText.trim();
    if (promptText.length === 0) return;
    if (promptText.length > CONFIG.MAX_PROMPT_LENGTH) {
        console.warn("[My Safe Gemini] Prompt 過長，已拒絕處理");
        return;
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
    let attempts = 0;

    const intervalId = setInterval(() => {
        const inputBox = findInputBox();
        attempts++;

        if (inputBox) {
            clearInterval(intervalId); // 找到輸入框，停止輪詢

            // --- 步驟 A: 填入文字 ---
            inputBox.focus();

            if (inputBox.tagName === 'TEXTAREA') {
                inputBox.value = promptText;
            } else {
                inputBox.textContent = '';
                inputBox.appendChild(document.createTextNode(promptText));
            }

            // 強制觸發 input 事件，確保 UI 框架知道內容變了
            inputBox.dispatchEvent(new Event('input', { bubbles: true }));

            console.log("[My Safe Gemini] 文字已填入，準備點擊送出...");

            // --- 步驟 B: 等待按鈕變亮並點擊 ---
            const waitForButtonReady = (maxWait = CONFIG.BUTTON_READY_MAX_WAIT_MS) => {
                return new Promise((resolve) => {
                    const startTime = Date.now();

                    const checkButton = () => {
                        const sendBtn = findSendButton();
                        if (sendBtn) {
                            resolve(sendBtn);
                            return;
                        }

                        if (Date.now() - startTime < maxWait) {
                            setTimeout(checkButton, CONFIG.BUTTON_READY_POLL_INTERVAL_MS);
                            return;
                        }

                        resolve(null);
                    };

                    checkButton();
                });
            };

            void (async () => {
                const sendBtn = await waitForButtonReady();
                if (sendBtn) {
                    sendBtn.click();
                    console.log("[My Safe Gemini] 已自動送出！");
                    return;
                }

                console.warn("[My Safe Gemini] 找不到送出按鈕，嘗試以 Enter 送出。");
                inputBox.focus();
                inputBox.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    bubbles: true
                }));
                inputBox.dispatchEvent(new KeyboardEvent('keyup', {
                    key: 'Enter',
                    code: 'Enter',
                    bubbles: true
                }));
            })();

        } else if (attempts >= CONFIG.MAX_POLLING_ATTEMPTS) {
            clearInterval(intervalId);
            console.log("[My Safe Gemini] 超時：找不到輸入框。");
        }
    }, CONFIG.POLL_INTERVAL_MS);

    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
})();