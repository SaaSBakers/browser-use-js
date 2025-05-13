const BrowserUseJS = require('../src/index');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function main() {
  // Launch browser separately
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
    gptConfig: { apiKey: process.env.OPENAI_API_KEY || 'Open_AI_Key' },
  });

  try {
    // Example natural language instructions
    const instructions = 'Go to https://google.com and search for "OpenAI". Click the first link of the search and extract the title of the page.';
    
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