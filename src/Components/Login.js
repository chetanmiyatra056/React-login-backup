import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { apiLaravel } from "./Api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = ["Email is required"];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = ["Email address is invalid"];
    }

    if (!password) {
      newErrors.password = ["Password is required"];
    }

    return newErrors;
  };

  async function login() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      let item = { email, password };

      let response = await apiLaravel("/login", {
        method: "POST",
        body: JSON.stringify(item),
      });

      if (response.status === false) {
        setErrors(response.error);
        setMessage(response.message);
      } else {
        setErrors({});
        setMessage("User logged in successfully.");
        localStorage.setItem("user-info", JSON.stringify(response.data));
        setTimeout(() => {
          navigate("/welcome"); // Adjust the redirect URL as needed
        }, 2000); // Navigate to dashboard after 2 seconds
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <div>
      <Header />
      {message && <div className="alert alert-success">{message}</div>}
      <div className="container my-5">
        <h1>Login Form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email[0]}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="text-danger">{errors.password[0]}</div>}
          </div>

          <button type="button" onClick={login} className="btn btn-primary me-2">
            Sign In
          </button>

          <button type="reset" className="btn btn-danger">
            Reset
          </button>

          <p className="mt-2">
            You can not Account Now you can first{" "}
            <Link className="link" to="/register">
              Sing Up
            </Link>{" "}
            your self
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
