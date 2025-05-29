import React from 'react';
import { Calendar, Clock, Star, User, Video } from 'lucide-react';
import { Movie } from '../../types';

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="bg-gray-900 py-6 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="w-full md:w-2/3 lg:w-3/4 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((genre, index) => (
                <span key={index} className="bg-red-600 px-3 py-1 text-sm rounded-full">
                  {genre}
                </span>
              ))}
              <span className="bg-gray-700 px-3 py-1 text-sm rounded-full">
                {movie.rating}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                <span>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-5 w-5 mr-2 text-red-500" />
                <span>Duration: {Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
              </div>
              <div className="flex items-center text-gray-300">
                <User className="h-5 w-5 mr-2 text-red-500" />
                <span>Director: {movie.director}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Star className="h-5 w-5 mr-2 text-red-500" />
                <span>Rating: {movie.rating}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-300">{movie.synopsis}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <span key={index} className="bg-gray-800 px-3 py-1 text-sm rounded-full text-gray-300">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={movie.trailerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <Video className="h-5 w-5 mr-2" />
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;