/**
 * Extracts text content from a DOM element.
 * @param {Object} page - Puppeteer page instance.
 * @param {string} selector - CSS selector for the element.
 * @returns {Promise<Object>} Result of the action with extracted text.
 * @throws {Error} If selector is missing.
 */
async function performExtractDOM(page, selector) {
    try {
      if (!selector) {
        throw new Error('No selector found for extraction');
      }
      await page.waitForSelector(selector, { timeout: 50000 });
      const text = await page.$eval(selector, (el) => el.textContent.trim());
      return { success: true, action: 'extract', selector, data: text };
    } catch (error) {
      return { success: false, action: 'extract', error: error.message };
    }
  }
  
  module.exports = performExtractDOM;