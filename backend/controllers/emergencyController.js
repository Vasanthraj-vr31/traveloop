const asyncHandler = require('../middleware/asyncHandler');
const EmergencyInfo = require('../models/EmergencyInfo');

// @desc    Get emergency info for a trip
// @route   GET /api/emergency/:tripId
// @access  Private
const getEmergencyByTrip = asyncHandler(async (req, res) => {
  let info = await EmergencyInfo.findOne({ tripId: req.params.tripId });

  if (!info) {
    info = await EmergencyInfo.create({ 
      tripId: req.params.tripId,
      contacts: [],
      hospitals: [],
      notes: 'No safety notes yet.'
    });
  }

  res.json(info);
});

// @desc    Update emergency info
// @route   PUT /api/emergency/:tripId
// @access  Private
const updateEmergency = asyncHandler(async (req, res) => {
  let info = await EmergencyInfo.findOne({ tripId: req.params.tripId });

  if (info) {
    info.contacts = req.body.contacts || info.contacts;
    info.hospitals = req.body.hospitals || info.hospitals;
    info.notes = req.body.notes || info.notes;

    const updatedInfo = await info.save();
    res.json(updatedInfo);
  } else {
    res.status(404);
    throw new Error('Emergency info not found');
  }
});

module.exports = {
  getEmergencyByTrip,
  updateEmergency,
};
