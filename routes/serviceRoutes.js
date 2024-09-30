const express = require('express');
const router = express.Router();
const { Service, ContactSubmission } = require('../models');

// Create a new service
router.post('/', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the service.' });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching services.' });
  }
});

// Create a contact submission
router.post('/contact', async (req, res) => {
  try {
    const contactSubmission = await ContactSubmission.create(req.body);
    res.status(201).json(contactSubmission);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while submitting the contact form.' });
  }
});

module.exports = router;
