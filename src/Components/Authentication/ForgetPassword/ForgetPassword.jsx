import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
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
  });

  async function forgetPass(userEmail) {
    setLoading(true);
    let request = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        userEmail
      )
      .catch((err) => {
        console.log(err.response.data.message);
        setAccountMessage(err.response.data.message);
        setLoading(false);
      });

    if (request?.data.statusMsg === "success") {
      setLoading(false);
      navigate("/verifyResetPassword");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPass,
    validationSchema: formValidation,
  });
  return (
    <>
      <div className="container my-5">
        <h3 className="fw-bolder mb-4">Enter your email address</h3>

        {accountMessage ? (
          <div className="alert alert-danger">{accountMessage}</div>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control mb-3"
              id="email"
              placeholder="name@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email">Email address</label>

            {formik.errors.email && formik.touched.email ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.email}
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
              send code
            </button>
          )}
        </form>
      </div>
    </>
  );
}
