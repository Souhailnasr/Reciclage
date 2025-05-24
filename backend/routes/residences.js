const express = require('express');
const router = express.Router();
const Residence = require('../models/Residence');

// GET toutes les résidences
router.get('/', async (req, res) => {
  try {
    const residences = await Residence.find();
    res.json(residences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 