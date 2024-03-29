const express = require('express');
const router = express.Router();
const dispatchController = require('../controller/dispatchController');
const authentication = require('../controller/authentication')

router 
    .post('/geocode', dispatchController.geocodeAddress)
    .post('/dispatches', dispatchController.addDispatch)
    .get('/dispatches', dispatchController.getDispatches)
    .get('/dispatches/:id', dispatchController.getDispatchById)
    .put('/dispatches/:id', dispatchController.updateDispatchById)
    .delete('/dispatches/:id', dispatchController.deleteDispatchById)
    .post('/dispatches/vehicles/:id', dispatchController.addVehiclesToDispatchById)
    .delete('/dispatches/vehicles/:id', dispatchController.deleteVehiclesToDispatchById)
    

module.exports = router;
