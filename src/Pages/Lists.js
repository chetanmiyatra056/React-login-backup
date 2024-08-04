import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";

function Lists() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/allshow')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container my-5">
        <h1>All Lists Show</h1>

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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.countries}</td>
                <td>{user.states}</td>
                <td>{user.cities}</td>
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
