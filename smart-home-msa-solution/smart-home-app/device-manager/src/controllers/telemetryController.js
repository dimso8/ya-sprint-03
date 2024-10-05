const { Telemetry } = require('../models');

const createTelemetry = async (req, res) => {

  const telemetry = await Telemetry.create(req.body);
  res.json(telemetry);
};

module.exports = { createTelemetry };