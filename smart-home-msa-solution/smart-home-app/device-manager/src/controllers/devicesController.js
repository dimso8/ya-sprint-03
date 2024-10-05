const { Device } = require('../models');
const monolith = require('../services/monolithService');

const getDevices = async (req, res) => {
  const devices = await Device.findAll();
  if (devices.length > 0) {
    res.json(devices);
  } else {
    res.status(404).json({ message: 'Devices are not found' });
  }
};

const getDevice = async (req, res) => {
  const device = await Device.findByPk(req.params.id);
  if (device) {
    res.json(device);
  } else {
    res.status(404).json({ message: 'Device is not found' });
  }
};

const createDevice = async (req, res) => {
  const { device_type_id } = req.body;
  const { house_id } = req.body;
  const { serial_number } = req.body;
  const { is_on } = false;

  const device = await Device.create({ device_type_id,  house_id, serial_number, is_on });
  res.json(device);
};

const deleteDevice = async (req, res) => {
  const device = await Device.findByPk(req.params.id);
  if (device) {
    await device.destroy();
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Device is not found' });
  }
};

const sendDeviceCommand = async (req, res) => {
  const device = await Device.findByPk(req.params.id);

  if (device) {
    device.is_on = req.body.input_parameters.is_on;
    await device.save();
    res.json(device);
  } else {
    res.status(404).json({ message: 'Device is not found' });
  }
};

// monolith integration
const getHeatingSytem = async (req, res) => {
  try {
    const heatingSystem = await monolith.fetchHeatingSystem(req.params.id);
    if (heatingSystem) {
      res.status(200).json(heatingSystem);
    } else {
      res.status(404).json({ message: 'Heating system is not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Heating system is not found' });
  }
}

const updateHeatingSytem = async (req, res) => {
  try {
    const heatingSystem = await monolith.setHeatingSystem(req.params.id, req.body);
    if (heatingSystem) {
      res.status(200).json(heatingSystem);
    } else {
      res.status(404).json({ message: 'Heating system is not found' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Heating system is not found' });
  }
}

module.exports = { getDevices, getDevice, createDevice, deleteDevice, sendDeviceCommand, getHeatingSytem, updateHeatingSytem };