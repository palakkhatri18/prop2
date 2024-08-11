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

app.get('/', (req, res) => {
  res.json('API is working!');
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Enable CORS for specific domains
const allowedOrigins = ['https://prop2-palakkhatri18s-projects.vercel.app','https://prop2-git-main-palakkhatri18s-projects.vercel.app']; // Add your domain(s)
app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', itemRoutes); // Use item routes
app.use('/api', propertyRoutes); // Use property routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
