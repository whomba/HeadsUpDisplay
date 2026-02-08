import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/rss
router.get('/', async (_req: Request, res: Response) => {
  try {
    // TODO: Implement RSS feed aggregation
    res.json({
      message: 'RSS endpoint - Coming soon',
      feeds: []
    });
  } catch (error) {
    console.error('RSS API error:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
});

export default router;
