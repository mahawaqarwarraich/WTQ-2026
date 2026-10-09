import 'dotenv/config';

const required = ['OPENAI_API_KEY'];

const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

export const env = {
  port: process.env.PORT || 5000,
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-5-mini',
  },
};
