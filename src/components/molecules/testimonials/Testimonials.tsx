"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { filter, first, get, map } from "lodash";

import { BODY, HOME } from "@/app/constants";
import { getPageDataByComponent } from "@/utils/helper";

import Card from "@/components/atoms/card/Card";
import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";

import "swiper/css";
import "swiper/css/free-mode";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(null);

  const fetchData = async () => {
    const response = await getPageDataByComponent(HOME, BODY);
    const testimonials = first(
      filter(response, (item) => item["__component"] === "sections.testemonial")
    );
    setTestimonials(testimonials);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {testimonials && (
        <Section
          className="px-4 lg:px-20 mt-14"
          title={get(testimonials, "header.title")}
          description={get(testimonials, "header.description")}>
          <Slider
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={15}
            sliderIdentifier={"testimonials"}
            sliderWrapperClassName="pr-20 lg:pr-0">
            {map(get(testimonials, "body"), (item, index) => (
              <Card
                key={index}
                className="bg-primary-25 rounded-2xl p-3 lg:p-5">
                <div className="w-[60px] h-[60px] lg:w-[120px] lg:h-[120px] relative">
                  <Image
                    src={get(item, "header_image") || ""}
                    alt="testimonials"
                    fill
                    className="mb-2"
                  />
                </div>
                <div className="text-xl lg:text-2xl">{get(item, "info")}</div>
                <div className="text-base lg:text-2xl font-mi-sans-semi-bold">
                  {get(item, "footer_desc")}
                </div>
              </Card>
            ))}
          </Slider>
        </Section>
      )}
    </>
  );
};

export default Testimonials;
