const express = require('express');
const entityRoutes = require('./routes/entities');
const sequelize = require('./config/database');

// Initialize app
const app = express();
app.use(express.json());

// Routes
app.use('/api', entityRoutes);

// Test database connection and start server
sequelize.authenticate().then(() => {
  console.log('Connected to the database!');
  app.listen(3001, () => {
    console.log('Microservice running on port 3001');
  });
}).catch((error) => {
  console.error('Unable to connect to the database:\n', error);
});