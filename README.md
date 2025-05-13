![npm](https://img.shields.io/npm/v/browser-use-js)
![Build](https://github.com/SaaSBakers/browser-use-js/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/SaaSBakers/browser-use-js)
![Issues](https://img.shields.io/github/issues/SaaSBakers/browser-use-js)


# 🧠 Browser Use JS

> A JavaScript/TypeScript SDK for automating browser tasks using [Puppeteer](https://pptr.dev/) and [OpenAI's GPT models](https://platform.openai.com/docs).

---

## ✨ Features

- 🗣️ **Natural Language Instructions**: Define automation tasks using plain English.
- 🧭 **Puppeteer Integration**: Leverage Puppeteer's robust browser automation capabilities.
- 🤖 **GPT Support**: Use GPT for intelligent parsing of actions.
- 🧑‍💻 **TypeScript Support**: Fully typed for a great dev experience.
- 🛡️ **Error Handling**: Detailed error reporting for reliable execution.
- 🔄 **Browser Reuse**: Use existing browser instances or let the SDK manage them.

---

## 📦 Installation

```bash
npm install browser-use-js
````

---

## 🚀 Usage

### Example with Stealth Mode

```js
const BrowserUseJS = require('browser-use-js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function main() {
  // Launch browser separately with stealth mode
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized'
    ]
  });

  // Create SDK instance with existing browser
  const browserUseJS = new BrowserUseJS({
    browser,
    gptConfig: { apiKey: process.env.OPENAI_API_KEY }
  });

  try {
    // Example natural language instructions
    const instructions = 'Go to https://google.com and search for "OpenAI"';
    
    // Execute instructions and get results with page
    const { results, page } = await browserUseJS.instruction(instructions);
    console.log('Automation Results:', results);
    
    // You can now work directly with the page if needed
    const title = await page.title();
    console.log('Current page title:', title);
    
    // Keep the browser open until Ctrl+C is pressed
    console.log('Browser is open! Press Ctrl+C to close.');
    process.on('SIGINT', async () => {
      console.log('Closing browser...');
      await browser.close();
      process.exit();
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

### Simple Example (SDK Managed)

```js
const BrowserUseJS = require('browser-use-js');

async function main() {
  const browserUseJS = new BrowserUseJS({
    puppeteerConfig: { 
      headless: false,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--start-maximized'
      ]
    },
    gptConfig: { apiKey: process.env.OPENAI_API_KEY }
  });

  try {
    const { results, page } = await browserUseJS.instruction(
      'Go to https://google.com and search for "OpenAI"'
    );
    console.log('Results:', results);
    console.log('Page title:', await page.title());
    
    // Keep browser open until Ctrl+C
    process.on('SIGINT', async () => {
      await browserUseJS.close();
      process.exit();
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

---

## 📚 API Reference

### `new BrowserUseJS(options)`

Initialize the SDK.

**Options:**

* `puppeteerConfig` *(optional)* – Puppeteer launch options ([see docs](https://pptr.dev/api/puppeteer.launchoptions/))
  * Default configuration:
    ```js
    {
      headless: false,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--start-maximized'
      ]
    }
    ```
* `gptConfig` *(required)* – OpenAI configuration
  * `apiKey` - Your OpenAI API key
* `browser` *(optional)* - Existing Puppeteer browser instance

### `browserUseJS.instruction(instructions)`

Executes tasks from natural language instructions.

**Parameters:**

* `instructions` *(string)* – Natural language instructions (e.g., `"Go to google.com and search for OpenAI"`)

**Returns:**

* `Promise<Object>` with:
  * `results` - Array of action results
  * `page` - Puppeteer Page instance used for automation
  ```ts
  type Result = {
    success: boolean;
    action: string;
    selector?: string;
    message?: string;
    url?: string;
    data?: any;
    error?: string;
  }
  ```

### `browserUseJS.setBrowser(browser)`

Set an existing Puppeteer browser instance.

**Parameters:**

* `browser` *(Object)* - Puppeteer Browser instance

### `browserUseJS.close()`

Closes the browser session if SDK is managing it.

---

## 🔐 Environment Variables

* `OPENAI_API_KEY`: Your OpenAI API key
  (or pass via `gptConfig.apiKey`)

---

## 🛠 Development

### Prerequisites

* [Node.js](https://nodejs.org/) (v16+)
* npm (v8+)

### Setup

```bash
git clone https://github.com/SaaSBakers/browser-use-js.git
cd browser-use-js
npm install
```

### Run Tests

```bash
npm test
```

### Build (TypeScript)

```bash
npm run build
```

---

## 🤝 Contributing

Contributions are welcome! Please open an [issue](https://github.com/SaaSBakers/browser-use-js/issues) or submit a [pull request](https://github.com/SaaSBakers/browser-use-js/pulls).

Join the conversation in our [GitHub Discussions](https://github.com/SaaSBakers/browser-use-js/discussions)! 💬

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 🙏 Acknowledgments

* [Puppeteer](https://github.com/puppeteer/puppeteer)
* [OpenAI](https://openai.com/)