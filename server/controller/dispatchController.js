const Dispatch = require('../model/Dispatch')
const Station = require('../model/Station')

const axios = require('axios');

// Get all dispatch
exports.getDispatches = async (req, res) => {
    try {
        const dispatches = await Dispatch.find();
        if (dispatches && dispatches.length > 0) {
            const count = dispatches.length;
            res.status(200).json({ message: "data was successfully fetched.", count, dispatches });
        } else {
            res.send('No dispatches are founded');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a dispatch by ID - ID would be get by click component in the client
exports.getDispatchById = async (req, res) => {
    try {
        const dispatch = await Dispatch.findById(req.params.id);
        if (!dispatch) {
            return res.status(404).json({ message: 'A dispatch is not found' });
        }
        res.status(200).json({ dispatch, message: "The dispatch is exists." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// geocoding middleware
exports.geocodeAddress = async (req, res) => {
    try {
        const address = req.body.address
        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MABBOX_APIKEY}`

        const response = await axios.get(apiUrl);

        const simplifiedFeatures = response.data.features.map(feature => ({
            id: feature.id,
            type: feature.type,
            place_name: feature.place_name,
            center: feature.center
        }));

        res.json({ message: "Geocoding is successful!.", simplifiedFeatures })

    } catch (err) {
        console.error('Geocoding error:', error.message);
        throw error;
    }
}

// Add a dispatch
exports.addDispatch = async (req, res) => {
    const dispatch = new Dispatch({
        callId: req.body.callId,
        dispatchType: req.body.dispatchType,
        dispatchAddress: req.body.dispatchAddress, 
        dispatchLatitude: req.body.dispatchLatitude | undefined, 
        dispatchLongitude: req.body.dispatchLongitude | undefined, 
        dispatchFleets: req.body.dispatchFleets,
        dispatchStatus: req.body.dispatchStatus, 
        dispatchEndTime: undefined
    });

    try {
        await dispatch.save();
        res.status(200).json({ message: "The new dispatch is successfully added.", dispatch});
    } catch (err) {
        res.status(400).json({ error: err.message});
        console.log(err)
    }
}

// Update a dispatch information
exports.updateDispatchById = async (req, res) => {
    try {
        const dispatch = await Dispatch.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!dispatch) {
            return res.status(400).json({ message: "Dispatch not found" });
        } else {
            const updatedDispatch = await Dispatch.findOne({ _id:req.params.id });
            res.status(200).json({ message: "The dispatch information was successfully updated.", updatedDispatch }); 
        }
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  };

// Push a new vehicle into dispatch
exports.addVehiclesToDispatchById = async (req, res) => {
    try {
        const dispatch = await Dispatch.updateOne(
            { _id: req.params.id}, 
            { $push: { dispatchFleets: { $each: req.body.dispatchFleets } } }, 
            { new: true }
        );
        if (!dispatch) {
            return res.status(400).json({ message: "Dispatch not found" });
        } else {
            const updatedDispatch = await Dispatch.findOne({ _id: req.params.id });
            res.status(200).json({ message: "The dispatch information was successfully updated.", updatedDispatch })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// delete vehicles from dispatch
exports.deleteVehiclesToDispatchById = async (req, res) => {
    try {
        const dispatch = await Dispatch.updateOne(
            { _id: req.params.id },
            { $pullAll: { dispatchFleets: req.body.dispatchFleets  } },
            { new: true }
        );
        if (!dispatch) {
            return res.status(400).json({ message: "Dispatch not found" });
        } else {
            const updatedDispatch = await Dispatch.findById(req.params.id);
            res.status(200).json({ message: "The dispatch information was successfully deleted.", updatedDispatch });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// DELETE a dispatch by ID
exports.deleteDispatchById = async (req, res) => {
    try {
        const dispatch = await Dispatch.findByIdAndDelete({ _id:req.params.id });
        if (!dispatch) {
            return res.status(400).json({ message: 'Dispatch not found' });
        } else {
            res.status(200).json({ message: "This dispatch was successfully deleted.", dispatch }); // Redirect to all books list
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
