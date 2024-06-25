import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  // Navigating to Login Page
  let navigate = useNavigate();

  // Error Message For Account
  let [accountMessage, setAccountMessage] = useState("");

  // Button Loading
  let [loading, setLoading] = useState(false);

  // Form Validation
  let formValidation = Yup.object({
    email: Yup.string()
      .required("Email field cannot be empty")
      .email("enter valid email"),
    newPassword: Yup.string()
      .required("New Password field cannot be empty")
      .matches(
        /^[A-Z][a-zA-Z0-9@*+/-]{6,16}$/,
        "Password must start with an uppercase letter and be between 6 and 16 characters long"
      ),
  });

  async function resetPassword(updatedAccountInfo) {
    setLoading(true);
    let request = await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        updatedAccountInfo
      )
      .catch((err) => {
        setLoading(false);
        setAccountMessage(err.response.data.message);
      });
    if (request?.data.token) {
      setLoading(false);
      navigate("/login");
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
    validationSchema: formValidation,
  });

  return (
    <>
      <div className="container mt-5">
        <h1 className="fs-3 fw-bolder mb-4">Reset Your Password</h1>
        {accountMessage ? (
          <div className="alert alert-danger">{accountMessage}</div>
        ) : (
          ""
        )}
        <form
          className="d-flex flex-column gap-3 mb-5"
          onSubmit={formik.handleSubmit}
        >
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
            <label htmlFor="passwordInput">New Password</label>
            <input
              className="form-control"
              type="password"
              id="passwordInput"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.newPassword}
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
            >
              reset Password
            </button>
          )}
        </form>
      </div>
    </>
  );
}
