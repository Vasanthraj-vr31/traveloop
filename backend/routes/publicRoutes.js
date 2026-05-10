const express = require('express');
const router = express.Router();
const { getPublicTrip } = require('../controllers/publicController');

router.get('/trip/:id', getPublicTrip);

module.exports = router;
