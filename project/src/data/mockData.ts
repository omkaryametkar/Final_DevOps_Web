import { Movie, Theater, Showing, Booking, User } from '../types';

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar 25",
    posterUrl: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
    bannerUrl: "https://images.pexels.com/photos/1252873/pexels-photo-1252873.jpeg",
    releaseDate: "2025-05-15",
    duration: 169,
    rating: "PG-13",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true
  },
  {
    id: "2",
    title: "The Superhero Chronicles",
    posterUrl: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
    bannerUrl: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
    releaseDate: "2025-06-12",
    duration: 143,
    rating: "PG-13",
    genre: ["Action", "Fantasy", "Adventure"],
    director: "James Cameron",
    cast: ["Chris Hemsworth", "Scarlett Johansson", "Idris Elba"],
    synopsis: "A group of unlikely heroes must band together to save the world from an ancient threat.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true
  },
  {
    id: "3",
    title: "Eternal Love",
    posterUrl: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg",
    bannerUrl: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg",
    releaseDate: "2025-06-25",
    duration: 128,
    rating: "PG-13",
    genre: ["Romance", "Drama"],
    director: "Sofia Coppola",
    cast: ["Ryan Gosling", "Emma Stone", "Rachel McAdams"],
    synopsis: "Two souls meet across different lifetimes, proving that love transcends time itself.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "4",
    title: "The Last Frontier",
    posterUrl: "https://images.pexels.com/photos/1542162/pexels-photo-1542162.jpeg",
    bannerUrl: "https://images.pexels.com/photos/688574/pexels-photo-688574.jpeg",
    releaseDate: "2025-07-04",
    duration: 152,
    rating: "R",
    genre: ["Western", "Drama", "Action"],
    director: "Quentin Tarantino",
    cast: ["Leonardo DiCaprio", "Brad Pitt", "Margot Robbie"],
    synopsis: "In the dying days of the Wild West, a legendary outlaw makes one last stand for freedom.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "5",
    title: "Whispers in the Dark",
    posterUrl: "https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg",
    bannerUrl: "https://images.pexels.com/photos/2774546/pexels-photo-2774546.jpeg",
    releaseDate: "2025-07-18",
    duration: 115,
    rating: "R",
    genre: ["Horror", "Thriller", "Mystery"],
    director: "Jordan Peele",
    cast: ["Lupita Nyong'o", "Daniel Kaluuya", "Florence Pugh"],
    synopsis: "A family moves into a new home, only to discover it harbors ancient secrets and malevolent entities.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "6",
    title: "Tomorrow's Promise",
    posterUrl: "https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg",
    bannerUrl: "https://images.pexels.com/photos/1044989/pexels-photo-1044989.jpeg",
    releaseDate: "2025-08-01",
    duration: 138,
    rating: "PG",
    genre: ["Family", "Adventure", "Fantasy"],
    director: "Greta Gerwig",
    cast: ["Tom Hanks", "Meryl Streep", "Jacob Tremblay"],
    synopsis: "A young boy discovers a magical book that can predict the future, leading to an extraordinary adventure.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true
  },
  {
    id: "7",
    title: "Galactic Odyssey",
    posterUrl: "https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg",
    bannerUrl: "https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg",
    releaseDate: "2025-11-15",
    duration: 165,
    rating: "PG-13",
    genre: ["Sci-Fi", "Adventure", "Action"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Oscar Isaac"],
    synopsis: "The discovery of a mysterious artifact leads humanity to the stars and into conflict with an ancient alien civilization.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    comingSoon: true
  },
  {
    id: "8",
    title: "The Lost City",
    posterUrl: "https://images.pexels.com/photos/3679601/pexels-photo-3679601.jpeg",
    bannerUrl: "https://images.pexels.com/photos/4509131/pexels-photo-4509131.jpeg",
    releaseDate: "2025-12-10",
    duration: 146,
    rating: "PG-13",
    genre: ["Adventure", "Action", "Comedy"],
    director: "Steven Spielberg",
    cast: ["Dwayne Johnson", "Emily Blunt", "Pedro Pascal"],
    synopsis: "An expedition to find a legendary lost city turns into a race against mercenaries seeking its mythical treasures.",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    comingSoon: true
  }
];

export const theaters: Theater[] = [
  {
    id: "1",
    name: "Cineplex Odeon",
    location: "123 Main Street, Downtown",
    screens: [
      {
        id: "screen1",
        name: "Screen 1 - IMAX",
        seats: generateSeats(10, 15, "A", "premium")
      },
      {
        id: "screen2",
        name: "Screen 2",
        seats: generateSeats(8, 12, "A", "standard")
      }
    ]
  },
  {
    id: "2",
    name: "AMC Theatres",
    location: "456 Park Avenue, Uptown",
    screens: [
      {
        id: "screen1",
        name: "Screen 1 - Dolby",
        seats: generateSeats(9, 14, "A", "premium")
      },
      {
        id: "screen2",
        name: "Screen 2",
        seats: generateSeats(7, 10, "A", "standard")
      }
    ]
  }
];

export const showings: Showing[] = [
  {
    id: "1",
    movieId: "1",
    theaterId: "1",
    screenId: "screen1",
    startTime: "19:30",
    endTime: "22:19",
    date: "2025-05-15",
    availableSeats: generateAvailableSeats(10, 15, 0.7) // 70% of seats available
  },
  {
    id: "2",
    movieId: "1",
    theaterId: "1",
    screenId: "screen1",
    startTime: "15:00",
    endTime: "17:49",
    date: "2025-05-15",
    availableSeats: generateAvailableSeats(10, 15, 0.85) // 85% of seats available
  },
  {
    id: "3",
    movieId: "2",
    theaterId: "1",
    screenId: "screen2",
    startTime: "18:00",
    endTime: "20:23",
    date: "2025-05-15",
    availableSeats: generateAvailableSeats(8, 12, 0.6) // 60% of seats available
  },
  {
    id: "4",
    movieId: "3",
    theaterId: "2",
    screenId: "screen1",
    startTime: "20:15",
    endTime: "22:23",
    date: "2025-05-15",
    availableSeats: generateAvailableSeats(9, 14, 0.75) // 75% of seats available
  },
  // More showings for the next day
  {
    id: "5",
    movieId: "1",
    theaterId: "1",
    screenId: "screen1",
    startTime: "14:00",
    endTime: "16:49",
    date: "2025-05-16",
    availableSeats: generateAvailableSeats(10, 15, 0.9) // 90% of seats available
  },
  {
    id: "6",
    movieId: "2",
    theaterId: "2",
    screenId: "screen2",
    startTime: "19:00",
    endTime: "21:23",
    date: "2025-05-16",
    availableSeats: generateAvailableSeats(7, 10, 0.8) // 80% of seats available
  }
];

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    bookings: ["1"]
  }
];

export const bookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    showingId: "1",
    movieId: "1",
    theaterId: "1",
    seats: ["A1", "A2"],
    totalPrice: 45.98,
    bookingDate: "2025-05-10T14:30:00Z",
    status: "confirmed"
  }
];

// Helper function to generate seats
function generateSeats(rows: number, cols: number, startRow: string, type: "standard" | "premium") {
  const seats = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    const rowLetter = String.fromCharCode(startRow.charCodeAt(0) + i);
    for (let j = 0; j < cols; j++) {
      row.push({
        id: `${rowLetter}${j + 1}`,
        row: rowLetter,
        number: j + 1,
        type: type,
        price: type === "premium" ? 18.99 : 14.99
      });
    }
    seats.push(row);
  }
  return seats;
}

// Helper function to generate available seats
function generateAvailableSeats(rows: number, cols: number, availability: number) {
  const allSeats = [];
  for (let i = 0; i < rows; i++) {
    const rowLetter = String.fromCharCode("A".charCodeAt(0) + i);
    for (let j = 0; j < cols; j++) {
      allSeats.push(`${rowLetter}${j + 1}`);
    }
  }
  
  // Randomly select seats to be available based on availability percentage
  const totalSeats = rows * cols;
  const availableCount = Math.floor(totalSeats * availability);
  const shuffled = allSeats.sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, availableCount);
}
