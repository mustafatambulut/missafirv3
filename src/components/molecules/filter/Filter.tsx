"use client";
import { useState } from "react";
import { get, map } from "lodash";

import Sort from "@/components/atoms/sort/Sort";
import FilterItem from "@/components/molecules/filterItem/FilterItem";
import PriceTypeToggle from "@/components/atoms/priceTypeToggle/PriceTypeToggle";
import Concepts from "@/components/molecules/concepts/Concepts";
import PriceRange from "@/components/molecules/priceRange/PriceRange";
import AllFilters from "@/components/molecules/allfilters/AllFilters";
import BedAndBaths from "@/components/molecules/bedAndBaths/BedAndBaths";

import { IFilter } from "@/components/molecules/filter/types";

import BedIcon from "../../../../public/images/bed.svg";
import CashIcon from "../../../../public/images/cash.svg";
import SortIcon from "../../../../public/images/order.svg";
import FilterIcon from "../../../../public/images/filters.svg";
import ConceptIcon from "../../../../public/images/concept.svg";

const Filter = ({
  filterData,
  setFilterData,
  filterListings,
  tempFilteredListings,
  calculateMinMaxListingPrice
}: IFilter) => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  //todo: test amaçlı eklenmiştir, düzenlenecek
  const mockFilterData = [
    {
      type: "allFilter",
      title: (
        <label
          htmlFor="all_filters_modal"
          className="cursor-pointer h-full w-full flex items-center">
          <FilterIcon className="mr-3" />
          All Filters
        </label>
      ),
      dropdown: null
    },
    {
      type: "sort",
      title: (
        <>
          <SortIcon className="fill-gray-900 mr-3" />
          <span>Sort</span>
        </>
      ),
      dropdown: <Sort filterData={filterData} setFilterData={setFilterData} />
    },
    {
      type: "price",
      title: (
        <>
          <CashIcon className="fill-gray-900 mr-3" />
          <span>Price</span>
        </>
      ),
      dropdown: (
        <PriceRange
          showButtons={true}
          filterData={filterData}
          setFilterData={setFilterData}
          filterListings={filterListings}
          tempFilteredListings={tempFilteredListings}
        />
      )
    },
    {
      type: "bedAndBaths",
      title: (
        <>
          <BedIcon className="fill-gray-900 mr-3" />
          <span>Bed & Baths</span>
        </>
      ),
      dropdown: (
        <BedAndBaths
          filterData={filterData}
          setFilterData={setFilterData}
          filterListings={filterListings}
          tempFilteredListings={tempFilteredListings}
        />
      )
    },
    {
      type: "concepts",
      title: (
        <>
          <ConceptIcon className="fill-gray-900 mr-3" />
          <span>Concepts</span>
        </>
      ),
      dropdown: (
        <Concepts
          filterData={filterData}
          setFilterData={setFilterData}
          filterListings={filterListings}
          tempFilteredListings={tempFilteredListings}
        />
      )
    },
    {
      type: "priceTypeToggle",
      title: (
        <PriceTypeToggle
          filterData={filterData}
          setFilterData={setFilterData}
        />
      ),
      dropdown: null
    }
  ];

  //TODO: Redux bağlanınca filter için redux kullanılacak
  return (
    <div className="relative">
      {isOverlayActive && (
        <div className="fixed top-40 z-20 left-0 w-screen h-screen bg-black opacity-20 lg:hidden"></div>
      )}
      <AllFilters
        tempFilteredListings={tempFilteredListings}
        filterListings={filterListings}
        filterData={filterData}
        setFilterData={setFilterData}
        calculateMinMaxListingPrice={calculateMinMaxListingPrice}
      />
      <div className="shadow-bold-blur-20 py-3 px-4 rounded-xl flex flex-nowrap justify-start items-center gap-2 overflow-x-auto filter-wrapper after:clear-both">
        {map(mockFilterData, (item, index) => (
          <FilterItem key={index} setIsOverlayActive={setIsOverlayActive}>
            <FilterItem.Title
              filterData={filterData}
              customSpacing={get(item, "type") === "priceTypeToggle"}
              itemType={get(item, "type")}>
              {get(item, "title")}
            </FilterItem.Title>
            <FilterItem.Dropdown>{get(item, "dropdown")}</FilterItem.Dropdown>
          </FilterItem>
        ))}
      </div>
    </div>
  );
};

export default Filter;
