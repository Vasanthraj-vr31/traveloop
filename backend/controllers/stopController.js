const asyncHandler = require('../middleware/asyncHandler');
const Stop = require('../models/Stop');

// @desc    Add stop to trip
// @route   POST /api/stops
// @access  Private
const addStop = asyncHandler(async (req, res) => {
  const { tripId, cityName, country, startDate, endDate, order, coordinates } = req.body;

  const stop = await Stop.create({
    tripId,
    cityName,
    country,
    startDate,
    endDate,
    order,
    coordinates,
  });

  res.status(201).json(stop);
});

// @desc    Get stops for a trip
// @route   GET /api/stops/:tripId
// @access  Private
const getStopsByTrip = asyncHandler(async (req, res) => {
  const stops = await Stop.find({ tripId: req.params.tripId }).sort('order');
  res.json(stops);
});

// @desc    Update stop
// @route   PUT /api/stops/:id
// @access  Private
const updateStop = asyncHandler(async (req, res) => {
  const stop = await Stop.findById(req.params.id);

  if (stop) {
    stop.cityName = req.body.cityName || stop.cityName;
    stop.country = req.body.country || stop.country;
    stop.startDate = req.body.startDate || stop.startDate;
    stop.endDate = req.body.endDate || stop.endDate;
    stop.order = req.body.order !== undefined ? req.body.order : stop.order;
    stop.coordinates = req.body.coordinates || stop.coordinates;

    const updatedStop = await stop.save();
    res.json(updatedStop);
  } else {
    res.status(404);
    throw new Error('Stop not found');
  }
});

// @desc    Delete stop
// @route   DELETE /api/stops/:id
// @access  Private
const deleteStop = asyncHandler(async (req, res) => {
  const stop = await Stop.findById(req.params.id);

  if (stop) {
    await stop.deleteOne();
    res.json({ message: 'Stop removed' });
  } else {
    res.status(404);
    throw new Error('Stop not found');
  }
});

module.exports = {
  addStop,
  getStopsByTrip,
  updateStop,
  deleteStop,
};
