const express = require('express');
const telemetryController = require('../controllers/telemetryController');
const router = express.Router();

// Device
router.get('/telemetry-history', telemetryController.getTelemetryHistory);
router.get('/telemetry/:id', telemetryController.getTelemetry);
router.post('/telemetry', telemetryController.createTelemetry);

module.exports = router;