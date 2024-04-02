const Fleet = require('../model/Fleet')

// Get all fleets
exports.getFleets = async (req, res) => {
    try {
        const fleets = await Fleet.find();
        if (fleets && fleets.length > 0) {
            res.status(200).json(fleets);
        } else {
            res.send('No fleets are founded');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a fleet by ID - ID would be get by click component in the client
exports.getFleetById = async (req, res) => {
    try {
        const fleet = await Fleet.findById(req.params.id);
        if (!fleet) {
            return res.status(404).json({ message: 'A fleet is not found' });
        }
        res.status(200).json({ fleet, message: "The fleet is exists." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a fleet
exports.addFleet = async (req, res) => {
    const fleet = new Fleet({
        fleetId: req.body.fleetId,
        fleetType: req.body.fleetType,
        stationId: req.body.stationId
    });

    try {
        await fleet.save();
        res.status(200).json({ fleet, message: "The new fleet is successfully added." });
    } catch (err) {
        res.status(400).json({ error: err.message});
        console.log(err)
    }
}

// Update a fleet information
exports.updateFleetById = async (req, res) => {
    try {
        const fleet = await Fleet.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!fleet) {
            return res.status(400).json({ message: "Fleet not found" });
        } else {
            const updatedFleet = await Fleet.findOne({ _id:req.params.id });
            res.status(200).json({ updatedFleet, message: "The fleet information was successfully updated."}); // Redirect to book detail page  
        }
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  };

// DELETE a fleet by ID
exports.deleteFleetById = async (req, res) => {
    try {
        const fleet = await Fleet.findByIdAndDelete({ _id:req.params.id });
        if (!fleet) {
            return res.status(400).json({ message: 'Fleet not found' });
        } else {
            res.status(200).json({ fleet, message: "This fleet was successfully deleted." }); // Redirect to all books list
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all active fleets
exports.getActiveFleets = async (req, res) => {
    try {
        const activeFleets = await Fleet.find({ fleetStatus: 'active' });
        const count = activeFleets.length;
        if (activeFleets && activeFleets.length > 0) {
            res.status(200).json({ message: "data was succefully fetched.", count, activeFleets });
        } else {
            res.send('No active fleets are found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all fleets that are not active
exports.getAvailableFleets = async (req, res) => {
    try {
        const availableFleets = await Fleet.find({ fleetStatus: { $ne: 'active' } });
        const count = availableFleets.length;
        if (availableFleets && availableFleets.length > 0) {
            res.status(200).json({ message: "Data was successfully fetched.", count, availableFleets });
        } else {
            res.send('No fleets with status other than active are found');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
