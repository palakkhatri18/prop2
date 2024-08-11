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

const corsOptions = {
  origin: 'https://prop2-frontend-palakkhatri18s-projects.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-version'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};



const app = express();
const MONGO_URI = process.env.MONGO_URI;

app.use(cors(corsOptions)); 

// app.use(cors()); 

app.options('*', cors(corsOptions)); 

app.get('/', (req, res) => {
  res.json('API is working!');
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// CORS middleware
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', itemRoutes); // Use item routes
app.use('/api', propertyRoutes); // Use property routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
