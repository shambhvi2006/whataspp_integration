const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async () => {
  try {
    const message = await client.messages.create({
      body: 'Thank you for registering! You can download the app here: https://financio-mitra.web.app',
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
      to: 'whatsapp:+919871230192', // Recipient's phone number
    });
    console.log('Message sent:', message.sid);
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

sendMessage();
