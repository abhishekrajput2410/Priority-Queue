const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  payload: { type: mongoose.Schema.Types.Mixed, required: true },
  priority: {
    type: String,
    default: 'UNKNOWN',
    enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'],
    index: true,
  },
  priorityScore: {
    type: Number,
    default: 5,
    index: true,
  },
  status: {
    type: String,
    default: 'queued',
    enum: ['queued', 'processing', 'completed', 'failed', 'cancelled'],
    index: true,
  },
  slaDeadline: { type: Date, required: true, index: true },
  retries: { type: Number, default: 0 },
  assignedWorker: { type: String, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  aiPredicted: { type: Boolean, default: false },
  waitTimeMs: { type: Number, default: 0 },
  processedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
