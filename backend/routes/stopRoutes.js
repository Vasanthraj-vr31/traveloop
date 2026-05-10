const express = require('express');
const router = express.Router();
const { addStop, getStopsByTrip, updateStop, deleteStop } = require('../controllers/stopController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addStop);
router.get('/:tripId', protect, getStopsByTrip);
router.route('/:id')
  .put(protect, updateStop)
  .delete(protect, deleteStop);

module.exports = router;
