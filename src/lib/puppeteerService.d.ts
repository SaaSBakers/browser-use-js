/**
 * Puppeteer service for browser automation with GPT integration.
 */
export declare class PuppeteerService {
    constructor(options?: {
      puppeteerConfig?: Record<string, any>;
      gptConfig?: Record<string, any>;
    });
  
    /**
     * Starts an automation task.
     * @param instructions - Automation instructions (e.g., natural language or JSON string).
     * @returns Array of results for each action.
     */
    startAutomation(instructions: string): Promise<Array<Record<string, any>>>;
  
    /**
     * Closes the Puppeteer browser instance.
     */
    close(): Promise<void>;
  }