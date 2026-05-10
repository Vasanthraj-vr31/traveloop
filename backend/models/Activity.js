const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  stopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  cost: { type: Number, default: 0 },
  duration: { type: String },
  date: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
