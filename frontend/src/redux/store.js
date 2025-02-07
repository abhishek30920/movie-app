import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from '@reduxjs/toolkit/query/react';
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import movieReducer from "./features/movies/movieSlice";

const store=configureStore( {
  reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authReducer,
    movie:movieReducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true

})

export default store