import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  // Cart Functions
  const {
    getUserCart,
    loading,
    cartData,
    removeFromCart,
    clearUserCart,
    updateCart,
    numOfCartItems,
  } = useContext(CartContext);

  useEffect(() => {
    getUserCart();
  }, []);
  return (
    <>
      {loading ? (
        <div className="bg-white position-fixed top-0 end-0 start-0 bottom-0 z-3 d-flex justify-content-center align-items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className="container bg-light-subtle my-5 p-4">
            <h2 className="fw-bold mb-3">Cart Shop</h2>

            {!cartData ? (
              <h3>your cart is empty</h3>
            ) : (
              <>
                <Link
                  to={"/checkout/" + cartData._id}
                  className="btn btn-primary my-2"
                >
                  Checkout
                </Link>
                <div className="products-info d-flex justify-content-between mb-3">
                  <h4 className="fw-bold">
                    Total Price:{" "}
                    <span className="text-main">
                      {cartData?.totalCartPrice}
                    </span>
                  </h4>
                  <h4 className="fw-bold">
                    Total number of items:{" "}
                    <span className="text-main">{numOfCartItems}</span>
                  </h4>
                </div>
                {cartData?.products.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="row border-bottom border-3 py-3 align-items-center"
                    >
                      <div className="col-md-10">
                        <div className="row px-5 align-items-center">
                          <div className="col-md-2">
                            <img
                              src={product.product.imageCover}
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <div className="col-md-10">
                            <h5 className="fw-bold">{product.product.title}</h5>
                            <p className="text-muted">
                              Price: {product.price}EGP
                            </p>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                removeFromCart(product.product._id)
                              }
                            >
                              Remove <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <p className="d-flex gap-2">
                          <span
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              updateCart(product.product.id, product.count + 1)
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </span>
                          <span className="fs-5">{product.count}</span>
                          <span
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              updateCart(product.product.id, product.count - 1)
                            }
                          >
                            <i className="fa-solid fa-minus"></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
                <button className="btn btn-danger mt-4" onClick={clearUserCart}>
                  Empty Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
