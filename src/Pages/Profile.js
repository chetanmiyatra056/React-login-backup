import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";

function Profile() {
  let ls = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();

  const [dropdownData, setDropdownData] = useState(null);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [name, setName] = useState(ls.name);
  const [email, setEmail] = useState(ls.email);

  const [countries, setCountries] = useState([]);
  const [countriesid, setCountriesid] = useState(ls.countries);

  const [states, setStates] = useState([]);
  const [statesid, setStatesid] = useState(ls.states);

  const [cities, setCities] = useState([]);
  const [citiesid, setCitiesid] = useState(ls.cities);

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const hobbies = ["Reading", "Writting", "Gaming"];

  const [gender, setGender] = useState(ls.gender);

  const [selectDate, setSelectDate] = useState(null);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHobbies([...selectedHobbies, value]);
    } else {
      setSelectedHobbies(selectedHobbies.filter((hobbie) => hobbie !== value));
    }
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/dropdown/${ls.id}`)
      .then((response) => {
        setDropdownData(response.data);
        fetchStates(response.data.countries_id);
        fetchCities(response.data.states_id);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [ls.id]);

  const fetchCountries = async () => {
    const rescountry = await apiLaravel("/countries");
    setCountries(await rescountry);
  };

  const fetchStates = async (countryId) => {
    const resstate = await fetch(
      `http://127.0.0.1:8000/api/states/${countryId}`
    );
    const reset = await resstate.json();
    setStates(reset);
  };

  const fetchCities = async (stateId) => {
    const rescity = await fetch(`http://127.0.0.1:8000/api/cities/${stateId}`);
    const reset = await rescity.json();
    setCities(reset);
  };

  const handleCountryChange = async (e) => {
    setStates([]);
    setStatesid("0");
    setCities([]);
    const getcountriesid = e.target.value;
    setCountriesid(getcountriesid);

    fetchStates(getcountriesid);
  };

  const handleStateChange = async (e) => {
    setCitiesid("0");
    const getstatesid = e.target.value;
    setStatesid(getstatesid);

    fetchCities(getstatesid);
  };

  const handleCityChange = (e) => {
    const getcitiesid = e.target.value;
    setCitiesid(getcitiesid);
  };

  async function update(id) {
    let item = {
      name,
      email,
      hobbies: selectedHobbies,
      gender,
      countriesid,
      statesid,
      citiesid,
    };
    let response = await apiLaravel("/update/" + id, {
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
        setMessage(null);
        navigate("/profile");
      }, 1000);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  function reset() {
    window.location.reload();
  }

  if (!dropdownData) {
    return (
      <div>
        <Header />
        <div className="container my-5">
          <h1>Profile Form</h1>
          <h3 className="fw-bold">Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      {message && (
        <div>
          <div
            className={`alert alert-${type} mb-2  fixed-top`}
            style={{ marginTop: "60px" }}
          >
            {message}
          </div>
        </div>
      )}

      <div className="container my-3">
        <h1>Profile Form</h1>

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
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
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
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-check-label my-2" htmlFor="checkhobbie">
              Select Hobbies
            </label>
            <br />
            {hobbies.map((hobbie, index) => (
              <>
                <span key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input mx-2"
                    value={hobbie}
                    checked={selectedHobbies.includes(hobbie)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">{hobbie}</label>
                </span>
              </>
            ))}
            {errors.selectedHobbies && (
              <div className="text-danger">{errors.selectedHobbies}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-check-label my-2" htmlFor="gender">
              Select Gender
            </label>
            <br />

            <input
              className="form-check-input mx-2"
              type="radio"
              value="Male"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              checked={ls.gender === "Male" ? true : false}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>

            <input
              className="form-check-input mx-2"
              type="radio"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              // checked={ls.gender === "Female" ? true : false}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>

            <input
              className="form-check-input mx-2"
              type="radio"
              value="Other"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              // checked={ls.gender === "Others"}
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
            <br />
          </div>
          
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Select Date
            </label>
            <div>
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-control"
              name="countries"
              id="countries"
              value={countriesid}
              onChange={(e) => handleCountryChange(e)}
            >
              <option value="0">Select Country</option>
              {countries.map((getcon, index) => (
                <option key={index} value={getcon.countries_id}>
                  {getcon.countries_name}
                </option>
              ))}
            </select>
            {errors.countriesid && (
              <div className="text-danger">{errors.countriesid}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              className="form-control"
              name="states"
              id="states"
              value={statesid}
              onChange={(e) => handleStateChange(e)}
            >
              <option value="0">Select State</option>
              {states.map((getstate, index) => (
                <option key={index} value={getstate.states_id}>
                  {getstate.states_name}
                </option>
              ))}
            </select>
            {errors.statesid && (
              <div className="text-danger">{errors.statesid}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <select
              className="form-control"
              name="cities"
              id="cities"
              value={citiesid}
              onChange={(e) => handleCityChange(e)}
            >
              <option value="0">Select City</option>
              {cities.map((getcities, index) => (
                <option key={index} value={getcities.cities_id}>
                  {getcities.cities_name}
                </option>
              ))}
            </select>
            {errors.citiesid && (
              <div className="text-danger">{errors.citiesid}</div>
            )}
          </div>

          <button
            type="button"
            onClick={() => update(ls.id)}
            className="btn btn-primary me-2"
          >
            Update
          </button>

          <button type="button" onClick={reset} className="btn btn-danger">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
