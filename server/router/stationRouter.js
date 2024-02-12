const express = require('express');
const router = express.Router();
const stationController = require('../controller/stationController');

router 
    .get('/stations', stationController.getStations)
    .post('/stations', stationController.addStation)
    .get('/stations/:id', stationController.getStationById)
    .put('/stations/:id', stationController.updateStationyId)
    .delete('/stations/:id', stationController.deleteStationById)

module.exports = router;
