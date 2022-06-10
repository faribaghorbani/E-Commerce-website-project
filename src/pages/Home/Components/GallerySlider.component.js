import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./style/Slider3D.scss";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import carousel1 from '../../../assets/images/carousel1.jpg'
import carousel2 from '../../../assets/images/carousel2.jpg'
import carousel3 from '../../../assets/images/carousel3.jpg'
import carousel4 from '../../../assets/images/carousel4.jpg'
import carousel5 from '../../../assets/images/carousel5.jpg'

export default function GallerySlider() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 5,
          slideShadows: true,
        }}
        loop={true}
        // pagination={true}
        autoplay={{
          delay: 4000
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={carousel1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel4} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={carousel5} />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
