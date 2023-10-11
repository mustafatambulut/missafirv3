"use client";
import classNames from "classnames";
//todo:icon kullanılınca açılacak
//import Image from "next/image";
import { isMobile } from "react-device-detect";
import { useAppSelector } from "@/redux/hooks";
import { first, get, includes, isEqual, map, size, toString } from "lodash";

import { IDropdown } from "@/components/molecules/filterItem/types";

import Radio from "@/components/atoms/radio/Radio";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import PriceRange from "@/components/molecules/priceRange/PriceRange";

import CloseIcon from "../../../../public/images/close.svg";

const FilterItemDropdown = ({
  filterItem,
  handleFilter,
  setIsDropdownOpen,
  isInAllFilters = false
}: IDropdown) => {
  const { filterData } = useAppSelector((state) => state.listingReducer);

  const renderFilterItems = (item, parentItem = null) => {
    const type = get(item, "type") || get(parentItem, "type");

    switch (type) {
      case "checkbox":
        return (
          <Checkbox
            value={false}
            name={get(item, "slug")}
            onChange={() =>
              handleFilter(
                get(parentItem, "slug"),
                toString(get(item, "id")),
                type
              )
            }
            checked={includes(
              get(filterData, get(parentItem, "slug")),
              get(item, "id")
            )}
            label={
              <div
                className={`flex gap-x-2 ${
                  isInAllFilters && get(item, "icon")
                    ? "flex-col items-center"
                    : "flex-row"
                }`}>
                {/*todo:icon kullanılınca açılacak*/}
                {/*{get(item, "icon") && (*/}
                {/*  <Image*/}
                {/*    priority*/}
                {/*    src={item.icon}*/}
                {/*    alt={get(item, "title")}*/}
                {/*    width={20}*/}
                {/*    height={20}*/}
                {/*  />*/}
                {/*)}*/}
                <span>{get(item, "title")}</span>
              </div>
            }
            position="right"
            labelClass={`text-base text-gray-600 ${
              isInAllFilters && "font-mi-sans"
            }`}
            customFilledCheckbox={get(item, "icon")}
            className={
              isInAllFilters &&
              get(item, "icon") &&
              "bg-gray-50 border-none rounded-xl"
            }
          />
        );
      case "radio":
        return (
          <Radio
            name={get(parentItem, "slug")}
            checked={isEqual(
              get(filterData, get(parentItem, "slug")),
              get(item, "id")
            )}
            onChange={() =>
              handleFilter(get(parentItem, "slug"), get(item, "id"), type)
            }
            label={get(item, "title")}
            position="right"
            customFilledRadio
          />
        );
      case "priceRange":
        return (
          <PriceRange
            slug={get(item, "slug")}
            minPrice={get(item, "price_min")}
            maxPrice={get(item, "price_max")}
          />
        );
      default:
        return (
          <div
            onClick={() =>
              handleFilter(get(parentItem, "slug"), get(item, "id"), type)
            }
            className={`w-full text-lg ${
              isEqual(
                get(filterData, get(parentItem, "slug")),
                get(item, "id")
              ) && "text-primary-500"
            }`}>
            {get(item, "title")}
          </div>
        );
    }
  };

  const itemClass = classNames("flex gap-2 lg:gap-3 flex-wrap");
  const dropdownClass = classNames("", {
    "dropdown-content z-40 menu p-4 lg:shadow-[0px_1px_20px_0px_#00000014] bg-white lg:rounded-lg lg:min-w-min absolute left-0 mt-0 lg:mt-3 lg:left-auto":
      !isInAllFilters,
    "max-w-auto": !isInAllFilters && !isMobile,
    "w-screen": !isInAllFilters && isMobile
  });

  return (
    <div className={dropdownClass} tabIndex={0}>
      {!isInAllFilters &&
        get(first(get(filterItem, "items")), "type") !== "dropdown" && (
          <div className="text-gray-700 text-xl font-mi-sans-semi-bold hidden lg:flex justify-between items-center w-full mb-4">
            <div>{get(filterItem, "title")}</div>
            <CloseIcon
              className="fill-gray-800 scale-75"
              onClick={() =>
                setIsDropdownOpen ? setIsDropdownOpen(false) : null
              }
            />
          </div>
        )}
      <div className="flex flex-wrap gap-4">
        {map(get(filterItem, "items"), (item, key) => {
          return size(get(item, "items")) > 0 ? (
            <div key={key} className={`gap-4 w-full`}>
              {get(item, "type") !== "dropdown" && (
                <div className="text-gray-600 text-lg">
                  {get(item, "title")}
                </div>
              )}
              <div
                className={`${itemClass} ${
                  get(item, "type") === "dropdown"
                    ? "flex-col items-start"
                    : "items-center"
                }`}>
                {map(get(item, "items"), (subItem, key) => {
                  return (
                    <div key={key}>{renderFilterItems(subItem, item)}</div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div key={key}>{renderFilterItems(item, filterItem)}</div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterItemDropdown;
