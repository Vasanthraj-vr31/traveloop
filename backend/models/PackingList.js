const mongoose = require('mongoose');

const packingListSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  items: [
    {
      name: { type: String, required: true },
      category: { type: String },
      isPacked: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('PackingList', packingListSchema);
