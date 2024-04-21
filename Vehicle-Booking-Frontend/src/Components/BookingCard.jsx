import React from 'react';
import axios from 'axios';
import "../Styles/BookingCard.css";

const BookingCard = ({ booking, onDelete }) => {
  const { firstName, lastName, startDate, endDate, vehicleType, specificModel } = booking;

  //For delete booked data
  const handleDelete = async () => {
    try {
      await axios.delete(`https://vehicle-booking-backend-yp4t.onrender.com/booking/deleteBooking/${booking.id}`);
      onDelete(booking.id); 
      alert("Booking Deleted Succesfully!")
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="booking-card">
      <h3>Name: {`${firstName} ${lastName}`}</h3>
      <p><strong>Vehicle Type:</strong> {vehicleType}</p>
      <p><strong>Model:</strong> {specificModel}</p>
      <p><strong>Start Date:</strong> {startDate}</p>
      <p><strong>End Date:</strong> {endDate}</p>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BookingCard;