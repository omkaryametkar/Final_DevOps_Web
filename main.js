const mysql = require('mysql');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// MySQL connection configuration
const databaseConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root@123', // Replace with your MySQL password
  database: 'Movie', // Database name
});

databaseConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database');
});

// Create an Express app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static CSS file (You can place your CSS file in the public folder if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage with the form to add movies and a list of movies
app.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM Movies';

  databaseConnection.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error fetching movies:', err.message);
      return res.send('Error fetching movies');
    }

    let movieList = '<h2>Movie List</h2><ul>';
    result.forEach((movie) => {
      movieList += `
        <li>
          <strong>Name:</strong> ${movie.name} <br>
          <strong>Genre:</strong> ${movie.genre} <br>
          <strong>Director:</strong> ${movie.director} <br>
          <strong>Release Date:</strong> ${movie.releaseDate} <br>
          <strong>Duration:</strong> ${movie.durationMinutes} minutes <br>
          <strong>Language:</strong> ${movie.language} <br>
          <strong>Tickets Available:</strong> ${movie.ticketsAvailable} <br>
          <strong>Ticket Price:</strong> ₹${movie.ticketPrice} <br>
          <a href="#" onclick="showEditForm(${movie.id}, '${movie.name}', '${movie.genre}', '${movie.director}', '${movie.releaseDate}', '${movie.durationMinutes}', '${movie.language}', ${movie.ticketsAvailable}, ${movie.ticketPrice})">Edit</a> | 
          <a href="/delete-movie/${movie.id}">Delete</a>
        </li>
        <hr>
      `;
    });
    movieList += '</ul>';

    // Add the form to add a new movie
    const formHtml = `
      <h1>Manage Movies</h1>
      <style>
        body {
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
        }

        form {
          width: 300px;
          margin: 0 auto;
          padding: 10px;
          border: 1px solid #ccc;
        }

        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
        }

        button {
          width: 90%;
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          border: none;
        }

        ul {
          list-style-type: none;
        }

        li {
          padding: 8px 0;
        }

        a {
          text-decoration: none;
          color: #007BFF;
        }

        a:hover {
          text-decoration: underline;
        }
      </style>
      <form method="POST" action="/add-movie">
        <h3>Add Movie</h3>

        <label for="name">Movie Name:</label>
        <input type="text" id="name" name="name" required><br><br>

        <label for="genre">Genre:</label>
        <input type="text" id="genre" name="genre" required><br><br>

        <label for="director">Director:</label>
        <input type="text" id="director" name="director" required><br><br>

        <label for="releaseDate">Release Date:</label>
        <input type="date" id="releaseDate" name="releaseDate" required><br><br>

        <label for="durationMinutes">Duration (minutes):</label>
        <input type="number" id="durationMinutes" name="durationMinutes" required><br><br>

        <label for="language">Language:</label>
        <input type="text" id="language" name="language" required><br><br>

        <label for="ticketsAvailable">Available Tickets:</label>
        <input type="number" id="ticketsAvailable" name="ticketsAvailable" required><br><br>

        <label for="ticketPrice">Ticket Price (₹):</label>
        <input type="number" id="ticketPrice" name="ticketPrice" required><br><br>

        <button type="submit">Add Movie</button>
      </form>

      <hr>

      ${movieList}
      
      <script>
        function showEditForm(id, name, genre, director, releaseDate, durationMinutes, language, ticketsAvailable, ticketPrice) {
          document.getElementById('editForm').style.display = 'block';
          document.getElementById('editId').value = id;
          document.getElementById('editName').value = name;
          document.getElementById('editGenre').value = genre;
          document.getElementById('editDirector').value = director;
          document.getElementById('editReleaseDate').value = releaseDate;
          document.getElementById('editDurationMinutes').value = durationMinutes;
          document.getElementById('editLanguage').value = language;
          document.getElementById('editTicketsAvailable').value = ticketsAvailable;
          document.getElementById('editTicketPrice').value = ticketPrice;
        }
      </script>
      
      <!-- Edit Movie Form -->
      <div id="editForm" style="display:none;">
        <h3>Edit Movie</h3>
        <form method="POST" action="/update-movie">
          <input type="hidden" id="editId" name="id">
          
          <label for="editName">Movie Name:</label>
          <input type="text" id="editName" name="name" required><br><br>

          <label for="editGenre">Genre:</label>
          <input type="text" id="editGenre" name="genre" required><br><br>

          <label for="editDirector">Director:</label>
          <input type="text" id="editDirector" name="director" required><br><br>

          <label for="editReleaseDate">Release Date:</label>
          <input type="date" id="editReleaseDate" name="releaseDate" required><br><br>

          <label for="editDurationMinutes">Duration (minutes):</label>
          <input type="number" id="editDurationMinutes" name="durationMinutes" required><br><br>

          <label for="editLanguage">Language:</label>
          <input type="text" id="editLanguage" name="language" required><br><br>

          <label for="editTicketsAvailable">Available Tickets:</label>
          <input type="number" id="editTicketsAvailable" name="ticketsAvailable" required><br><br>

          <label for="editTicketPrice">Ticket Price (₹):</label>
          <input type="number" id="editTicketPrice" name="ticketPrice" required><br><br>

          <button type="submit">Update Movie</button>
        </form>
      </div>
    `;

    res.send(formHtml);
  });
});

// Handle form submission for adding a movie
app.post('/add-movie', (req, res) => {
  const { name, genre, director, releaseDate, durationMinutes, language, ticketsAvailable, ticketPrice } = req.body;

  const insertQuery = `
    INSERT INTO Movies (name, genre, director, releaseDate, durationMinutes, language, ticketsAvailable, ticketPrice)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  databaseConnection.query(insertQuery, [name, genre, director, releaseDate, durationMinutes, language, ticketsAvailable, ticketPrice], (err) => {
    if (err) {
      console.error('Error inserting movie:', err.message);
      return res.send('Error inserting movie');
    }
    res.redirect('/');
  });
});

// Update movie
app.post('/update-movie', (req, res) => {
  const { id, name, genre, director, releaseDate, durationMinutes, language, ticketsAvailable, ticketPrice } = req.body;

  const updateQuery = `
    UPDATE Movies 
    SET name = ?, genre = ?, director = ?, releaseDate = ?, durationMinutes = ?, language = ?, ticketsAvailable = ?, ticketPrice = ? 
    WHERE id = ?;
  `;
  
  databaseConnection.query(updateQuery, [name, genre, director, releaseDate, durationMinutes, language, ticketsAvailable, ticketPrice, id], (err) => {
    if (err) {
      console.error('Error updating movie:', err.message);
      return res.send('Error updating movie');
    }
    res.redirect('/');
  });
});

// Delete movie
app.get('/delete-movie/:id', (req, res) => {
  const movieId = req.params.id;

  const deleteQuery = 'DELETE FROM Movies WHERE id = ?';

  databaseConnection.query(deleteQuery, [movieId], (err) => {
    if (err) {
      console.error('Error deleting movie:', err.message);
      return res.send('Error deleting movie');
    }
    res.redirect('/');
  });
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
