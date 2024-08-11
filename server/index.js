const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const itemRoutes = require('./routes/itemRoutes'); // Import item routes
const propertyRoutes = require('./routes/propertyRoutes'); // Import property routes

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Enable CORS and body parsing
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', itemRoutes); // Use item routes
app.use('/api', propertyRoutes); // Use property routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
