const express = require('express');
const router = express.Router();
const { getPackingListByTrip, updatePackingList } = require('../controllers/packingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:tripId', protect, getPackingListByTrip);
router.put('/:tripId', protect, updatePackingList);

module.exports = router;
