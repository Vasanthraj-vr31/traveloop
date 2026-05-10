const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  totalBudget: { type: Number, default: 0 },
  transportCost: { type: Number, default: 0 },
  stayCost: { type: Number, default: 0 },
  foodCost: { type: Number, default: 0 },
  activityCost: { type: Number, default: 0 },
  dailyAverage: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
