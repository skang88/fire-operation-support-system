const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
    fleetId: {
        type: String, 
        unique: true, 
        required: true
    }, 
    fleetType: {
        type: String, 
        required: true, 
        enum: ['Ladder', 'Engine', 'Ambulance'] 
    },
    stationId:{
        type: Number, 
        required:true,
        ref: 'Station',  
    }
});

const Fleet = mongoose.model('Fleet', fleetSchema);

module.exports = Fleet;