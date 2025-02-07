import { apiSlice } from "./apiSlice";
import { MOVIE_URL,UPLOAD_URL } from "../constants";


export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    getAllMovies:builder.query({
      query:()=>`${MOVIE_URL}/all-movies`,
    }),
    getMovieById:builder.query({
      query:(id)=>`${MOVIE_URL}/${id}`,
    }),
    createMovie:builder.mutation({
      query:(movieData)=>({
        url:`${MOVIE_URL}/create-movie`,
        method:"POST",
        body:movieData,
      }),
    }),
   updateMovie: builder.mutation({
  query: ({ id, updatedMovie }) => ({  // Destructure from a single object
    url: `${MOVIE_URL}/update-movie/${id}`,
    method: "PUT",
    body: updatedMovie,
  }),
}),
    deleteMovie:builder.mutation({
      query:(id)=>({
        url:`${MOVIE_URL}/delete-movie/${id}`,
        method:"DELETE",
      }),
    }),
    uploadImage:builder.mutation({
      query:(formData)=>({
        url:UPLOAD_URL,
        method:"POST",
        body:formData,
      }),
    }),
    getMovieByGenre:builder.query({
      query:(genre)=>`${MOVIE_URL}/genre/${genre}`,
    }),
    addMovieReview:builder.mutation({
      query:({id,rating,comment})=>({
       url:`${MOVIE_URL}/${id}/reviews`,
        method:"POST",
        body:{rating,id,comment},
      }),
    }),

    deleteComment:builder.mutation({
      query:({movieId,reviewId})=>({
        url:`${MOVIE_URL}/delete-comment`,
        method:"DELETE",
        body:{movieId,reviewId},
       
      }),




    }),
    getSpecificMovie:builder.query({
      query:(id)=>`${MOVIE_URL}/specific-movie/${id}`,

   
    }),
   getNewMovies:builder.query({
    query:()=>`${MOVIE_URL}/new-movies`,
   }),
   getTopRatedMovies:builder.query({
    query:()=>`${MOVIE_URL}/top-rated-movies`,
   }),
  getRandomMovies:builder.query({
    query:()=>`${MOVIE_URL}/random-movies`,
  }),


// difference between query and mutation
// query is used to fetch data from the server
// mutation is used to send data to the server


  }),
})





export const {useGetAllMoviesQuery,useGetMovieByIdQuery,useCreateMovieMutation,useUpdateMovieMutation,useDeleteMovieMutation,useUploadImageMutation,useGetMovieByGenreQuery,useAddMovieReviewMutation,useDeleteCommentMutation,useGetSpecificMovieQuery,useGetNewMoviesQuery,useGetTopRatedMoviesQuery,useGetRandomMoviesQuery} = moviesApiSlice;