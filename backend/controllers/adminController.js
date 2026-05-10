const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const Trip = require('../models/Trip');

// @desc    Get platform analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin (Simplified to Private for now)
const getPlatformAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalTrips = await Trip.countDocuments();
  
  res.json({
    totalUsers,
    totalTrips,
    revenue: 0, // Mocked
    activeUsers: Math.floor(totalUsers * 0.4)
  });
});

module.exports = {
  getPlatformAnalytics,
};
