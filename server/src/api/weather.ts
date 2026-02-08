import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/weather
router.get('/', async (_req: Request, res: Response) => {
  try {
    // TODO: Implement weather service
    res.json({
      message: 'Weather endpoint - Coming soon',
      locations: ['98133', 'Quilcene, WA']
    });
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET /api/weather/:location
router.get('/:location', async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    // TODO: Implement location-specific weather
    res.json({
      message: `Weather for ${location} - Coming soon`
    });
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
