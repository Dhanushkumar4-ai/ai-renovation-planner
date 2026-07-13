import mongoose from 'mongoose';

const hireSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  userName: { type: String, default: '' },
  workerName: { type: String, default: '' },
  requirement: { type: String, default: '' },
  scheduledDate: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Hire', hireSchema);
