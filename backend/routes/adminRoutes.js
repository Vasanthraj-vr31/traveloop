const express = require('express');
const router = express.Router();
const { getPlatformAnalytics } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/analytics', protect, getPlatformAnalytics);

module.exports = router;
