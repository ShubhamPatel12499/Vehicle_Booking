const express = require("express");
const { Booking } = require("../models/Booking.model");
const bookingRouter = express.Router();
const { v4: uuidv4 } = require('uuid'); 
const { Op } = require('sequelize');

//For Add Booking
bookingRouter.post("/addBooking", async (req, res) => {
    const { startDate, endDate, firstName, lastName, numberOfWheels, vehicleType, specificModel } = req.body;
    try {
        // Generate unique userId and vehicleId
        const userId = uuidv4(); 
        const vehicleId = uuidv4(); 

        // Check for overlapping bookings
        const existingBooking = await Booking.findOne({
            where: {
                vehicleType,
                specificModel,
                [Op.or]: [
                    { startDate: { [Op.lt]: endDate }, endDate: { [Op.gt]: startDate } },
                    { startDate: { [Op.lt]: startDate }, endDate: { [Op.gt]: startDate } }
                ]
            }
        });
        if (existingBooking) {
            return res.status(400).send("Oops! This vehicle is already booked for the specified date range. Please choose another one.");
        }

        // Create new booking
        await Booking.create({ 
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
        res.status(201).send("Booking created successfully");

    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).send("Error creating booking");
    }
});

// For fetching all bookings
bookingRouter.get("/allBookings", async (req, res) => {
    try {
      const bookings = await Booking.findAll();
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).send("Error fetching bookings");
    }
  });

// For Delete all bookings
bookingRouter.delete("/deleteAllBookings", async (req, res) => {
    try {
        await Booking.destroy({ truncate: true }); 
        res.status(200).send("All bookings deleted successfully");
    } catch (error) {
        console.error("Error deleting bookings:", error);
        res.status(500).send("Error deleting bookings");
    }
});

// For Delete a specific booking
bookingRouter.delete("/deleteBooking/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBooking = await Booking.destroy({ where: { id } });
      if (deletedBooking === 1) {
        res.status(200).send("Booking deleted successfully");
      } else {
        res.status(404).send("Booking not found");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).send("Error deleting booking");
    }
  });

module.exports = {
    bookingRouter
};