const express = require('express');
const router = express.Router();
const {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  inviteCollaborator,
  getTripCollaborators,
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTrip)
  .get(protect, getMyTrips);

router.route('/:id')
  .get(protect, getTripById)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

router.post('/:id/invite', protect, inviteCollaborator);
router.get('/:id/collaborators', protect, getTripCollaborators);

module.exports = router;
