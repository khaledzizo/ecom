// Libraries
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { CartContext } from "../../../Context/CartContext";
import { TokenContext } from "../../../Context/TokenContext";

// Files

export default function Layout() {
  // Set User Token
  let { setToken } = useContext(TokenContext);

  // Cart Functions
  const { getUserCart } = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setToken(localStorage.getItem("userToken"));
      getUserCart();
    }
  }, []);

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="my-5 py-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
