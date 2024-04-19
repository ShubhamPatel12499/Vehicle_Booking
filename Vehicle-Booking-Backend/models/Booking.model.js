const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    userId: { type: String, required: true }, 
    vehicleId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }, 
    numberOfWheels: { type: Number, required: true }, 
    vehicleType: { type: String, required: true }, 
    specificModel: { type: String, required: true }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
    bookingModel
};