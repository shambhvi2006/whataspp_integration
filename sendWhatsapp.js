const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async (userPhone) => {
  try {
    const message = await client.messages.create({
      body: 'Thank you for registering! You can download the app here: <YOUR_DOWNLOAD_LINK>',
      from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,  // Your Twilio WhatsApp number
      to: 'whatsapp:' + userPhone,  // Recipient's phone number
    });
    console.log('Message sent:', message.sid);
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

sendMessage('+917042890073');  // Replace with dynamic number if needed
