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

import PreviousIcon from "../../../../public/images/secondary-arrow-left.svg";
import NextIcon from "../../../../public/images/secondary-arrow-right.svg";

import "./Cities.css";

const CustomNavigation = () => {
  return (
    <>
      <div className="cities swiper-button-prev rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex left-auto right-20 top-[-50px]">
        <PreviousIcon className="fill-primary" />
      </div>
      <div className="cities swiper-button-next rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex top-[-50px]">
        <NextIcon className="fill-primary" />
      </div>
    </>
  );
};

const Cities = () => {
  const [cities, setCities] = useState(null);

  const fetchData = async () => {
    const response = await getPageDataByComponent(HOME, BODY);
    const citiesData = first(
      filter(response, (item) => item["__component"] === "sections.cities")
    );
    setCities(citiesData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {cities && (
        <Section
          className="px-4 lg:px-8 mt-14"
          title={get(cities, "header.title")}
          description={get(cities, "header.description")}>
          <Slider
            sliderIdentifier="cities"
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={20}
            customNavigation={<CustomNavigation />}
            sliderWrapperClassName={isMobile ? "pr-20" : ""}>
            {map(get(cities, "cities.data"), (city, key) => (
              <Card
                className="shadow-[0px_1px_20px_0px_#00000014] rounded-xl"
                key={key}>
                <Image
                  src={get(city, "attributes.image") || ""}
                  alt="image"
                  width={350}
                  height={232}
                  className={`w-full object-cover`}
                />
                <h2 className="font-mi-sans-semi-bold text-22 lg:text-28 text-[#515151]">
                  {get(city, "attributes.title")}
                </h2>
                <p className="text-lg lg:text-xl text-[#A9A9A9]">
                  {get(city, "attributes.description")}
                </p>
              </Card>
            ))}
          </Slider>
        </Section>
      )}
    </>
  );
};

export default Cities;
