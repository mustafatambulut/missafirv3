"use client";
import React from "react";
import Image from "next/image";
import { get, map } from "lodash";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ISlider } from "@/components/molecules/slider/types";

import "swiper/css";
import "swiper/css/navigation";
import Card from "@/components/atoms/card/Card";

// import NextArrow from "../../../../public/images/next-arrow.svg";
// import PrevArrow from "../../../../public/images/prev-arrow.svg";

const Slider = ({
  slides,
  spaceBetween,
  slidesPerView,
  withPagination = false,
  withNavigation = false,
  customNavigation = null,
}: ISlider) => {
  return (
    <div className="relative">
      <Swiper
        className="pr-40"
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={[Navigation, Pagination]}
        pagination={withPagination}
        {...(customNavigation
          ? {
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
              }
            }
          : withNavigation
          ? { navigation: true }
          : null)}>
        {map(slides, (item, key) => (
          <SwiperSlide key={key}>
            <Card>
              <Image
                src={get(item, "attributes.image")}
                alt="image"
                fill={true}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      {customNavigation && customNavigation}
    </div>
  );
};
export default Slider;
