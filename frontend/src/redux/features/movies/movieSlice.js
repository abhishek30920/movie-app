import {createSlice} from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
      moviesFilter:{
        search: '',
        selectedGenre: "",
        selectedYear: "",
        SelectedSort: "",
      },
      filteredMovies: [],
      movieYear: [],
      uniqueYear: [],
    },
    reducers:{
        setMoviesFilter: (state,action) => { // what this do //  this is used to filter the movies based on the genre, year, and sort
            state.moviesFilter = action.payload
        },
        setFilteredMovies: (state,action) => {  // what this do //  this is used to filter the movies based on the genre, year, and sort
  console.log(action.payload)
            state.filteredMovies = action.payload
        },
        setMovieYear: (state,action) => {  
            state.movieYear = action.payload
        },
        setUniqueYears: (state,action) => {
            state.uniqueYear = action.payload
        },
        resetMovieFilter: (state) => {
            state.moviesFilter = {
                search: '',
                selectedGenre: "",
                selectedYear: "",
                SelectedSort: "",
            }
        }
    }
})


export const { setMoviesFilter, setFilteredMovies, setMovieYear, setUniqueYears, resetMovieFilter } = movieSlice.actions
export default movieSlice.reducer

