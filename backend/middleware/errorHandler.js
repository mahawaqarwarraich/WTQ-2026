import OpenAI from 'openai';
import { AppError } from '../utils/AppError.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  // Client errors raised by Express itself, e.g. malformed JSON body
  if (err.expose && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ success: false, message: err.message });
  }

  if (err instanceof OpenAI.APIError) {
    console.error(`OpenAI error (${err.status}):`, err.message);

    if (err.status === 429) {
      return res
        .status(429)
        .json({ success: false, message: 'AI service is busy, please try again later' });
    }

    return res.status(502).json({ success: false, message: 'AI service error' });
  }

  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
};
