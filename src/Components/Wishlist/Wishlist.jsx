import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Wishlist() {

  // Wishlist Functions
  const { getWishlist, wishlistData, loading, deleteFromWishlist } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getWishlist();
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
            <h2 className="fw-bold mb-3">Wish List</h2>

            {!wishlistData ? (
              <h3>your wish list is empty</h3>
            ) : (
              <>
                {wishlistData.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="row border-bottom border-3 py-3 align-items-center"
                    >
                      <div className="col-md-10">
                        <div className="row px-5 align-items-center">
                          <div className="col-md-2">
                            <img
                              src={product.imageCover}
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <div className="col-md-10">
                            <h5 className="fw-bold">{product.title}</h5>
                            <p className="text-muted">
                              Price: {product.price}EGP
                            </p>
                            <button className="btn btn-danger" onClick={()=>{deleteFromWishlist(product._id);}}>
                              Remove <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <button className="btn bg-main text-white btn-lg" onClick={()=>{addToCart(product.id);}}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
