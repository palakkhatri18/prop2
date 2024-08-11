const express = require('express');
const router = express.Router();
const YourProperty = require('../models/YourProperty');

// Create a new property
router.post('/property', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const property = new YourProperty(req.body);

    // Check for validation errors
    const validationError = property.validateSync();
    if (validationError) {
      console.error('Validation error:', validationError);
      return res.status(400).json({ error: validationError.message });
    }

    await property.save();
    console.log('Property saved:', property);
    res.status(201).json(property);
  } catch (err) {
    console.error('Error creating property:', err);
    res.status(500).send('Error creating property');
  }
});

// Get all properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await YourProperty.find({});
    res.status(200).json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).send('Error fetching properties');
  }
});

module.exports = router;
