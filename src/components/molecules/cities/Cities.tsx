"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { find, get, head, map, size } from "lodash";

import { BODY } from "@/app/constants";
import { useAppSelector } from "@/redux/hooks";
import { Attributes, ICity } from "@/components/molecules/cities/types";
import { CITY_SECTION } from "@/components/molecules/cities/constants";

import Card from "@/components/atoms/card/Card";
import Loading from "@/components/atoms/loading/Loading";
import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";

import "./Cities.css";
import NextIcon from "../../../../public/images/secondary-arrow-right.svg";
import PreviousIcon from "../../../../public/images/secondary-arrow-left.svg";

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
  const [cities, setCities] = useState<ICity>(null);
  const entities = useAppSelector((state) => state.landingReducer.entities);

  useEffect(() => {
    if (size(entities)) {
      const data = get(head(entities), BODY);
      setCities(find(data, { __component: CITY_SECTION }));
    }
  }, [entities]);

  const CardComponent = ({ city }: Attributes) => {
    return (
      <Card className="p-4 border border-[#EEEEEE] rounded-2xl">
        <div className="w-full h-40 lg:h-60 relative">
          <Image
            src={get(city, "attributes.image") || ""}
            alt="image"
            className="object-cover rounded-2xl"
            fill={true}
          />
        </div>
        <div className="p-2">
          <h2 className="font-mi-sans-semi-bold text-22 lg:text-28 text-[#515151]">
            {get(city, "attributes.title")}
          </h2>
          <p className="text-lg lg:text-xl text-[#A9A9A9]">
            {get(city, "attributes.description")}
          </p>
        </div>
      </Card>
    );
  };

  return (
    <Loading isLoading={!cities} loader={<p>Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <Section
        className="px-4 lg:px-8 mt-14"
        title={get(cities, "header.title")}
        description={get(cities, "header.description")}>
        <Slider
          sliderIdentifier="cities"
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={isMobile ? 12 : 14}
          customNavigation={<CustomNavigation />}
          sliderWrapperClassName={isMobile ? "pr-20" : "pr-40"}>
          {map(get(cities, "cities.data"), (city, key) => (
            <CardComponent key={key} city={city} />
          ))}
        </Slider>
      </Section>
    </Loading>
  );
};

export default Cities;
