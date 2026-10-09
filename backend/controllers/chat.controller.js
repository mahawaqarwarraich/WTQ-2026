import { generateResponse } from '../services/llm.service.js';
import { AppError } from '../utils/AppError.js';

export const sendMessage = async (req, res) => {
  const { prompt } = req.body ?? {};

  if (typeof prompt !== 'string' || prompt.trim() === '') {
    throw new AppError('Prompt is required and must be a non-empty string', 400);
  }

  const reply = await generateResponse(prompt.trim());

  res.status(200).json({ success: true, data: { reply } });
};
