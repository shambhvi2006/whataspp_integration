const twilio = require('twilio');
require('dotenv').config();  // For loading environment variables

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppResponse = async (userPhone) => {
  const videoUrl = 'https://dl.dropboxusercontent.com/scl/fi/0v545xgxx005ufc37rjvc/trial.mp4?rlkey=mds35vzfhed4t3hg25elkccbg&st=wcjsuqpf&dl=1';  // Replace with actual video URL

  try {
    // Step 1: Send the "Thank you for choosing WhatsApp" message
    const thankYouMessage = await client.messages.create({
      body: 'Thank you for choosing WhatsApp! Now, here is a question for you to answer. You can use the video lesson if you need any help.Just give it a minute to load.',
      from: 'whatsapp:+14155238886', to: 'whatsapp:+917042890073'
    });

    console.log('Thank you message sent:', thankYouMessage.sid);

    // Step 2: Send the video on Compound Interest
    const videoMessage = await client.messages.create({
      body: 'Watch this 8-second video on Compound Interest, where we explain how it works!',
      from: 'whatsapp:+14155238886', to: 'whatsapp:+917042890073',
      mediaUrl: [videoUrl]  // Video URL
    });

    console.log('Video sent:', videoMessage.sid);

    // Step 3: Ask the question
    const questionMessage = await client.messages.create({
      body: 'What is Compound Interest?\nA) Interest on interest\nB) Interest on the principal amount\nC) Both A and B',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+917042890073'
    });

    console.log('Question sent:', questionMessage.sid);
  } catch (error) {
    console.log('Error sending WhatsApp response:', error);
  }
};

// Example usage
sendWhatsAppResponse('+917042890073');  // Replace with dynamic number if needed
