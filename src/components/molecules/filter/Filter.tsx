"use client";
import { useCallback, useEffect, useState } from "react";
import { debounce, get, map, size } from "lodash";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { getLocalStorage, setLocalStorage } from "@/utils/helper";
import {
  fetchFilters,
  fetchListings,
  updateFilterData,
  updateFilterItems,
  updateShowSearchbar
} from "@/redux/features/listingSlice/listingSlice";

import AllFilters from "@/components/molecules/allfilters/AllFilters";
import FilterItem from "@/components/molecules/filterItem/FilterItem";
import MobileSearchBar from "@/components/molecules/mobileSearchBar/MobileSearchBar";

import FilterIcon from "../../../../public/images/filters.svg";

const Filter = () => {
  const dispatch = useAppDispatch();
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const { filterItems, filterData } = useAppSelector(
    (state) => state.listingReducer
  );
  const { showSearchbar } = useAppSelector((state) => state.listingReducer);

  useEffect(() => {
    const storedFilterItems = getLocalStorage("filterItems");
    storedFilterItems
      ? dispatch(updateFilterItems(JSON.parse(storedFilterItems)))
      : dispatch(fetchFilters());

    const storedFilterData = getLocalStorage("filterData");
    storedFilterData
      ? dispatch(updateFilterData(JSON.parse(storedFilterData)))
      : setLocalStorage("filterData", JSON.stringify(filterData));
  }, []);

  const handleFetchListings = useCallback(
    debounce((filterData) => {
      dispatch(fetchListings(filterData));
    }, 500),
    []
  );

  useEffect(() => {
    handleFetchListings(filterData);
  }, [handleFetchListings, filterData]);

  useEffect(() => {
    isOverlayActive
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isOverlayActive]);

  useEffect(() => {
    dispatch(updateShowSearchbar(true));
    return () => {
      dispatch(updateShowSearchbar(false));
    };
  }, []);

  return size(filterItems) > 0 ? (
    <div>
      {showSearchbar && isMobile && (
        <MobileSearchBar isInCustomSection={true} />
      )}
      <div className="relative">
        {isOverlayActive && (
          <div className="fixed top-44 z-20 left-0 w-screen h-screen bg-black opacity-20 lg:hidden"></div>
        )}
        <AllFilters />
        <div className="shadow-bold-blur-20 py-3 px-4 rounded-xl flex flex-nowrap justify-start items-center gap-2 overflow-x-auto filter-wrapper after:clear-both">
          <label
            htmlFor="all_filters_modal"
            className="border flex items-center justify-center flex-nowrap bg-gray-50 rounded-2xl h-11 whitespace-nowrap cursor-pointer font-mi-sans-semi-bold text-base px-4 border-transparent">
            <FilterIcon className="mr-3" />
            All Filters
          </label>
          {map(filterItems, (item, index) => {
            if (
              get(item, "display") === "bar" ||
              get(item, "display") === "all"
            ) {
              return (
                <FilterItem
                  key={index}
                  setIsOverlayActive={setIsOverlayActive}
                  filterItem={item}
                  isInAllFilters={false}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default Filter;
