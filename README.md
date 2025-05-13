Browser Automation SDK
A JavaScript/TypeScript SDK for automating browser tasks using Puppeteer and OpenAI's GPT models. This SDK enables natural language-driven browser automation, making it easy to navigate websites, interact with elements, and perform complex workflows.
Features

Natural Language Instructions: Define automation tasks using plain English.
Puppeteer Integration: Leverage Puppeteer's robust browser automation capabilities.
OpenAI GPT Support: Utilize GPT for intelligent action parsing and execution.
TypeScript Support: Fully typed for enhanced developer experience.
Error Handling: Comprehensive error reporting for reliable automation.

Installation
Install the SDK using npm:
npm install browser-use-js

Usage
JavaScript Example
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
    //   { success: true, action: 'submit', selector: 'button[type="submit"]', message: 'Form submitted' }
    // ]
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sdk.close();
  }
}

main();

TypeScript Example
import { BrowserAutomationSDK } from 'browser-use-js';

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
Initializes a new instance of the SDK.

options:
puppeteerConfig (optional): Puppeteer launch configuration (e.g., { headless: 'new' }). See Puppeteer documentation for details.
gptConfig: OpenAI configuration (e.g., { apiKey: 'your-key' }). Required unless OPENAI_API_KEY is set.



sdk.startAutomation(instructions)
Executes automation tasks based on natural language instructions.

instructions: A string describing the automation tasks (e.g., "Go to example.com and click the login button").
Returns: A promise resolving to an array of action results (e.g., { success: boolean, action: string, ... }).

sdk.close()
Closes the Puppeteer browser instance.

Returns: A promise that resolves when the browser is closed.

Environment Variables

OPENAI_API_KEY: Your OpenAI API key. If not set, provide the key via gptConfig.apiKey.

Development
Prerequisites

Node.js (v16 or higher)
npm (v8 or higher)

Setup

Clone the repository:

git clone https://github.com/yourusername/browser-use-js.git
cd browser-use-js


Install dependencies:

npm install


Run tests:

npm test


Build TypeScript declarations:

npm run build

Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.
License
This project is licensed under the ISC License.
