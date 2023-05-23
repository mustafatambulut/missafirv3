"use client";
import { get, map } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const Slider = ({ data }: object) => {
  const sliderData = get(data, "slider.data");
  return (
    <div className="mt-10">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}>
        {/*onSlideChange={() => console.log("slide change")}*/}
        {/*onSwiper={(swiper) => console.log(swiper)}>*/}
        {map(sliderData, ({ attributes }, key) => (
          <SwiperSlide key={key}>
            <img
              className="object-cover lg:h-96 h-20 w-full rounded-xl mx-20"
              src={`${process.env.API_URL_DEV}${get(attributes, "url")}`}
              alt="img"
            />
            <p className="text-2xl text-[#515151]">
              {get(attributes, "alternativeText")}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
