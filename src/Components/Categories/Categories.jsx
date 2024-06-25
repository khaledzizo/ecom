import axios from "axios";
import React, { useState } from "react";

export default function Categories() {
  let [categoryList, setCategories] = useState([]);
  async function getCategories() {
    try {
      let request = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(request.data.data);
      return request;
    } catch (error) {
      // Handle error gracefully
      console.error("Error fetching categories:", error);
      // Optionally, you can throw the error again to let the caller handle it further
      throw error;
    }
  }

  useState(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="container-fluid m-5">
        <div className="row g-3">
          {categoryList.map((category) => {
            return (
              <div className="col-md-3">
                <div className="product border border-2 h-100">
                  <img
                    src={category.image}
                    alt=""
                    className="w-100"
                    height={300}
                  />
                  <h3 className="text-main text-center py-3">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
