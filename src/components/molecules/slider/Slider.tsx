"use client";
import { get, map } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import NextArrow from "../../../../public/images/next-arrow.svg";
import PrevArrow from "../../../../public/images/prev-arrow.svg";
import React from "react";
import { ISlider } from "@/components/molecules/techExperience/types";

const Slider = ({ slides }: ISlider) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }}>
      {map(slides, (item, key) => (
        <SwiperSlide key={key}>
          <div className="flex flex-col items-center px-6 lg:px-0">
            <Image
              src={get(item, "image")}
              alt="image"
              width={447}
              height={559}
              className="my-12"
            />
            <p className="text-center line-clamp-4 text-sm lg:text-2xl text-gray-600">
              {item.description}
            </p>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-button-prev rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex">
        <PrevArrow />
      </div>
      <div className="swiper-button-next rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex">
        <NextArrow />
      </div>
    </Swiper>
  );
};

export default Slider;
