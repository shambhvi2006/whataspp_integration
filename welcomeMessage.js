const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWelcomeMessage = async (userPhone) => {
  try {
    const welcomeMessage = await client.messages.create({
      body: 'Hello, welcome to Mitra! How would you like to learn? Reply with "WhatsApp" or "App".',
      from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number
      to: 'whatsapp:+917042890073'  // Recipient's phone number
    });

    console.log('Welcome message sent.');
  } catch (error) {
    console.log('Error sending welcome message:', error);
  }
};

// Example usage
sendWelcomeMessage('+917042890073');  // Replace with dynamic number if needed
