const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendAppResponse = async (userPhone) => {
  const appDownloadLink = 'https://financio-mitra.web.app';  // Replace with your app download link

  try {
    const appMessage = await client.messages.create({
      body: `Thank you for choosing the App! You can download it here: ${appDownloadLink}`,
      from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917042890073'
    });

    console.log('App download link sent:', appMessage.sid);
  } catch (error) {
    console.log('Error sending app response:', error);
  }
};

// Example usage
sendAppResponse('+917042890073');  // Replace with dynamic number if needed
