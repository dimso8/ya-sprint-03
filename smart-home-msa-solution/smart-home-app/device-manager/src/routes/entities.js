const express = require('express');
const devicesController = require('../controllers/devicesController');
const telemetryController = require('../controllers/telemetryController');
const router = express.Router();

// Device
router.get('/devices', devicesController.getDevices);
router.get('/device/:id', devicesController.getDevice);
router.post('/devices', devicesController.createDevice);
router.delete('/device/:id', devicesController.deleteDevice);
router.post('/device/:id/command', devicesController.sendDeviceCommand);

// Heating System
router.get('/heating/:id', devicesController.getHeatingSytem);
router.put('/heating/:id', devicesController.updateHeatingSytem);

// Telemetry
router.post('/telemetry', telemetryController.createTelemetry);

module.exports = router;