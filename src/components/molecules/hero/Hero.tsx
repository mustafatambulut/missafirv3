"use client";
import { Suspense, useEffect } from "react";
import { get } from "lodash";
import { isMobile } from "react-device-detect";

import {
  updateFilterData,
  updateBookingDate,
  updateBookingDestination,
  updateBookingGuests
} from "@/redux/features/listingSlice/listingSlice";
import { IHero } from "@/components/molecules/hero/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Loading from "@/components/atoms/loading/Loading";
import HeroSkeleton from "../skeletons/heroSkeleton/HeroSkeleton";
import SearchBar from "@/components/molecules/searchBar/SearchBar";
import MobileSearchBar from "@/components/molecules/mobileSearchBar/MobileSearchBar";

const Hero = ({ hero, children }: IHero) => {
  const dispatch = useAppDispatch();
  const bookingDate = useAppSelector(
    (state) => state.listingReducer.bookingDate
  );
  const handleChangeBookingDate = (date) => {
    dispatch(updateBookingDate(date));
  };

  useEffect(() => {
    dispatch(
      updateBookingDate({
        startDate: null,
        endDate: null
      })
    );
    dispatch(updateBookingDestination(null));
    dispatch(
      updateBookingGuests({
        adults: 1,
        kids: 0,
        pets: 0
      })
    );
    dispatch(updateFilterData({}));
  }, []);

  return (
    <Suspense fallback={<HeroSkeleton />}>
      <Loading isLoading={!get(hero, "image")} loader={<HeroSkeleton />}>
        <div
          className="hero min-h-screen"
          style={{ backgroundImage: `url(${get(hero, "image")})` }}>
          <div className="w-full flex flex-col hero-content text-center text-neutral-content">
            {children}
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
    </Suspense>
  );
};

export default Hero;
