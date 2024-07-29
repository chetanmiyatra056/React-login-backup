// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "./Header";
// import { apiLaravel } from "../Utils/Apiurl";

// function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm_password, setConfirm_password] = useState("");

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const [countries, setCountries] = useState([]);
//   const [countriesid, setCountriesid] = useState("0");

//   const [states, setStates] = useState([]);
//   const [statesid, setStatesid] = useState("0");

//   const [cities, setCities] = useState([]);
//   const [citiesid, setCitiesid] = useState("0");

//   const validate = () => {
//     const newErrors = {};

//     if (!name) {
//       newErrors.name = "Username is required";
//     }

//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email address is invalid";
//     }

//     if (countriesid === "0") {
//       newErrors.countriesid = "Country is required";
//     }

//     if (statesid === "0") {
//       newErrors.statesid = "State is required";
//     }

//     if (citiesid === "0") {
//       newErrors.citiesid = "City is required";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 4) {
//       newErrors.password = "Password must be at minimum 4 characters";
//     } else if (password.length > 8) {
//       newErrors.password = "Password must be at maximum 8 characters";
//     }

//     if (!confirm_password) {
//       newErrors.confirm_password = "Confirm Password is required";
//     } else if (password !== confirm_password) {
//       newErrors.confirm_password = "Passwords do not match";
//     }

//     return newErrors;
//   };

//   const fetchCountries = async () => {
//     const rescountry = await apiLaravel("/countries");
//     setCountries(await rescountry);
//   };

//   const handleCountryChange = async (e) => {
//     setStatesid("0"); // Reset states selection
//     const getcountriesid = e.target.value;
//     setCountriesid(getcountriesid);

//     const resstate = await apiLaravel(
//       `/states/${getcountriesid}`
//     );
//     // const reset = await resstate.json();
//     setStates(await resstate);
//     setCities([]); // Reset cities selection
//   };

//   const handleStateChange = async (e) => {
//     const getstatesid = e.target.value;
//     setStatesid(getstatesid);

//     const rescity = await apiLaravel(
//       `/cities/${getstatesid}`
//     );
//     // const reset = await rescity.json();
//     setCities(await rescity);
//     setCitiesid("0"); // Reset cities selection
//   };

//   const handleCityChange = (e) => {
//     const getcitiesid = e.target.value;
//     setCitiesid(getcitiesid);
//   };

//   async function signUp() {
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       let item = {
//         name,
//         email,
//         countriesid,
//         statesid,
//         citiesid,
//         password,
//         confirm_password,
//       };
//       let response = await apiLaravel("/register", {
//         method: "POST",
//         body: JSON.stringify(item),
//       });

//       if (response.status === false) {
//         setErrors(response.error);
//         setMessage(response.message);
//       } else {
//         setErrors({});
//         setMessage("User registered successfully.");
//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   }

//   function reset() {
//     setName("");
//     setEmail("");
//     setPassword("");
//     setConfirm_password("");
//     setErrors({});
//     setMessage("");
//     setCountriesid("0");
//     setStates([]);
//     setStatesid("0");
//     setCities([]);
//     setCitiesid("0");
//   }

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   return (
//     <>
//       <Header />

//       {message && <div className="alert alert-info">{message}</div>}
//       <div className="container my-5">
//         <h1>Register Form</h1>
//         <form>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Username
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             {errors.name && <div className="text-danger">{errors.name}</div>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <div className="text-danger">{errors.email}</div>}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="country" className="form-label">
//               Country
//             </label>
//             <select
//               className="form-control"
//               name="countriesid"
//               id="countries"
//               onChange={(e) => handleCountryChange(e)}
//             >
//               <option value="0">Select Country</option>
//               {countries.map((getcon, index) => (
//                 <option key={index} value={getcon.countries_id}>
//                   {getcon.countries_name}
//                 </option>
//               ))}
//             </select>
//             {errors.countriesid && (
//               <div className="text-danger">{errors.countriesid}</div>
//             )}

//           </div>

//           <div className="mb-3">
//             <label htmlFor="state" className="form-label">
//               State
//             </label>
//             <select
//               className="form-control"
//               name="statesid"
//               id="states"
//               onChange={(e) => handleStateChange(e)}
//             >
//               <option value="0">Select State</option>

//               {states.map((getstate, index) => (
//                 <option key={index} value={getstate.states_id}>
//                   {getstate.states_name}
//                 </option>
//               ))}
//             </select>
//             {errors.statesid && (
//               <div className="text-danger">{errors.statesid}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="city" className="form-label">
//               City
//             </label>
//             <select className="form-control" name="citiesid" id="cities" onChange={(e) => handleCityChange(e)}>
//               <option value="0">Select City</option>

//               {cities.map((getcities, index) => (
//                 <option key={index} value={getcities.cities_id}>
//                   {getcities.cities_name}
//                 </option>
//               ))}
//             </select>
//             {errors.citiesid && (
//               <div className="text-danger">{errors.citiesid}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               name="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errors.password && (
//               <div className="text-danger">{errors.password}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="confirm_password" className="form-label">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               name="confirm_password"
//               id="confirm_password"
//               value={confirm_password}
//               onChange={(e) => setConfirm_password(e.target.value)}
//             />
//             {errors.confirm_password && (
//               <div className="text-danger">{errors.confirm_password}</div>
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={signUp}
//             className="btn btn-primary me-2"
//           >
//             Sign Up
//           </button>

//           <button type="button" onClick={reset} className="btn btn-danger">
//             Reset
//           </button>

//           <p className="mt-2">
//             You already Register Now you can{" "}
//             <Link className="link" to="/login">
//               Sing In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Register;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiLaravel } from "../Utils/Apiurl";
import Header from "./Header";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [countries, setCountries] = useState([]);
  const [countriesid, setCountriesid] = useState("0");

  const [states, setStates] = useState([]);
  const [statesid, setStatesid] = useState("0");

  const [cities, setCities] = useState([]);
  const [citiesid, setCitiesid] = useState("0");

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

    if (countriesid === "0") {
      newErrors.countriesid = "Country is required";
    }

    if (statesid === "0") {
      newErrors.statesid = "State is required";
    }

    if (citiesid === "0") {
      newErrors.citiesid = "City is required";
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

    return newErrors;
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

  async function signUp() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      let item = {
        name,
        email,
        countriesid,
        statesid,
        citiesid,
        password,
        confirm_password,
      };
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
    setName("");
    setEmail("");
    setPassword("");
    setConfirm_password("");
    setErrors({});
    setMessage("");
    setCountriesid("0");
    setStates([]);
    setStatesid("0");
    setCities([]);
    setCitiesid("0");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

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

          <button
            type="button"
            onClick={signUp}
            className="btn btn-primary me-2"
          >
            Sign Up
          </button>

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
