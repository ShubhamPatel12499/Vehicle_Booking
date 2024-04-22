# Vehicle_Booking

## Introduction
Get ready to book your ride stress-free! Our app, crafted with Node.js, React, and MySQL, makes it easy to enter your info, choose your favorite vehicle, select dates, and confirm your booking smoothly. Say goodbye to hassle and hello to effortless adventures!

## Project Type
Fullstack

## Deplolyed App
- Frontend: https://662569fd6e15edf60dfb4740--coruscating-rolypoly-7f28f9.netlify.app
- Backend: https://vehicle-booking-backend-yp4t.onrender.com
- Database: https://console.aiven.io/account/a4aa6557e4d9/project/shubhampatel12499-9f8b/services/mysql-12499/databases

## Directory Structure
Vehicle-Booking-App/ 
├─ Vehicle-Booking-Backend/ 
├─ Vehicle-Booking-Frontend/

## Video Walkthrough of the project
https://drive.google.com/file/d/1wVN8WVf3oR0Eq3J46zGe4HlGSFpTAiHV/view?usp=sharing 

## Video Walkthrough of the codebase
https://drive.google.com/file/d/1OPkydn9TyaRwAzV23_Zz5lm0tetNjR-H/view?usp=sharing

## Features
- View Avaliable Vehicles
- Create Booking of Vehicle
- View all Booked Vehicle
- Delete Booked Vehicle
- Authentications
- Login, Signup & Logout
- Responsive Design

## Installation & Getting started
cd Vehicle-Booking-App cd Vehicle-Booking-Frontend npm install npm start

## Usage
You can use this app for a Vehicle Booking.

## Credentials
- Email: abc@gmail.com
- Password: 1234

## APIs Used & Endpoints
- GET /vehicle/getVehicles - Get all vehicles data
- GET /vehicle/getVehicletypes - Get type of vehicles
- GET /vehicle/models/:type - Get model of vehicles
- POST /booking/addBooking - Add Booking of vehicle
- GET /booking/allBookings - Get all booked vehicles data
- DELETE /booking/deleteAllBookings - Delete all vehicles data
- DELETE /booking/deleteBooking/:id - Delete Booked vehicle data
- POST /users/login - Login the user
- POST /users/register - Register the user


## Technology Stack
- Frontend - React.js
- Backend - Node.js
- Express.js
- DataBase - MySQL
- ORM - sequelize
