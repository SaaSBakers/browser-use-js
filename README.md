![npm](https://img.shields.io/npm/v/browser-use-js)
![Build](https://github.com/SaaSBakers/browser-use-js/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/SaaSBakers/browser-use-js)
![Issues](https://img.shields.io/github/issues/SaaSBakers/browser-use-js)


# 🧠 Browser Automation SDK

> A JavaScript/TypeScript SDK for automating browser tasks using [Puppeteer](https://pptr.dev/) and [OpenAI's GPT models](https://platform.openai.com/docs).

---

## ✨ Features

- 🗣️ **Natural Language Instructions**: Define automation tasks using plain English.
- 🧭 **Puppeteer Integration**: Leverage Puppeteer's robust browser automation capabilities.
- 🤖 **GPT Support**: Use GPT for intelligent parsing of actions.
- 🧑‍💻 **TypeScript Support**: Fully typed for a great dev experience.
- 🛡️ **Error Handling**: Detailed error reporting for reliable execution.

---

## 📦 Installation

```bash
npm install browser-use-js
````

---

## 🚀 Usage

### JavaScript Example

```js
const BrowserUseJS = require('browser-use-js');

async function main() {
  const browser = new BrowserUseJS({
    puppeteerConfig: { 
      headless: false,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--start-maximized'
      ]
    },
    gptConfig: { apiKey: process.env.OPENAI_API_KEY || 'your-gpt-api-key' },
  });

  try {
    const instructions = 'Go to https://google.com and search for "OpenAI"';
    const results = await browser.instruction(instructions);
    console.log('Results:', results);
    
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

### TypeScript Example

```ts
import { BrowserUseJS } from 'browser-use-js';

async function main() {
  const browser = new BrowserUseJS({
    puppeteerConfig: { 
      headless: false,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--start-maximized'
      ]
    },
    gptConfig: { apiKey: process.env.OPENAI_API_KEY || 'your-gpt-api-key' },
  });

  try {
    const instructions = 'Go to https://google.com and search for "OpenAI"';
    const results = await browser.instruction(instructions);
    console.log('Results:', results);
    
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
* `gptConfig` *(required unless using `OPENAI_API_KEY`)* – Example: `{ apiKey: 'your-openai-key' }`

---

### `browser.instruction(instructions)`

Executes tasks from natural language instructions.

**Parameters:**

* `instructions` *(string)* – e.g., `"Go to google.com and search for OpenAI"`

**Returns:**

* `Promise<ActionResult[]>` – Array of task results:

  ```ts
  type ActionResult = {
    success: boolean;
    action: string;
    selector?: string;
    message?: string;
    url?: string;
  }
  ```

---

### `browser.close()`

Closes the Puppeteer browser session.

---

## 🔐 Environment Variables

* `OPENAI_API_KEY`: Your OpenAI API key
  (or pass it via `gptConfig.apiKey`)

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