import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SliderUtil = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const movies = data?.movies || [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (!movies.length) return null;

  return (
    <div className="relative w-full aspect-[21/9] bg-zinc-900 rounded-lg overflow-hidden group">
      {/* Main Image */}
      <div className="absolute inset-0">
        <img
          src={movies[currentSlide]?.image}
          alt={movies[currentSlide]?.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
          {movies[currentSlide]?.name}
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl">
          {movies[currentSlide]?.detail}
        </p>
       
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 
                 text-white opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 
                 text-white opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 
                     ${currentSlide === index ? 'bg-white w-4' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderUtil;