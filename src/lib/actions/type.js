/**
 * Types text into an element.
 * @param {Object} page - Puppeteer page instance.
 * @param {string} selector - CSS selector for the element.
 * @param {string} text - Text to type.
 * @returns {Promise<Object>} Result of the action.
 * @throws {Error} If selector or text is missing.
 */
async function performType(page, selector, text) {
    try {
      if (!selector || !text) {
        throw new Error('Missing selector or text for typing');
      }
      await page.waitForSelector(selector, { timeout: 50000 });
      await page.type(selector, text, { delay: 100 });
      return { success: true, action: 'type', selector, text };
    } catch (error) {
      return { success: false, action: 'type', error: error.message };
    }
  }
  
  module.exports = performType;