# Changelog

- 0.2.0 (2026/01/31)

  - Refactor content script code structure for better maintainability
    - Extract logic into independent functions: `getPromptFromUrl`, `findInputBox`, `findSendButton`, `setInputValue`, `waitForButtonReady`, `sendWithEnter`
    - Extract button selectors and log prefix as constants (`SEND_BUTTON_SELECTORS`, `LOG_PREFIX`)
    - Unify log format using template strings
    - Add `isButtonUsable` helper function to simplify button state checks
    - Improve code flow and reduce nesting structure

- 0.1.0 (2026/01/31)

  - Initial release
  - Chrome/Edge extension for Flow Launcher integration with Google Gemini
  - Auto-fill prompt from URL parameters
  - Auto-submit functionality with dynamic waiting mechanism
  - Fallback send mechanism using Enter key simulation
  - Multi-language support (English and Chinese)
  - Implement strict input validation and filtering
  - Use `createTextNode` for safe text insertion to prevent XSS attacks
  - Integrate Content Security Policy (CSP)
  - Maximum prompt length enforcement (10,000 characters)
