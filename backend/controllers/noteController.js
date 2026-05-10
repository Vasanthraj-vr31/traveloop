const asyncHandler = require('../middleware/asyncHandler');
const Note = require('../models/Note');

// @desc    Add note
// @route   POST /api/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const { tripId, content, date } = req.body;

  const note = await Note.create({
    tripId,
    content,
    date,
  });

  res.status(201).json(note);
});

// @desc    Get notes for a trip
// @route   GET /api/notes/:tripId
// @access  Private
const getNotesByTrip = asyncHandler(async (req, res) => {
  const notes = await Note.find({ tripId: req.params.tripId }).sort('-createdAt');
  res.json(notes);
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404);
    throw new Error('Note not found');
  }
});

module.exports = {
  addNote,
  getNotesByTrip,
  deleteNote,
};
