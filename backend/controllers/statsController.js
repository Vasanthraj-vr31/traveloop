const asyncHandler = require('../middleware/asyncHandler');
const Stats = require('../models/Stats');
const Trip = require('../models/Trip');

// @desc    Get user stats
// @route   GET /api/stats/:userId
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
  let stats = await Stats.findOne({ userId: req.params.userId });

  if (!stats) {
    stats = await Stats.create({ userId: req.params.userId });
  }

  // Recalculate stats
  const trips = await Trip.find({ userId: req.params.userId });
  stats.tripsCompleted = trips.length; // Simplified logic
  
  // Mocking countries visited
  stats.countriesVisited = Math.floor(trips.length * 1.5);
  
  await stats.save();
  res.json(stats);
});

module.exports = {
  getUserStats,
};
