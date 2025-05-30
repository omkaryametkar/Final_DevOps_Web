import React from 'react';
import { Calendar, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-gray-900 hover:scale-105">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex gap-2 mb-2">
            {movie.genre.slice(0, 2).map((genre, index) => (
              <span key={index} className="bg-red-600 px-2 py-0.5 text-xs rounded-full text-white">
                {genre}
              </span>
            ))}
            <span className="bg-gray-700 px-2 py-0.5 text-xs rounded-full text-white">
              {movie.rating}
            </span>
          </div>
          <div className="flex items-center text-white text-sm mb-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
          </div>
          <p className="text-white text-sm line-clamp-2">{movie.synopsis}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
          </div>
          <Link 
            to={`/movie/${movie.id}`}
            className="text-red-500 hover:text-white bg-transparent hover:bg-red-600 border border-red-500 text-xs font-semibold px-3 py-1 rounded transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
      {movie.comingSoon && (
        <div className="absolute top-4 right-0 bg-yellow-500 text-black px-3 py-1 text-xs font-bold rounded-l-lg shadow-md">
          Coming Soon
        </div>
      )}
    </div>
  );
};

export default MovieCard;
//Movie card
