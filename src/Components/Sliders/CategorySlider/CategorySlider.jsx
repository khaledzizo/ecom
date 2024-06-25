import axios from "axios";
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function CategorySlider() {
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2>Categories</h2>
      <OwlCarousel
        className="owl-theme"
        loop
        margin={10}
        items={7}
        grabClass="owl-grab"
      >
        {categoryList.map((category, index) => {
          return (
            <div className="item" key={index}>
              <img src={category.image} alt="" height={260} />
              <h5 className="text-black fw-bolder mt-2">{category.name}</h5>
            </div>
          );
        })}
      </OwlCarousel>
    </>
  );
}
