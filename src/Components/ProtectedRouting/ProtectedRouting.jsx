import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouting(props) {
  if (localStorage.getItem("userToken") !== null) {
    // Rg3le el page ely 3leha el dor
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
