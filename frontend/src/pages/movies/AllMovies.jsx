import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  useGetAllMoviesQuery, 
  useGetNewMoviesQuery, 
  useGetTopRatedMoviesQuery, 
  useGetRandomMoviesQuery 
} from "../../redux/api/movies"
import { useFetchGenresQuery } from "../../redux/api/genre"
import { useSelector, useDispatch } from "react-redux"
import MovieCard from "./MovieCard"
import { 
  setMoviesFilter, 
  setFilteredMovies, 
  setMovieYear, 
  setUniqueYears 
} from "../../redux/features/movies/movieSlice.js"
import { Search, Filter, Calendar, TrendingUp, Shuffle } from 'lucide-react'
import logo from '../../assets/image.png'
const AllMovies = () => {
  const dispatch = useDispatch()
  const { data } = useGetAllMoviesQuery()
  const { data: genres } = useFetchGenresQuery()
  const { data: newMovies } = useGetNewMoviesQuery()
  const { data: topMovies } = useGetTopRatedMoviesQuery()
  const { data: randomMovies } = useGetRandomMoviesQuery()
console.log(newMovies)
console.log(randomMovies)
  const { moviesFilter, filteredMovies } = useSelector((movie)=>movie.movie)
  console.log(moviesFilter)
  const [backgroundPoster, setBackgroundPoster] = useState('')

  // Select a random movie for background
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (data?.movies && data?.movies.length > 0) {
        const randomMovie = data?.movies[Math.floor(Math.random() * data?.movies.length)]
        console.log(randomMovie)
        setBackgroundPoster(randomMovie.image || randomMovie.banner)
      }
    }, 5000)  // Change background every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [data])



  // Initial data setup
  useEffect(() => {
    const movieYears = data?.movies?.map((movie) => movie.year)
    const uniqueYears = Array.from(new Set(movieYears))

    dispatch(setFilteredMovies(data || []))
    dispatch(setMovieYear(movieYears))
    dispatch(setUniqueYears(uniqueYears))
  }, [data, dispatch])

  // Filter and Search Handlers
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value
    dispatch(setMoviesFilter({ ...moviesFilter, search: searchTerm }))

    const filteredMovies = data.movies.filter((movie) => 
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log(filteredMovies)
    dispatch(setFilteredMovies({ movies: filteredMovies }))
  }

  const handleGenreClick = (genreId) => {
    dispatch(setMoviesFilter({ ...moviesFilter, selectedGenre: genreId }))
    const filterByGenre = data.movies.filter((movie) => movie.genre === genreId)
    dispatch(setFilteredMovies({ movies: filterByGenre }))
  }

  const handleYearChange = (year) => {
    dispatch(setMoviesFilter({ ...moviesFilter, selectedYear: year }))
    const filterByYear = data.movies.filter((movie) => movie.year === +year)
    dispatch(setFilteredMovies({ movies: filterByYear }))
  }

  const handleSortChange = (sortOption) => {
    dispatch(setMoviesFilter({ ...moviesFilter, SelectedSort: sortOption }))
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies( newMovies ))
        break
      case "top":
        dispatch(setFilteredMovies( topMovies ))
        break
      case "random":
        dispatch(setFilteredMovies(  randomMovies ))
        break
      default:
        dispatch(setFilteredMovies({ movies: data || [] }))
        break
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Dynamic Background with improved overlay */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center h-[50rem]"
        style={{ 
          backgroundImage: `url(${backgroundPoster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7) contrast(1.5)',
          top: 0

        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

      {/* Content Container - Adjusted padding for better mobile spacing */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 mt-12 md:mt-42">
        {/* Hero Section with improved responsiveness */}
        <motion.div 
          className="text-center text-white mb-12 md:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
        
        <div className='flex items-center justify-center'>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4">The Movies Hub</h1>
        
          </div>
         
          <p className="text-xl md:text-2xl text-gray-300">
            Cinematic Odyssey: Unveiling the Magic of Movies

          </p>

        </motion.div>

        {/* Search and Filter Section with improved mobile layout */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-white/10 shadow-2xl">
            {/* Search Input with improved contrast */}
            <div className="relative mb-4 md:mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search Movies"
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-white/20 focus:border-red-500 focus:outline-none transition-colors"
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Filter Selects with improved mobile layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {/* Genre Select */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select 
                  className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-black/40 text-white border border-white/20 cursor-pointer hover:bg-black/50 transition-colors"
                  value={moviesFilter.selectedGenre || ''}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="" className="bg-gray-900">Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id} className="bg-gray-900">{genre.name}</option>
                  ))}
                </select>
              </div>

              {/* Year and Sort selects with same styling */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select 
                  className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-black/40 text-white border border-white/20 cursor-pointer hover:bg-black/50 transition-colors"
                  value={moviesFilter.selectedYear || ''}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="" className="bg-gray-900">Year</option>
                  {Array.from(new Set(data?.movies?.map(movie => movie.year)))
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <option 
                        key={year} 
                        value={year} 
                        className="bg-gray-900"
                      >
                        {year}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div className="relative">
                <Shuffle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select 
                  className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-black/40 text-white border border-white/20 cursor-pointer hover:bg-black/50 transition-colors"
                  value={moviesFilter.selectedSort || ''}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="" className="bg-gray-900">Sort By</option>
                  <option value="new" className="bg-gray-900">New Movies</option>
                  <option value="top" className="bg-gray-900">Top Movies</option>
                  <option value="random" className="bg-gray-900">Random Movies</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Movies Grid with improved responsive layout and centering */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredMovies?.movies?.map((movie) => (
            <motion.div
              key={movie._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-full max-w-[300px]"
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AllMovies