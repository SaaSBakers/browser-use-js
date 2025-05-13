/**
 * Navigates to a URL.
 * @param {Object} page - Puppeteer page instance.
 * @param {string} url - URL to navigate to.
 * @returns {Promise<Object>} Result of the action.
 * @throws {Error} If URL is missing.
 */
async function performNavigate(page, url) {
    try {
      if (!url) {
        throw new Error('No URL found in instruction');
      }
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      return { success: true, action: 'navigate', url };
    } catch (error) {
      return { success: false, action: 'navigate', error: error.message };
    }
  }
  
  module.exports = performNavigate;