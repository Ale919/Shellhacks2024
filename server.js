// server.js

// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Define a route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define an about route
app.get('/about', (req, res) => {
  res.send('About Us');
});

// Define a sample API route that returns JSON data
app.get('/api/data', (req, res) => {
  res.json({
    message: 'Here is some sample data!',
    data: [1, 2, 3, 4, 5]
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});