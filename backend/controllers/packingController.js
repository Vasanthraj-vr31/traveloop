const asyncHandler = require('../middleware/asyncHandler');
const PackingList = require('../models/PackingList');

// @desc    Get packing list for a trip
// @route   GET /api/packing/:tripId
// @access  Private
const getPackingListByTrip = asyncHandler(async (req, res) => {
  let list = await PackingList.findOne({ tripId: req.params.tripId });
  
  if (!list) {
    // Return default items if no list exists
    const defaultItems = [
      { name: 'Passport', category: 'Essentials', isPacked: false },
      { name: 'Charger', category: 'Electronics', isPacked: false },
      { name: 'Toothbrush', category: 'Toiletries', isPacked: false },
    ];
    list = await PackingList.create({ tripId: req.params.tripId, items: defaultItems });
  }

  res.json(list);
});

// @desc    Update packing list (add/toggle/remove items)
// @route   PUT /api/packing/:tripId
// @access  Private
const updatePackingList = asyncHandler(async (req, res) => {
  const list = await PackingList.findOne({ tripId: req.params.tripId });

  if (list) {
    list.items = req.body.items || list.items;
    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error('Packing list not found');
  }
});

module.exports = {
  getPackingListByTrip,
  updatePackingList,
};
