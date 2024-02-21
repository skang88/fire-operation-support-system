    const mongoose = require('mongoose');

    const dispatchSchema = new mongoose.Schema({
        callId: {
            type: String, 
            required: true
        }, 
        dispatchType: {
            type: String, 
            required: true
        },
        dispatchAddress: {
            type: String, 
            required: true
        },
        dispatchLatitude: {
            type: Number, 
            min: -90,
            max: 90
        }, 
        dispatchLongitude: {
            type: Number, 
            min: -180,
            max: 180
        },
        dispatchTime: {
            type: Date,
            default: Date.now // now default
        },
        dispatchFleets: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                unique: true, 
                ref: 'Fleet'
            }
        ],
        dispatchStatus: {
            type: String, 
            enum: ['end', 'in progress']
        },
        dispatchEndTime:{
            type: Date
        }
    });

    const Dispatch = mongoose.model('Dispatch', dispatchSchema);

    module.exports = Dispatch;