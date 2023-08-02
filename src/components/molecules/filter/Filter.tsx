"use client";
import React from "react";

import Sort from "@/components/atoms/sort/Sort";
import FilterItem from "@/components/atoms/filterItem/FilterItem";
import RangeSlider from "@/components/atoms/rangeSlider/RangeSlider";
import Concepts from "@/components/molecules/concepts/Concepts";
import AllFilters from "@/components/molecules/allfilters/AllFilters";
import BedAndBaths from "@/components/molecules/bedAndBaths/BedAndBaths";

import BedIcon from "../../../../public/images/bed.svg";
import CashIcon from "../../../../public/images/cash.svg";
import SortIcon from "../../../../public/images/order.svg";
import FilterIcon from "../../../../public/images/filters.svg";
import ConceptIcon from "../../../../public/images/concept.svg";

const Filter = () => {
  //TODO: Redux bağlanınca filter için redux kullanılacak
  return (
    <>
      <div className="relative">
        <div className="flex flex-nowrap justify-start items-center gap-2 overflow-x-auto px-2 w-screen filter-wrapper after:clear-both">
          <FilterItem>
            <>
              <button
                onClick={() => window.all_filters_modal.showModal()}></button>
              <FilterIcon className="mr-3" /> <span>All Filters</span>
              <AllFilters />
            </>
          </FilterItem>
          <FilterItem dropdown={<Sort />}>
            <>
              <SortIcon className="mr-3" /> <span>Sort</span>
            </>
          </FilterItem>
          <FilterItem dropdown={<RangeSlider />}>
            <>
              <CashIcon className="mr-3" /> <span>Price</span>
            </>
          </FilterItem>
          <FilterItem dropdown={<BedAndBaths />}>
            <BedIcon className="mr-3" />
            <span>Bed & Baths</span>
          </FilterItem>
          <FilterItem dropdown={<Concepts />}>
            <>
              {" "}
              <ConceptIcon className="mr-3" /> <span>Concepts</span>
            </>
          </FilterItem>
          <div className="flex gap-3 items-center flex-nowrap bg-gray-50 rounded-[100px] p-2 whitespace-nowrap cursor-pointer text-base font-mi-sans-semi-bold">
            <span className="rounded-[100px] bg-primary text-white py-1.5 px-3">
              Total Price
            </span>
            <span>Daily Price</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
