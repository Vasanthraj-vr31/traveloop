const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  order: { type: Number, default: 0 },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Stop', stopSchema);
