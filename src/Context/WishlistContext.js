import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export let WishlistContext = createContext();
export function WishlistContextProvider({ children }) {
  let [loading, setLoading] = useState(false);
  let [wishlistData, setwishlistData] = useState(null);

  // Get User's Wishlist
  async function getWishlist() {
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    setLoading(true);
    try {
      let request = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: headersOptions,
        }
      );
      if (request.data.status === "success") {
        setwishlistData(request.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Adding Product To Wishlist
  async function addToWishlist(productId) {
    const body = {
      productId: productId,
    };
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    try {
      let request = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        body,
        {
          headers: headersOptions,
        }
      );
      if (request.data.status === "success") {
        toast.success("Product added successfully. 😊", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Deleting Product form User's Wishlist
  async function deleteFromWishlist(productId) {
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    setLoading(true);
    try {
      let request = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: headersOptions,
        }
      );
      if (request.data.status === "success") {
        let updatedWishlist = wishlistData.filter(
          (item) => item._id !== productId
        );
        setwishlistData(updatedWishlist);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        loading,
        wishlistData,
        getWishlist,
        addToWishlist,
        deleteFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
