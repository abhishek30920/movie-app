import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null,


}

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{  // what we want to do with the state of the application 
    setCredentials:(state,action)=>{  // action.payload is the data that we want to set in the state
      state.userInfo=action.payload  // setting the state of the application
      localStorage.setItem("userInfo",JSON.stringify(action.payload))  // setting the local storage
      const expirationTime=new Date().getTime()+30*24*60*60*1000
      localStorage.setItem("expirationTime",expirationTime)
    },

    logout:(state)=>{
      state.userInfo=null
      localStorage.removeItem("userInfo")
      localStorage.removeItem("expirationTime")
    }
  }

})

export const {setCredentials,logout}=authSlice.actions
export default authSlice.reducer