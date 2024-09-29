// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'Here is some sample data!',
    data: [1, 2, 3, 4, 5],
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});