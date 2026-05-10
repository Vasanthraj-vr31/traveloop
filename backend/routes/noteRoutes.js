const express = require('express');
const router = express.Router();
const { addNote, getNotesByTrip, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addNote);
router.get('/:tripId', protect, getNotesByTrip);
router.delete('/:id', protect, deleteNote);

module.exports = router;
