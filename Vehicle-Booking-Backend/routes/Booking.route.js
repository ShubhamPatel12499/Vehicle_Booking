const express = require("express");
const { bookingModel } = require("../models/Booking.model");
const bookingRouter = express.Router();
const { v4: uuidv4 } = require('uuid'); 

//For Add Booking
bookingRouter.post("/addBooking", async (req, res) => {
    const { startDate, endDate, firstName, lastName, numberOfWheels, vehicleType, specificModel } = req.body;
    try {
        // Generate unique userId and vehicleId
        const userId = uuidv4(); 
        const vehicleId = uuidv4(); 

        // Check for overlapping bookings
        const existingBooking = await bookingModel.findOne({
            vehicleId,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
                { startDate: { $lte: startDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingBooking) {
            return res.status(400).send("Booking conflicts with existing booking");
        }

        // Create new booking
        const newBooking = new bookingModel({ 
            userId, 
            vehicleId, 
            startDate, 
            endDate, 
            firstName, 
            lastName, 
            numberOfWheels, 
            vehicleType, 
            specificModel 
        });
        await newBooking.save();
        res.status(201).send("Booking created successfully");

    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).send("Error creating booking");
    }
});

module.exports = {
    bookingRouter
};
