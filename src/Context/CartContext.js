import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export let CartContext = createContext();
export function CartContextProvider({ children }) {
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  let [loading, setLoading] = useState(false);
  let [cartData, setCartData] = useState(null);

  // Adding to Cart
  async function addToCart(productId) {
    const body = {
      productId: productId,
    };
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    try {
      const request = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
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
        setNumOfCartItems(request.data.numOfCartItems);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // Get Logged user cart
  async function getUserCart() {
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    setLoading(true);
    try {
      let request = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: headersOptions,
        }
      );
      if (request.data.status === "success") {
        setNumOfCartItems(request.data.numOfCartItems);
        setCartData(request.data.data);
      }
      return request;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  // Remove Specific Product from the Cart
  async function removeFromCart(productId) {
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    setLoading(true);
    try {
      let request = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: headersOptions,
        }
      );
      if (request.data.status === "success") {
        setNumOfCartItems(request.data.numOfCartItems);
        setCartData(request.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  // Clear user Cart
  async function clearUserCart() {
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    setLoading(true);
    try {
      let request = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: headersOptions,
        }
      );
      if (request.data.message === "success") {
        setNumOfCartItems(0);
        setCartData(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  // Update user Cart
  async function updateCart(productId, count) {
    const body = {
      count,
    };
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };
    setLoading(true);
    try {
      let request = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        body,
        {
          headers: headersOptions,
        }
      );
      if (request.data.status === "success") {
        setNumOfCartItems(request.data.numOfCartItems);
        let productsList = request.data.data.products;
        setCartData(request.data.data);
        // Iterate over the products list
        for (const product of productsList) {
          if (product.product._id === productId && product.count < 1) {
            await removeFromCart(productId);
          }
        }

        // Check if the cart has only one product left and it has been removed
        if (productsList.length === 1 && productsList[0].count === 0) {
          await clearUserCart();
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  // checkout
  async function checkoutSession(cartID, shippingData) {
    const headersOptions = {
      token: localStorage.getItem("userToken"),
    };

    let body = {
      shippingAddress: {
        details: "details",
        phone: "01010700999",
        city: "Cairo",
      },
    };
    setLoading(true);
    try {
      let request = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,
        body,
        {
          headers: headersOptions,
        }
      );
      if (request.data.status === "success") {
        setNumOfCartItems(request.data.numOfCartItems);
        setCartData(request.data.data);
        window.open(request.data.session.url, '_self')
      }
      return request;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        numOfCartItems,
        setNumOfCartItems,
        getUserCart,
        loading,
        cartData,
        removeFromCart,
        clearUserCart,
        updateCart,
        checkoutSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
