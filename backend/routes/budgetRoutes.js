const express = require('express');
const router = express.Router();
const { getBudgetByTrip, updateBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:tripId', protect, getBudgetByTrip);
router.put('/:tripId', protect, updateBudget);

module.exports = router;
