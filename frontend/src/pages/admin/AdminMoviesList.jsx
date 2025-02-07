import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllMoviesQuery } from '../../redux/api/movies';
import { Pencil, Film } from 'lucide-react';

function AdminMoviesList() {
  const { data: movies, isLoading, error } = useGetAllMoviesQuery();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Film className="w-6 h-6 text-purple-500" />
            <h1 className="text-2xl font-bold">
              Movies Database{' '}
              <span className="text-sm font-normal text-gray-400">
                ({movies?.movies.length} titles)
              </span>
            </h1>
          </div>
          
          <Link 
            to="/admin/movies/create" 
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 
                     rounded-lg transition duration-200 flex items-center gap-2"
          >
            <span>Add New Movie</span>
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies?.movies.map((movie) => (
            <div 
              key={movie._id} 
              className="group bg-gray-800 rounded-lg overflow-hidden 
                       transition-transform duration-300 hover:-translate-y-1 
                       hover:shadow-xl hover:shadow-purple-500/10"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover transition duration-300 
                           group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                  {movie.name}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {movie.detail}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-auto">
                  <Link
                    to={`/admin/movies/update/${movie._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 
                             bg-purple-600 hover:bg-purple-700 rounded-lg 
                             transition duration-200 text-sm"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  
                  <span className="text-sm text-gray-500">
                    ID: {movie._id.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 py-8">
            Failed to load movies. Please try again.
          </div>
        )}

        {/* Empty State */}
        {movies?.movies.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No movies found. Add some movies to get started.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMoviesList;