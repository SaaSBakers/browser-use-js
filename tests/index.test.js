const BrowserAutomationSDK = require('../src/index');
const axios = require('axios');

jest.mock('axios');

describe('BrowserAutomationSDK', () => {
  let sdk;

  beforeEach(() => {
    sdk = new BrowserAutomationSDK({
      gptConfig: { apiKey: 'test-key' },
    });
  });

  afterEach(async () => {
    await sdk.close();
    jest.clearAllMocks();
  });

  test('should throw error for invalid instructions', async () => {
    await expect(sdk.startAutomation('')).rejects.toThrow('Instructions must be a non-empty string');
    await expect(sdk.startAutomation(null)).rejects.toThrow('Instructions must be a non-empty string');
  });

  test('should throw error for missing GPT API key', async () => {
    const badSdk = new BrowserAutomationSDK({});
    await expect(badSdk.startAutomation('Go to example.com')).rejects.toThrow('OpenAI API key is required');
  });

  test('should process navigation and click with mock DOM', async () => {
    // Mock GPT responses
    axios.post
      .mockResolvedValueOnce({
        data: {
          choices: [
            {
              message: {
                content: JSON.stringify([
                  'Go to https://example.com',
                  'Click the first link',
                ]),
              },
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          choices: [
            { message: { content: JSON.stringify({ action: 'navigate', details: { url: 'https://example.com' } }) } },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          choices: [
            { message: { content: JSON.stringify({ action: 'click', details: { selector: 'a' } }) } },
          ],
        },
      });

    const results = await sdk.startAutomation('Go to https://example.com and click a link');
    expect(results).toBeInstanceOf(Array);
    expect(results[0]).toMatchObject({ success: true, action: 'navigate', url: 'https://example.com' });
    expect(results[1]).toMatchObject({ success: true, action: 'click', selector: 'a' });
  });
});