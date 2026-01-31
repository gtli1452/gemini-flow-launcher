# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-31

Initial release

### Added

- Chrome/Edge extension for Flow Launcher integration with Google Gemini
- Auto-fill prompt from URL parameters
- Auto-submit functionality with dynamic waiting mechanism
- Fallback send mechanism using Enter key simulation
- Multi-language support (English and Chinese)
- Manifest V3 architecture
- Content script with dynamic page detection

### Security

- Implemented strict input validation and filtering
- Used `createTextNode` for safe text insertion to prevent XSS attacks
- Integrated Content Security Policy (CSP)
- Maximum prompt length enforcement (10,000 characters)
- Input type validation and trimming

### Technical Specifications

- Manifest V3 compliant
- Supports Gemini URL parameter handling
- Dynamic element detection with retry mechanism
- Fallback input mechanisms for reliability

---

## Version Notes

### Version Format

We use semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Incompatible API changes
- **MINOR**: Add functionality in a backwards compatible manner
- **PATCH**: Backwards compatible bug fixes

### Change Types

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Fixed**: Bug fixes
- **Security**: Security-related fixes
- **Removed**: Removed features
- **Deprecated**: Features that will be removed soon

<!-- Version links -->
[0.1.0]: https://github.com/gtli1452/gemini-flow-launcher/releases/tag/v0.1.0
