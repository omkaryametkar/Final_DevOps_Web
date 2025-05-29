import React, { useState } from 'react';
import { Menu, X, Film, User, CalendarDays, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-black bg-opacity-90 backdrop-blur-sm text-white fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold">CineTicket</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-gray-300 hover:text-white px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-red-500 transition-all duration-200">
                  Home
                </Link>
                <Link to="/movies" className="text-gray-300 hover:text-white px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-red-500 transition-all duration-200">
                  Movies
                </Link>
                <Link to="/theaters" className="text-gray-300 hover:text-white px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-red-500 transition-all duration-200">
                  Theaters
                </Link>
                <Link to="/coming-soon" className="text-gray-300 hover:text-white px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-red-500 transition-all duration-200">
                  Coming Soon
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <div className="relative">
                <button 
                  className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600 focus:outline-none"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 animate-fade-in-down">
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Sign In
                    </Link>
                    <Link to="/register" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Register
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      My Profile
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      My Bookings
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/movies" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Movies
            </Link>
            <Link to="/theaters" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Theaters
            </Link>
            <Link to="/coming-soon" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Coming Soon
            </Link>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="px-4">
                <Link to="/login" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                  Sign In
                </Link>
                <Link to="/register" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                  Register
                </Link>
                <Link to="/profile" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                  My Profile
                </Link>
                <Link to="/bookings" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                  My Bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;