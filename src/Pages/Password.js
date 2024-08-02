import React, { useState } from "react";
import Header from "../Components/Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";

function Password() {
  let ls = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("");

  const [current_password, setCurrent_password] = useState("");

  const [new_password, setNew_password] = useState("");

  const [confirm_password, setConfirm_password] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!current_password) {
      newErrors.current_password = "Current password is required";
    } else if (current_password.length < 4) {
      newErrors.current_password =
        "Current password must be at minimum 4 characters";
    } else if (current_password.length > 8) {
      newErrors.current_password =
        "Current password must be at maximum 8 characters";
    }

    if (!new_password) {
      newErrors.new_password = "New password is required";
    } else if (new_password.length < 4) {
      newErrors.new_password = "New password must be at minimum 4 characters";
    } else if (new_password.length > 8) {
      newErrors.new_password = "New password must be at maximum 8 characters";
    }

    if (!confirm_password) {
      newErrors.confirm_password = "Confirm Password is required";
    } else if (new_password !== confirm_password) {
      newErrors.confirm_password = "Confirm password do not match";
    }

    return newErrors;
  };

  async function change(id) {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      let item = {
        current_password,
        new_password,
        confirm_password,
      };

      let response = await apiLaravel("/upassword/" + id, {
        method: "POST",
        body: JSON.stringify(item),
      });

      if (response.status === false) {
        setErrors(response.error);
        setMessage(response.message);
        setType(response.type);
      } else {
        setErrors({});
        setMessage(response.message);
        setType(response.type);
        setTimeout(() => {
          setMessage(null);
          navigate("/password");
        }, 1000);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  function reset() {
    window.location.reload();
  }

  return (
    <div>
      <Header />
      {message && (
        <div>
          <div className={`alert alert-${type} mb-2  fixed-top`} style={{marginTop:"60px"}}>{message}</div>
        </div>
      )}
      <div className="container mb-3">
        <h1>Password Change</h1>

        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              className="form-control"
              name="current_password"
              id="current_password"
              onChange={(e) => setCurrent_password(e.target.value)}
            />
            {errors.current_password && (
              <div className="text-danger">{errors.current_password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              name="new_password"
              id="new_password"
              onChange={(e) => setNew_password(e.target.value)}
            />
            {errors.new_password && (
              <div className="text-danger">{errors.new_password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              id="confirm_password"
              onChange={(e) => setConfirm_password(e.target.value)}
            />
            {errors.confirm_password && (
              <div className="text-danger">{errors.confirm_password}</div>
            )}
          </div>

          <button
            type="button"
            onClick={() => change(ls.id)}
            className="btn btn-primary me-2"
          >
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
