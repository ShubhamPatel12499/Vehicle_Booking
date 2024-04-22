const express = require("express");
const {sequelize} = require("./config/db"); 
const { bookingRouter } = require("./routes/Booking.route");
const { vehicleRouter } = require("./routes/Vehicle.route");
const { seedData } = require("./seed");
const cors = require('cors');

const app = express();
require("dotenv").config();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/booking", bookingRouter);
app.use("/vehicle", vehicleRouter);

//Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Vehicle Booking");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

const PORT = process.env.PORT || 8080;

// Sync Sequelize models with the database
sequelize.sync({ force: false }) 
  .then(async () => {
    console.log("Connected to DB");
    await seedData();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Not connected to DB");
    console.error(err);
  });


