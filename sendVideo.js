const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

// Initialize Twilio client
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send WhatsApp message with video
const sendMessage = async () => {
  try {
    const message = await client.messages.create({
      body: 'Here’s an 8-second video on Compound Interest!',
      from: 'whatsapp:+14155238886',  // Twilio Sandbox WhatsApp number
      to: 'whatsapp:+917042890073',  // Recipient's WhatsApp number (Verified)
      mediaUrl: ['https://dl.dropboxusercontent.com/scl/fi/0v545xgxx005ufc37rjvc/trial.mp4?rlkey=mds35vzfhed4t3hg25elkccbg&st=wcjsuqpf&dl=1']  // Make sure this is a direct, accessible link
    });

    console.log('Message sent:', message.sid);
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

// Run the function
sendMessage();
