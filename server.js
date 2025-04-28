const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Chris2022',  // Make sure this is the exact password
  database: 'dream_team_contributions'
});


// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
async function addContribution() {
  const name = document.getElementById('memberName').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const month = document.getElementById('month').value;
  const dateAdded = new Date().toLocaleDateString();

  if (name && amount && month) {
    try {
      const response = await fetch('https://kyalo-cmd.github.io/dream_team_backend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, amount, month, dateAdded }),
      });
      const data = await response.text();
      alert(data);
      renderTable();  // Update the frontend after success
    } catch (error) {
      alert('Error adding contribution: ' + error.message);
    }
  } else {
    alert('Please fill in all fields');
  }
}
async function getContributions() {
  try {
    const response = await fetch('https://kyalo-cmd.github.io/dream_team_backend/');
    const contributions = await response.json();
    renderTable(contributions);  // Update the table with live data
  } catch (error) {
    alert('Error fetching contributions: ' + error.message);
  }
}
