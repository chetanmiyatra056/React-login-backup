import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  let user = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();

  function logOut() {
    const confirm = window.confirm("Are you sure to logout?");
    if (confirm) {
      localStorage.clear();
      navigate("/login");
    }
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="p-5 bg-dark text-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Hello {user && user.email}</h1>
            <p className="col-md-8 fs-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ipsam
              ducimus voluptas sit. Quisquam, animi facilis iure error id
              accusamus cumque rerum amet at placeat eaque aperiam nobis quo
              culpa eius tempora dolores aspernatur.
            </p>

            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
