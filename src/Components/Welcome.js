import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Welcome() {
  let id = JSON.parse(localStorage.getItem("user-info"));

  const [users, setUsers] = useState(null);
  const [dropdownData, setDropdownData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/${id.id}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id.id]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/dropdown/${id.id}`)
      .then(response => {
        setDropdownData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id.id]);

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
              <h1 className="display-5 fw-bold">Loading...</h1>
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
            <h1 className="display-5 fw-bold">Hello {users.email}</h1>
            <p><strong>ID:</strong> {users.id}</p>
            <p><strong>Name:</strong> {users.name}</p>
            <p><strong>Email:</strong> {users.email}</p>
            <p><strong>Country Name:</strong> {dropdownData.countries_name}</p>
            <p><strong>State Name:</strong> {dropdownData.states_name}</p>
            <p><strong>City Name:</strong> {dropdownData.cities_name}</p>
            <p><strong>Email Verified At:</strong> {users.email_verified_at || 'N/A'}</p>
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
