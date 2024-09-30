require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const { sequelize, Service, ContactSubmission } = require('./models'); // Import Sequelize and models
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Create a new service
app.post('/services', async (req, res) => {
    try {
        const { name, description, image_url } = req.body;
        const service = await Service.create({ name, description, image_url });
        res.status(201).json(service);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'An error occurred while creating the service.' });
    }
});

// Update a service
app.patch('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image_url } = req.body;
        const [updated] = await Service.update(
            { name, description, image_url },
            { where: { id } }
        );
        if (updated) {
            const updatedService = await Service.findByPk(id);
            res.json(updatedService);
        } else {
            res.status(404).json({ error: 'Service not found.' });
        }
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'An error occurred while updating the service.' });
    }
});

// Delete a service
app.delete('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Service.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Service not found.' });
        }
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'An error occurred while deleting the service.' });
    }
});

// Create a contact submission
app.post('/contact-submissions', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contactSubmission = await ContactSubmission.create({ name, email, message });
        res.status(201).json(contactSubmission);
    } catch (error) {
        console.error('Error creating contact submission:', error);
        res.status(500).json({ error: 'An error occurred while creating the contact submission.' });
    }
});

// Start the server and connect to the database
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);

    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
});
