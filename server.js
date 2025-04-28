const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME // Database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to add a new contribution
app.post('/add-contribution', (req, res) => {
  const { name, amount, month, dateAdded } = req.body;

  const query = 'INSERT INTO contributions (name, amount, month, date_added) VALUES (?, ?, ?, ?)';
  db.query(query, [name, amount, month, dateAdded], (err, result) => {
    if (err) {
      res.status(500).send('Error adding contribution: ' + err.message);
    } else {
      res.status(200).send('Contribution added successfully');
    }
  });
});

// Endpoint to get all contributions
app.get('/get-contributions', (req, res) => {
  const query = 'SELECT * FROM contributions';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching contributions: ' + err.message);
    } else {
      res.status(200).json(results);
    }
  });
});

// Start the server using environment variable for PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
