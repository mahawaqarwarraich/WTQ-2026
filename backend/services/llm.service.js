import { openai } from '../config/openai.js';
import { env } from '../config/env.js';

export const generateResponse = async (prompt) => {
  const response = await openai.responses.create({
    model: env.openai.model,
    input: prompt,
  });

  return response.output_text;
};
