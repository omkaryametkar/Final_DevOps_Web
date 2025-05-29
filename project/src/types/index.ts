export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  bannerUrl: string;
  releaseDate: string;
  duration: number; // in minutes
  rating: string; // PG, PG-13, R, etc.
  genre: string[];
  director: string;
  cast: string[];
  synopsis: string;
  trailerUrl?: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  seats: Seat[][];
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: "standard" | "premium" | "wheelchair" | "couple";
  price: number;
}

export interface Showing {
  id: string;
  movieId: string;
  theaterId: string;
  screenId: string;
  startTime: string;
  endTime: string;
  date: string;
  availableSeats: string[]; // Array of seat IDs
}

export interface Booking {
  id: string;
  userId: string;
  showingId: string;
  movieId: string;
  theaterId: string;
  seats: string[]; // Array of seat IDs
  totalPrice: number;
  bookingDate: string;
  status: "confirmed" | "cancelled" | "completed";
  paymentId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookings: string[]; // Array of booking IDs
}