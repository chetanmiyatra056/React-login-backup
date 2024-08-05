import React, { useState } from "react";
import Header from "../Components/Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.module.css";

function Profile() {
  let ls = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();


  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [file, setFile] = useState(null);

  async function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function update(id) {
    let item = {};
    if (file) {
      const fileBase64 = await convertFileToBase64(file);
      item.file = fileBase64;
    } else {
      item.file = ls.profile; // Retain the current profile picture
    }
    let response = await apiLaravel("/update/" + id, {
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
        localStorage.setItem("user-info", JSON.stringify(response.data));
        setMessage(null);
        navigate("/demo update");
      }, 1000);
    }
  }


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

      <div className="container my-3">
        <h1>Profile Form</h1>

        <form>
          {/* File filed */}
          {ls.profile ? (
            <div className="form-group mb-3">
              <label htmlFor="img">Profile</label><br />
              <img
                src={`http://127.0.0.1:8000/uploads/${ls.profile}`}
                alt="User Profile"
                style={{ width: "100px", height: "100px", border: "2px solid black" }}
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="form-group mb-3">
            <label htmlFor="profile" className="form-label">
              Choose New Profile
            </label>
            <input
              className="form-control"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Update Button */}
          <button
            type="button"
            onClick={() => update(ls.id)}
            className="btn btn-primary me-2"
          >
            Update
          </button>

          {/* Reset Button */}
          <button type="button" onClick={reset} className="btn btn-danger">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
