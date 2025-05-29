import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import MovieDetails from '../components/Movie/MovieDetails';
import ShowtimeSelector from '../components/Movie/ShowtimeSelector';
import SeatSelection from '../components/Movie/SeatSelection';
import CheckoutForm from '../components/Movie/CheckoutForm';
import BookingConfirmation from '../components/Movie/BookingConfirmation';
import { movies, showings, theaters } from '../data/mockData';
import { Movie, Showing, Theater } from '../types';

type BookingStep = 'showtimes' | 'seats' | 'checkout' | 'confirmation';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentStep, setCurrentStep] = useState<BookingStep>('showtimes');
  const [selectedShowing, setSelectedShowing] = useState<Showing | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingId, setBookingId] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  useEffect(() => {
    // Find the movie by id
    const foundMovie = movies.find(m => m.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
    } else {
      // Redirect to 404 or movies page if movie not found
      navigate('/movies');
    }
  }, [id, navigate]);
  
  if (!movie) {
    return <div>Loading...</div>;
  }
  
  // Filter showings for this movie
  const movieShowings = showings.filter(showing => showing.movieId === movie.id);
  
  const handleSelectShowing = (showing: Showing) => {
    setSelectedShowing(showing);
    setCurrentStep('seats');
  };
  
  const handleSelectSeats = (seats: string[]) => {
    setSelectedSeats(seats);
    
    // Calculate total price
    let price = 0;
    const theater = theaters.find(t => t.id === selectedShowing?.theaterId);
    const screen = theater?.screens.find(s => s.id === selectedShowing?.screenId);
    
    seats.forEach(seatId => {
      // Find the seat from all rows
      for (const row of screen?.seats || []) {
        const seat = row.find(s => s.id === seatId);
        if (seat) {
          price += seat.price;
          break;
        }
      }
    });
    
    setTotalPrice(price);
  };
  
  const handleCompleteCheckout = (formData: any) => {
    // Generate a random booking ID
    const newBookingId = `BK${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setBookingId(newBookingId);
    setCurrentStep('confirmation');
  };
  
  const handleStartOver = () => {
    setCurrentStep('showtimes');
    setSelectedShowing(null);
    setSelectedSeats([]);
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'showtimes':
        return (
          <ShowtimeSelector 
            showings={movieShowings} 
            theaters={theaters}
            onSelectShowing={handleSelectShowing} 
          />
        );
      case 'seats':
        if (!selectedShowing) return null;
        return (
          <SeatSelection 
            showing={selectedShowing} 
            theaters={theaters}
            onSelectSeats={handleSelectSeats} 
          />
        );
      case 'checkout':
        return (
          <CheckoutForm 
            totalPrice={totalPrice} 
            onComplete={handleCompleteCheckout} 
          />
        );
      case 'confirmation':
        if (!selectedShowing) return null;
        const theater = theaters.find(t => t.id === selectedShowing.theaterId) as Theater;
        return (
          <BookingConfirmation 
            movie={movie}
            showing={selectedShowing}
            theater={theater}
            selectedSeats={selectedSeats}
            bookingId={bookingId}
            totalPrice={totalPrice + 1.50} // Adding booking fee
          />
        );
    }
  };
  
  return (
    <Layout>
      <div className="bg-gray-950 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Movie Banner */}
          <div 
            className="relative h-[40vh] rounded-lg overflow-hidden mb-8 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.bannerUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>
          
          {/* Booking Process */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Book Tickets</h2>
              
              {/* Booking Steps Indicator */}
              <div className="hidden md:flex items-center">
                <div className={`flex items-center ${currentStep === 'showtimes' ? 'text-white' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep === 'showtimes' ? 'bg-red-600' : 'bg-gray-800'}`}>
                    1
                  </div>
                  <span>Showtimes</span>
                </div>
                <div className="w-8 h-0.5 mx-2 bg-gray-800"></div>
                
                <div className={`flex items-center ${currentStep === 'seats' ? 'text-white' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep === 'seats' ? 'bg-red-600' : 'bg-gray-800'}`}>
                    2
                  </div>
                  <span>Seats</span>
                </div>
                <div className="w-8 h-0.5 mx-2 bg-gray-800"></div>
                
                <div className={`flex items-center ${currentStep === 'checkout' ? 'text-white' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep === 'checkout' ? 'bg-red-600' : 'bg-gray-800'}`}>
                    3
                  </div>
                  <span>Checkout</span>
                </div>
                <div className="w-8 h-0.5 mx-2 bg-gray-800"></div>
                
                <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-white' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${currentStep === 'confirmation' ? 'bg-red-600' : 'bg-gray-800'}`}>
                    4
                  </div>
                  <span>Confirmation</span>
                </div>
              </div>
              
              {currentStep !== 'showtimes' && currentStep !== 'confirmation' && (
                <button
                  onClick={handleStartOver}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Start Over
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Movie Details or Confirmation */}
              <div>
                {currentStep !== 'confirmation' ? (
                  <MovieDetails movie={movie} />
                ) : null}
              </div>
              
              {/* Right Column: Current Booking Step */}
              <div>
                {renderCurrentStep()}
                
                {/* Navigation Buttons */}
                {currentStep === 'seats' && selectedSeats.length > 0 && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setCurrentStep('checkout')}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      Continue to Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetailPage;