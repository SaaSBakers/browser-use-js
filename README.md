Browser Automation SDK
A JavaScript/TypeScript SDK for performing browser automation tasks using Puppeteer and OpenAI's GPT.
Installation
npm install browser-use-js

Usage
JavaScript
const BrowserAutomationSDK = require('browser-use-js');

async function main() {
  const sdk = new BrowserAutomationSDK({
    puppeteerConfig: { headless: 'new' },
    gptConfig: { apiKey: process.env.OPENAI_API_KEY || 'your-gpt-api-key' },
  });

  try {
    const instructions = 'Go to https://example.com, click the login link, type "user" into the username field, and submit the form';
    const results = await sdk.startAutomation(instructions);
    console.log('Results:', results);
    // Example output:
    // [
    //   { success: true, action: 'navigate', url: 'https://example.com' },
    //   { success: true, action: 'click', selector: 'a[href="/login"]' },
    //   { success: true, action: 'type', selector: 'input[name="username"]', text: 'user' },
    //   { success: true, action: 'submit', selector: 'button[type="submit"]', message: 'Form submitted using button[type="submit"]' }
    // ]
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sdk.close();
  }
}

main();

TypeScript
import { BrowserAutomationSDK } from 'browser-automation-sdk';

async function main() {
  const sdk = new BrowserAutomationSDK({
    puppeteerConfig: { headless: 'new' },
    gptConfig: { apiKey: process.env.OPENAI_API_KEY || 'your-gpt-api-key' },
  });

  try {
    const instructions = 'Go to https://example.com, click the login link, type "user" into the username field, and submit the form';
    const results = await sdk.startAutomation(instructions);
    console.log('Results:', results);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sdk.close();
  }
}

main();

API Reference
new BrowserAutomationSDK(options)

options.puppeteerConfig: Puppeteer launch configuration (optional).
options.gptConfig: OpenAI configuration (e.g., { apiKey: 'your-key' }).

sdk.startAutomation(instructions)

instructions: Automation instructions as a natural language string.
Returns: Array of action results (e.g., { success: boolean, action: string, ... }).

sdk.close()
Closes the Puppeteer browser instance.
Environment Variables

OPENAI_API_KEY: Your OpenAI API key (optional, can be passed via gptConfig.apiKey).

Development

Clone the repository:
git clone https://github.com/yourusername/browser-use-js.git
cd browser-use-js


Install dependencies:
npm install


Run tests:
npm test


Build TypeScript declarations:
npm run build



License
ISC
