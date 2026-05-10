const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String },
  date: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
