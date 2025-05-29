import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import MovieCard from '../components/Home/MovieCard';
import { movies } from '../data/mockData';
import { Search, Filter } from 'lucide-react';
import { Movie } from '../types';

const MoviesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('');
  
  // Extract all unique genres from movies
  const allGenres = [...new Set(movies.flatMap(movie => movie.genre))].sort();
  
  // Extract all unique ratings from movies
  const allRatings = [...new Set(movies.map(movie => movie.rating))].sort();
  
  // Filter movies based on search term, genres, and rating
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenres = selectedGenres.length === 0 || 
      selectedGenres.some(genre => movie.genre.includes(genre));
    const matchesRating = !selectedRating || movie.rating === selectedRating;
    
    return matchesSearch && matchesGenres && matchesRating;
  });
  
  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setSelectedRating('');
  };
  
  return (
    <Layout>
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 text-white"
                />
              </div>
              
              <div className="relative">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="appearance-none w-full pl-3 pr-10 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 text-white"
                >
                  <option value="">All Ratings</option>
                  {allRatings.map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              
              <button
                onClick={resetFilters}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    selectedGenres.includes(genre)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          
          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoviesPage;