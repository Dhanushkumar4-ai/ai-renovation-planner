import express from 'express';
import Hire from '../models/Hire.js';
import Worker from '../models/Worker.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/hire
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { workerId, requirement, scheduledDate } = req.body;
    if (!workerId) return res.status(400).json({ error: 'workerId required' });
    const worker = await Worker.findById(workerId);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    const hire = await Hire.create({
      userId: req.user.id,
      workerId,
      userName: req.user.name,
      workerName: worker.name,
      requirement,
      scheduledDate
    });
    await Worker.findByIdAndUpdate(workerId, { $inc: { hireCount: 1 } });
    res.status(201).json(hire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/hire-history — homeowner's history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const hires = await Hire.find({ userId: req.user.id }).populate('workerId', 'name category rating').sort({ createdAt: -1 });
    res.json(hires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/hire/worker-requests — worker sees their incoming requests
router.get('/worker-requests', authMiddleware, async (req, res) => {
  try {
    const worker = await Worker.findOne({ userId: req.user.id });
    if (!worker) return res.status(404).json({ error: 'Worker profile not found' });
    const hires = await Hire.find({ workerId: worker._id }).sort({ createdAt: -1 });
    res.json(hires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/hire/:id/status — worker updates hire status
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const hire = await Hire.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (status === 'completed') {
      await Worker.findByIdAndUpdate(hire.workerId, { $inc: { completedProjects: 1 } });
    }
    res.json(hire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
