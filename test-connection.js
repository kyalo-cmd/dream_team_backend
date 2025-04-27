const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // or the host of your MySQL server
    user: 'root', // your MySQL username
    password: '@Chris2022', // your MySQL password
    database: 'dream_team_contributions' // your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
    db.end(); // Close the connection after testing
});