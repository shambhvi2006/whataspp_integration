const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const whatsappRoutes = require('./routes/whatsapp');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/whatsapp', whatsappRoutes);

// Route to serve the initial WhatsApp start message
app.post('/start', (req, res) => {
  console.log('Received message from WhatsApp:', req.body);
  res.send('<Response><Message>Welcome to Financial Literacy. Reply with "WhatsApp" or "App" to continue learning.</Message></Response>');
});

// Route to handle incoming WhatsApp messages
app.use('/whatsapp', whatsappRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
