const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Auth = require('../Auth-Model/Auth');
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  const { Name, Email, Password } = req.body;

  if (!Name || !Email || !Password) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await Auth.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(Password, 10);
    // Create a new user
    const newUser = await Auth.create({ Name, Email, Password: hashPassword });
    // Generate a JWT token
    const token = jwt.sign({ userID: newUser._id }, process.env.JWT_KEY, { expiresIn: '7d' });

    res.status(201).json({ message: "Account Created Successfully", userID: newUser._id, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  try {
    // Find the user by email
    const user = await Auth.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userID: user._id }, process.env.JWT_KEY, { expiresIn: '7d' });
    res.status(200).json({ message: "Logged In Successfully", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User logout
router.post('/logout', (req, res) => {
  res.status(200).json({ message: "Logged Out Successfully" });
});

module.exports = router;
