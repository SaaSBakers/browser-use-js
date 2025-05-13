/**
 * Browser automation SDK with GPT integration
 * @module BrowserUseJS
 */

const PuppeteerService = require('./lib/puppeteerService');

/**
 * Main class for browser automation with GPT integration
 */
class BrowserUseJS {
  /**
   * Creates an instance of BrowserUseJS.
   * @param {Object} options - Configuration options
   * @param {Object} [options.puppeteerConfig={}] - Puppeteer configuration
   * @param {Object} [options.gptConfig={}] - GPT configuration
   * @param {Object} [options.browser] - Existing Puppeteer browser instance
   */
  constructor({ puppeteerConfig = {}, gptConfig = {}, browser = null } = {}) {
    this.puppeteerService = new PuppeteerService({ puppeteerConfig, gptConfig });
    if (browser) {
      this.puppeteerService.setBrowser(browser);
    }
  }

  /**
   * Set an existing browser instance
   * @param {Object} browser - Puppeteer Browser instance
   */
  setBrowser(browser) {
    this.puppeteerService.setBrowser(browser);
  }

  /**
   * Closes the browser and cleans up resources
   */
  async close() {
    await this.puppeteerService.close();
  }

  /**
   * Executes browser automation based on natural language instructions
   * @param {string} instructions - Natural language instructions for automation
   * @returns {Promise<Object>} Object containing results array and active page
   */
  async instruction(instructions) {
    if (!instructions || typeof instructions !== 'string' || !instructions.trim()) {
      throw new Error('Instructions must be a non-empty string');
    }

    return await this.puppeteerService.instruction(instructions);
  }
}

module.exports = BrowserUseJS;