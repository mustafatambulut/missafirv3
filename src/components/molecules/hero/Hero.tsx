"use client";
import { useEffect } from "react";
import { get, keys, omit } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateFilterData } from "@/redux/features/listingSlice/listingSlice";

import { BODY } from "@/app/constants";
import { HERO_SECTION } from "@/components/molecules/hero/constants";
import useFetchData from "@/app/hooks/useFetchData";
import { IHero } from "@/components/molecules/hero/types";

import Loading from "@/components/atoms/loading/Loading";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import MobileSearchBar from "@/components/molecules/mobileSearchBar/MobileSearchBar";

const Hero = () => {
  const hero = useFetchData<IHero>(BODY, HERO_SECTION);
  const dispatch = useAppDispatch();
  const { filterData } = useAppSelector((state) => state.listingReducer);

  useEffect(() => {
    dispatch(
      updateFilterData(omit(filterData, keys(omit(filterData, ["price_type"]))))
    );
  }, []);

  return (
    <Loading isLoading={!get(hero, "image")} loader={<p>Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${get(hero, "image")})` }}>
        <div className="w-full flex flex-col hero-content text-center text-neutral-content">
          <p className="text-42 text-left lg:text-54 text-white lg:mb-3 font-mi-semi-bold">
            {get(hero, "title")}
          </p>
          {isMobile ? <MobileSearchBar /> : <SearchBar />}
        </div>
      </div>
    </Loading>
  );
};

export default Hero;
