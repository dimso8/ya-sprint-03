const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Telemetry = sequelize.define('Telemetry', {
  device_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSON,
    allowNulls: false,
  },
});

module.exports = Telemetry;