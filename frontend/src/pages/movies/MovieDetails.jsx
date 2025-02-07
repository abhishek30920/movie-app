import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetSpecificMovieQuery, useAddMovieReviewMutation } from '../../redux/api/movies';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MovieTabs from './MovieTabs';
import { ArrowLeft, Calendar, Star, PlayCircle, Video } from 'lucide-react';
import ReviewsList from './ReviewsList';

function MovieDetails() {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleTrailerClick = () => {
    // Replace this URL with the actual trailer URL from your movie data
    const trailerUrl = movie.movie.trailerUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.movie.name + ' trailer')}`;
    window.open(trailerUrl, '_blank');
  };

  const handleWatchNowClick = () => {
    // Replace this URL with the actual streaming URL from your movie data
    const streamingUrl = movie.movie.streamingUrl || `https://www.google.com/search?q=watch+${encodeURIComponent(movie.movie.name)}+online`;
    window.open(streamingUrl, '_blank');
  };

  if (!movie?.movie) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <a 
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Movies
        </a>

        {/* Movie Title and Basic Info */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.movie.name}</h1>
          <div className="flex items-center justify-center gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{movie.movie.year}</span>
            </div>
            {movie.movie.rating && (
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{movie.movie.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* New Watch Options Section */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleTrailerClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
            >
              <PlayCircle className="w-5 h-5" />
              Watch Trailer
            </button>
            <button
              onClick={handleWatchNowClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
            >
              <Video className="w-5 h-5" />
              Watch Now
            </button>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="relative aspect-video w-full max-w-4xl mx-auto mb-12">
          <img
            src={movie.movie.image}
            alt={movie.movie.name}
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-gray-400 leading-relaxed text-lg mb-8">{movie.movie.detail}</p>
          
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {movie.movie.cast.map((actor, index) => (
                <div 
                  key={index}
                  className="p-2 bg-zinc-800 rounded text-sm text-gray-300 text-center"
                >
                  {actor}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            comment={comment}
            setRating={setRating}
            setComment={setComment}
            movie={movie}
          />
          
          <ReviewsList reviews={movie.movie.reviews || []} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;