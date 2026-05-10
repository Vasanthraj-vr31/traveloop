const asyncHandler = require('../middleware/asyncHandler');
const Trip = require('../models/Trip');
const User = require('../models/User');

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
const createTrip = asyncHandler(async (req, res) => {
  console.log('CREATE TRIP REQUEST:', req.body);
  console.log('USER FROM REQ:', req.user?._id);
  const { title, description, destination, emoji, startDate, endDate, budget, currency, isPublic, tags } = req.body;


  const trip = await Trip.create({
    userId: req.user._id,
    title,
    description,
    destination,
    emoji,
    startDate,
    endDate,
    budget,
    currency,
    isPublic,
    tags
  });

  res.status(201).json(trip);
});

// @desc    Get all user trips
// @route   GET /api/trips
// @access  Private
const getMyTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ 
    $or: [
      { userId: req.user._id },
      { collaborators: req.user._id }
    ]
  }).sort({ createdAt: -1 });
  res.json(trips);
});

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Private
const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip) {
    res.json(trip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip) {
    trip.title = req.body.title || trip.title;
    trip.description = req.body.description || trip.description;
    trip.destination = req.body.destination || trip.destination;
    trip.emoji = req.body.emoji || trip.emoji;
    trip.startDate = req.body.startDate || trip.startDate;
    trip.endDate = req.body.endDate || trip.endDate;
    trip.budget = req.body.budget || trip.budget;
    trip.currency = req.body.currency || trip.currency;
    trip.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : trip.isPublic;
    trip.tags = req.body.tags || trip.tags;

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip) {
    await trip.deleteOne();
    res.json({ message: 'Trip removed' });
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

// @desc    Invite collaborator
// @route   POST /api/trips/:id/invite
// @access  Private
const inviteCollaborator = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  const user = await User.findOne({ email: req.body.email });

  if (!trip) {
    res.status(404);
    throw new Error('Trip not found');
  }

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (trip.collaborators.includes(user._id)) {
    res.status(400);
    throw new Error('User is already a collaborator');
  }

  trip.collaborators.push(user._id);
  await trip.save();

  res.json({ message: 'Collaborator invited successfully' });
});

// @desc    Get trip collaborators
// @route   GET /api/trips/:id/collaborators
// @access  Private
const getTripCollaborators = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('collaborators', 'name email profileImage');

  if (trip) {
    res.json(trip.collaborators);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  inviteCollaborator,
  getTripCollaborators,
};
