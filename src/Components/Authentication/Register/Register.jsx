import axios from "axios";
import { useFormik } from "formik";
import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {

  // Navigating to Different Page
  let navigate = useNavigate();

  // Error Message For Account
  let [accountMessage, setAccountMessage] = useState("");

  // Button Loading
  let [loading, setLoading] = useState(false);

  // Form Validation
  let formValidation = Yup.object({
    name: Yup.string()
      .required("Name field cannot be empty")
      .min(3, "Name must be at least 3 letters long.")
      .max(20, "Name must be no longer than 20 letters"),
    email: Yup.string()
      .required("Email field cannot be empty")
      .email("enter valid email"),
    password: Yup.string()
      .required("Password field cannot be empty")
      .matches(
        /^[A-Z][a-zA-Z0-9@*+/-]{6,16}$/,
        "Password must start with an uppercase letter and be between 6 and 16 characters long"
      ),
    rePassword: Yup.string()
      .required("Re-Password field cannot be empty")
      .oneOf(
        [Yup.ref("password")],
        "Passwords do not match. Please re-enter matching passwords"
      ),
    phone: Yup.string()
      .required("Phone field cannot be empty")
      .matches(/^01[1250][0-9]{8}$/, "Enter valid phone number"),
  });

  // Hayruh lel home lw la2a el Token
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      localStorage.getItem("userToken");
      navigate("/home");
    }
  });

  // Sending data by using API
  async function registerForm(userData) {
    setLoading(true);
    // hab3t 3 hagat (url, data, options lw feh)
    let request = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", userData)
      .catch((err) => {
        console.log(err.response.data.message);
        setAccountMessage(err.response.data.message);
        setLoading(false);
      });
    console.log(request.data.message);
    if (request?.data.message === "success") {
      navigate("/");
      setLoading(false);
    }
  }

  // Handleing Form
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // onSubmit: function (val) {
    //   console.log(val);
    // },
    onSubmit: registerForm,
    validationSchema: formValidation,
  });

  return (
    <>
      <div className="container mt-5">
        <h1 className="fs-3 fw-bolder mb-4">Register Now</h1>
        {accountMessage ? (
          <div className="alert alert-danger">{accountMessage}</div>
        ) : (
          ""
        )}
        <form
          className="d-flex flex-column gap-3 mb-5"
          onSubmit={formik.handleSubmit}
        >
          {/* Name Container */}
          <div className="name-container d-flex flex-column gap-2 ">
            <label htmlFor="nameInput">Name</label>
            <input
              className="form-control"
              type="text"
              id="nameInput"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.name}
              </p>
            ) : null}
          </div>
          {/* Email Container */}
          <div className="email-container d-flex flex-column gap-2">
            <label htmlFor="emailInput">Email</label>
            <input
              className="form-control"
              type="email"
              id="emailInput"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          {/* Password Container */}
          <div className="password-container d-flex flex-column gap-2">
            <label htmlFor="passwordInput">Password</label>
            <input
              className="form-control"
              type="password"
              id="passwordInput"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          {/* Re-Password Container */}
          <div className="re-password-container d-flex flex-column gap-2">
            <label htmlFor="re-passwordInput">Re-Password</label>
            <input
              className="form-control"
              type="password"
              id="re-passwordInput"
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.rePassword}
              </p>
            ) : null}
          </div>
          {/* Phone Container */}
          <div className="phone-container d-flex flex-column gap-2">
            <label htmlFor="phoneInput">Phone</label>
            <input
              className="form-control"
              type="tel"
              id="phoneInput"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.phone}
              </p>
            ) : null}
          </div>

          {loading ? (
            <button
              type="button"
              className="btn bg-main text-white align-self-start"
              disabled={!(formik.isValid && formik.dirty)}
            >
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-main text-white align-self-start"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
