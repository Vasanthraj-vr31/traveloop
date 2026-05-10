const express = require('express');
const router = express.Router();
const { addPhoto, getPhotosByTrip, deletePhoto } = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addPhoto);
router.get('/:tripId', protect, getPhotosByTrip);
router.delete('/:id', protect, deletePhoto);

module.exports = router;
