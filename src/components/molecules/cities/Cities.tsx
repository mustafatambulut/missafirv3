import Image from "next/image";
import { get, map } from "lodash";

import {
  IAttributes,
  ICityAttributes
} from "@/components/molecules/cities/types";

import Card from "@/components/atoms/card/Card";
import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import Slider from "@/components/molecules/slider/Slider";
import Section from "@/components/molecules/section/Section";
import CitiesSkeleton from "../skeletons/citiesSkeleton/CitiesSkeleton";

import "./Cities.css";
import NextIcon from "../../../../public/images/arrow_right.svg";
import PreviousIcon from "../../../../public/images/arrow_left.svg";
import { Suspense } from "react";

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

const Cities = ({ cities }: any) => {
  const CardComponent = ({ city }: ICityAttributes) => {
    return (
      <Card className="p-4 border border-[#EEEEEE] rounded-2xl">
        <div className="w-full h-40 lg:h-60 relative">
          {get(city, "attributes.image") && (
            <Image
              alt="image"
              fill={true}
              priority={true}
              src={get(city, "attributes.image")}
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="p-2">
          <Typography element="h6" variant="h6" className="text-gray-800">
            {get(city, "attributes.title")}
          </Typography>
          <div className="min-h-[7rem] lg:min-h-auto">
            <Typography element="p" variant="p4" className="text-gray-500 mt-2">
              {get(city, "attributes.description")}
            </Typography>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Suspense fallback={<CitiesSkeleton />}>
      <Loading isLoading={!cities} loader={<CitiesSkeleton />}>
        <Section
          className="px-2 lg:px-8 mt-14"
          title={get(cities, "header.title")}
          description={get(cities, "header.description")}>
          <Slider
            sliderIdentifier="cities"
            autoHiddenNavigation={false}
            mobileSlidesPerView={1}
            desktopSlidesPerView={3}
            desktopLargeSlidesPerView={5}
            mobileSpaceBetween={12}
            desktopSpaceBetween={14}
            desktopLargeSpaceBetween={16}
            customNavigation={<CustomNavigation />}
            sliderWrapperClassName="pr-20 lg:pr-40">
            {map(get(cities, "cities.data"), (city: IAttributes, key) => (
              <CardComponent key={key} city={city} />
            ))}
          </Slider>
        </Section>
      </Loading>
    </Suspense>
  );
};

export default Cities;
