/**
 * Performs a click action on a page.
 * @param {Object} page - Puppeteer page instance.
 * @param {string} selector - CSS selector for the element.
 * @returns {Promise<Object>} Result of the action.
 * @throws {Error} If selector is missing.
 */
async function performClick(page, selector) {
    try {
      if (!selector) {
        throw new Error('Missing selector');
      }
      await page.waitForSelector(selector, { timeout: 50000 });
      await page.click(selector);
      return { success: true, action: 'click', selector };
    } catch (error) {
      return { success: false, action: 'click', error: error.message };
    }
  }
  
  module.exports = performClick;