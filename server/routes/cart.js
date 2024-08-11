// src/routes/cart.js
const express = require('express');
const jwt = require('jsonwebtoken');
const CartModel = require('../models/CartModel');
const CardModel = require('../models/Card');
const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Add item to cart
router.post('/add', authenticate, async (req, res) => {
  const { userId } = req;
  const { itemId } = req.body;

  if (!itemId) return res.status(400).json({ error: 'Item ID is required' });

  try {
    // Find the card to add to cart
    const card = await CardModel.findById(itemId);
    if (!card) return res.status(404).json({ error: 'Card not found' });

    // Find or create the cart for the user
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    // Ensure cart.items is initialized
    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    // Check if the item is already in the cart
    const isItemInCart = cart.items.some((item) => item.equals(card._id));
    if (isItemInCart) {
      return res.status(400).json({ error: 'Item already in cart' });
    }

    // Add the card to the cart
    cart.items.push(card._id);
    await cart.save();

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get cart items
router.get('/', authenticate, async (req, res) => {
  const { userId } = req;
  try {
    const cart = await CartModel.findOne({ userId }).populate('items');
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    res.status(200).json(cart.items);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', authenticate, async (req, res) => {
  const { userId } = req;
  const { itemId } = req.params;

  try {
    // Find the cart for the user
    let cart = await CartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    // Remove the item from the cart
    cart.items = cart.items.filter(item => !item.equals(itemId));
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
