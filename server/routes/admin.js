import express from 'express';
import User from '../models/User.js';
import Worker from '../models/Worker.js';
import Hire from '../models/Hire.js';
import Review from '../models/Review.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require auth + admin role
router.use(authMiddleware, adminOnly);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [users, workers, hires, reviews] = await Promise.all([
      User.countDocuments(),
      Worker.countDocuments(),
      Hire.countDocuments(),
      Review.countDocuments()
    ]);
    res.json({ users, workers, hires, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/workers
router.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/workers/:id/approve
router.put('/workers/:id/approve', async (req, res) => {
  try {
    const w = await Worker.findByIdAndUpdate(req.params.id, { isApproved: req.body.isApproved }, { new: true });
    res.json(w);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/workers/:id
router.delete('/workers/:id', async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Worker deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/hires
router.get('/hires', async (req, res) => {
  try {
    const hires = await Hire.find().sort({ createdAt: -1 });
    res.json(hires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
