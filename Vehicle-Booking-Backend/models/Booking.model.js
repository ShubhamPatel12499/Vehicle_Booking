const { DataTypes } = require('sequelize'); 
const {sequelize} = require('../config/db');

const Booking = sequelize.define('Booking', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vehicleId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfWheels: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specificModel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = {Booking};
