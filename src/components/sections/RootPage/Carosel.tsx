"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import Image from "next/image";


const imageData = [
  {
    src: "https://i.ibb.co/tp23NwK/nature-6799071-1280.jpg",
    alt: "banner 1",
  },
  {
    src: "https://i.ibb.co/zXK75TY/man-5475371-1280.jpg",
    alt: "banner 2",
  },
];

const Carosel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {imageData.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="h-[400px] md:h-[500px] lg:[700px] w-full relative">
           <Image width={2000} height={1000} src={image.src} alt={image.alt} className="object-cover w-full h-full" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carosel;
