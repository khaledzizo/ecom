import { useFormik } from "formik";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../../Context/CartContext";
export default function Checkout() {
  let { cartId } = useParams();
  let { checkoutSession, loading } = useContext(CartContext);
  let validationSchema = Yup.object({
    city: Yup.string()
      .required("City Required")
      .matches(/^[A-Za-z\s]+$/, "enter valid city"),
    phone: Yup.string()
      .required("Phone field cannot be empty")
      .matches(/^01[1250][0-9]{8}$/, "Enter valid phone number"),
    details: Yup.string()
      .required("Details Required")
      .matches(/^.*$/, "enter valid details"),
  });
  let formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    onSubmit: async function (shippingDetails) {
      console.log(shippingDetails);
      await checkoutSession(cartId, shippingDetails);
    },
    validationSchema,
  });
  return (
    <>
      <div className="container mt-5">
        <h1 className="fs-3 fw-bolder mb-4">Enter Shipping Details</h1>
        <form
          className="d-flex flex-column gap-3 mb-5"
          onSubmit={formik.handleSubmit}
        >
          {/* City Container */}
          <div className="city-container d-flex flex-column gap-2">
            <label htmlFor="cityInput">City</label>
            <input
              className="form-control"
              type="text"
              id="cityInput"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city} // Set value from formik values
            />
            {formik.errors.city && formik.touched.city ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.city}
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
              value={formik.values.phone} // Set value from formik values
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.phone}
              </p>
            ) : null}
          </div>
          {/* Details Container */}
          <div className="details-container d-flex flex-column gap-2">
            <label htmlFor="detailsInput">Details</label>
            <textarea
              className="form-control"
              type="text"
              id="detailsInput"
              name="details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details} // Set value from formik values
            ></textarea>
            {formik.errors.details && formik.touched.details ? (
              <p className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-2"></i>
                {formik.errors.details}
              </p>
            ) : null}
          </div>
          {loading ? (
            <button
              type="button"
              className="btn bg-main text-white"
              disabled={!(formik.isValid && formik.dirty)}
            >
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button type="submit" className="btn bg-main text-white fs-5">
              Checkout <i className="fa-brands fa-cc-visa fa-lg"></i>
            </button>
          )}
        </form>
      </div>
    </>
  );
}
