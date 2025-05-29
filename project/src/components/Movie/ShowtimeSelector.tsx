import React, { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Showing, Theater } from '../../types';

interface ShowtimeSelectorProps {
  showings: Showing[];
  theaters: Theater[];
  onSelectShowing: (showing: Showing) => void;
}

const ShowtimeSelector: React.FC<ShowtimeSelectorProps> = ({ 
  showings, 
  theaters,
  onSelectShowing 
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>('');
  
  // Get unique dates from showings
  const dates = [...new Set(showings.map(showing => showing.date))].sort();
  
  // If no date is selected, select the first one
  React.useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);
  
  // Filter showings by selected date
  const filteredByDate = selectedDate 
    ? showings.filter(showing => showing.date === selectedDate)
    : showings;
  
  // Get unique theaters for the filtered showings
  const theaterIds = [...new Set(filteredByDate.map(showing => showing.theaterId))];
  const availableTheaters = theaters.filter(theater => theaterIds.includes(theater.id));
  
  // If no theater is selected but there are available theaters, select the first one
  React.useEffect(() => {
    if (availableTheaters.length > 0 && (!selectedTheaterId || !theaterIds.includes(selectedTheaterId))) {
      setSelectedTheaterId(availableTheaters[0].id);
    }
  }, [availableTheaters, selectedTheaterId, theaterIds]);
  
  // Filter showings by selected theater
  const filteredShowings = selectedTheaterId 
    ? filteredByDate.filter(showing => showing.theaterId === selectedTheaterId)
    : filteredByDate;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Select Showtime</h2>
      
      {/* Date selector */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-red-500" />
          <h3 className="text-lg font-medium">Date</h3>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2">
          {dates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg focus:outline-none transition-colors duration-200 ${
                selectedDate === date 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Theater selector */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 mr-2 text-red-500" />
          <h3 className="text-lg font-medium">Theater</h3>
        </div>
        <div className="flex flex-col space-y-4">
          {availableTheaters.map(theater => (
            <button
              key={theater.id}
              onClick={() => setSelectedTheaterId(theater.id)}
              className={`flex items-start justify-between p-4 rounded-lg text-left focus:outline-none transition-colors duration-200 ${
                selectedTheaterId === theater.id 
                  ? 'bg-gray-700 border border-red-500' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div>
                <h4 className="font-medium">{theater.name}</h4>
                <p className="text-sm text-gray-400">{theater.location}</p>
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center">
                {selectedTheaterId === theater.id && (
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Showtimes */}
      <div>
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 mr-2 text-red-500" />
          <h3 className="text-lg font-medium">Showtimes</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {filteredShowings.map(showing => (
            <button
              key={showing.id}
              onClick={() => onSelectShowing(showing)}
              className="bg-gray-800 hover:bg-gray-700 text-center py-3 px-2 rounded focus:outline-none transition-colors duration-200 hover:text-white text-gray-300"
            >
              {showing.startTime}
            </button>
          ))}
          {filteredShowings.length === 0 && (
            <p className="text-gray-400 col-span-4">No showtimes available for this selection.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowtimeSelector;