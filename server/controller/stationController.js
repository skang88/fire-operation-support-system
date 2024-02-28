const Station = require('../model/Station')

// Get all stations
exports.getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        if (stations && stations.length > 0) {
            const count = stations.length;
            res.status(200).json({ message: "data was successfully fetched.", stations, count });
        } else {
            res.send('No stations are added');
        }   
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a station by ID - ID would be get by click component in the client
exports.getStationById = async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).json({ message: 'A station is not found' });
        }
        res.status(200).json({ station, message: "The station is exists." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a station
exports.addStation = async (req, res) => {
    const station = new Station({
        stationId: req.body.stationId,
        stationName: req.body.stationName,
        address: req.body.address,
        latitude: req.body.latitude, 
        longitude: req.body.longitude
    });

    try {
        await station.save();
        res.status(200).json({ station, message: "The new station is successfully added." });
    } catch (err) {
        res.status(400).json({ error: err.message});
        console.log(err)
    }
}

// Update a station information
exports.updateStationyId = async (req, res) => {
    try {
        const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!station) {
            return res.status(400).json({ message: "Station not found" });
        } else {
            const updatedStation = await Station.findOne({ _id:req.params.id });
            res.status(200).json({ updatedStation, message: "The station information was successfully updated."}); // Redirect to book detail page  
        }
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  };

// DELETE a station by ID
exports.deleteStationById = async (req, res) => {
    try {
        const station = await Station.findByIdAndDelete({ _id:req.params.id });
        if (!station) {
            return res.status(400).json({ message: 'Station not found' });
        } else {
            res.status(200).json({ station, message: "This station was successfully deleted." }); // Redirect to all books list
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
