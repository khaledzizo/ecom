import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyResetPassword() {
  // Navigating to Login Page
  let navigate = useNavigate();

  // Error Message For Account
  let [codeMessage, setCodeMessage] = useState("");

  // Button Loading
  let [loading, setLoading] = useState(false);

  // Form Validation
  let formValidation = Yup.object({
    resetCode: Yup.string()
      .required("Code field cannot be empty")
      .matches(/^[0-9]{5,6}$/, "Enter a valid code number"),
  });

  // Taking verify code
  async function verifyResetCode(verifyCode) {
    setLoading(true)
    let request = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        verifyCode
      )
      .catch((err) => {
        setLoading(false)
        setCodeMessage(err.response.data.message);
      });

      if(request.data.status === 'Success'){
        setLoading(false);
        navigate('/resetPassword')
      }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetCode,
    validationSchema: formValidation,
  });

  return (
    <>
      <div className="container my-5">
        <h3 className="fw-bolder mb-4">
          Enter the code to verify your account.
        </h3>

        {codeMessage ? (
          <div className="alert alert-danger">{codeMessage}</div>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="resetCode"
              className="form-control mb-3"
              id="resetCode"
              placeholder="000000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="resetCode">reset password code</label>
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.resetCode}
              </p>
            ) : null}

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
          </div>
        </form>
      </div>
    </>
  );
}
