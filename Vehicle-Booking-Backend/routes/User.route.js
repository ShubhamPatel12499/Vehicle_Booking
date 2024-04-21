const express = require("express");
const { User } = require("../models/User.model");
const userRouter = express.Router();

// For Register User
userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        await User.create({ name, email, gender, password });
        res.send("Registered");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error in registering the user");
    }
});

// For Login User
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, password } });
        if (user) {
            res.send({ "msg": "Login Successful" });
        } else {
            res.send("Wrong Credentials!");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

module.exports = {
    userRouter
};


