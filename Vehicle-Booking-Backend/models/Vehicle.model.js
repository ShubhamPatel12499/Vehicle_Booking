const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  wheels: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = {Vehicle};