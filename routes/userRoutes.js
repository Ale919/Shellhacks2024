// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware to authenticate user
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};

// Register a user with duplicate email check
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use.' }); // Bad Request
  }

  // If user does not exist, proceed to create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.json({ message: `User ${name} registered successfully!` });
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

// Sample route: Get user data (protected)
router.get('/', authenticateJWT, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Sample route: Create a user
router.post('/create', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.json({ message: `User ${name} created!` });
});

module.exports = router;
