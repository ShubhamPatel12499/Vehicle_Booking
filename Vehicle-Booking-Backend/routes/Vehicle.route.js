const express = require("express");
const { vehicleModel } = require("../models/Vehicle.model");
const vehicleRouter = express.Router();

//For Fetch vehicles with type
vehicleRouter.get("/getVehicletypes", async (req, res) => {
    try {
        const types = await vehicleModel.distinct('type');
        res.status(200).json(types);
    } catch (err) {
        console.error('Error fetching vehicle types:', err);
        res.status(500).send("Error fetching vehicle types");
    }
});

//For Fetch all vehicles with type, model, and numberOfWheels
vehicleRouter.get("/getVehicles", async (req, res) => {
    try {
        const vehicles = await vehicleModel.find({}, 'type model wheels'); 
        res.status(200).json(vehicles);
    } catch (err) {
        console.error('Error fetching vehicles:', err);
        res.status(500).send("Error fetching vehicles");
    }
});

//For Fetch vehicles with model
vehicleRouter.get("/models/:type", async (req, res) => {
    const { type } = req.params;
    try {
        const models = await vehicleModel.find({ type });
        res.status(200).json(models);
    } catch (err) {
        console.error('Error fetching vehicle models:', err);
        res.status(500).send("Error fetching vehicle models");
    }
});

module.exports = {
    vehicleRouter
};
