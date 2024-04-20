import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import VehiclesPage from "../Pages/VehiclesPage";
import BookingsPage from "../Pages/BookingsPage";

export const AllRoutes = () => {

  return (
    <Routes>
      <Route path="/allVehicles" element={<VehiclesPage />} />
      <Route path="/allBookings" element={<BookingsPage />} />
      <Route path="/" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} /> 
    </Routes>
  );
};