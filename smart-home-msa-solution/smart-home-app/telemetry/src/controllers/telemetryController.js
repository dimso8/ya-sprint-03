const { Telemetry } = require('../models');
const deviceManager = require('../services/deviceManagerService');

const getTelemetryHistory = async (req, res) => {
  const telemetryHistory = await Telemetry.findAll();
  if (telemetryHistory.length > 0) {
    res.json(telemetryHistory);
  } else {
    res.status(404).json({ message: 'Telemetry are not found' });
  }
};

const getTelemetry = async (req, res) => {
  const telemetry = await Telemetry.findByPk(req.params.id);
  if (telemetry) {
    res.json(telemetry);
  } else {
    res.status(404).json({ message: 'Telemetry is not found' });
  }
};

const createTelemetry = async (req, res) => {
  const telemetry = await Telemetry.create(req.body);

  try {
    const telemetryDeveiceManager = await deviceManager.sendTelemetry(req.body);
    if (telemetryDeveiceManager) {
      res.status(200).json(telemetry);
    } else {
      res.status(206).json({ message: 'Devices Manager has not get information', telemetry });
    }
  } catch (error) {
    res.status(206).json({ message: 'Devices Manager has not get information', telemetry });
  }

  res.json(telemetry);
};

module.exports = { getTelemetryHistory, getTelemetry, createTelemetry };