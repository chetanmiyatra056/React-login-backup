import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // let user = JSON.parse(localStorage.getItem("user-info"));
  // console.warn(user);

  // const navigate = useNavigate();

  // function logOut() {
  //   localStorage.clear();
  //   navigate("/login")
  // }

  return (
    <div style={{ marginBottom: "80px" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            React Project
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("user-info") ? (
                <>
                  {/* With Login */}

                  <li className="nav-item">
                    <Link className="nav-link active" to="/welcome">
                      Welcome
                    </Link>
                  </li>

                  {/* <li className="nav-item dropdown">
                    <Link
                      className="nav-link active dropdown-toggle"
                      id="users"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user && user.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" onClick={logOut} >
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </li> */}
                </>
              ) : (
                <>
                  {/* With out Login */}
                  <li className="nav-item">
                    <Link className="nav-link active" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
