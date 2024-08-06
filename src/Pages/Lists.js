// import React, { useEffect, useState } from "react";
// import Header from "../Components/Header";
// import axios from "axios";
// import DatePicker from "react-datepicker";

// function Lists() {

//   const [users, setUsers] = useState([]);
//   const [selectDate, setSelectDate] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/allshow');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('There was an error fetching the data!', error);
//     }
//   };


//   async function search(key) {
//     if (key === "") {
//       fetchData();
//     } else {
//       let result = await fetch(`http://127.0.0.1:8000/api/search/${key}`);
//       result = await result.json();
//       console.warn(result);
//       setUsers(result);
//     }
//   }

//   function reset() {
//     window.location.reload();
//   }

//   return (
//     <>
//       <Header />
//       <div className="container my-5">
//         <h1>All Lists Show</h1>

//         <div className="row my-2 mx-2" style={{ float: "right" }}>
//           <form className="d-flex col-md-12" action="">

//             <div className="mb-3">
//               <label htmlFor="date" className="form-label">
//                 Select Date
//               </label>{" "}
//               <br />
//               <DatePicker
//                 className="form-control"
//                 selected={selectDate}
//                 onChange={(date) => setSelectDate(date)}
//                 placeholderText="DD/MM/YYYY"
//                 dateFormat="dd/MM/yyyy"
//                 maxDate={new Date()}
//                 showYearDropdown
//                 todayButton="TODAY"
//                 isClearable
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="date" className="form-label">
//                 Select Date
//               </label>{" "}
//               <br />
//               <DatePicker
//                 className="form-control"
//                 selected={selectDate}
//                 onChange={(date) => setSelectDate(date)}
//                 placeholderText="DD/MM/YYYY"
//                 dateFormat="dd/MM/yyyy"
//                 maxDate={new Date()}
//                 showYearDropdown
//                 todayButton="TODAY"
//                 isClearable
//               />
//             </div>

//             <div className="mx-2">
//               <label htmlFor="">Search:</label>
//               <input
//                 className="form-control"
//                 type="text"
//                 name="search"
//                 id="search"
//                 onChange={(e) => search(e.target.value)}
//                 placeholder="Search"
//               />
//             </div>
//             <button
//               className="btn btn-outline-danger mt-4"
//               onClick={reset}
//               type="button"
//             >
//               Reset
//             </button>
//           </form>
//         </div>

//         <table className="table table-striped table-dark table-bordered table-hover my-3 ">
//           <thead>
//             <tr>
//               <th scope="col">Sr No.</th>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">Country</th>
//               <th scope="col">State</th>
//               <th scope="col">City</th>
//               <th scope="col">Hobbies</th>
//               <th scope="col">Gender</th>
//               <th scope="col">Date</th>
//               <th scope="col">Type</th>
//               <th scope="col">Profile</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td>{user.users_name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.countries_name}</td>
//                 <td>{user.states_name}</td>
//                 <td>{user.cities_name}</td>
//                 <td>{user.hobbies}</td>
//                 <td>{user.gender}</td>
//                 <td>{user.date}</td>
//                 <td>{user.type}</td>
//                 <td>
//                   <img
//                     src={`http://127.0.0.1:8000/uploads/${user.profile}`}
//                     alt="User Profile"
//                     style={{ width: "50px", border: "2px solid black" }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default Lists;

import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Lists() {
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filters = {}) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/allshow', { params: filters });
      setUsers(response.data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  const handleSearch = async () => {
    const filters = {
      key: searchKey,
      startDate: startDate ? startDate.toISOString().split('T')[0] : null,
      endDate: endDate ? endDate.toISOString().split('T')[0] : null
    };
    fetchData(filters);
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchKey("");
    fetchData();
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h1>All Lists Show</h1>

        <div className="row my-2 mx-2" style={{ float: "right" }}>
          <form className="d-flex col-md-12" action="">

            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
                todayButton="TODAY"
                isClearable
              />
            </div>

            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <DatePicker
                className="form-control"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
                todayButton="TODAY"
                isClearable
              />
            </div>

            <div className="mx-2">
              <label htmlFor="search">Search:</label>
              <input
                className="form-control"
                type="text"
                name="search"
                id="search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search"
              />
            </div>

            <button
              className="btn btn-outline-danger mt-4"
              type="button"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="btn btn-outline-primary mt-4"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>

        <table className="table table-striped table-dark table-bordered table-hover my-3 ">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">State</th>
              <th scope="col">City</th>
              <th scope="col">Hobbies</th>
              <th scope="col">Gender</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Profile</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.users_name}</td>
                <td>{user.email}</td>
                <td>{user.countries_name}</td>
                <td>{user.states_name}</td>
                <td>{user.cities_name}</td>
                <td>{user.hobbies}</td>
                <td>{user.gender}</td>
                <td>{user.date}</td>
                <td>{user.type}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/uploads/${user.profile}`}
                    alt="User Profile"
                    style={{ width: "50px", border: "2px solid black" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Lists;
