import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewsList = ({ reviews }) => {
  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
      <h3 className="text-xl font-semibold mb-6 text-white">User Reviews</h3>
      
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review, index) => (
            <div 
              key={index}
              className="border-b border-zinc-800 last:border-0 pb-6 last:pb-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-800 p-2 rounded-full">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="font-medium text-gray-300">
                    {review.name || 'Anonymous User'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-300">{review.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {review.comment}
              </p>
              
              {review.createdAt && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsList;