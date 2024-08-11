// src/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
require('dotenv').config(); 

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password, phone } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const user = new UserModel({ username, password, phone });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error('Error creating user:', error); // Log error details
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt with:', { username });

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const user = await UserModel.findOne({ username });
    console.log('User found:', user); // Debug log
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error); // Log error details
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    // User object is attached to req object by authMiddleware
    const user = await UserModel.findById(req.user).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
