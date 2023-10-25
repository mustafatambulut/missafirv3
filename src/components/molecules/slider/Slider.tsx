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
import { isMobile } from "react-device-detect";
import { useState } from "react";

const Slider = ({
  onSwiper,
  initialSlide,
  withPagination = false,
  withNavigation = false,
  customNavigation = null,
  customPagination = null,
  children,
  sliderContainerClassName = "",
  sliderWrapperClassName = "",
  sliderIdentifier,
  autoHiddenNavigation = true,
  mobileSlidesPerView = 1,
  desktopSlidesPerView = 4,
  mobileSpaceBetween = 5,
  desktopSpaceBetween = 10,
  desktopLargeSlidesPerView = 5,
  desktopLargeSpaceBetween = 10
}: ISlider) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const swiperSlideClass = classNames({
    "w-auto": mobileSlidesPerView === "auto" || desktopSlidesPerView === "auto"
  });

  const breakPoints = {
    0: {
      slidesPerView: mobileSlidesPerView,
      spaceBetween: mobileSpaceBetween
    },
    768: {
      slidesPerView: desktopSlidesPerView,
      spaceBetween: desktopSpaceBetween
    },
    1536: {
      slidesPerView: desktopLargeSlidesPerView,
      spaceBetween: desktopLargeSpaceBetween
    }
  };

  return (
    <div
      onMouseEnter={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
      className={`relative ${sliderContainerClassName}`}>
      <Swiper
        breakpoints={breakPoints}
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
        spaceBetween={isMobile ? mobileSpaceBetween : desktopSpaceBetween}
        slidesPerView={isMobile ? mobileSlidesPerView : desktopSlidesPerView}
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
                <SwiperSlide
                  key={key}
                  className={`relative ${swiperSlideClass}`}>
                  {item}
                </SwiperSlide>
              );
            })
          : children}
      </Swiper>
      {customNavigation && (
        <div
          className={`${
            autoHiddenNavigation
              ? showNavigation
                ? "lg:block"
                : "hidden"
              : "lg:block"
          }`}>
          {customNavigation}
        </div>
      )}
    </div>
  );
};
export default Slider;
