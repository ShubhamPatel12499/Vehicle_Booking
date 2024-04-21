import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleCard from '../Components/VehicleCard';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';
import "../Styles/VehiclesPage.css";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

// Fetch vehicles
useEffect(() => {
  setLoading(true);
  axios.get('https://vehicle-booking-backend-yp4t.onrender.com/vehicle/getVehicles')
    .then(response => {
      setVehicles(response.data);
    })
    .catch(error => {
      console.error('Error fetching vehicles:', error);
    })
    .finally(() => {
      setLoading(false); 
    });
}, []);

//For Logout: Redirect to Login page
const handleLogout = () => {
  navigate("/");
};

//Toggle Functionality
const handleBookVehicle = () => {
  setShowBookingForm(prevState => !prevState); 
};

//Redirect to Bookings page
const handleBookedVehicle = () => {
  navigate("/allBookings");
};

return (
    <div>
     <div className="button-container">
        <button className="book-vehicle-button" onClick={handleBookVehicle}>Book Vehicle</button>
        <button className="booked-vehicle-button" onClick={handleBookedVehicle}>Show Booked Vehicles</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
     </div>
     {loading && ( 
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div>Loading...</div>
        </div>
      )}
      {showBookingForm && <BookingForm />}
      <h1 style={{ marginTop: '50px' }}>Available Vehicles</h1>
      <div className="vehicle-container">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehiclesPage;

