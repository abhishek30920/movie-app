import React from "react"
import { Navigate,Outlet } from "react-router"
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";



function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
return userInfo ? <Outlet /> : <Navigate to="/login" replace/>
}

export default PrivateRoute