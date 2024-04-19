import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleCard from '../Components/VehicleCard';
import BookingForm from './BookingForm';
import "../Styles/VehiclesPage.css";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

// Fetch vehicles
useEffect(() => {
  axios.get('http://localhost:8080/vehicle/getVehicles')
    .then(response => {
      setVehicles(response.data);
    })
    .catch(error => {
      console.error('Error fetching vehicles:', error);
    });
}, []);


const handleBookVehicle = () => {
  setShowBookingForm(true);
};

return (
    <div>
     <div className="button-container">
        <button className="book-vehicle-button" onClick={handleBookVehicle}>Book Vehicle</button>
     </div>
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

