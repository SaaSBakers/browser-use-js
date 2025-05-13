/**
 * Submits a form by clicking a button.
 * @param {Object} page - Puppeteer page instance.
 * @param {string} selector - CSS selector for the submit button.
 * @returns {Promise<Object>} Result of the action.
 * @throws {Error} If selector is missing.
 */
async function performSubmitForm(page, selector) {
    try {
      if (!selector) {
        throw new Error('No selector found for submit form');
      }
      await page.waitForSelector(selector, { visible: true, timeout: 50000 });
      await page.click(selector);
      return { success: true, action: 'submit', selector, message: `Form submitted using ${selector}` };
    } catch (error) {
      return { success: false, action: 'submit', error: error.message };
    }
  }
  
  module.exports = performSubmitForm;