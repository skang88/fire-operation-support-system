const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    stationId: {
        type: Number, 
        required: true
    }, 
    stationName:{
        type: String, 
        required:true
    },
    address: {
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
    }
});

const Station = mongoose.model('Station', stationSchema);



module.exports = Station;