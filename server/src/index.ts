import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRouter from './api/weather.js';
import calendarRouter from './api/calendar.js';
import rssRouter from './api/rss.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/weather', weatherRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/rss', rssRouter);

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Heads Up Display API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      weather: '/api/weather',
      calendar: '/api/calendar',
      rss: '/api/rss'
    }
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HUD Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
