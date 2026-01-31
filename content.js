(() => {
    const CONFIG = {
        MAX_PROMPT_LENGTH: 10000,
        MAX_POLLING_ATTEMPTS: 20,
        POLL_INTERVAL_MS: 500,
        BUTTON_READY_MAX_WAIT_MS: 5000,
        BUTTON_READY_POLL_INTERVAL_MS: 100
    };
    const LOG_PREFIX = "[My Safe Gemini]";
    const SEND_BUTTON_SELECTORS = [
        'button[aria-label="Send message"]',
        'button[aria-label="傳送訊息"]',
        'button[data-testid="send-button"]'
    ];

    const getPromptFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const promptText = params.get('prompt');
        if (typeof promptText !== 'string') return null;

        const trimmed = promptText.trim();
        if (trimmed.length === 0) return null;

        if (trimmed.length > CONFIG.MAX_PROMPT_LENGTH) {
            console.warn(`${LOG_PREFIX} Prompt 過長，已拒絕處理`);
            return null;
        }

        return trimmed;
    };

    const findInputBox = () => (
        document.querySelector('div[contenteditable="true"][role="textbox"]') ||
        document.querySelector('textarea') ||
        document.querySelector('[role="textbox"]')
    );

    const isButtonUsable = (btn) =>
        !!btn && !btn.disabled && btn.getAttribute('aria-disabled') !== 'true';

    const findSendButton = () => {
        for (const selector of SEND_BUTTON_SELECTORS) {
            const btn = document.querySelector(selector);
            if (isButtonUsable(btn)) return btn;
        }
        return null;
    };

    const setInputValue = (inputBox, value) => {
        inputBox.focus();

        if (inputBox.tagName === 'TEXTAREA') {
            inputBox.value = value;
        } else {
            inputBox.textContent = '';
            inputBox.appendChild(document.createTextNode(value));
        }

        inputBox.dispatchEvent(new Event('input', { bubbles: true }));
    };

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

    const sendWithEnter = (inputBox) => {
        inputBox.focus();
        for (const eventType of ['keydown', 'keyup']) {
            inputBox.dispatchEvent(new KeyboardEvent(eventType, {
                key: 'Enter',
                code: 'Enter',
                bubbles: true
            }));
        }
    };

    const promptText = getPromptFromUrl();
    if (!promptText) return;

    let attempts = 0;

    const intervalId = setInterval(() => {
        const inputBox = findInputBox();
        attempts += 1;

        if (inputBox) {
            clearInterval(intervalId);

            setInputValue(inputBox, promptText);
            console.log(`${LOG_PREFIX} 文字已填入，準備點擊送出...`);

            void (async () => {
                const sendBtn = await waitForButtonReady();
                if (sendBtn) {
                    sendBtn.click();
                    console.log(`${LOG_PREFIX} 已自動送出！`);
                    return;
                }

                console.warn(`${LOG_PREFIX} 找不到送出按鈕，嘗試以 Enter 送出。`);
                sendWithEnter(inputBox);
            })();
            return;
        }

        if (attempts >= CONFIG.MAX_POLLING_ATTEMPTS) {
            clearInterval(intervalId);
            console.log(`${LOG_PREFIX} 超時：找不到輸入框。`);
        }
    }, CONFIG.POLL_INTERVAL_MS);

    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
})();