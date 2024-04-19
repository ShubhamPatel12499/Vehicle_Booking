const express=require("express")
const {userModel}=require("../models/User.model")
const userRouter = express.Router()
const jwt= require("jsonwebtoken")
const bcrypt =require('bcrypt')
require("dotenv").config();

//For Register User
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try{
        bcrypt.hash(password,5,async(err,secure_password)=>{
            if(err){
                console.log(err)
            }
            else{
                const user=new userModel({name,email,gender,password:secure_password})
                await user.save()
                res.send("Registered")
            }
        });
    }
    catch(err){
        res.send("Error in registering the user")
    }
})

//For Login User
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            const hashed_password = user[0].password
            bcrypt.compare(password, hashed_password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'shubham123');
                    res.send({ "msg": "Login Successful", "token": token })
                } else {
                    res.send("Wrong Credentials!")
                }
            });
        } else {
            res.send("Wrong Credentials!")
        }
    } catch (err) {
        res.send("Something went wrong")
        console.log(err)
    }
})

module.exports={
    userRouter
}