/**
 * Browser Automation SDK for performing web automation tasks using Puppeteer and GPT.
 */
export declare class BrowserAutomationSDK {
    /**
     * Creates an instance of BrowserAutomationSDK.
     * @param options - Configuration options.
     */
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