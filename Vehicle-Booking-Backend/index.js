const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/User.route")
const { bookingRouter } = require("./routes/Booking.route")
const { vehicleRouter } = require("./routes/Vehicle.route")
const { seedData } = require("./seed");
const cors = require('cors')

const app=express()
require("dotenv").config();

app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.use("/users",userRouter)
app.use("/booking",bookingRouter)
app.use("/vehicle",vehicleRouter)

app.get("/", (req, res) => {
    res.send("Welcome to the Vehicle Booking");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
        await seedData();
    } catch (err) {
        console.error("Not connected to DB");
        console.error(err);
    }
    console.log(`Server is running on port ${PORT}`);
});
