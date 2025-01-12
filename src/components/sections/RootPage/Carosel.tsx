"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import Image from "next/image";

const imageData = [
  {
    src: "/6.jpg",
    alt: "banner 6",
  },
  {
    src: "/1.jpg",
    alt: "banner 1",
  },
  {
    src: "/2.jpg",
    alt: "banner 2",
  },

  {
    src: "/3.jpg",
    alt: "banner 3",
  },

  {
    src: "/4.jpg",
    alt: "banner 4",
  },
  {
    src: "/5.jpg",
    alt: "banner 5",
  },
];

const Carosel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
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
          <div className="h-[300px] md:h-[350px] lg:h-[400px] w-full relative">
            <Image
              width={2000}
              height={1000}
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carosel;
