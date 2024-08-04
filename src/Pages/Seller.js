import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";

export default function Seller() {
  let ls = JSON.parse(localStorage.getItem("user-info"));

  const [users, setUsers] = useState(null);
  const [dropdownData, setDropdownData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/${ls.id}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [ls.id]);

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

  function logOut() {
    const confirm = window.confirm("Are you sure to logout?");
    if (confirm) {
      localStorage.clear();
      navigate("/login");
    }
  }

  if (!users || !dropdownData) {
    return (
      <div>
        <Header />
        <div className="container my-5">
          <div className="p-5 bg-dark text-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="fw-bold">Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="p-5 bg-dark text-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Hello {users.name}</h1>
            <hr />

            <div>
              <h3>Type :- {users.type}</h3>
            </div>
            <hr />
            
            <div>
              <h3>Email :- {users.email}</h3>
            </div>
            <hr />

            <div>
              <h3>Hobbies :- {users.hobbies}</h3>
            </div>
            <hr />

            <div>
              <h3>Gender :- {users.gender}</h3>
            </div>
            <hr />

            <div>
              <h3>Date :- {users.date}</h3>
            </div>
            <hr />

            <div>
              <h3>Country name :- {dropdownData.countries_name}</h3>
            </div>
            <hr />

            <div>
              <h3>State name :- {dropdownData.states_name}</h3>
            </div>
            <hr />

            <div>
              <h3>City name :- {dropdownData.cities_name}</h3>
            </div>
            <hr />

            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={logOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
