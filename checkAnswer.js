const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const checkAnswer = async (userPhone, userAnswer) => {
  try {
    // Check the answer (assuming "C" is the correct answer)
    if (userAnswer === 'C' || userAnswer === 'c') {
      // Correct answer
      const correctMessage = await client.messages.create({
        body: 'Correct! Compound Interest is both interest on the principal and interest on the accumulated interest.',
        from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
        to: 'whatsapp:+917042890073'
      });

      console.log('Correct answer message sent:', correctMessage.sid);

      // Send a download link for the app
      const downloadLink = 'https://financio-mitra.web.app';  // Replace with actual app download link
      const appLinkMessage = await client.messages.create({
        body: `Great job! You can continue learning on the app. Download it here: ${downloadLink}`,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+917042890073'
      });

      console.log('Download link sent:', appLinkMessage.sid);
    } else {
      // Incorrect answer
      const incorrectMessage = await client.messages.create({
        body: 'Oops! That’s incorrect. The right answer is C: Both A and B (Interest on interest and principal). Try again!',
        from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number
        to: 'whatsapp:+917042890073'
      });

      console.log('Incorrect answer message sent:', incorrectMessage.sid);
    }
  } catch (error) {
    console.log('Error checking answer:', error);
  }
};

// Example usage: Call this function when the user answers the question
// You can replace this with actual user input dynamically
checkAnswer('+917042890073', 'C');  // Replace with dynamic number and answer
