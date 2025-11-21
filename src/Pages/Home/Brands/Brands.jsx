import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Brand image import
import azamon from "../../../assets/brands/amazon.png";
import azamon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Brands = () => {
  const brandLogos = [
    azamon,
    azamon_vector,
    casio,
    moonstar,
    randstad,
    star,
    start_people,
  ];

  return (
    <div className="border my-20">
      <h1 className="font-bold text-3xl text-center my-10 ">
        We've helped thousand of sales teams
      </h1>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {brandLogos.map((brand, index) => (
          <SwiperSlide key={index}>
            <img src={brand} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
