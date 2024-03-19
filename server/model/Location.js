const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    fleetId: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    }, 
    timestamp: {
        type: Date,
        default: Date.now, 
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;