"use client";
import Image from "next/image";
import { get, map } from "lodash";
import { isMobile } from "react-device-detect";

import { BODY } from "@/app/constants";
import { CITY_SECTION } from "@/components/molecules/cities/constants";
import useFetchData from "@/app/hooks/useFetchData";
import {
  IAttributes,
  ICity,
  ICityAttributes
} from "@/components/molecules/cities/types";

import Card from "@/components/atoms/card/Card";
import Loading from "@/components/atoms/loading/Loading";
import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";

import "./Cities.css";
import NextIcon from "../../../../public/images/arrow_right.svg";
import PreviousIcon from "../../../../public/images/arrow_left.svg";
import CitiesSkeleton from "../skeletons/citiesSkeleton/CitiesSkeleton";
import Typography from "@/components/atoms/typography/Typography";

const CustomNavigation = () => {
  return (
    <>
      <div className="cities swiper-button-prev rounded-full shadow w-[60px] h-[60px] after:hidden bg-none p-0 hidden lg:flex left-auto right-20 top-[-50px]">
        <PreviousIcon className="fill-primary" />
      </div>
      <div className="cities swiper-button-next rounded-full shadow w-[60px] h-[60px] after:hidden bg-none p-0 hidden lg:flex top-[-50px]">
        <NextIcon className="fill-primary" />
      </div>
    </>
  );
};

const Cities = () => {
  const cities = useFetchData<ICity>(BODY, CITY_SECTION);
  const CardComponent = ({ city }: ICityAttributes) => {
    return (
      <Card className="p-4 border border-[#EEEEEE] rounded-2xl">
        <div className="w-full h-40 lg:h-60 relative">
          {get(city, "attributes.image") && (
            <Image
              src={get(city, "attributes.image") || "/"}
              alt="image"
              className="object-cover rounded-2xl"
              fill={true}
            />
          )}
        </div>
        <div className="p-2">
          <Typography element="h6" variant="h6" className="text-gray-800">
            {get(city, "attributes.title")}
          </Typography>
          <Typography element="p" variant="p4" className="text-gray-500 mt-2">
            {get(city, "attributes.description")}
          </Typography>
        </div>
      </Card>
    );
  };

  return (
    <Loading isLoading={!cities} loader={<CitiesSkeleton />}>
      <Section
        className="px-2 lg:px-8 mt-14"
        title={get(cities, "header.title")}
        description={get(cities, "header.description")}>
        <Slider
          sliderIdentifier="cities"
          autoHiddenNavigation={false}
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={isMobile ? 12 : 14}
          customNavigation={<CustomNavigation />}
          sliderWrapperClassName={isMobile ? "pr-20" : "pr-40"}>
          {map(get(cities, "cities.data"), (city: IAttributes, key) => (
            <CardComponent key={key} city={city} />
          ))}
        </Slider>
      </Section>
    </Loading>
  );
};

export default Cities;
