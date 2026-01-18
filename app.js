const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const whatsappRoutes = require('./routes/whatsapp');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/whatsapp', whatsappRoutes); // API route for WhatsApp interactions

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
