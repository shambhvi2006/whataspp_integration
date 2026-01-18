const express = require('express');
const router = express.Router();
const client = require('../config/twilioConfig');

// Step 1: Ask the user if they want to learn via WhatsApp or App
router.post('/start', (req, res) => {
  const { body } = req;
  const userPhone = body.From;

  client.messages.create({
    body: 'Welcome to AI Financial Literacy! Do you want to learn via WhatsApp or the App? Reply with "WhatsApp" or "App".',
    from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
    to: userPhone
  })
  .then(message => {
    console.log('Message sent:', message.sid);
    res.send('<Response><Message>Message sent successfully.</Message></Response>');
  })
  .catch(error => {
    console.log('Error sending message:', error);
    res.status(500).send('Error occurred while sending message.');
  });
});

// Step 2: Handle WhatsApp response (user chooses WhatsApp)
router.post('/whatsapp', (req, res) => {
  const { body } = req;
  const userPhone = body.From;

  // Send 8-second video on Compound Interest
  const videoUrl = 'https://dl.dropboxusercontent.com/scl/fi/0v545xgxx005ufc37rjvc/trial.mp4?rlkey=mds35vzfhed4t3hg25elkccbg&st=wcjsuqpf&dl=1';  // Replace with actual video URL

  client.messages.create({
    body: 'Here is your 8-second video on Compound Interest!',
    from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
    to: userPhone,
    mediaUrl: [videoUrl]  // URL of the video
  })
  .then(message => {
    console.log('Video sent:', message.sid);

    // Send question after the video
    client.messages.create({
      body: 'What is Compound Interest?\nA) Interest on interest\nB) Interest on the principal amount\nC) Both A and B',
      from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
      to: userPhone
    })
    .then(message => {
      console.log('Question sent:', message.sid);
      res.send('<Response><Message>Question sent.</Message></Response>');
    })
    .catch(error => {
      console.log('Error sending question:', error);
      res.status(500).send('Error occurred while sending the question.');
    });
  })
  .catch(error => {
    console.log('Error sending video:', error);
    res.status(500).send('Error occurred while sending the video.');
  });
});

// Step 3: Handle response for App option
router.post('/app', (req, res) => {
  const { body } = req;
  const userPhone = body.From;

  // Send download link for the app
  const downloadLink = 'https://financio-mitra.web.app';  // Replace with your actual download link

  client.messages.create({
    body: `Thank you for choosing the App! You can download it here: ${downloadLink}`,
    from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
    to: userPhone
  })
  .then(message => {
    console.log('App download link sent:', message.sid);
    res.send('<Response><Message>App download link sent.</Message></Response>');
  })
  .catch(error => {
    console.log('Error sending app download link:', error);
    res.status(500).send('Error occurred while sending download link.');
  });
});

// Step 4: Handle the user’s answer to the question
router.post('/answer', (req, res) => {
  const { body } = req;
  const userPhone = body.From;
  const userAnswer = body.Body.trim(); // Get the user's response

  // Check the answer (assuming "C" is the correct answer)
  if (userAnswer === 'C' || userAnswer === 'c') {
    // Correct answer
    client.messages.create({
      body: 'Correct! Compound Interest is both interest on the principal and interest on the accumulated interest.',
      from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
      to: userPhone
    })
    .then(message => {
      console.log('Correct answer message sent:', message.sid);
      const downloadLink = 'https://financio-mitra.web.app';  // Replace with actual download link
      client.messages.create({
        body: `Great job! You can continue learning on the app. Download it here: ${downloadLink}`,
        from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
        to: userPhone
      })
      .then(message => {
        console.log('Download link sent:', message.sid);
        res.send('<Response><Message>Thank you for your response!</Message></Response>');
      })
      .catch(error => {
        console.log('Error sending download link:', error);
        res.status(500).send('Error occurred while sending download link.');
      });
    })
    .catch(error => {
      console.log('Error sending correct answer message:', error);
      res.status(500).send('Error occurred while sending correct answer.');
    });
  } else {
    // Incorrect answer
    client.messages.create({
      body: 'Oops! That’s incorrect. The right answer is C: Both A and B (Interest on interest and principal). Try again!',
      from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
      to: userPhone
    })
    .then(message => {
      console.log('Incorrect answer message sent:', message.sid);
      res.send('<Response><Message>Incorrect answer, try again!</Message></Response>');
    })
    .catch(error => {
      console.log('Error sending incorrect answer message:', error);
      res.status(500).send('Error occurred while sending incorrect answer.');
    });
  }
});

module.exports = router;
