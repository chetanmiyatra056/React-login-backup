// import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import { apiLaravel } from "../Utils/Apiurl";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Profile() {
//   let ls = JSON.parse(localStorage.getItem("user-info"));

//   const navigate = useNavigate();

//   const [dropdownData, setDropdownData] = useState(null);

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const [name, setName] = useState(ls.name);
//   const [email, setEmail] = useState(ls.email);

//   const [countries, setCountries] = useState([]);
//   const [countriesid, setCountriesid] = useState(ls.countries);

//   const [states, setStates] = useState([]);
//   const [statesid, setStatesid] = useState(ls.states);

//   const [cities, setCities] = useState([]);
//   const [citiesid, setCitiesid] = useState(ls.cities);

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/api/dropdown/${ls.id}`)
//       .then((response) => {
//         setDropdownData(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the data!", error);
//       });
//   }, [ls.id]);

//   const fetchCountries = async () => {
//     const rescountry = await apiLaravel("/countries");
//     setCountries(await rescountry);
//   };

//   const handleCountryChange = async (e) => {
//     setStates([]);
//     setStatesid("0");
//     setCities([]);
//     const getcountriesid = e.target.value;
//     setCountriesid(getcountriesid);

//     const resstate = await fetch(
//       `http://127.0.0.1:8000/api/states/${getcountriesid}`
//     );
//     const reset = await resstate.json();
//     setStates(reset);
//   };

//   const handleStateChange = async (e) => {
//     setCitiesid("0");
//     const getstatesid = e.target.value;
//     setStatesid(getstatesid);

//     const rescity = await fetch(
//       `http://127.0.0.1:8000/api/cities/${getstatesid}`
//     );
//     const reset = await rescity.json();
//     setCities(reset);
//   };

//   const handleCityChange = (e) => {
//     const getcitiesid = e.target.value;
//     setCitiesid(getcitiesid);
//   };

//   async function update(id) {
//     let item = {
//       name,
//       email,
//       countriesid,
//       statesid,
//       citiesid,
//     };
//     let response = await apiLaravel("/update/" + id, {
//       method: "POST",
//       body: JSON.stringify(item),
//     });

//     if (response.status === false) {
//       setErrors(response.error);
//       setMessage(response.message);
//     } else {
//       setErrors({});
//       setMessage("User updated successfully.");
//       setTimeout(() => {
//         localStorage.setItem("user-info", JSON.stringify(response.data));
//         navigate("/welcome");
//       }, 1000);
//     }
//   }

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   //   function reset() {
//   //     setName("");
//   //     setEmail("");
//   //     setMessage("");
//   //     setCountriesid("0");
//   //     setStates([]);
//   //     setStatesid("0");
//   //     setCities([]);
//   //     setCitiesid("0");
//   //   }

//   if (!dropdownData) {
//     return (
//       <div>
//         <Header />
//         <div className="container my-5">
//           <h1>Profile Form</h1>
//           <h3 className="fw-bold">Loading...</h3>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />

//       {message && (
//         <div>
//           <div
//             class="alert alert-info alert-dismissible fade show"
//             role="alert"
//           >
//             {message}
//             <button
//               type="button"
//               class="btn-close"
//               data-bs-dismiss="alert"
//               aria-label="Close"
//             ></button>
//           </div>
//         </div>
//       )}

//       <div className="container my-5">
//         <h1>Profile Form</h1>

//         <form>
//           {/* <input type="hidden" name="id" id="id" value={user && user.id} /> */}

//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Username
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               id="name"
//               defaultValue={name}
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
//               defaultValue={email}
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
//               onChange={(e) => handleCountryChange(e)}
//             >
//               <option defaultValue={ls.countries}>
//                 {dropdownData.countries_name}
//               </option>

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
//               name="states"
//               id="states"
//               onChange={(e) => handleStateChange(e)}
//             >
//               <option defaultValue={ls.states}>
//                 {dropdownData.states_name}
//               </option>

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
//               onChange={(e) => handleCityChange(e)}
//             >
//               <option defaultValue={ls.cities}>
//                 {dropdownData.cities_name}
//               </option>
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
//             onClick={() => update(ls.id)}
//             className="btn btn-primary me-2"
//           >
//             Update
//           </button>

//           <button type="button" className="btn btn-danger">
//             Reset
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from "react";
import Header from "./Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  let ls = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();

  const [dropdownData, setDropdownData] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [name, setName] = useState(ls.name);
  const [email, setEmail] = useState(ls.email);

  const [countries, setCountries] = useState([]);
  const [countriesid, setCountriesid] = useState(ls.countries);

  const [states, setStates] = useState([]);
  const [statesid, setStatesid] = useState(ls.states);

  const [cities, setCities] = useState([]);
  const [citiesid, setCitiesid] = useState(ls.cities);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/dropdown/${ls.id}`)
      .then((response) => {
        setDropdownData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [ls.id]);

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

  async function update(id) {
    let item = {
      name,
      email,
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
    } else {
      setErrors({});
      setMessage("User updated successfully.");
      setTimeout(() => {
        localStorage.setItem("user-info", JSON.stringify(response.data));
        navigate("/welcome");
      }, 1000);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

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
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            {message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

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
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-control"
              name="countries"
              id="countries"
              onChange={(e) => handleCountryChange(e)}
            >
              <option defaultValue={ls.countries}>
                {dropdownData.countries_name}
              </option>

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
              onChange={(e) => handleStateChange(e)}
            >
              <option defaultValue={ls.states}>
                {dropdownData.states_name}
              </option>

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
              onChange={(e) => handleCityChange(e)}
            >
              <option defaultValue={ls.cities}>
                {dropdownData.cities_name}
              </option>
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
            onClick={() => update(ls.id)}
            className="btn btn-primary me-2"
          >
            Update
          </button>

          <button type="button" className="btn btn-danger">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
