const asyncHandler = require('../middleware/asyncHandler');
const Photo = require('../models/Photo');

// @desc    Add photo
// @route   POST /api/photos
// @access  Private
const addPhoto = asyncHandler(async (req, res) => {
  const { tripId, imageUrl, caption, date } = req.body;

  const photo = await Photo.create({
    tripId,
    imageUrl,
    caption,
    date,
  });

  res.status(201).json(photo);
});

// @desc    Get photos for a trip
// @route   GET /api/photos/:tripId
// @access  Private
const getPhotosByTrip = asyncHandler(async (req, res) => {
  const photos = await Photo.find({ tripId: req.params.tripId }).sort('-date');
  res.json(photos);
});

// @desc    Delete photo
// @route   DELETE /api/photos/:id
// @access  Private
const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (photo) {
    await photo.deleteOne();
    res.json({ message: 'Photo removed' });
  } else {
    res.status(404);
    throw new Error('Photo not found');
  }
});

module.exports = {
  addPhoto,
  getPhotosByTrip,
  deletePhoto,
};
