const { sequelize } = require('./models');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Create a new service
app.post('/services', async (req, res) => {
    try {
        const { name, description, image_url } = req.body;
        const service = await sequelize.models.Service.create({ name, description, image_url });
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
        const [updated] = await sequelize.models.Service.update(
            { name, description, image_url },
            { where: { id } }
        );
        if (updated) {
            const updatedService = await sequelize.models.Service.findByPk(id);
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
        const deleted = await sequelize.models.Service.destroy({ where: { id } });
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
        const contactSubmission = await sequelize.models.ContactSubmission.create({ name, email, message });
        res.status(201).json(contactSubmission);
    } catch (error) {
        console.error('Error creating contact submission:', error);
        res.status(500).json({ error: 'An error occurred while creating the contact submission.' });
    }
});

// Start the server and connect to the database
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);

    sequelize.authenticate()
        .then(() => {
            console.log('Database connected');
        })
        .catch((error) => {
            console.log('Error connecting to database', error);
        });
});

