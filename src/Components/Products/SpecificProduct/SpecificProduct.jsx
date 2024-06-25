import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { CartContext } from "../../../Context/CartContext";

export default function SpecificProduct() {
  // // hatkon shayla el dynamic product ID ely mawgod fel routing
  // let data = useParams();
  let { id } = useParams();

  let [productId, setId] = useState(0);
  useEffect(() => {
    setId(id);
  }, [id]);

  async function getProduct(queryData) {
    let productId = queryData.queryKey[1];
    let request = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    return request;
  }

  let { isLoading, data } = useQuery(["product", productId], getProduct);
  let product = data?.data.data;
  console.log(product);

  // Cart Functions
  const { addToCart } = useContext(CartContext);
  return (
    <>
      {isLoading ? (
        <div className="bg-white position-fixed top-0 end-0 start-0 bottom-0 z-3 d-flex justify-content-center align-items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-3">
              <OwlCarousel className="owl-theme" loop margin={10} items={1}>
                {product.images.map((img, index) => {
                  return (
                    <div className="product-img" key={index}>
                      <img src={img} alt="" className="w-100" />
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
            <div className="col-md-6">
              <div className="product-content">
                <h2>{product.title}</h2>
                <p className="text-muted my-3">{product.description}</p>
                <h6 className="text-main fw-bold">{product.category.name}</h6>
                <div className="d-flex justify-content-between">
                  <p>{product.price} EGP</p>
                  <p>
                    <i className="fa-solid fa-star rating-color"></i>
                    <span>{product.ratingsAverage}</span>
                  </p>
                </div>
                <button
                  className="btn bg-main text-white d-block w-100"
                  onClick={() => {
                    addToCart(product.id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
