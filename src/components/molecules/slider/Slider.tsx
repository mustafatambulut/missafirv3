"use client";
import classNames from "classnames";
import { map, isArray } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper";

import { ISlider } from "@/components/molecules/slider/types";

import "swiper/css";
import "./Slider.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({
  onSwiper,
  initialSlide,
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
  const swiperSlideClass = classNames({
    "w-auto": slidesPerView === "auto"
  });

  return (
    <div className={`relative ${sliderContainerClassName}`}>
      <Swiper
        onSwiper={onSwiper}
        watchSlidesProgress
        initialSlide={initialSlide}
        keyboard={{
          enabled: true
        }}
        style={{
          "--swiper-pagination-color": "#D01E50",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "1"
        }}
        className={`${sliderWrapperClassName} ${sliderIdentifier}`}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={[Navigation, Pagination, Keyboard]}
        {...(customPagination
          ? {
              pagination: customPagination
            }
          : withPagination
          ? {
              pagination: {
                dynamicBullets: true,
                dynamicMainBullets: 3,
                renderBullet: function (index, className) {
                  return `<span class="${className} scale-100"></span>`;
                },
                clickable: true
              }
            }
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
              return (
                <SwiperSlide key={key} className={swiperSlideClass}>
                  {item}
                </SwiperSlide>
              );
            })
          : children}
      </Swiper>
      {customNavigation && customNavigation}
    </div>
  );
};
export default Slider;
