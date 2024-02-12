const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
    fleetId: {
        type: String, 
        required: true
    }, 
    fleetType: {
        type: String, 
        required: true, 
        enum: ['Ladder', 'Engine', 'Ambulance'] 
    },
    stationId:{
        type: String, 
        required:true
    }
});

const Fleet = mongoose.model('Fleet', fleetSchema);

module.exports = Fleet;