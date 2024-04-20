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
            vehicleType,
            specificModel,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
                { startDate: { $lte: startDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingBooking) {
            return res.status(400).send("Oops This Vehicle is already booked for the specified date range, Please go for another one!");
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

// For Fetch all bookings
bookingRouter.get("/allBookings", async (req, res) => {
    try {
      const bookings = await bookingModel.find();
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).send("Error fetching bookings");
    }
  });

module.exports = {
    bookingRouter
};

