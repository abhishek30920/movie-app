import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice=apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    login:builder.mutation({
      query:(body)=>({
        url:USERS_URL+"/login",
        method:"POST",
        body
      })
    }),
    register:builder.mutation({
      query:(body)=>({
        url:USERS_URL,
        method:"POST",
        body
      
      })
    }),
    logout:builder.mutation({
      query:(body)=>({
        url:USERS_URL+"/logout",
        method:"POST",
        body
      
      })
    }),
    profile:builder.mutation({
      query:(data)=>({
        url:USERS_URL+"/profile",
        method:"PUT",
        data
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),
   
  })


})   // this is going to create the login endpoint for us // what is the format of the login endpoint

export const {useLoginMutation,useRegisterMutation,useLogoutMutation,useProfileMutation, useGetUsersQuery,}=userApiSlice;  // this is going to create the login mutation for us // what is the format of the login mutation  // this is going to create the login mutation for us // what is the format of the login mutation

