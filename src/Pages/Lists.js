import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";

function Lists() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/allshow');
      setUsers(response.data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };


  async function search(key) {
    if (key === "") {
      fetchData();
    } else {
      let result = await fetch(`http://127.0.0.1:8000/api/search/${key}`);
      result = await result.json();
      console.warn(result);
      setUsers(result);
    }
  }

  function reset() {
    window.location.reload();
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h1>All Lists Show</h1>

        <div className="row my-2 mx-2" style={{ float: "right" }}>
          <form className="d-flex col-md-12" action="">
            {/* <div className="mx-2">
              <label htmlFor="">Start Date:</label>
              <input
                className="form-control me-2"
                type="date"
                name="startDate"
                id="startDate"
                onChange={(e) => search(e.target.value)}
                placeholder="DD-MM-YYYY"
              />
            </div>

            <div className="mx-2">
              <label htmlFor="">End Date:</label>
              <input
                className="form-control me-2"
                type="date"
                name="endDate"
                id="endDate"
                onChange={(e) => search(e.target.value)}
                placeholder="DD-MM-YYYY"
              />
            </div> */}

            <div className="mx-2">
              <label htmlFor="">Search:</label>
              <input
                className="form-control"
                type="text"
                name="search"
                id="search"
                onChange={(e) => search(e.target.value)}
                placeholder="Search"
              />
            </div>
            <button
              className="btn btn-outline-danger mt-4"
              onClick={reset}
              type="button"
            >
              Reset
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
