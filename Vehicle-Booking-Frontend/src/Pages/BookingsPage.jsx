import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from '../Components/BookingCard'; 
import { useNavigate } from 'react-router-dom';
import "../Styles/BookingsPage.css";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // Fetch bookings data 
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://vehicle-booking-backend-yp4t.onrender.com/booking/allBookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchBookings();
  }, []);

  const handleVehicles = () => {
    navigate("/allVehicles");
  };

  //For Filter deleted bookings 
  const handleDelete = async (deletedBookingId) => {
    setBookings(prevBookings => prevBookings.filter(booking => booking.id !== deletedBookingId));
  };

  return (
    <div className="bookings-container">
      <div className="button-container">
        <button className="book-vehicle-button" onClick={handleVehicles}>All Vehicles</button>
      </div>
      <h1>Booked Vehicles</h1>
      {loading && ( 
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div>Loading...</div>
        </div>
      )}
      <div className="booking-cards-container">
        {bookings.map((booking, index) => (
          <BookingCard key={index} booking={booking} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
