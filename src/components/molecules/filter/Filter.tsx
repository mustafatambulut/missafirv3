"use client";
import { useEffect, useState } from "react";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import includes from "lodash/includes";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";

import {
  fetchFilters,
  updateFilterData,
  updateBookingDate,
  updateShowSearchbar,
  updateSearchClicked
} from "@/redux/features/listingSlice/listingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Typography from "@/components/atoms/typography/Typography";
import AllFilters from "@/components/molecules/allfilters/AllFilters";
import FilterItem from "@/components/molecules/filterItem/FilterItem";
import MobileSearchBar from "@/components/molecules/mobileSearchBar/MobileSearchBar";

import FilterIcon from "../../../../public/images/filters.svg";

const Filter = ({ searchParams }: { searchParams: any }) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const filterItems = useAppSelector(
    (state) => state.listingReducer.filterItems
  );
  const filterData = useAppSelector((state) => state.listingReducer.filterData);
  const bookingDate = useAppSelector(
    (state) => state.listingReducer.bookingDate
  );
  const showSearchbar = useAppSelector(
    (state) => state.listingReducer.showSearchbar
  );
  const handleChangeBookingDate = (date) => dispatch(updateBookingDate(date));

  useEffect(() => {
    isOverlayActive && isMobile
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isOverlayActive]);

  useEffect(() => {
    dispatch(updateFilterData({ ...filterData, ...searchParams }));
    dispatch(fetchFilters());
    dispatch(updateShowSearchbar(true));
    return () => {
      dispatch(updateShowSearchbar(false));
      dispatch(updateSearchClicked(false));
      dispatch(updateFilterData({}));
    };
  }, []);

  return (
    !!size(filterItems) && (
      <div>
        {showSearchbar && isMobile && (
          <div className="px-3 lg:px-0">
            <MobileSearchBar
              bookingDate={bookingDate}
              setBookingDate={handleChangeBookingDate}
              isInCustomSection={true}
            />
          </div>
        )}
        <div className="relative">
          {isOverlayActive && (
            <div className="fixed top-44 z-20 left-0 w-screen h-screen bg-black opacity-20 lg:hidden" />
          )}
          <AllFilters searchParams={searchParams} />
          <div className="shadow-bold-blur-20 py-3 px-4 rounded-xl flex flex-nowrap justify-start items-center gap-2 overflow-x-auto filter-wrapper after:clear-both">
            <label
              htmlFor="all_filters_modal"
              className="border flex items-center justify-center flex-nowrap bg-gray-50 rounded-2xl h-11 whitespace-nowrap cursor-pointer font-mi-sans-semi-bold text-base px-4 border-transparent">
              <FilterIcon className="mr-3" />
              <Typography variant="p4" element="span">
                {t("all_filters")}
              </Typography>
            </label>
            {map(filterItems, (item, key) => {
              if (includes(["bar", "all"], get(item, "display"))) {
                return (
                  <FilterItem
                    searchParams={searchParams}
                    key={key}
                    filterItem={item}
                    isInAllFilters={false}
                    setIsOverlayActive={setIsOverlayActive}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Filter;
