import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import MainSlider from "../../Sliders/MainSlider/MainSlider";
import CategorySlider from "../../Sliders/CategorySlider/CategorySlider";
import { CartContext } from "../../../Context/CartContext";
import { WishlistContext } from "../../../Context/WishlistContext";

export default function AllProducts() {
  // ? Normal Fetching with Axios
  // let [loading, setLoading] = useState(false);
  // let [productsList, setProducts] = useState([]);
  // async function getAllProducts() {
  //   setLoading(true);
  //   let request = await axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setProducts(request?.data.data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // ? Fetching uisng React Query
  // let query = useQuery('productsApi', getProducts);

  // Haghyr fe el page value

  let [page, setPage] = useState(1);
  let { isLoading, data } = useQuery(
    // Key , Dynamic page
    ["productsApi", page],
    // pagination
    getProducts,
    {
      // // Lma akhrug mn el component haystna 3s wa yms7 el cache
      // cacheTime: 3000
      // // ana ha2olo hay3ml fetch lwahod
      // refetchOnMount: false
      // // Kol 1s y3ml refetch lwahdo
      // refetchInterval: 1000
      // // Tol mana fat7a el component haygble el data el adema wa ystna 5s wa ygeb el gdeda
      // staleTime: 5000,
      // // lw khrgt mn el window wa rg3t mt3mlsh refetch
      // refetchOnWindowFocus: false,
    }
  );
  function getProducts(QueryData) {
    let pageNumber = QueryData.queryKey[1];
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`
    );
  }
  // Accesing Data of backend
  let productsList = data?.data.data;

  // Returning page number
  function getPageNumber(e) {
    let pageNumber = e.target.getAttribute("page-number");
    setPage(pageNumber);
  }

  // Cart Functions
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <>
      {/* ================== Noraml Fetching way ==================*/}
      {/* <div className="container my-5">
        <div className="row g-3">
          {loading ? (
            <div className="bg-white position-fixed top-0 end-0 start-0 bottom-0 z-3 d-flex justify-content-center align-items-center">
              <span className="loader"></span>
            </div>
          ) : (
            productsList &&
            productsList.map((product, index) => {
              return (
                <div className="col-md-2" key={index}>
                  <div className="product px-3 h-100">
                    <img
                      src={product.imageCover}
                      alt=""
                      className="w-100 mb-2"
                    />
                    <h6 className="text-main">{product.category.name}</h6>
                    <p className="fw-bolder">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <div className="d-flex justify-content-between">
                      <p>{product.price} EGP</p>
                      <p>
                        <i className="fa-solid fa-star rating-color"></i>
                        <span> {product.ratingsAverage}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div> */}

      {/* ================== React Query way ==================*/}

      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <div className="container my-5">
        <div className="row g-3">
          {isLoading ? (
            <div className="loading bg-white position-absolute top-0 end-0 start-0 bottom-0 p-0 m-0 d-flex justify-content-center align-items-center">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              {productsList.map((product, index) => {
                return (
                  <div className="col-md-2" key={index}>
                    <div className="product p-2 h-100">
                      <Link to={`/specificProduct/${product.id}`}>
                        <img
                          src={product.imageCover}
                          alt=""
                          className="w-100 mb-2"
                        />
                        <h6 className="text-main">{product.category.name}</h6>
                        <p className="fw-bolder">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <div className="d-flex justify-content-between">
                          <p>{product.price} EGP</p>
                          <p>
                            <i className="fa-solid fa-star rating-color"></i>
                            <span> {product.ratingsAverage}</span>
                          </p>
                        </div>
                      </Link>
                      <button
                        className="btn p-0 mb-3"
                        onClick={() => {
                          addToWishlist(product.id);
                        }}
                      >
                        <i className="fa-solid fa-heart fa-2xl d-block text-end"></i>
                      </button>
                      <button
                        className="cart-btn btn bg-main text-white d-block w-100"
                        onClick={() => {
                          addToCart(product.id);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center my-4">
                  <li className="page-item">
                    <Link
                      className="page-link cursor-pointer"
                      page-number="1"
                      onClick={getPageNumber}
                    >
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="page-link cursor-pointer"
                      page-number="2"
                      onClick={getPageNumber}
                    >
                      2
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </>
  );
}
