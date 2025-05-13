/**
 * Browser Automation SDK for performing web automation tasks using Puppeteer and GPT.
 */
export interface BrowserUseJSOptions {
  puppeteerConfig?: Record<string, any>;
  gptConfig?: Record<string, any>;
}

export declare class BrowserUseJS {
  /**
   * Creates an instance of BrowserUseJS.
   * @param options - Configuration options.
   */
  constructor(options?: BrowserUseJSOptions);
  
  /**
   * Closes the browser and cleans up resources
   */
  close(): Promise<void>;
  
  /**
   * Executes browser automation based on natural language instructions
   * @param instructions - Natural language instructions for automation
   * @returns Array of action results
   */
  instruction(instructions: string): Promise<Array<Record<string, any>>>;
}