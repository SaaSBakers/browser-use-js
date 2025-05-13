# API Documentation

## `new BrowserAutomationSDK(options)`
- `options.puppeteerConfig`: Puppeteer launch options (e.g., `{ headless: false }`).
- `options.gptConfig`: OpenAI config (e.g., `{ apiKey: 'your-key' }`).

## `sdk.startAutomation(instructions)`
- `instructions`: String (e.g., "Go to google.com and search for OpenAI").
- Returns: `Promise<Array<Object>>` - Action results (e.g., `{ success: true, action: 'navigate', url: 'https://google.com' }`).

## `sdk.close()`
Closes the Puppeteer browser.