import { Link } from "react-router-dom";
import React from "react";
import { motion, AnimatePresence } from 'framer-motion'
const MovieCard = ({ movie }) => (
  <motion.div 
    className="relative w-64 h-96 shrink-0 overflow-hidden rounded-xl shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
   <Link to={`/movies/${movie._id}`}>
    <img 
      src={movie.image} 
      alt={movie.title} 
      className="absolute inset-0 w-full h-full object-cover"
    />
     <p className="absolute bottom-4 left-4 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 text-white">
        {movie.name}
      </p>
    </Link>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
      <h3 className="text-white font-bold text-lg truncate">{movie.title}</h3>
      <p className="text-gray-300 text-sm">{movie.name}</p>
    </div>

  </motion.div>
)


export default MovieCard;