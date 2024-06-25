import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from "../../../Context/TokenContext";

export default function Login() {
  // Set Token
  let { setToken } = useContext(TokenContext);

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
    password: Yup.string()
      .required("Password field cannot be empty")
      .matches(
        /^[A-Z][a-zA-Z0-9@*+/-]{6,16}$/,
        "Password must start with an uppercase letter and be between 6 and 16 characters long"
      ),
  });

  // Sending data by using API
  async function LoginForm(userData) {
    setLoading(true);
    // hab3t 3 hagat (url, data, options lw feh)
    let request = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", userData)
      .catch((err) => {
        setAccountMessage(err.response.data.message);
        setLoading(false);
      });
    console.log(request?.data.message);

    if (request?.data.message === "success") {
      setLoading(false);
      localStorage.setItem("userToken", request.data.token);
      setToken(request.data.token);
      navigate("/home");
    }
  }

  // Handleing Form
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // onSubmit: function (val) {
    //   console.log(val);
    // },
    onSubmit: LoginForm,
    validationSchema: formValidation,
  });

  return (
    <>
      <div className="container mt-5">
        <h1 className="fs-3 fw-bolder mb-4">Login Now</h1>
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
              value={formik.values.email} // Set value from formik values
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
              value={formik.values.password} // Set value from formik values
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <Link to="/forgetPassword" className="forget-password fw-bolder">
            Forget Password ?
          </Link>
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
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
