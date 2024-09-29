// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/edunav')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
app.use('/api/users', userRoutes); // Use user routes

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
