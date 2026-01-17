// routes/whatsapp.js

const express = require('express');
const router = express.Router();
const client = require('../config/twilioConfig');

// Endpoint to handle incoming WhatsApp messages (for verification)
router.post('/verify', (req, res) => {
  const { body } = req;
  const userPhone = body.From;  // User's phone number from the WhatsApp message

  // Send verification message to user
  client.messages.create({
    body: 'Thank you for registering! Please reply with your number to receive the app download link.',
    from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER, // Your Twilio WhatsApp number
    to: 'whatsapp:' + userPhone
  })
  .then(message => {
    console.log('Message sent:', message.sid);
    res.send('<Response><Message>Verification in progress...</Message></Response>');
  })
  .catch(error => {
    console.log('Error sending message:', error);
    res.status(500).send('Error occurred while sending verification message.');
  });
});

// Endpoint to send app download link after verification
router.post('/send-link', (req, res) => {
  const { body } = req;
  const userPhone = body.From;  // User's phone number from the WhatsApp message

  // Send download link message to user
  const downloadLink = 'https://financio-mitra.web.app';  // Replace with your actual download link

  client.messages.create({
    body: `Thank you for verifying! You can download the app here: ${downloadLink}`,
    from: 'whatsapp:+14155238886',
    to: userPhone
  })
  .then(message => {
    console.log('Download link sent:', message.sid);
    res.send('<Response><Message>Download link sent successfully.</Message></Response>');
  })
  .catch(error => {
    console.log('Error sending download link:', error);
    res.status(500).send('Error occurred while sending download link.');
  });
});

module.exports = router;
