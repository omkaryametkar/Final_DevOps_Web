import React from 'react';
import Layout from '../components/Layout/Layout';
import Hero from '../components/Home/Hero';
import MovieSlider from '../components/Home/MovieSlider';
import Testimonials from '../components/Home/Testimonials';
import { movies } from '../data/mockData';

const HomePage: React.FC = () => {
  const featuredMovies = movies.filter(movie => movie.featured);
  const comingSoonMovies = movies.filter(movie => movie.comingSoon);
  const regularMovies = movies.filter(movie => !movie.featured && !movie.comingSoon);
  
  // Select the first featured movie for the hero section
  const heroMovie = featuredMovies[0] || movies[0];
  
  return (
    <Layout>
      <Hero featuredMovie={heroMovie} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MovieSlider title="Featured Movies" movies={featuredMovies} />
        <MovieSlider title="Now Showing" movies={regularMovies} />
        <MovieSlider title="Coming Soon" movies={comingSoonMovies} />
      </div>
      
      <Testimonials />
    </Layout>
  );
};

export default HomePage;
