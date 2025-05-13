/**
 * Browser Automation SDK for performing web automation tasks using Puppeteer and GPT.
 * @module BrowserAutomationSDK
 */

const PuppeteerService = require('./lib/puppeteerService');

/**
 * Main SDK class for browser automation.
 */
class BrowserAutomationSDK {
  /**
   * Creates an instance of BrowserAutomationSDK.
   * @param {Object} options - Configuration options.
   * @param {Object} [options.puppeteerConfig] - Puppeteer launch configuration.
   * @param {Object} [options.gptConfig] - GPT service configuration (e.g., API key).
   * @throws {Error} If required options are missing.
   */
  constructor(options = {}) {
    this.puppeteerService = new PuppeteerService({
      puppeteerConfig: options.puppeteerConfig,
      gptConfig: options.gptConfig,
    });
  }

  /**
   * Starts an automation task.
   * @param {string} instructions - Automation instructions (e.g., natural language or JSON string).
   * @returns {Promise<Array<Object>>} Array of results for each action.
   * @throws {Error} If automation fails or instructions are invalid.
   */
  async startAutomation(instructions) {
    if (!instructions || typeof instructions !== 'string') {
      throw new Error('Instructions must be a non-empty string');
    }
    try {
      const results = await this.puppeteerService.startAutomation(instructions);
      return results;
    } catch (error) {
      throw new Error(`Automation failed: ${error.message}`);
    }
  }

  /**
   * Closes the Puppeteer browser instance.
   * @returns {Promise<void>}
   */
  async close() {
    await this.puppeteerService.close();
  }
}

module.exports = BrowserAutomationSDK;