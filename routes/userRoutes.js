// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Sample route: Get user data
router.get('/', (req, res) => {
  res.json({ message: 'List of users' });
});

// Sample route: Create a user
router.post('/create', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: `User ${name} with email ${email} created!` });
});

module.exports = router;
