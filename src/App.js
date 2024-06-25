// Libraries
import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Files
import Layout from "./Components/Main Layout/Layout/Layout";
import AllProducts from "./Components/Products/AllProducts/AllProducts";
import SpecificProduct from "./Components/Products/SpecificProduct/SpecificProduct";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Wishlist from "./Components/Wishlist/Wishlist";
import Checkout from "./Components/Orders/Checkout/Checkout";
import Register from "./Components/Authentication/Register/Register";
import Login from "./Components/Authentication/Login/Login";
import ForgetPassword from "./Components/Authentication/ForgetPassword/ForgetPassword";
import VerifyResetPassword from "./Components/Authentication/VerifyResetPassword/VerifyResetPassword";
import ResetPassword from "./Components/Authentication/ResetPassword/ResetPassword";
import Notfound from "./Components/Main Layout/Notfound/Notfound";

// Context
import { TokenContext } from "./Context/TokenContext";
import { CartContextProvider } from "./Context/CartContext";
import { WishlistContextProvider } from "./Context/WishlistContext";

// Guard
import ProtectedRouting from "./Components/ProtectedRouting/ProtectedRouting";
import AllOrders from "./Components/Orders/AllOrders/AllOrders";

export default function App() {
  let routing = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRouting>
              <AllProducts />
            </ProtectedRouting>
          ),
        },
        {
          path: "specificProduct/:id",
          element: (
            <ProtectedRouting>
              <SpecificProduct />
            </ProtectedRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouting>
              <Cart />
            </ProtectedRouting>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRouting>
              <Categories />
            </ProtectedRouting>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouting>
              <Brands />
            </ProtectedRouting>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRouting>
              <Wishlist />
            </ProtectedRouting>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRouting>
              <AllOrders />
            </ProtectedRouting>
          ),
        },
        {
          path: "checkout/:cartId",
          element: (
            <ProtectedRouting>
              <Checkout />
            </ProtectedRouting>
          ),
        },
        { index: true, element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verifyResetPassword", element: <VerifyResetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  let ProviderClient = new QueryClient();

  // Hakhale el token mtshaf ala el app kolo
  let { setToken } = useContext(TokenContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, [setToken]);

  return (
    <>
      <QueryClientProvider client={ProviderClient}>
        <ReactQueryDevtools />
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={routing} />
            <ToastContainer />
          </WishlistContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}
