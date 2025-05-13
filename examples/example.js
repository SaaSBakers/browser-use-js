const BrowserAutomationSDK = require('../src/index');

async function main() {
  const sdk = new BrowserAutomationSDK({
    puppeteerConfig: { headless: false },
    gptConfig: { apiKey: process.env.OPENAI_API_KEY || 'Open_AI-Key' },
  });

  try {
    // Example natural language instructions
    const instructions = 'Go to https://google.com and search for "OpenAI". Then press enter and open first link.';
    const results = await sdk.startAutomation(instructions);
    console.log('Automation Results:', results);
    // Expected results example:
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