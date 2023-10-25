"use client";
import classNames from "classnames";
import { first, get, has, size } from "lodash";
import { useAppSelector } from "@/redux/hooks";

import { ITitle } from "@/components/molecules/filterItem/types";

import DownArrowIcon from "../../../../public/images/arrow_down.svg";

const FilterItemTitle = ({
  filterItem,
  isDropdownOpen,
  setIsDropdownOpen,
  isInAllFilters = false
}: ITitle) => {
  const filterData  = useAppSelector((state) => state.listingReducer.filterData);

  const labelClass = classNames({
    "border flex items-center justify-center flex-nowrap bg-gray-50 rounded-2xl h-11 whitespace-nowrap cursor-pointer font-mi-sans-semi-bold text-base px-4":
      !isInAllFilters,
    "flex justify-between items-center w-full mb-3 text-xl font-mi-sans-semi-bold text-gray-700":
      isInAllFilters,
    "border-primary-600 text-primary-600 [&>*]:stroke-primary-600":
      !isInAllFilters &&
      (has(filterData, get(filterItem, "slug")) ||
        has(filterData, get(first(get(filterItem, "items")), "slug"))),
    "border-transparent":
      !has(filterData, get(filterItem, "slug")) &&
      !has(filterData, get(first(get(filterItem, "items")), "slug"))
  });

  const dropdownArrowClass = classNames("stroke-black ml-2", {
    "rotate-180": isDropdownOpen
  });

  return (
    <label
      tabIndex={0}
      className={labelClass}
      onClick={() =>
        !isInAllFilters &&
        (setIsDropdownOpen ? setIsDropdownOpen((v) => !v) : null)
      }>
      {get(filterItem, "title")}
      {size(get(filterItem, "items")) > 0 && !isInAllFilters && (
        <DownArrowIcon className={dropdownArrowClass} />
      )}
    </label>
  );
};

export default FilterItemTitle;
