// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const whatsappRoutes = require('./routes/whatsapp');
require('dotenv').config();

// Middleware for parsing incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Set up WhatsApp routes
app.use('/whatsapp', whatsappRoutes);

// Root endpoint to test if server is working
app.get('/', (req, res) => {
  res.send('WhatsApp Integration Server is running!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
