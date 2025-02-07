import { apiSlice } from './apiSlice';
import { GENRE_URL } from '../constants';

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query:({name})=>({
        url:`${GENRE_URL}`,
        method:"POST",
        body:{name}
      })
    }),

    updateGenre: builder.mutation({
    query:({id,name})=>({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),

    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    fetchGenres: builder.query({
      query: () => `${GENRE_URL}/genres`,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} = genreApiSlice;