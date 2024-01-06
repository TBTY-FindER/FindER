const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
    // Handle GET request for users
    res.json({ message: 'Get default' });
});

// Define your routes
router.get('/users', (req, res) => {
  // Handle GET request for users
  res.json({ message: 'Get all users' });
});

router.post('/users', (req, res) => {
  // Handle POST request for users
  res.json({ message: 'Create a user' });
});

module.exports = router;