const axios = require('axios');

const fetchHeatingSystem = async (externalId) => {
  try {
    //http://localhost:8081/api/heating/7
    const response = await axios.get(`http://monolith:8081/api/heating/${externalId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching heating system:', error);
    throw error;
  }
};

const setHeatingSystem = async (externalId, settings) => {
  try {
    //http://localhost:8081/api/heating/7
    const response = await axios.put(`http://monolith:8081/api/heating/${externalId}`, settings);
    return response.data;
  } catch (error) {
    console.error('Error fetching heating system:', error);
    throw error;
  }
};

module.exports = { fetchHeatingSystem, setHeatingSystem };