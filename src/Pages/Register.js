import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiLaravel } from "../Utils/Apiurl";
import Header from "../Components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { format } from "date-fns";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const [countries, setCountries] = useState([]);
  const [countriesid, setCountriesid] = useState("0");

  const [states, setStates] = useState([]);
  const [statesid, setStatesid] = useState("0");

  const [cities, setCities] = useState([]);
  const [citiesid, setCitiesid] = useState("0");

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const hobbies = ["Reading", "Writting", "Gaming"];

  const [gender, setGender] = useState();

  const [selectDate, setSelectDate] = useState(null);

  const [userType, setUserType] = useState("0");

  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");


  const validate = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at minimum 4 characters";
    } else if (password.length > 8) {
      newErrors.password = "Password must be at maximum 8 characters";
    }

    if (!confirm_password) {
      newErrors.confirm_password = "Confirm Password is required";
    } else if (password !== confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (selectedHobbies.length === 0) {
      newErrors.selectedHobbies = "Please select at least one hobby.";
    }

    if (!gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!selectDate) {
      newErrors.selectDate = "Date is required.";
    }

    if (countriesid === "0") {
      newErrors.countriesid = "Country is required";
    }

    if (statesid === "0") {
      newErrors.statesid = "State is required";
    }

    if (citiesid === "0") {
      newErrors.citiesid = "City is required";
    }

    if (userType === "0") {
      newErrors.userType = "Type is required";
    }
    if (!file) {
      newErrors.file = "Profile picture is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        newErrors.file = "Only JPEG, PNG and GIF files are allowed";
      }
      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        newErrors.file = "File size must be less than 1MB";
      }
    }

    return newErrors;
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHobbies([...selectedHobbies, value]);
    } else {
      setSelectedHobbies(selectedHobbies.filter((hobbie) => hobbie !== value));
    }
  };

  const fetchCountries = async () => {
    const rescountry = await apiLaravel("/countries");
    setCountries(await rescountry);
  };

  const handleCountryChange = async (e) => {
    setStates([]);
    setStatesid("0");
    setCities([]);
    const getcountriesid = e.target.value;
    setCountriesid(getcountriesid);

    const resstate = await fetch(
      `http://127.0.0.1:8000/api/states/${getcountriesid}`
    );
    const reset = await resstate.json();
    setStates(reset);
  };

  const handleStateChange = async (e) => {
    setCitiesid("0");
    const getstatesid = e.target.value;
    setStatesid(getstatesid);

    const rescity = await fetch(
      `http://127.0.0.1:8000/api/cities/${getstatesid}`
    );
    const reset = await rescity.json();
    setCities(reset);
  };

  const handleCityChange = (e) => {
    const getcitiesid = e.target.value;
    setCitiesid(getcitiesid);
  };

  async function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function signUp() {
    const fileBase64 = await convertFileToBase64(file);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      let item = {
        name,
        email,
        password,
        confirm_password,
        hobbies: selectedHobbies,
        gender,
        selectDate: selectDate ? format(selectDate, "yyyy-MM-dd") : null,
        countriesid,
        statesid,
        citiesid,
        userType,
        file: fileBase64,
      };
      let response = await apiLaravel("/register", {
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
          navigate("/login");
        }, 1000);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  function reset() {
    window.location.reload();
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
      <div className="container my-5">
        <h1>Register Form</h1>

        <form enctype="multipart/form-data">
          {/* Name filed */}
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
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          {/* Email filed */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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

          {/* Password filed */}
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
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          {/* Confirm password filed */}
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
            {errors.confirm_password && (
              <div className="text-danger">{errors.confirm_password}</div>
            )}
          </div>

          {/* Hobbies filed */}
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

          {/* Gender filed */}
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
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>

            <input
              className="form-check-input mx-2"
              type="radio"
              value="Female"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
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
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
            <br />
            {errors.gender && (
              <div className="text-danger">{errors.gender}</div>
            )}
          </div>

          {/* Datepicker filed */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Select Date
            </label>
            <div>
              <DatePicker
                className="form-control"
                id="date"
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
                todayButton="TODAY"
                isClearable
              />
            </div>
            {errors.selectDate && (
              <div className="text-danger">{errors.selectDate}</div>
            )}
          </div>

          {/* Countries filed */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-control"
              name="countriesid"
              id="countries"
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

          {/* States filed */}
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              className="form-control"
              name="statesid"
              id="states"
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

          {/* Cities filed */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <select
              className="form-control"
              name="citiesid"
              id="cities"
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

          {/* Type filed */}
          <div className="form-group mb-3">
            <label htmlFor="type">Type</label>
            <select
              className="form-select"
              name="type"
              id="type"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="o">Select your type</option>
              <option value="seller">Seller</option>
              <option value="user">User</option>
            </select>
            {errors.userType && (
              <div className="text-danger">{errors.userType}</div>
            )}
          </div>

          {/* Profile filed incompleted */}
          <div className="form-group mb-3">
            <label htmlFor="profile" className="form-label">
              Choose Profile
            </label>
            <input
              className="form-control"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {errors.file && (
              <div className="text-danger">{errors.file}</div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={signUp}
            className="btn btn-primary me-2"
          >
            Sign Up
          </button>

          {/* Reset button */}
          <button type="button" onClick={reset} className="btn btn-danger">
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
