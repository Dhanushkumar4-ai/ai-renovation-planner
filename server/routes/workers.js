import express from 'express';
import Worker from '../models/Worker.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/workers — list with filters
router.get('/', async (req, res) => {
  try {
    const { category, location, minRating, available, search, sort, page = 1, limit = 20 } = req.query;
    const filter = { isApproved: true };
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };
    if (available === 'true') filter.isAvailable = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { skills: { $elemMatch: { $regex: search, $options: 'i' } } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }
    const sortMap = { rating: { rating: -1 }, experience: { experience: -1 }, projects: { completedProjects: -1 } };
    const sortOption = sortMap[sort] || { rating: -1 };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [workers, total] = await Promise.all([
      Worker.find(filter).sort(sortOption).skip(skip).limit(parseInt(limit)),
      Worker.countDocuments(filter)
    ]);
    res.json({ workers, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/workers/:id
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/workers — create (authenticated, worker role)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.create({ ...req.body, userId: req.user.id });
    res.status(201).json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/workers/:id — update own profile
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    // Allow worker to update their own profile, or admin
    if (worker.userId?.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const updated = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/workers/:id — admin only
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Worker deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/workers/my/profile — get worker profile for logged-in worker
router.get('/my/profile', authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.findOne({ userId: req.user.id });
    if (!worker) return res.status(404).json({ error: 'No worker profile found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
