const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  device_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  house_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_on: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Device;