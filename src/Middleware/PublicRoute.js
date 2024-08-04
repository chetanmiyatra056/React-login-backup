import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("user-info");

  const ls = JSON.parse(localStorage.getItem("user-info"));

  return !token ? (
    <Outlet />
  ) : (
    <>
      {ls.type === "seller" ? (
        <>
          <Navigate to="/seller" />
        </>
      ) : (
        <>
          <Navigate to="/user" />
        </>
      )}
    </>
  );
};

export default PublicRoute;
