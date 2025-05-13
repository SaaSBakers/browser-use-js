const BrowserUseJS = require('../src/index');

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
    gptConfig: { apiKey: process.env.OPENAI_API_KEY || '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' },
  });

  try {
    // Example natural language instructions
    const instructions = 'Go to https://google.com and search for "OpenAI". Then press enter and open first link.';
    const results = await browser.instruction(instructions);
    console.log('Automation Results:', results);
    
    // Keep the browser open until Ctrl+C is pressed
    console.log('Browser is open! Press Ctrl+C to close.');
    process.on('SIGINT', async () => {
      console.log('Closing browser...');
    //   await browser.close();
      process.exit();
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();