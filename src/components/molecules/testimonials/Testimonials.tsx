"use client";
import React from "react";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "@/components/atoms/card/Card";
import "swiper/css";
import "swiper/css/free-mode";
import { ITestimonials } from "@/components/molecules/testimonials/types";
import Image from "next/image";
import { isMobileView } from "@/utils/helper";

const Testimonials = ({ header, body }: ITestimonials) => {
  return (
    <div className="lg:px-40">
      <div className="text-center mb-10 px-5 lg:px-10">
        <div className="text-3xl font-bold mb-8 text-[28px] lg:text-[42px]">
          {header.title}
        </div>
        <p className="text-lg lg:text-2xl text-center text-gray-600">
          {header.description}
        </p>
      </div>
      <Swiper
        slidesPerView={isMobileView() ? 1 : 3}
        spaceBetween={isMobileView() ? 15 : 35}
        freeMode={true}
        modules={[FreeMode]}
        className={`${isMobileView() ? "pr-24" : ""}`}>
        {body.map((item, index) => (
          <SwiperSlide key={index}>
            <Card className="bg-primary-50 !bg-[#FFFBFC] rounded-2xl">
              <div className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] relative">
                <Image
                  src={item.header_image}
                  alt="testimonials"
                  fill
                  className="mb-2"
                />
              </div>
              <div className="text-xl lg:text-2xl">{item.description}</div>
              <div className="text-base lg:text-2xl font-mi-sans-semi-bold">
                {item.author}
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
