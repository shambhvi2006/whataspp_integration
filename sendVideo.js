const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// The public URL of the video
const videoUrl = 'https://dl.dropboxusercontent.com/scl/fi/0v545xgxx005ufc37rjvc/trial.mp4?rlkey=mds35vzfhed4t3hg25elkccbg&st=wcjsuqpf&dl=1';  // Replace with actual video URL

// The app download link
const appDownloadLink = 'https://financio-mitra.web.app';  // Replace with actual app link

// Function to handle sending WhatsApp messages
const sendMessage = async (userPhone) => {
  try {
    // Step 1: Ask the user how they want to learn (hardcoded response here)
    const welcomeMessage = await client.messages.create({
      body: 'Hello, welcome to Mitra! How would you like to learn? Reply with "WhatsApp" or "App".',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+917042890073'
    });

    console.log('Welcome message sent.');

    // Step 2: Hardcoded user response (replace with dynamic input if needed)
    const userResponse = 'WhatsApp';  // Manually set the user response

    if (userResponse === 'WhatsApp' || userResponse === 'whatsapp') {
      // If they want to learn through WhatsApp, send the video
      const videoMessage = await client.messages.create({
        body: 'Watch this 8-second video on Compound Interest, where we explain how it works!',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917042890073',
        mediaUrl: [videoUrl]  // Video URL (must be inside an array)
      });

      console.log('Video sent:', videoMessage.sid);

      // Step 3: After video, ask the quiz question (hardcoded question)
      const questionMessage = await client.messages.create({
        body: 'What is Compound Interest?\nA) Interest on interest\nB) Interest on the principal amount\nC) Both A and B',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917042890073'
      });

      console.log('Question sent:', questionMessage.sid);
    } else if (userResponse === 'App' || userResponse === 'app') {
      // If they want to use the app, send the app download link
      const appMessage = await client.messages.create({
        body: `Thank you for choosing the App! You can download it here: ${appDownloadLink}`,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917042890073'
      });

      console.log('App download link sent:', appMessage.sid);
    } else {
      // Handle invalid response
      const invalidResponseMessage = await client.messages.create({
        body: 'Sorry, I didn\'t understand that. Please reply with "WhatsApp" or "App".',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917042890073'
      });

      console.log('Invalid response message sent:', invalidResponseMessage.sid);
    }
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

// Example usage: Call this function when the user joins the sandbox and provides their number
sendMessage('+917042890073');  // Replace with dynamic number if needed
