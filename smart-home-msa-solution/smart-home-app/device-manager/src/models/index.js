const sequelize = require('../config/database');
const Device = require('./device');
const Telemetry = require('./telemetry');

// Sync database models
sequelize.sync({ alter: true });

module.exports = { Device, Telemetry };