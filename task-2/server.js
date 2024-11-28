const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { username, email, password, bio } = req.body;
    const errors = {};

    // Validate username
    if (!username || username.length < 3) {
        errors.username = 'Username must be at least 3 characters long.';
    }

    // Validate email
    if (!email || !email.includes('@')) {
        errors.email = 'Enter a valid email address.';
    }

    // Validate password
    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    // Store validated data temporarily (for demonstration)
    const temporaryStorage = { username, email, password, bio };
    console.log('Stored Data:', temporaryStorage);

    res.status(200).send('Form submitted successfully!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

const tempStorage = [];

app.post('/submit', (req, res) => {
    const { username, email, password, bio } = req.body;
    const validatedData = { username, email, bio }; // Avoid storing raw passwords

    tempStorage.push(validatedData); // Store in memory
    console.log('Temporary Storage:', tempStorage);

    res.status(200).send('Data stored temporarily!');
});
