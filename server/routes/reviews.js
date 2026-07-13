import express from 'express';
import Review from '../models/Review.js';
import Worker from '../models/Worker.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/reviews
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { workerId, rating, reviewText } = req.body;
    if (!workerId || !rating) return res.status(400).json({ error: 'workerId and rating required' });
    const review = await Review.create({
      userId: req.user.id,
      workerId,
      userName: req.user.name,
      rating: parseInt(rating),
      reviewText
    });
    // Update worker's average rating
    const reviews = await Review.find({ workerId });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await Worker.findByIdAndUpdate(workerId, { rating: Math.round(avg * 10) / 10, reviewCount: reviews.length });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reviews/:workerId
router.get('/:workerId', async (req, res) => {
  try {
    const reviews = await Review.find({ workerId: req.params.workerId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
