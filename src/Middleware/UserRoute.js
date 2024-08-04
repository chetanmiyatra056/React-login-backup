import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UserRoute() {
  const ls = JSON.parse(localStorage.getItem("user-info"));

  return ls.type === "user" ? <Outlet /> : <Navigate to="/seller" />;
}

export default UserRoute;
