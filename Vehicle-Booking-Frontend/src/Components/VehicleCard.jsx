import React from 'react';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="vehicle-card">
      <h2>{vehicle.model}</h2>
      <p>Type: {vehicle.type}</p>
      <p>Model: {vehicle.model}</p>
      <p>Number of Wheels: {vehicle.wheels}</p>
    </div>
  );
};

export default VehicleCard;
