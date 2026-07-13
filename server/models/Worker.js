import mongoose from 'mongoose';

const portfolioItemSchema = new mongoose.Schema({
  title: String,
  desc: String,
  url: String
});

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true, trim: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  skills: [{ type: String }],
  category: {
    type: String,
    enum: ['Carpenter', 'Painter', 'Electrician', 'Plumber', 'Mason', 'Interior Designer', 'Civil Contractor', 'Flooring', 'Tiling'],
    default: 'Carpenter'
  },
  experience: { type: Number, default: 0 }, // years
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  completedProjects: { type: Number, default: 0 },
  portfolio: [portfolioItemSchema],
  isAvailable: { type: Boolean, default: true },
  location: { type: String, default: '' },
  priceRange: { type: String, default: '₹500-₹1500/day' },
  isApproved: { type: Boolean, default: true },
  hireCount: { type: Number, default: 0 },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Worker', workerSchema);
