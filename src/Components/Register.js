import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { apiLaravel } from "./Api";
import LoginMiddleware from "../Middlewares/LoginMiddleware";

function Register() {
  const navigate = useNavigate();

  LoginMiddleware();
  // useEffect(() => {
  //   if (localStorage.getItem("user-info")) {
  //     navigate("/login");
  //   }
  // });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = ["Username is required"];
    }

    if (!email) {
      newErrors.email = ["Email is required"];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = ["Email address is invalid"];
    }

    if (!password) {
      newErrors.password = ["Password is required"];
    } else if (password.length < 4) {
      newErrors.password = ["Password must be at least 4 characters"];
    }

    if (!confirm_password) {
      newErrors.confirm_password = ["Confirm Password is required"];
    } else if (password !== confirm_password) {
      newErrors.confirm_password = ["Passwords do not match"];
    }

    return newErrors;
  };


  async function signUp() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      let item = { name, email, password, confirm_password };
      let response = await apiLaravel("/register", {
        method: "POST",
        body: JSON.stringify(item),
      });

      if (response.status === false) {
        setErrors(response.error);
        setMessage(response.message);
      } else {
        setErrors({});
        setMessage("User registered successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <>
      <Header />
      {message && <div className="alert alert-info">{message}</div>}
      <div className="container my-5">
        <h1>Register Form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="text-danger">{errors.name[0]}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
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
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="text-danger">{errors.password[0]}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              id="confirm_password"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
            />
            {errors.confirm_password && <div className="text-danger">{errors.confirm_password[0]}</div>}
          </div>

          <button
            type="button"
            onClick={signUp}
            className="btn btn-primary me-2"
          >
            Sign Up
          </button>
          <button type="reset" className="btn btn-danger">
            Reset
          </button>
          <p className="mt-2">
            You already Register Now you can{" "}
            <Link className="link" to="/login">
              Sing In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
