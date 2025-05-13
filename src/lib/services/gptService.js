/**
 * GPT service for processing automation instructions using OpenAI.
 * @module gptService
 */

const axios = require('axios');

/**
 * Calls OpenAI's chat completions API.
 * @param {Object} gptConfig - GPT service configuration (e.g., { apiKey }).
 * @param {Array<Object>} messages - Chat messages for OpenAI.
 * @param {number} [maxTokens=300] - Maximum tokens for the response.
 * @returns {Promise<string>} The response content.
 * @throws {Error} If the API call fails.
 */
async function callOpenAI(gptConfig, messages, maxTokens = 300) {
  if (!gptConfig.apiKey) {
    throw new Error('OpenAI API key is required');
  }
  const headers = {
    Authorization: `Bearer ${gptConfig.apiKey}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages,
        temperature: 0.3,
        max_tokens: maxTokens,
      },
      { headers }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;
    throw new Error(`OpenAI API error: ${message}`);
  }
}

/**
 * Refines raw instructions into an array of actionable steps.
 * @param {string} instructions - Raw instructions (e.g., natural language).
 * @param {Object} gptConfig - GPT service configuration (e.g., { apiKey }).
 * @returns {Promise<Array<string>>} Array of refined steps.
 * @throws {Error} If parsing or API call fails.
 */
async function refineInstruction(instructions, gptConfig) {
  const messages = [
    {
      role: 'system',
      content: `You are an assistant that converts vague browser automation instructions into a precise, structured array of steps.
Output the steps in the following JSON format:
[
  "Go to https://example.com",
  "Type 'Hello' into the search bar",
  "Click the submit button"
]
Only return a pure JSON array. No extra text.`,
    },
    { role: 'user', content: instructions },
  ];
  const jsonString = await callOpenAI(gptConfig, messages, 200);
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`Failed to parse refined instructions: ${error.message}`);
  }
}

/**
 * Generates an action and selector based on a step and DOM.
 * @param {string} instruction - Refined instruction step.
 * @param {Array} dom - DOM elements from extractHybridActionableElements.
 * @param {Object} gptConfig - GPT service configuration (e.g., { apiKey }).
 * @returns {Promise<Object>} GPT-generated action (e.g., { action, details }).
 * @throws {Error} If parsing or API call fails.
 */
async function getLLMElementSelector(instruction, dom, gptConfig) {
  const domJson = JSON.stringify(dom, null, 2);
  const prompt = `
You are a smart browser automation agent.
Given the user's instruction and the current cleaned DOM tree (in structured JSON), respond with the best action to take next.
Use this JSON format only:

{
  "action": "click" | "type" | "navigate" | "submit" | "press" | "extract",
  "details": {
    "selector": "CSS selector string",
    "text": "text to type (if applicable)",
    "key": "Enter/Tab/etc (if press)",
    "url": "https://... (if navigate)"
  }
}

Only return valid JSON. No explanation or extra text.

Instruction: "${instruction}"
DOM: ${domJson}
`;
  const messages = [{ role: 'user', content: prompt }];
  const jsonString = await callOpenAI(gptConfig, messages, 400);
  try {
    console.log('GPT response:', jsonString);
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`Failed to parse GPT action: ${error.message}`);
  }
}

module.exports = { refineInstruction, getLLMElementSelector };