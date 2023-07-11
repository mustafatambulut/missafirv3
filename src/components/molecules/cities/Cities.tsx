"use client";
import { useEffect, useState } from "react";
import { filter, first, get } from "lodash";
import { getPageDataByComponent } from "@/utils/helper";

import { BODY, HOME } from "@/app/constants";
import Slider from "@/components/molecules/slider/Slider";

const CustomNavigation = () => {
  return (
    <>
      <div className="swiper-button-prev rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex left-auto right-20 top-[-50px]">
        Prev
      </div>
      <div className="swiper-button-next rounded-full shadow w-[60px] h-[60px] after:hidden hidden lg:flex top-[-50px]">
        Next
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
    console.log("citiesData", citiesData);
    setCities(citiesData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {cities && (
        <div className="lg:px-8 mt-4">
          <div className="flex flex-col items-center text-gray-700">
            <h2 className="text-42 font-mis-sans-semi-bold">
              {get(cities, "header.title")}
            </h2>
            <p className="max-w-2xl text-center my-10 text-2xl">{get(cities, "header.description")}</p>
          </div>
          <Slider
            slides={get(cities, "cities.data")}
            slidesPerView={3}
            spaceBetween={10}
            customNavigation={<CustomNavigation />}
          />
        </div>
      )}
    </>
  );
};

export default Cities;
