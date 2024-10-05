const axios = require('axios');

const sendTelemetry = async (telemetryData) => {
  try {
    //http://localhost:8081/api/heating/7
    const response = await axios.post(`http://device-manager:3000/api/telemetry`, telemetryData);
    return response.data;
  } catch (error) {
    console.error('Error fetching heating system:', error);
    throw error;
  }
};

module.exports = { sendTelemetry };