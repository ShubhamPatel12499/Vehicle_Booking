const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
    type: { type: String, required: true },
    model: { type: String, required: true },
    wheels: { type: Number, required: true }
});

const vehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = {
    vehicleModel
};
