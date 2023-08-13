"use client";
import { get, size } from "lodash";
import classNames from "classnames";

import { ITitle } from "@/components/molecules/filterItem/types";

import DownArrowIcon from "../../../../public/images/arrow-down.svg";

const FilterItemTitle = ({
  children,
  itemType,
  filterData,
  isHasDropdown,
  isDropdownOpen,
  setIsDropdownOpen,
  customSpacing = false
}: ITitle) => {
  const checkIsSelected = () => {
    switch (itemType) {
      case "sort":
        return get(filterData, "sort") !== "all";
      case "price":
        return (
          get(filterData, "price.min") !==
            get(filterData, "defaultPriceRange.min") ||
          get(filterData, "price.max") !==
            get(filterData, "defaultPriceRange.max")
        );
      case "bedAndBaths":
        return (
          get(filterData.bathrooms, "value") !== "any" ||
          get(filterData.beds, "value") !== "any"
        );
      case "concepts":
        return size(get(filterData, "concepts")) > 0;
      default:
        break;
    }
  };

  const labelClass = classNames(
    "border flex items-center justify-center flex-nowrap bg-gray-50 rounded-2xl h-11 whitespace-nowrap cursor-pointer font-mi-sans-semi-bold text-base",
    {
      "px-4": !customSpacing,
      "px-0 py-0": customSpacing,
      "border-transparent": !checkIsSelected(),
      "border-primary-600 text-primary bg-white [&>:nth-child(1)]:fill-primary":
        checkIsSelected()
    }
  );

  const dropdownArrowClass = classNames("stroke-black ml-2", {
    "rotate-180": isDropdownOpen,
    "stroke-primary": checkIsSelected()
  });

  return (
    <label
      tabIndex={0}
      className={labelClass}
      onClick={() => (setIsDropdownOpen ? setIsDropdownOpen((v) => !v) : null)}>
      {children}
      {isHasDropdown && <DownArrowIcon className={dropdownArrowClass} />}
    </label>
  );
};

FilterItemTitle.displayName = "Title";
export default FilterItemTitle;
