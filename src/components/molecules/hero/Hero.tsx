"use client";
import { useEffect } from "react";
import { get, keys, omit } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateBookingDate,
  updateFilterData
} from "@/redux/features/listingSlice/listingSlice";

import { BODY } from "@/app/constants";
import { HERO_SECTION } from "@/components/molecules/hero/constants";
import useFetchData from "@/app/hooks/useFetchData";
import { IHero } from "@/components/molecules/hero/types";

import Loading from "@/components/atoms/loading/Loading";
import Typography from "@/components/atoms/typography/Typography";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import MobileSearchBar from "@/components/molecules/mobileSearchBar/MobileSearchBar";
import HeroSkeleton from "../skeletons/heroSkeleton/HeroSkeleton";

const Hero = () => {
  const hero = useFetchData<IHero>(BODY, HERO_SECTION);
  const dispatch = useAppDispatch();
  const { filterData, bookingDate } = useAppSelector(
    (state) => state.listingReducer
  );

  const handleChangeBookingDate = (date) => {
    dispatch(updateBookingDate(date));
  };

  useEffect(() => {
    dispatch(
      updateFilterData(omit(filterData, keys(omit(filterData, ["price_type"]))))
    );
  }, []);

  return (
    <Loading isLoading={!get(hero, "image")} loader={<HeroSkeleton />}>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${get(hero, "image")})` }}>
        <div className="w-full flex flex-col hero-content text-center text-neutral-content">
          <Typography
            element="h2"
            variant="h2"
            className="text-left text-white lg:mb-3">
            {get(hero, "title")}
          </Typography>
          {isMobile ? (
            <MobileSearchBar
              bookingDate={bookingDate}
              setBookingDate={handleChangeBookingDate}
            />
          ) : (
            <SearchBar />
          )}
        </div>
      </div>
    </Loading>
  );
};

export default Hero;
