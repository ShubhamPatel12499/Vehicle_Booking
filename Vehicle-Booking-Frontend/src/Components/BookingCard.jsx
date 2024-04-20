import React from 'react';

const BookingCard = ({ booking }) => {
  const { firstName, lastName, startDate, endDate, vehicleType, specificModel } = booking;

  return (
    <div className="booking-card">
      <h3>Name: {`${firstName} ${lastName}`}</h3>
      <p><strong>Vehicle Type:</strong> {vehicleType}</p>
      <p><strong>Model:</strong> {specificModel}</p>
      <p><strong>Start Date:</strong> {startDate}</p>
      <p><strong>End Date:</strong> {endDate}</p>
    </div>
  );
};

export default BookingCard;