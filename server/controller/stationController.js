const Station = require('../model/Station')

exports.getStations = async (req, res) => {
    try {
        const stations = await Station.find();
        if (stations && stations.length > 0) {
            res.status(200).json(stations);
        } else {
            res.send('No stations are added');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

