const mongoose = require('mongoose');

const emergencyInfoSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  contacts: [
    {
      name: String,
      relation: String,
      phone: String
    }
  ],
  hospitals: [
    {
      name: String,
      address: String,
      phone: String
    }
  ],
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyInfo', emergencyInfoSchema);
