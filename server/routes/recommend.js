import express from 'express';
import axios from 'axios';
import Worker from '../models/Worker.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/recommend
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { requirement, category, location } = req.body;
    if (!requirement) return res.status(400).json({ error: 'requirement is required' });

    // Fetch all approved workers (up to 200 for ML ranking)
    const filter = { isApproved: true };
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    const workers = await Worker.find(filter).limit(200);

    if (workers.length === 0) {
      return res.json({ recommendations: [] });
    }

    // Call Flask ML service
    try {
      const mlRes = await axios.post(`${process.env.ML_SERVICE_URL}/recommend`, {
        requirement,
        workers: workers.map(w => ({
          id: w._id.toString(),
          name: w.name,
          skills: w.skills,
          bio: w.bio,
          category: w.category,
          rating: w.rating,
          experience: w.experience,
          completedProjects: w.completedProjects,
          hireCount: w.hireCount,
          isAvailable: w.isAvailable,
          location: w.location
        }))
      }, { timeout: 10000 });

      const ranked = mlRes.data.recommendations || [];
      // Merge ML scores with full worker objects
      const workerMap = {};
      workers.forEach(w => { workerMap[w._id.toString()] = w; });
      const result = ranked.map(r => ({
        ...workerMap[r.id]?.toObject(),
        similarityScore: r.similarity_score,
        finalScore: r.final_score
      }));
      return res.json({ recommendations: result });
    } catch (mlErr) {
      console.warn('ML service unavailable, falling back to rating sort:', mlErr.message);
      // Fallback: sort by rating
      const sorted = workers.sort((a, b) => b.rating - a.rating).slice(0, 10);
      return res.json({ recommendations: sorted.map(w => ({ ...w.toObject(), similarityScore: 0.5, finalScore: w.rating / 5 })) });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
