const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  destination: { type: String },
  emoji: { type: String, default: '🌿' },
  startDate: { type: Date },
  endDate: { type: Date },
  budget: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  coverImage: { type: String, default: '' },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublic: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
