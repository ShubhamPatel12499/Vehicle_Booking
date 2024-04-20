import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from '../Components/BookingCard'; 
import { useNavigate } from 'react-router-dom';
import "../Styles/BookingsPage.css";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Fetch bookings data 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/booking/allBookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleVehicles = () => {
    navigate("/allVehicles");
  };

  return (
    <div className="bookings-container">
      <div className="button-container">
        <button className="book-vehicle-button" onClick={handleVehicles}>All Vehicles</button>
      </div>
      <h1>Booked Vehicles</h1>
      <div className="booking-cards-container">
        {bookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
