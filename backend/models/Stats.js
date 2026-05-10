const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  tripsCompleted: { type: Number, default: 0 },
  countriesVisited: { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);
