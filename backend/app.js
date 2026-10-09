import { env } from './config/env.js';
import express from 'express';
import chatRoutes from './routes/chat.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.status(200).json({ success: true, message: 'API is working' });
});

app.use('/api/chat', chatRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
