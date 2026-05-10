const asyncHandler = require('../middleware/asyncHandler');
const Activity = require('../models/Activity');

// @desc    Add activity to stop/trip
// @route   POST /api/activities
// @access  Private
const addActivity = asyncHandler(async (req, res) => {
  const { tripId, stopId, title, category, cost, duration, date, notes } = req.body;

  const activity = await Activity.create({
    tripId,
    stopId,
    title,
    category,
    cost,
    duration,
    date,
    notes,
  });

  res.status(201).json(activity);
});

// @desc    Get activities for a trip
// @route   GET /api/activities/:tripId
// @access  Private
const getActivitiesByTrip = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ tripId: req.params.tripId }).sort('date');
  res.json(activities);
});

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (activity) {
    activity.title = req.body.title || activity.title;
    activity.category = req.body.category || activity.category;
    activity.cost = req.body.cost !== undefined ? req.body.cost : activity.cost;
    activity.duration = req.body.duration || activity.duration;
    activity.date = req.body.date || activity.date;
    activity.notes = req.body.notes || activity.notes;
    activity.stopId = req.body.stopId || activity.stopId;

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } else {
    res.status(404);
    throw new Error('Activity not found');
  }
});

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (activity) {
    await activity.deleteOne();
    res.json({ message: 'Activity removed' });
  } else {
    res.status(404);
    throw new Error('Activity not found');
  }
});

module.exports = {
  addActivity,
  getActivitiesByTrip,
  updateActivity,
  deleteActivity,
};
