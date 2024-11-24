const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Store messages in memory (in a real app, use a database)
const messages = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { messages });
});

app.post('/submit', (req, res) => {
  const { name, message } = req.body;
  messages.unshift({ name, message, date: new Date() });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});