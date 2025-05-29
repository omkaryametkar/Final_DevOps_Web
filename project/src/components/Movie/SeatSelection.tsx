import React, { useState } from 'react';
import { Showing, Theater, Seat } from '../../types';

interface SeatSelectionProps {
  showing: Showing;
  theaters: Theater[];
  onSelectSeats: (selectedSeats: string[]) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ showing, theaters, onSelectSeats }) => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  
  // Find the theater and screen for this showing
  const theater = theaters.find(t => t.id === showing.theaterId);
  const screen = theater?.screens.find(s => s.id === showing.screenId);
  
  if (!theater || !screen) {
    return <div>Theater or screen information not found.</div>;
  }
  
  const handleSeatClick = (seatId: string) => {
    if (selectedSeatIds.includes(seatId)) {
      // Deselect seat
      setSelectedSeatIds(selectedSeatIds.filter(id => id !== seatId));
    } else {
      // Select seat
      setSelectedSeatIds([...selectedSeatIds, seatId]);
    }
  };
  
  React.useEffect(() => {
    onSelectSeats(selectedSeatIds);
  }, [selectedSeatIds, onSelectSeats]);
  
  // Calculate total price
  const calculateTotalPrice = (): number => {
    let total = 0;
    
    selectedSeatIds.forEach(seatId => {
      // Find the seat from all rows
      for (const row of screen.seats) {
        const seat = row.find(s => s.id === seatId);
        if (seat) {
          total += seat.price;
          break;
        }
      }
    });
    
    return total;
  };
  
  const getSeatStatus = (seatId: string): 'available' | 'occupied' | 'selected' => {
    if (selectedSeatIds.includes(seatId)) {
      return 'selected';
    }
    
    if (showing.availableSeats.includes(seatId)) {
      return 'available';
    }
    
    return 'occupied';
  };
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Select Your Seats</h2>
        <p className="text-gray-400">{theater.name} • {screen.name}</p>
      </div>
      
      {/* Screen */}
      <div className="relative mb-12">
        <div className="h-6 bg-gray-700 rounded-t-lg w-3/4 mx-auto"></div>
        <p className="text-center text-gray-400 mt-2 text-sm">Screen</p>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full h-12 bg-gradient-to-b from-gray-700/30 to-transparent"></div>
      </div>
      
      {/* Seat Map */}
      <div className="overflow-x-auto mb-8">
        <div className="min-w-max mx-auto">
          <div className="grid gap-2">
            {screen.seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2">
                <div className="w-6 text-center text-gray-400 font-medium">
                  {row[0].row}
                </div>
                {row.map((seat) => {
                  const status = getSeatStatus(seat.id);
                  
                  return (
                    <button
                      key={seat.id}
                      disabled={status === 'occupied'}
                      onClick={() => handleSeatClick(seat.id)}
                      className={`w-8 h-8 rounded-t-lg flex items-center justify-center text-xs transition-colors duration-200 ${
                        status === 'selected' 
                          ? 'bg-red-600 text-white' 
                          : status === 'available' 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                      aria-label={`Seat ${seat.id}`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
                <div className="w-6 text-center text-gray-400 font-medium">
                  {row[0].row}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center items-center space-x-8 mb-8">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-gray-700 mr-2"></div>
          <span className="text-sm text-gray-400">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-red-600 mr-2"></div>
          <span className="text-sm text-gray-400">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-gray-800 mr-2"></div>
          <span className="text-sm text-gray-400">Occupied</span>
        </div>
      </div>
      
      {/* Selection Summary */}
      <div className="border-t border-gray-800 pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-medium">Selected Seats</h3>
            <p className="text-gray-400 text-sm">
              {selectedSeatIds.length > 0 
                ? selectedSeatIds.sort().join(', ') 
                : 'No seats selected'}
            </p>
          </div>
          <div className="text-right">
            <h3 className="font-medium">Total Price</h3>
            <p className="text-xl font-bold text-red-500">
              ${calculateTotalPrice().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;