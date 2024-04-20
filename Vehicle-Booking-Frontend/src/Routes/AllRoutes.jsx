import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import VehiclesPage from "../Pages/VehiclesPage";

export const AllRoutes = () => {

  return (
    <Routes>
      <Route path="/allVehicles" element={<VehiclesPage />} />
      <Route path="/" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} /> 
    </Routes>
  );
};