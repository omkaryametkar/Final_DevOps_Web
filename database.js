const mysql = require('mysql');

// MySQL connection configuration
const databaseConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root@123', // Replace with your MySQL password
});

// Connect to MySQL server
databaseConnection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL server');

  // Create the database
  const createDatabaseQuery = 'CREATE DATABASE Movie';
  databaseConnection.query(createDatabaseQuery, (err, result) => {
    if (err) throw err;
    console.log('Database created successfully!');
    databaseConnection.end(); // Close the connection
  });
});
