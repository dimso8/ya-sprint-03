const sequelize = require('../config/database');
const Telemetry = require('./telemetry');

// Sync database models
sequelize.sync({ alter: true });

module.exports = { Telemetry };