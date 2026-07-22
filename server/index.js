import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import workerRoutes from './routes/workers.js';
import hireRoutes from './routes/hire.js';
import reviewRoutes from './routes/reviews.js';
import recommendRoutes from './routes/recommend.js';
import adminRoutes from './routes/admin.js';
import designRoutes from './routes/design.js';

dotenv.config();

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
// In production: restrict to the deployed frontend URL (set FRONTEND_URL env var)
// In development: allow all localhost origins
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      process.env.FRONTEND_URL,
      // Render preview URLs follow this pattern — keep for staging convenience
      /https:\/\/renovai-frontend.*\.onrender\.com$/
    ].filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Render health checks)
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/hire', hireRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/recommend', recommendRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/design', designRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// MongoDB connect
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/renovai';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected:', MONGO_URI);
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`🚀 Renov-AI server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

export default app;
