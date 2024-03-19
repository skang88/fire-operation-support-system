const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');
const authentication = require('../controller/authentication')

router 
    .post('/location/:id', locationController.addLocationById)
    .get('/location/:id', locationController.getLocationById)

module.exports = router;
