"use client";
import React from "react";
import { map, isArray } from "lodash";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ISlider } from "@/components/molecules/slider/types";

import "swiper/css";
import "./Slider.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({
  spaceBetween,
  slidesPerView,
  withPagination = false,
  withNavigation = false,
  customNavigation = null,
  customPagination = null,
  children,
  sliderContainerClassName = "",
  sliderWrapperClassName = "",
  sliderIdentifier
}: ISlider) => {
  return (
    <div className={`relative ${sliderContainerClassName}`}>
      <Swiper
        style={{
          "--swiper-pagination-color": "#D01E50",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "1"
        }}
        className={`${sliderWrapperClassName} ${sliderIdentifier}`}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={[Navigation, Pagination]}
        {...(customPagination
          ? {
              pagination: customPagination
            }
          : withPagination
          ? { pagination: true }
          : null)}
        {...(customNavigation
          ? {
              navigation: {
                nextEl: `.swiper-button-next.${sliderIdentifier}`,
                prevEl: `.swiper-button-prev.${sliderIdentifier}`
              }
            }
          : withNavigation
          ? { navigation: true }
          : null)}>
        {isArray(children)
          ? map(children, (item, key) => {
              return <SwiperSlide key={key}>{item}</SwiperSlide>;
            })
          : children}
      </Swiper>
      {customNavigation && customNavigation}
    </div>
  );
};
export default Slider;
