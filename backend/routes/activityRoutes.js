const express = require('express');
const router = express.Router();
const { addActivity, getActivitiesByTrip, updateActivity, deleteActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addActivity);
router.get('/:tripId', protect, getActivitiesByTrip);
router.route('/:id')
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

module.exports = router;
