import React from "react";
import Header from "./Header";

function Profile() {
  return (
    <>
      <Header />

      {/* {message && <div className="alert alert-info">{message}</div>} */}
      <div className="container my-5">
        <h1>Profile Form</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" name="name" id="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select className="form-control" name="countries" id="countries">
              <option value="0">Select Country</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select className="form-control" name="states" id="states">
              <option value="0">Select State</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <select className="form-control" name="cities" id="cities">
              <option value="0">Select City</option>
            </select>
          </div>

          <button type="button" className="btn btn-primary me-2">
            Sign Up
          </button>

          <button type="button" className="btn btn-danger">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
