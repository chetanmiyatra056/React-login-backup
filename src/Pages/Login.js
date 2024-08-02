import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiLaravel } from "../Utils/Apiurl";
import Header from "../Components/Header";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be at minimum 4 characters";
    }else if (password.length > 8) {
      errors.password = "Password must be at maximum 8 characters";
    }

    return errors;
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
        setType(response.type);
      } else {
        setErrors({});
        setMessage(response.message);
        setType(response.type);
        setTimeout(() => {
          localStorage.setItem("user-info", JSON.stringify(response.data));
          navigate("/welcome");
        }, 1000);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  function reset() {
    window.location.reload()
  }

  return (
    <div>
      <Header/>
      {message && (
        <div>
          <div className={`alert alert-${type} mb-2  fixed-top`} style={{marginTop:"60px"}}>{message}</div>
        </div>
      )}
      <div className="container my-5">
        <h1>Login Form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
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
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          <button
            type="button"
            onClick={login}
            className="btn btn-primary me-2"
          >
            Sign In
          </button>

          <button type="button" onClick={reset} className="btn btn-danger">
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
