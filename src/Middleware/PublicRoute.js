import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("user-info");
  return token ? <Navigate to="/welcome" /> : <Outlet />;
};

export default PublicRoute;
