# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Refactored content script code structure for better maintainability
  - Extracted logic into independent functions: `getPromptFromUrl`, `findInputBox`, `findSendButton`, `setInputValue`, `waitForButtonReady`, `sendWithEnter`
  - Extracted button selectors and log prefix as constants (`SEND_BUTTON_SELECTORS`, `LOG_PREFIX`)
  - Unified log format using template strings
  - Added `isButtonUsable` helper function to simplify button state checks
  - Improved code flow and reduced nesting structure

### Added
- Initial changelog implementation

### Security
- Security audit completed
- Existing security features verified:
  - Input validation and sanitization with length limits (max 10,000 characters)
  - XSS protection using `createTextNode` for safe text insertion
  - Content Security Policy (CSP) configured in manifest
  - Type checking for prompt parameters
  - Strict input validation before processing

## [1.0.0] - 2026-01-31

### Added
- Chrome/Edge extension for Flow Launcher integration with Google Gemini
- Auto-fill prompt from URL parameters
- Auto-submit functionality with dynamic waiting mechanism
- Fallback send mechanism using Enter key simulation
- Multi-language support (English and Chinese)

### Security
- Implemented strict input validation and filtering
- Used `createTextNode` for safe text insertion to prevent XSS attacks
- Integrated Content Security Policy (CSP)
- Maximum prompt length enforcement (10,000 characters)
- Input type validation and trimming

[Unreleased]: https://github.com/gtli1452/gemini-flow-launcher/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/gtli1452/gemini-flow-launcher/releases/tag/v1.0.0
