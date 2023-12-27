import React, { useState } from "react";
import Layout from "../../components/layout";
import "./styles/applying_counsellor.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showLoading } from "../../redux/alertsSlice";
import { hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ApplyCounsellor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    fromTime: "",
    toTime: "",
    profession: "",
    
  });

  const [formValidation, setFormValidation] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    fromTime: true,
    toTime: true,
    profession: true,
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormValidation({
      ...formValidation,
      [name]: value.trim() !== "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Received values from form:", formData);
    try {
      dispatch(showLoading());
      const response = await axios.post("api/user/apply-counsellor-account", {
        ...formData,
        userId: user._id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/userHome");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.error("Registration error:", error);
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Counsellor</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className={`form-control ${
                  formValidation.firstName ? "" : "is-invalid"
                }`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className={`form-control ${
                  formValidation.lastName ? "" : "is-invalid"
                }`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className={`form-control ${
                  formValidation.email ? "" : "is-invalid"
                }`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                className={`form-control ${
                  formValidation.phoneNumber ? "" : "is-invalid"
                }`}
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="fromTime" className="form-label">
                From Time:
              </label>
              <input
                type="time" // Change input type to time
                className={`form-control ${
                  formValidation.fromTime ? "" : "is-invalid"
                }`}
                id="fromTime"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="toTime" className="form-label">
                To Time:
              </label>
              <input
                type="time" // Change input type to time
                className={`form-control ${
                  formValidation.toTime ? "" : "is-invalid"
                }`}
                id="toTime"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                required
              />
              {formValidation.toTime || (
                <div className="invalid-feedback">
                  Please enter the ending time.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="profession" className="form-label">
                Profession:
              </label>
              <input
                type="text"
                className={`form-control ${
                  formValidation.profession ? "" : "is-invalid"
                }`}
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        

        <div className="row" id="button-row">
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-primary w-100 py-3"
              disabled={!Object.values(formValidation).every((valid) => valid)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
