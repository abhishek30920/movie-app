import React from "react";
import { Outlet ,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
return userInfo ? <Outlet /> : <Navigate to="/login" replace/>
}

export default AdminRoutes;
