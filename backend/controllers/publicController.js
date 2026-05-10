const asyncHandler = require('../middleware/asyncHandler');
const Trip = require('../models/Trip');
const Stop = require('../models/Stop');
const Activity = require('../models/Activity');

// @desc    Get public trip details
// @route   GET /api/public/trip/:id
// @access  Public
const getPublicTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('userId', 'name profileImage');

  if (trip && trip.isPublic) {
    const stops = await Stop.find({ tripId: trip._id }).sort('order');
    const activities = await Activity.find({ tripId: trip._id }).sort('date');

    res.json({
      trip,
      stops,
      activities
    });
  } else {
    res.status(404);
    throw new Error('Trip not found or not public');
  }
});

module.exports = {
  getPublicTrip,
};
