const express = require('express');
const router = express.Router();
const stationController = require('../controller/stationController');

router 
    .get('/stations', stationController.getStations)

module.exports = router;
