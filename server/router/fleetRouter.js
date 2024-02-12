const express = require('express');
const router = express.Router();
const fleetController = require('../controller/fleetController');

router 
    .get('/fleets', fleetController.getFleets)
    .post('/fleets', fleetController.addFleet)
    .get('/fleets/:id', fleetController.getFleetById)
    .put('/fleets/:id', fleetController.updateFleetById)
    .delete('/fleets/:id', fleetController.deleteFleetById)

module.exports = router;
