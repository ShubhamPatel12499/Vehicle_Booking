const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_Connection_URL)

module.exports = {
    sequelize
};
