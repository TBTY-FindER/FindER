const express = require('express');
const HospitalController = require('./Controller/hospitalController');
const router = express.Router();
router.use(cors());

// Define your routes
router.get('/hospitals', (req, res) => {
    console.log("hospitals/n");
    return res.json({ body: HospitalController.getHospitals() });
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