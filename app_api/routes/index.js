const express = require('express');
const router = express.Router();

// Import controllers to route
const tripsController = require('../controllers/trips');

// define route for trips endpoint
router 
    .route('/trips')
    .get(tripsController.tripsList);

// GET method routes TripsFindByCode
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;