import React from "react";
import Header from "./Header";

function Password() {
  function reset() { }

  return (
    <div>
      <Header />
      <div className="container mb-3">
        <h1>Password Change</h1>

        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Current Password
            </label>
            <input
              type="text"
              className="form-control"
              name="cpassword"
              id="cpassword"
            />
            {/* {errors.cpassword && <div className="text-danger">{errors.cpassword}</div>} */}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              New Password
            </label>
            <input
              type="text"
              className="form-control"
              name="npassword"
              id="npassword"
            />
            {/* {errors.npassword && <div className="text-danger">{errors.npassword}</div>} */}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form-control"
              name="copassword"
              id="copassword"
            />
            {/* {errors.copassword && <div className="text-danger">{errors.copassword}</div>} */}
          </div>

          <button type="button" className="btn btn-primary me-2">
            Submit
          </button>

          <button type="button" onClick={reset} className="btn btn-danger">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default Password;
