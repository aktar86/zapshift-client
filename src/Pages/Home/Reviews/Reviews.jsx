import React, { use } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewsCard from "./ReviewsCard";

const Reviews = ({ reviewsPromies }) => {
  const reviews = use(reviewsPromies);
  console.log(reviews);
  return (
    <div className="my-25">
      <div className="my-10">
        <h3 className="font-bold text-3xl text-center my-3">
          What says our clients
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ipsum
          eum nesciunt repudiandae ea tempora atque voluptatibus itaque, non
          libero quos ducimus vero maiores, dolorum incidunt? Dicta illo dolorum
          assumenda.
        </p>
      </div>

      {/* cover flow effect parameter */}
      <Swiper
        loop={true}
        spaceBetween={20}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewsCard review={review}></ReviewsCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
