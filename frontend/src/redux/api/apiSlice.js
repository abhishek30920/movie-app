import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../constants"

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL})  // this is the base query that we are going to use for the api  ., what is it is doing is that it is going to take the base url and then it is going to append the url that we are going to pass in the endpoint

export const apiSlice=createApi({
  baseQuery,
  endpoints:()=>({ }) // we are going to define the endpoints here
})