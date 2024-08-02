import "./App.css";
import Footer from "./Components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";
import React from "react";
import PrivateRoute from "./Middleware/PrivateRoute";
import PublicRoute from "./Middleware/PublicRoute";
import Profile from "./Pages/Profile";
import Password from "./Pages/Password";
import Demo from "./Pages/Demo_update";

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

            <Route path="/demo update" element={<Demo />} />
          </Route>
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
