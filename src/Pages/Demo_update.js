import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { format, parseISO } from "date-fns";

function Demo() {
  let ls = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const hobbies = ["Reading", "Writing", "Gaming"];

  const [gender, setGender] = useState(ls.gender);
  const [selectDate, setSelectDate] = useState(null);

  useEffect(() => {
    if (ls.hobbies) {
      setSelectedHobbies(ls.hobbies.split(","));
    }
    if (ls.date) {
      setSelectDate(parseISO(ls.date));
    }
  }, [ls.hobbies, ls.date]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHobbies([...selectedHobbies, value]);
    } else {
      setSelectedHobbies(selectedHobbies.filter((hobbie) => hobbie !== value));
    }
  };

  const validate = () => {
    let validationErrors = {};
    if (selectedHobbies.length === 0) {
      validationErrors.selectedHobbies = "Please select at least one hobby.";
    }
    if (!gender) {
      validationErrors.gender = "Please select a gender.";
    }
    if (!selectDate) {
      validationErrors.selectDate = "Please select a date.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  async function update(id) {
    if (!validate()) {
      return;
    }

    let item = {
      hobbies: selectedHobbies,
      gender,
      selectDate: selectDate ? format(selectDate, "yyyy-MM-dd") : null,
    };

    let response = await apiLaravel("/update/" + id, {
      method: "POST",
      body: JSON.stringify(item),
    });

    if (!response.status) {
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
        <h1>Demo Form</h1>

        <form>
          <div className="mb-3">
            <label className="form-check-label my-2" htmlFor="checkhobbie">
              Select Hobbies
            </label>
            <br />
            {hobbies.map((hobbie, index) => (
              <span key={index}>
                <input
                  type="checkbox"
                  className="form-check-input mx-2"
                  value={hobbie}
                  checked={selectedHobbies.includes(hobbie)}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label">{hobbie}</label>
              </span>
            ))}
            {errors.selectedHobbies && (
              <div className="text-danger">{errors.selectedHobbies}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-check-label my-2" htmlFor="gender">
              Select Gender
            </label>
            <br />
            <input
              className="form-check-input mx-2"
              type="radio"
              value="Male"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "Male"}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>

            <input
              className="form-check-input mx-2"
              type="radio"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              checked={gender === "Female"}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>

            <input
              className="form-check-input mx-2"
              type="radio"
              value="Other"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "Other"}
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
            <br />
            {errors.gender && <div className="text-danger">{errors.gender}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Select Date
            </label>
            <div>
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
              />
            </div>
            {errors.selectDate && <div className="text-danger">{errors.selectDate}</div>}
          </div>

          <button
            type="button"
            onClick={() => update(ls.id)}
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

export default Demo;
