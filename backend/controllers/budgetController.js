const asyncHandler = require('../middleware/asyncHandler');
const Budget = require('../models/Budget');
const Activity = require('../models/Activity');

// @desc    Get budget for a trip
// @route   GET /api/budget/:tripId
// @access  Private
const getBudgetByTrip = asyncHandler(async (req, res) => {
  let budget = await Budget.findOne({ tripId: req.params.tripId });
  
  if (!budget) {
    budget = await Budget.create({ tripId: req.params.tripId });
  }

  // Recalculate activity cost from actual activities
  const activities = await Activity.find({ tripId: req.params.tripId });
  const activityTotal = activities.reduce((acc, curr) => acc + (curr.cost || 0), 0);
  
  budget.activityCost = activityTotal;
  await budget.save();

  res.json(budget);
});

// @desc    Update budget
// @route   PUT /api/budget/:tripId
// @access  Private
const updateBudget = asyncHandler(async (req, res) => {
  let budget = await Budget.findOne({ tripId: req.params.tripId });

  if (budget) {
    budget.totalBudget = req.body.totalBudget !== undefined ? req.body.totalBudget : budget.totalBudget;
    budget.transportCost = req.body.transportCost !== undefined ? req.body.transportCost : budget.transportCost;
    budget.stayCost = req.body.stayCost !== undefined ? req.body.stayCost : budget.stayCost;
    budget.foodCost = req.body.foodCost !== undefined ? req.body.foodCost : budget.foodCost;
    
    // Logic: dailyAverage = totalExpenses / days (simplified here)
    const totalExpenses = budget.transportCost + budget.stayCost + budget.foodCost + budget.activityCost;
    budget.dailyAverage = totalExpenses / 7; // Mocked to 7 days for simplicity

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } else {
    res.status(404);
    throw new Error('Budget not found');
  }
});

module.exports = {
  getBudgetByTrip,
  updateBudget,
};
