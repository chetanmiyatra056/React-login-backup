// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import { apiLaravel } from "../Utils/Apiurl";

// function Registers() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const [countries, setCountries] = useState([]);
//   const [countriesid, setCountriesid] = useState("0");

//   const [states, setStates] = useState([]);
//   const [statesid, setStatesid] = useState("0");

//   const [cities, setCities] = useState([]);
//   const [citiesid, setCitiesid] = useState("0");


//   const fetchCountries = async () => {
//     const rescountry = await apiLaravel("/countries");
//     setCountries(await rescountry);
//   };

//   const handleCountryChange = async (e) => {
//     const getcountriesid = e.target.value;
//     setCountriesid(getcountriesid);

//     const resstate = await fetch(
//       `http://127.0.0.1:8000/api/states/${getcountriesid}`
//     );
//     const reset = await resstate.json();
//     setStates(reset);
//     setStatesid("0");
//     setCities([]);
//   };

//   const handleStateChange = async (e) => {
//     const getstatesid = e.target.value;
//     setStatesid(getstatesid);

//     const rescity = await fetch(
//       `http://127.0.0.1:8000/api/cities/${getstatesid}`
//     );
//     const reset = await rescity.json();
//     setCities(reset);
//     setCitiesid("0");
//   };

//   const handleCityChange = (e) => {
//     const getcitiesid = e.target.value;
//     setCitiesid(getcitiesid);
//   };

//   async function update() {

//     let item = {
//       name,
//       email,
//       countriesid,
//       statesid,
//       citiesid,
//     };
//     let response = await apiLaravel("/register", {
//       method: "POST",
//       body: JSON.stringify(item),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       const responseData = await response.json();
//       setErrors(responseData.error);
//       setMessage(responseData.message);
//     } else {
//       setErrors({});
//       setMessage("User registered successfully.");
//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     }
//   }

//   function reset() {
//     setName("");
//     setEmail("");
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
//         <h1>Profile Form</h1>
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
//               name="countries"
//               id="countries"
//               onChange={handleCountryChange}
//             >
//               <option value="0">Select Country</option>
//               {countries.map((getcon, index) => (
//                 <option key={index} value={getcon.countries_id}>
//                   {getcon.countries_name}
//                 </option>
//               ))}
//             </select>
//             {errors.countries && (
//               <div className="text-danger">{errors.countries}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="state" className="form-label">
//               State
//             </label>
//             <select
//               className="form-control"
//               name="states"
//               id="states"
//               onChange={handleStateChange}
//             >
//               <option value="0">Select State</option>

//               {states.map((getstate, index) => (
//                 <option key={index} value={getstate.states_id}>
//                   {getstate.states_name}
//                 </option>
//               ))}
//             </select>
//             {errors.states && (
//               <div className="text-danger">{errors.states}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="city" className="form-label">
//               City
//             </label>
//             <select
//               className="form-control"
//               name="cities"
//               id="cities"
//               onChange={handleCityChange}
//             >
//               <option value="0">Select City</option>

//               {cities.map((getcities, index) => (
//                 <option key={index} value={getcities.cities_id}>
//                   {getcities.cities_name}
//                 </option>
//               ))}
//             </select>
//             {errors.cities && (
//               <div className="text-danger">{errors.cities}</div>
//             )}
//           </div>

//           <button
//             type="button"
//             onClick={update}
//             className="btn btn-primary me-2"
//           >
//             update
//           </button>

//           <button type="button" onClick={reset} className="btn btn-danger">
//             Reset
//           </button>

//         </form>
//       </div>
//     </>
//   );
// }

// export default Registers;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { apiLaravel } from "../Utils/Apiurl";

function Registers() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-info"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [countries, setCountries] = useState([]);
  const [countriesid, setCountriesid] = useState("0");

  const [states, setStates] = useState([]);
  const [statesid, setStatesid] = useState("0");

  const [cities, setCities] = useState([]);
  const [citiesid, setCitiesid] = useState("0");

  const fetchCountries = async () => {
    const rescountry = await apiLaravel("/countries");
    setCountries(await rescountry);
  };

  const fetchUserData = useCallback(async () => {
    const resuser = await apiLaravel(`/user/${user.id}`);
    setName(resuser.name);
    setEmail(resuser.email);
    setCountriesid(resuser.countriesid);
    setStatesid(resuser.statesid);
    setCitiesid(resuser.citiesid);

    const resstate = await fetch(`http://127.0.0.1:8000/api/states/${resuser.countriesid}`);
    const reset = await resstate.json();
    setStates(reset);

    const rescity = await fetch(`http://127.0.0.1:8000/api/cities/${resuser.statesid}`);
    const resetCities = await rescity.json();
    setCities(resetCities);
  }, [user.id]);

  useEffect(() => {
    fetchCountries();
    fetchUserData();
  }, [fetchUserData]);

  const handleCountryChange = async (e) => {
    const getcountriesid = e.target.value;
    setCountriesid(getcountriesid);

    const resstate = await fetch(`http://127.0.0.1:8000/api/states/${getcountriesid}`);
    const reset = await resstate.json();
    setStates(reset);
    setStatesid("0");
    setCities([]);
  };

  const handleStateChange = async (e) => {
    const getstatesid = e.target.value;
    setStatesid(getstatesid);

    const rescity = await fetch(`http://127.0.0.1:8000/api/cities/${getstatesid}`);
    const reset = await rescity.json();
    setCities(reset);
    setCitiesid("0");
  };

  const handleCityChange = (e) => {
    const getcitiesid = e.target.value;
    setCitiesid(getcitiesid);
  };

  async function update() {
    let item = {
      name,
      email,
      countriesid,
      statesid,
      citiesid,
    };
    let response = await apiLaravel(`/update/${user.id}`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      setErrors(responseData.error);
      setMessage(responseData.message);
    } else {
      setErrors({});
      setMessage("User updated successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }

  function reset() {
    setName("");
    setEmail("");
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
              name="countries"
              id="countries"
              onChange={handleCountryChange}
              value={countriesid}
            >
              <option value="0">Select Country</option>
              {countries.map((getcon, index) => (
                <option key={index} value={getcon.countries_id}>
                  {getcon.countries_name}
                </option>
              ))}
            </select>
            {errors.countries && (
              <div className="text-danger">{errors.countries}</div>
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
              onChange={handleStateChange}
              value={statesid}
            >
              <option value="0">Select State</option>
              {states.map((getstate, index) => (
                <option key={index} value={getstate.states_id}>
                  {getstate.states_name}
                </option>
              ))}
            </select>
            {errors.states && (
              <div className="text-danger">{errors.states}</div>
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
              onChange={handleCityChange}
              value={citiesid}
            >
              <option value="0">Select City</option>
              {cities.map((getcities, index) => (
                <option key={index} value={getcities.cities_id}>
                  {getcities.cities_name}
                </option>
              ))}
            </select>
            {errors.cities && (
              <div className="text-danger">{errors.cities}</div>
            )}
          </div>

          <button
            type="button"
            onClick={update}
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

export default Registers;
