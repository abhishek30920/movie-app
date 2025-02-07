import React from 'react';
import { StarIcon } from 'lucide-react';

const MovieTabs = ({ userInfo, submitHandler, rating, comment, setRating, setComment, loadingMovieReview }) => {
  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-6 text-white">Write a Review</h3>
        
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <StarIcon
                      className={`w-6 h-6 ${
                        rating >= star 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Your Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about the movie..."
                className="w-full min-h-[120px] p-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loadingMovieReview}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMovieReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400 mb-4">Please login to write a review</p>
            <a 
              href="/login"
              className="inline-block px-4 py-2 border border-zinc-700 text-white hover:bg-zinc-800 rounded-md transition-colors"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTabs;