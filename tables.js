const mysql = require('mysql');

// MySQL connection configuration
const databaseConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root@123', // Replace with your MySQL password
  database: 'Movie', // Database name
});

// Connect to the MySQL server
databaseConnection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL server');

  // SQL query to create a table with more attributes
  const createTableQuery = `
    CREATE TABLE Movies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      genre VARCHAR(100) NOT NULL,
      director VARCHAR(255) NOT NULL,
      releaseDate DATE NOT NULL,
      durationMinutes INT NOT NULL,
      language VARCHAR(50) NOT NULL,
      ticketsAvailable INT NOT NULL,
      ticketPrice DECIMAL(10, 2) NOT NULL
    );
  `;

  // Execute the query
  databaseConnection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err.message);
      return;
    }
    console.log('Table "Movies" with additional attributes created successfully!');
    databaseConnection.end(); // Close the connection
  });
});
