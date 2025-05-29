import React from 'react';
import { Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';

interface HeroProps {
  featuredMovie: Movie;
}

const Hero: React.FC<HeroProps> = ({ featuredMovie }) => {
  return (
    <div 
      className="relative h-[70vh] bg-cover bg-center flex items-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${featuredMovie.bannerUrl})` 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            {featuredMovie.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {featuredMovie.genre.map((genre, index) => (
              <span key={index} className="bg-red-600 px-3 py-1 text-xs rounded-full">
                {genre}
              </span>
            ))}
            <span className="bg-gray-700 px-3 py-1 text-xs rounded-full">
              {featuredMovie.rating}
            </span>
            <span className="bg-gray-700 px-3 py-1 text-xs rounded-full">
              {Math.floor(featuredMovie.duration / 60)}h {featuredMovie.duration % 60}m
            </span>
          </div>
          <p className="text-gray-300 mb-6 max-w-xl line-clamp-3 md:line-clamp-4">
            {featuredMovie.synopsis}
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href={featuredMovie.trailerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Trailer
            </a>
            <Link
              to={`/movie/${featuredMovie.id}`}
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Tickets
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent"></div>
    </div>
  );
};

export default Hero;