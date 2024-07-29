import React, { useEffect, useState } from "react";
import Header from "./Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [countries, setCountries] = useState([]);
  const [countriesid, setCountriesid] = useState("0");

  const [states, setStates] = useState([]);
  const [statesid, setStatesid] = useState("0");

  const [cities, setCities] = useState([]);
  const [citiesid, setCitiesid] = useState("0");

  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    // Initialize form data
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setCountriesid(user.countries || "0");
      setStatesid(user.states || "0");
      setCitiesid(user.cities || "0");
    }
    fetchCountries();
  }, [user]);

  const fetchCountries = async () => {
    try {
      const rescountry = await apiLaravel("/countries");
      console.log("Countries fetched:", rescountry); // Debugging line
      setCountries(rescountry);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryChange = async (e) => {
    const getcountriesid = e.target.value;
    setCountriesid(getcountriesid);
    setStates([]);
    setStatesid("0");
    setCities([]);
    setCitiesid("0");

    try {
      const resstate = await fetch(`http://127.0.0.1:8000/api/states/${getcountriesid}`);
      const reset = await resstate.json();
      console.log("States fetched:", reset); // Debugging line
      setStates(reset);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleStateChange = async (e) => {
    const getstatesid = e.target.value;
    setStatesid(getstatesid);
    setCities([]);
    setCitiesid("0");

    try {
      const rescity = await fetch(`http://127.0.0.1:8000/api/cities/${getstatesid}`);
      const reset = await rescity.json();
      console.log("Cities fetched:", reset); // Debugging line
      setCities(reset);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityChange = (e) => {
    setCitiesid(e.target.value);
  };

  async function update() {
    let item = {
      name,
      email,
      countriesid,
      statesid,
      citiesid,
    };
    try {
      let response = await apiLaravel(`/update/${user.id}`, {
        method: "POST",
        body: JSON.stringify(item),
      });

      if (response.status === false) {
        setErrors(response.error);
        setMessage(response.message);
      } else {
        setErrors({});
        setMessage("User updated successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  function reset() {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setCountriesid(user?.countries || "0");
    setStatesid(user?.states || "0");
    setCitiesid(user?.cities || "0");
    setMessage("");
  }

  return (
    <>
      <Header />
      {message && <div className="alert alert-info">{message}</div>}
      <div className="container my-5">
        <h1>Profile Form</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <select
              className="form-control"
              name="countries"
              id="countries"
              value={countriesid}
              onChange={handleCountryChange}
            >
              <option value="0">Select Country</option>
              {countries.map((getcon, index) => (
                <option key={index} value={getcon.countries_id}>
                  {getcon.countries_name}
                </option>
              ))}
            </select>
            {errors.countries && <div className="text-danger">{errors.countries}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <select
              className="form-control"
              name="states"
              id="states"
              value={statesid}
              onChange={handleStateChange}
            >
              <option value="0">Select State</option>
              {states.map((getstate, index) => (
                <option key={index} value={getstate.states_id}>
                  {getstate.states_name}
                </option>
              ))}
            </select>
            {errors.states && <div className="text-danger">{errors.states}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <select
              className="form-control"
              name="cities"
              id="cities"
              value={citiesid}
              onChange={handleCityChange}
            >
              <option value="0">Select City</option>
              {cities.map((getcities, index) => (
                <option key={index} value={getcities.cities_id}>
                  {getcities.cities_name}
                </option>
              ))}
            </select>
            {errors.cities && <div className="text-danger">{errors.cities}</div>}
          </div>

          <button type="button" onClick={update} className="btn btn-primary me-2">Update</button>
          <button type="button" onClick={reset} className="btn btn-danger">Reset</button>
        </form>
      </div>
    </>
  );
}

export default Profile;
