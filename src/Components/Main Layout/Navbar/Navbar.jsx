import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/Navbar Logo/freshcart-logo.svg";
import { TokenContext } from "../../../Context/TokenContext";
import { CartContext } from "../../../Context/CartContext";

export default function Navbar() {
  // Using Token
  let { token, setToken, userData } = useContext(TokenContext);

  // Watching Cart Count
  let { numOfCartItems } = useContext(CartContext);

  // Programming navigate
  let navigate = useNavigate();

  // Logout Functionality
  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 position-fixed top-0 start-0 end-0">
        <div className="container">
          <Link className="navbar-brand" to="home">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="cart">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="brands">
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="wishlist">
                    Wish list
                  </NavLink>
                </li>
              </ul>
            ) : null}
            <ul className="navbar-nav ms-auto align-items-center ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item position-relative">
                    <Link to="cart" className="nav-link mx-2">
                      <i className="fa-solid fa-cart-shopping fa-lg text-muted"></i>
                    </Link>
                    {numOfCartItems ? (
                      <span className="position-absolute top-0 end-0 translate-middle bg-main text-white p-1 rounded-1 cart-icon">
                        {numOfCartItems}
                      </span>
                    ) : null}
                  </li>
                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={logout}>
                      Sign out {userData?.name}
                      <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
