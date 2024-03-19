const Location = require('../model/Location')

// Add a Location
exports.addLocationById = async (req, res) => {
    const location = new Location({
        fleetId: req.params.id,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    try {
        await location.save();
        res.status(200).json({ location, message: "The current location is successfully added." });
    } catch (err) {
        res.status(400).json({ error: err.message});
        console.log(err)
    }
};

exports.getLocationById = async (req, res) => {
    try {
        const locations = await Location.find({ fleetId: req.params.id });
        res.status(200).json({ locations, message: "The current location is successfully founded." });

    } catch (err) {
        res.status(400).json({ error: err.message});
        console.log(err)
    }
};