const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Create a new item
router.post('/item', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const item = new Card(req.body);

    // Check for validation errors
    const validationError = item.validateSync();
    if (validationError) {
      console.error('Validation error:', validationError);
      return res.status(400).json({ error: validationError.message });
    }

    await item.save();
    console.log('Item saved:', item);
    res.status(201).json(item);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).send('Error creating item');
  }
});

// Fetch all items
router.get('/item', async (req, res) => {
  try {
    const items = await Card.find({});
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send('Error fetching items');
  }
});

module.exports = router;
