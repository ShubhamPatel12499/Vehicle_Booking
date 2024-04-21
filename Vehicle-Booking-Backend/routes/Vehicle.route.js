const express = require("express");
const { Vehicle } = require("../models/Vehicle.model");
const vehicleRouter = express.Router();

//For Fetch all vehicle types
vehicleRouter.get("/getVehicletypes", async (req, res) => {
    try {
        const types = await Vehicle.findAll({
            attributes: ['type'],
            group: ['type']
        });
        const typeList = types.map(vehicle => vehicle.type);
        res.status(200).json(typeList);
    } catch (err) {
        console.error('Error fetching vehicle types:', err);
        res.status(500).send("Error fetching vehicle types");
    }
});

//For Fetch all vehicles with type, model, and numberOfWheels
vehicleRouter.get("/getVehicles", async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({ attributes: ['type', 'model', 'wheels'] }); 
        res.status(200).json(vehicles);
    } catch (err) {
        console.error('Error fetching vehicles:', err);
        res.status(500).send("Error fetching vehicles");
    }
});

// For Fetch vehicles with model
vehicleRouter.get("/models/:type", async (req, res) => {
    const { type } = req.params;
    try {
        const vehicles = await Vehicle.findAll({ where: { type } });
        res.status(200).json(vehicles);
    } catch (err) {
        console.error('Error fetching vehicle models:', err);
        res.status(500).send("Error fetching vehicle models");
    }
});

module.exports = {
    vehicleRouter
};

