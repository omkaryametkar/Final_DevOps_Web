import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import { Movie, Showing, Theater } from '../../types';

interface BookingConfirmationProps {
  movie: Movie;
  showing: Showing;
  theater: Theater;
  selectedSeats: string[];
  bookingId: string;
  totalPrice: number;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  movie,
  showing,
  theater,
  selectedSeats,
  bookingId,
  totalPrice
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    // For this demo, we'll just use a placeholder
    return "https://images.pexels.com/photos/8370271/pexels-photo-8370271.jpeg";
  };
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-400">
          Your tickets have been sent to your email. Please show this confirmation at the theater.
        </p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-32 h-48 object-cover rounded mb-4 sm:mb-0 sm:mr-6"
          />
          <div>
            <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
            <p className="text-gray-400 mb-1">
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m • {movie.rating}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.genre.map((genre, index) => (
                <span key={index} className="bg-gray-700 px-2 py-0.5 text-xs rounded-full">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Date</p>
              <p>{formatDate(showing.date)}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Showtime</p>
              <p>{showing.startTime}</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Theater</p>
              <p>{theater.name}</p>
              <p className="text-sm text-gray-400">{theater.location}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Seats</p>
            <p>{selectedSeats.sort().join(', ')}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-400">Booking ID</p>
            <p className="font-mono">{bookingId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Paid</p>
            <p className="text-xl font-bold text-red-500">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-400 mb-4">Scan this code at the theater</p>
        <img 
          src={generateQRCode()}
          alt="QR Code" 
          className="h-40 w-40 mx-auto rounded bg-white p-2 mb-6"
        />
        <button 
          onClick={() => window.print()}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors duration-200 inline-flex items-center"
        >
          Print Ticket
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;