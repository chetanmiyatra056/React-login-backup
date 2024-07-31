// import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import { apiLaravel } from "../Utils/Apiurl";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Test() {
//     let ls = JSON.parse(localStorage.getItem("user-info"));

//     const navigate = useNavigate();

//     const [dropdownData, setDropdownData] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [message, setMessage] = useState("");

//     const [countries, setCountries] = useState([]);
//     const [countriesid, setCountriesid] = useState(ls.countries);

//     const [states, setStates] = useState([]);
//     const [statesid, setStatesid] = useState(ls.states);

//     const [cities, setCities] = useState([]);
//     const [citiesid, setCitiesid] = useState(ls.cities);

//     useEffect(() => {
//         axios
//             .get(`http://127.0.0.1:8000/api/dropdown/${ls.id}`)
//             .then((response) => {
//                 setDropdownData(response.data);
//                 fetchStates(response.data.countries_id); // Fetch states for selected country
//                 fetchCities(response.data.states_id);   // Fetch cities for selected state
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the data!", error);
//             });
//     }, [ls.id]);

//     const fetchCountries = async () => {
//         const rescountry = await apiLaravel("/countries");
//         setCountries(await rescountry);
//     };

//     const fetchStates = async (countryId) => {
//         const resstate = await fetch(
//             `http://127.0.0.1:8000/api/states/${countryId}`
//         );
//         const reset = await resstate.json();
//         setStates(reset);
//     };

//     const fetchCities = async (stateId) => {
//         const rescity = await fetch(
//             `http://127.0.0.1:8000/api/cities/${stateId}`
//         );
//         const reset = await rescity.json();
//         setCities(reset);
//     };

//     const handleCountryChange = async (e) => {
//         setStates([]);
//         setStatesid("0");
//         setCities([]);
//         const getcountriesid = e.target.value;
//         setCountriesid(getcountriesid);

//         fetchStates(getcountriesid);
//     };

//     const handleStateChange = async (e) => {
//         setCitiesid("0");
//         const getstatesid = e.target.value;
//         setStatesid(getstatesid);

//         fetchCities(getstatesid);
//     };

//     const handleCityChange = (e) => {
//         const getcitiesid = e.target.value;
//         setCitiesid(getcitiesid);
//     };

//     async function update(id) {
//         let item = {
//             countriesid,
//             statesid,
//             citiesid,
//         };
//         let response = await apiLaravel("/update/" + id, {
//             method: "POST",
//             body: JSON.stringify(item),
//         });

//         if (response.status === false) {
//             setErrors(response.error);
//             setMessage(response.message);
//         } else {
//             setErrors({});
//             setMessage("User updated successfully.");
//             setTimeout(() => {
//                 localStorage.setItem("user-info", JSON.stringify(response.data));
//                 navigate("/welcome");
//             }, 1000);
//         }
//     }

//     useEffect(() => {
//         fetchCountries();
//     }, []);

//     if (!dropdownData) {
//         return (
//             <div>
//                 <Header />
//                 <div className="container my-5">
//                     <h1>Profile Form</h1>
//                     <h3 className="fw-bold">Loading...</h3>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <Header />

//             {message && (
//                 <div>
//                     <div className="alert alert-info alert-dismissible fade show" role="alert">
//                         {message}
//                         <button
//                             type="button"
//                             className="btn-close"
//                             data-bs-dismiss="alert"
//                             aria-label="Close"
//                         ></button>
//                     </div>
//                 </div>
//             )}

//             <div className="container my-5">
//                 <h1>Profile Form</h1>

//                 <form>

//                     <div className="mb-3">
//                         <label htmlFor="country" className="form-label">
//                             Country
//                         </label>
//                         <select
//                             className="form-control"
//                             name="countries"
//                             id="countries"
//                             onChange={(e) => handleCountryChange(e)}
//                         >


//                             <option value="0">Select Country</option>
//                             {countries.map((getcon, index) => (
//                                 <option key={index} value={getcon.countries_id}>
//                                     {getcon.countries_name}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.countriesid && (
//                             <div className="text-danger">{errors.countriesid}</div>
//                         )}
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="state" className="form-label">
//                             State
//                         </label>
//                         <select
//                             className="form-control"
//                             name="states"
//                             id="states"
//                             onChange={(e) => handleStateChange(e)}
//                         >

//                             <option value="0">Select State</option>
//                             {states.map((getstate, index) => (
//                                 <option key={index} value={getstate.states_id}>
//                                     {getstate.states_name}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.statesid && (
//                             <div className="text-danger">{errors.statesid}</div>
//                         )}
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="city" className="form-label">
//                             City
//                         </label>
//                         <select
//                             className="form-control"
//                             name="cities"
//                             id="cities"
//                             onChange={(e) => handleCityChange(e)}
//                         >

//                             <option value="0">Select City</option>
//                             {cities.map((getcities, index) => (
//                                 <option key={index} value={getcities.cities_id}>
//                                     {getcities.cities_name}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.citiesid && (
//                             <div className="text-danger">{errors.citiesid}</div>
//                         )}
//                     </div>

//                     <button
//                         type="button"
//                         onClick={() => update(ls.id)}
//                         className="btn btn-primary me-2"
//                     >
//                         Update
//                     </button>

//                     <button type="button" className="btn btn-danger">
//                         Reset
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }

// export default Test;


import React, { useEffect, useState } from "react";
import Header from "./Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Test() {
    let ls = JSON.parse(localStorage.getItem("user-info"));

    const navigate = useNavigate();

    const [dropdownData, setDropdownData] = useState(null);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

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
                fetchStates(response.data.countries_id); // Fetch states for selected country
                fetchCities(response.data.states_id);   // Fetch cities for selected state
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
        const rescity = await fetch(
            `http://127.0.0.1:8000/api/cities/${stateId}`
        );
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

                    <button type="button" className="btn btn-danger">
                        Reset
                    </button>
                </form>
            </div>
        </>
    );
}

export default Test;
