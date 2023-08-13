"use client";
import { useState, useEffect, useRef } from "react";
import { size } from "lodash";
import { useDetectClickOutside } from "react-detect-click-outside";

import { IFilterData } from "@/components/molecules/filter/types";
import { IAllFilters } from "@/components/molecules/allfilters/types";

import AllFiltersHeader from "@/components/molecules/allFiltersHeader/AllFiltersHeader";
import AllFiltersContent from "@/components/molecules/allFiltersContent/AllFiltersContent";
import FilterControlButtons from "@/components/molecules/filterControlButtons/FilterControlButtons";

import "./AllFilters.css";

const AllFilters = ({
  filterData,
  setFilterData,
  filterListings,
  tempFilteredListings,
  calculateMinMaxListingPrice
}: IAllFilters) => {
  const modalButtonRef = useRef<HTMLInputElement | null>(null);
  const outsideRef = useDetectClickOutside({
    onTriggered: () => {
      if (window.all_filters_modal.checked === true) {
        modalButtonTrigger();
        setAllFiltersData(filterData);
      }
    }
  });

  const [allFiltersData, setAllFiltersData] = useState<IFilterData>({
    sort: "all",
    concepts: [],
    amenities: [],
    priceType: "total",
    price: { min: 0, max: 0 },
    defaultPriceRange: { min: 0, max: 0 },
    beds: { title: "any", value: "any", type: "beds" },
    bathrooms: { title: "any", value: "any", type: "bathrooms" }
  });

  const modalButtonTrigger = () => {
    modalButtonRef.current?.click();
  };

  const applyFilter = () => {
    setFilterData(allFiltersData);
    modalButtonTrigger();
  };

  useEffect(() => {
    setAllFiltersData(filterData);
  }, [filterData]);

  useEffect(() => {
    filterListings("temp", allFiltersData);
  }, [allFiltersData, filterListings]);

  return (
    <>
      <input
        type="checkbox"
        ref={modalButtonRef}
        id="all_filters_modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div
          ref={outsideRef}
          className="no-scrollbar w-full p-0 lg:pt-0 modal-box lg:max-w-5xl rounded-none lg:rounded-2xl max-h-screen lg:max-h-[calc(100%-5em)]">
          <div>
            <AllFiltersHeader
              filterData={filterData}
              allFiltersData={allFiltersData}
              setAllFiltersData={setAllFiltersData}
              modalButtonTrigger={modalButtonTrigger}
              calculateMinMaxListingPrice={calculateMinMaxListingPrice}
            />
            <AllFiltersContent
              filterData={filterData}
              setFilterData={setFilterData}
              allFiltersData={allFiltersData}
              tempFilteredListings={tempFilteredListings}
              setAllFiltersData={setAllFiltersData}
            />
          </div>
          <div className="p-5">
            <FilterControlButtons
              applyFilter={applyFilter}
              handleCancel={modalButtonTrigger}
              filteredCount={size(tempFilteredListings)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFilters;
