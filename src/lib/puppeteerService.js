/**
 * Puppeteer service for browser automation with GPT integration.
 * @module PuppeteerService
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const performType = require('./actions/type');
const performClick = require('./actions/click');
const performPress = require('./actions/press');
const performNavigate = require('./actions/navigate');
const performExtractDOM = require('./actions/extractDOM');
const performSubmitForm = require('./actions/submitForm');
const extractHybridActionableElements = require('./functions/extractHybridActionableElements');
const { refineInstruction, getLLMElementSelector } = require('./services/gptService');

puppeteer.use(StealthPlugin());

class PuppeteerService {
    constructor({ puppeteerConfig = {}, gptConfig = {} } = {}) {
        this.puppeteer = puppeteer;
        this.puppeteerConfig = {
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ...puppeteerConfig,
        };
        this.gptConfig = gptConfig;
        this.browser = null;
    }

    /**
     * Set an existing browser instance
     * @param {Object} browser - Puppeteer Browser instance
     */
    setBrowser(browser) {
        this.browser = browser;
    }

    /**
     * Get the current active page or create a new one
     * @returns {Promise<Object>} Puppeteer Page instance
     */
    async getActivePage() {
        if (!this.browser) {
            throw new Error('Browser instance not set. Call setBrowser() first.');
        }

        const pages = await this.browser.pages();
        return pages[pages.length - 1] || await this.browser.newPage();
    }

    async instruction(instructions) {
        try {
            console.log('Starting automation with instructions:', instructions);
            const page = await this.getActivePage();
            await page.setViewport({ width: 1920, height: 1080 });

            const results = [];
            console.log('Refining instructions...');
            const refinedSteps = await refineInstruction(instructions, this.gptConfig);
            console.log('Refined steps:', refinedSteps);

            for (const step of refinedSteps) {
                console.log('\nExecuting step:', step);
                const dom = await extractHybridActionableElements(page);
                console.log('Extracted DOM elements, getting GPT action...');
                const gptAction = await getLLMElementSelector(step, dom, this.gptConfig);
                console.log('GPT suggested action:', gptAction);
                const result = await this.performAction(page, gptAction);
                console.log('Action result:', result);
                results.push(result);
            }

            return {
                results,
                page
            };
        } catch (error) {
            console.error('Automation error:', error);
            throw new Error(`Automation failed: ${error.message}`);
        }
    }

    async performAction(page, gptAction) {
        const { action, details } = gptAction;
        if (!action || !details) {
            return { success: false, action, message: 'Invalid GPT action format: missing action or details' };
        }
        if (action === 'navigate' && !details.url) {
            return { success: false, action, message: 'Invalid GPT action format: navigate requires url' };
        }
        if (
            ['type', 'click', 'press', 'submit', 'extract'].includes(action) &&
            !details.selector
        ) {
            return { success: false, action, message: `Invalid GPT action format: ${action} requires selector` };
        }
        if (action === 'type' && !details.text) {
            return { success: false, action, message: 'Invalid GPT action format: type requires text' };
        }
        if (action === 'press' && !details.key) {
            return { success: false, action, message: 'Invalid GPT action format: press requires key' };
        }

        try {
            console.log(`Performing ${action} with details:`, details);
            let result;
            switch (action) {
                case 'type':
                    result = await performType(page, details.selector, details.text);
                    break;
                case 'click':
                    result = await performClick(page, details.selector);
                    break;
                case 'press':
                    result = await performPress(page, details.selector, details.key);
                    break;
                case 'navigate':
                    result = await performNavigate(page, details.url);
                    break;
                case 'submit':
                    result = await performSubmitForm(page, details.selector);
                    break;
                case 'extract':
                    result = await performExtractDOM(page, details.selector);
                    break;
                default:
                    return { success: false, action, message: `Unsupported action type: ${action}` };
            }
            // Normalize result format
            return {
                success: result.success ?? true,
                action,
                message: result.message || result.error || `Performed ${action} on ${details.selector || details.url}`,
                data: result.data || undefined,
                error: result.error || undefined,
            };
        } catch (error) {
            console.error(`Action failed:`, error);
            return { success: false, action, message: `Failed to perform ${action}: ${error.message}`, error: error.message };
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

module.exports = PuppeteerService;