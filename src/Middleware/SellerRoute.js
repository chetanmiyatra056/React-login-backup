import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function SellerRoute() {
  const ls = JSON.parse(localStorage.getItem("user-info"));

  return ls.type === "seller" ?  <Outlet />  : <Navigate to="/user" />;
}

export default SellerRoute;
