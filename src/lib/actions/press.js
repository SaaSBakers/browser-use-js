/**
 * Presses a key on an element.
 * @param {Object} page - Puppeteer page instance.
 * @param {string} selector - CSS selector for the element.
 * @param {string} key - Key to press (e.g., 'Enter').
 * @returns {Promise<Object>} Result of the action.
 * @throws {Error} If selector or key is missing.
 */
async function performPress(page, selector, key) {
    try {
      if (!selector) {
        throw new Error('No selector found for press action');
      }
      if (!key) {
        throw new Error('No key specified for press action');
      }
      await page.waitForSelector(selector, { visible: true, timeout: 50000 });
      await page.focus(selector);
      await page.keyboard.press(key);
      return { success: true, action: 'press', selector, key };
    } catch (error) {
      return { success: false, action: 'press', error: error.message };
    }
  }
  
  module.exports = performPress;