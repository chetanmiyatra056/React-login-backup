import "./App.css";
import Footer from "./Components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
import React from "react";
import PrivateRoute from "./Middleware/PrivateRoute";
import PublicRoute from "./Middleware/PublicRoute";
import Profile from "./Components/Profile";
import Password from "./Components/Password";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Fragment>
                <Home />
              </React.Fragment>
            }
          />

          <Route element={<PublicRoute />}>
            <Route exact path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/welcome" element={<Welcome />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/password" element={<Password />} />
          </Route>
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
