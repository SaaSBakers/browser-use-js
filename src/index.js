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
   */
  constructor({ puppeteerConfig = {}, gptConfig = {} } = {}) {
    this.puppeteerService = new PuppeteerService({ puppeteerConfig, gptConfig });
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
   * @returns {Promise<Array<Object>>} Array of action results
   */
  async instruction(instructions) {
    if (!instructions || typeof instructions !== 'string' || !instructions.trim()) {
      throw new Error('Instructions must be a non-empty string');
    }

    const results = await this.puppeteerService.instruction(instructions);
    return results;
  }
}

module.exports = BrowserUseJS;