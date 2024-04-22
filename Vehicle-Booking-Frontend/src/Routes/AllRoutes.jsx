import React from "react";
import { Route, Routes } from "react-router-dom";
import VehiclesPage from "../Pages/VehiclesPage";
import BookingsPage from "../Pages/BookingsPage";

export const AllRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<VehiclesPage />} />
      <Route path="/allBookings" element={<BookingsPage />} />
    </Routes>
  );
};