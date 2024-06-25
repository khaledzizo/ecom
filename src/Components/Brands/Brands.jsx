import axios from "axios";
import React, { useState } from "react";

export default function Brands() {
  let [brands, setBrands] = useState([]);
  async function getBrands() {
    try {
      let request = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands`
      );
      setBrands(request.data.data);
      return request;
    } catch (error) {
      // Handle error gracefully
      console.error("Error fetching brands:", error);
      // Optionally, you can throw the error again to let the caller handle it further
      throw error;
    }
  }

  useState(() => {
    getBrands();
  }, []);
  return (
    <>
      <div className="container my-5">
        <h1 className="text-main fw-bold text-center mb-5">All Brands</h1>
        <div className="row g-4">
          {brands.map((brand) => {
            return (
              <div className="col-md-3">
                <div className="product border border-2">
                  <img src={brand.image} alt="" className="w-100" height={200} />
                  <h5 className="text-center py-3">{brand.name}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
