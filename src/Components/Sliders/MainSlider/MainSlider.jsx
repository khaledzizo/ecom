import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import mainSlider1 from "../../../assets/images/Home/Main Slider/main-slider-image-1.jpeg";
import mainSlider2 from "../../../assets/images/Home/Main Slider/main-slider-image-2.jpeg";

export default function MainSlider() {
  return (
    <>
      <div className="row g-0 justify-content-center my-5">
        <div className="col-md-8">
          <OwlCarousel
            className="owl-theme"
            loop
            margin={10}
            dots
            items={1}
            touchDrag
            grabClass="owl-grab"
            autoplay
            autoplayTimeout={1000}
          >
            <div className="item">
              <img src={mainSlider1} alt="" className="w-100 h-100" />
            </div>
            <div className="item">
              <img src={mainSlider2} alt="" className="w-100 h-100" />
            </div>
          </OwlCarousel>
        </div>
        <div className="col-md-4">
          <div className="row g-0">
            <div className="col-md-12">
              <img src={mainSlider1} alt="" className="w-100" />
            </div>
            <div className="col-md-12">
              <img src={mainSlider2} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
