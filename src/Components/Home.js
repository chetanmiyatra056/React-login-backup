import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Home() {

  const navigate = useNavigate();

  function logOut() {
    const confirm = window.confirm('Are you sure to logout?');
    if (confirm) {
      localStorage.clear();
      navigate("/login")
    }
  }

  return (
    <div>
      <Header />
      <div className="container my-3">
        <div className="p-5 bg-dark text-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Welcome to React Project</h1>
            <p className="col-md-8 fs-4">
              Using a series of utilities, you can create this jumbotron, just
              like the one in previous versions of Bootstrap. Check out the
              examples below for how you can remix and restyle it to your
              liking.
            </p>

            {localStorage.getItem("user-info") ? (
              <>
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={logOut}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-primary btn-lg"
                  type="button"
                  to="/login"
                >
                  Now Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
