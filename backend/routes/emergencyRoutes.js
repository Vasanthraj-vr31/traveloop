const express = require('express');
const router = express.Router();
const { getEmergencyByTrip, updateEmergency } = require('../controllers/emergencyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:tripId', protect, getEmergencyByTrip);
router.put('/:tripId', protect, updateEmergency);

module.exports = router;
