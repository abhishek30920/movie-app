import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useGetNewMoviesQuery, useGetRandomMoviesQuery, useGetTopRatedMoviesQuery } from '../../redux/api/movies';
import { useFetchGenresQuery } from '../../redux/api/genre';
import { Home, Film, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// Movie Card Component
const MovieCard = ({ movie }) => (
  <motion.div 
    className="relative w-64 h-96 shrink-0 overflow-hidden rounded-xl group"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Link to={`/movies/${movie._id}`}>
      <img 
        src={movie.image} 
        alt={movie.name} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white font-bold text-lg truncate">{movie.name}</h3>
        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </p>
      </div>
    </Link>
  </motion.div>
);

// Horizontal Scroll Container with Navigation
const HorizontalScrollContainer = ({ children }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <motion.div 
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-6"
      >
        {children}
      </motion.div>
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full 
                 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

function MoviesContainerPage() {
  const location = useLocation();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: topMovies } = useGetTopRatedMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/movies", label: "Browse Movies", icon: Film },
   
  ];

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const filteredMovies = selectedGenre
    ? newMovies?.movies?.filter(movie => movie.genre === selectedGenre)
    : newMovies?.movies;

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-6 mb-8">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                  }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Genre Navigation */}
        <motion.nav 
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {genres?.map((genre) => (
            <motion.button
              key={genre._id}
              onClick={() => handleGenreClick(genre._id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedGenre === genre._id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {genre.name}
            </motion.button>
          ))}
        </motion.nav>
      </div>

      {/* Movies Sections */}
      <div className="container mx-auto px-4 space-y-12">
        {/* Featured Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Featured Movies</h2>
          <HorizontalScrollContainer>
            {newMovies?.movies?.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </HorizontalScrollContainer>
        </motion.section>

        {/* Top Rated Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Top Rated</h2>
          <HorizontalScrollContainer>
            {topMovies?.movies?.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </HorizontalScrollContainer>
        </motion.section>

        {/* Genre Movies Section */}
        <AnimatePresence>
          {filteredMovies && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                {selectedGenre ? 'Genre Movies' : 'All Movies'}
              </h2>
              <HorizontalScrollContainer>
                {filteredMovies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </HorizontalScrollContainer>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MoviesContainerPage;