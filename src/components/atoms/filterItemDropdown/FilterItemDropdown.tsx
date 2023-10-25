"use client";
import classNames from "classnames";
//todo:icon kullanılınca açılacak
//import Image from "next/image";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  first,
  get,
  has,
  includes,
  isEqual,
  join,
  map,
  omit,
  pick,
  size,
  split,
  toString
} from "lodash";

import { IDropdown } from "@/components/molecules/filterItem/types";

import Radio from "@/components/atoms/radio/Radio";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import PriceRange from "@/components/molecules/priceRange/PriceRange";

import CloseIcon from "../../../../public/images/close.svg";
import FilterControlButtons from "@/components/molecules/filterControlButtons/FilterControlButtons";
import { updateFilterData, updateLoading, updateSearchClicked } from "@/redux/features/listingSlice/listingSlice";
import { usePathname, useRouter } from "next/navigation";
import useFilter from "@/app/hooks/useFilter";

const FilterItemDropdown = ({
  filterItem,
  handleFilter,
  setIsDropdownOpen,
  isInAllFilters = false,
  searchParams
}: IDropdown) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { cleanFilterData,handleFilterListings } = useFilter();
  const filterData = useAppSelector((state) => state.listingReducer.filterData);

  const getExistedParams = (item, params) => {
    let slugs = [get(item, "slug")];
    if (has(item, "items")) {
      slugs = [...slugs, ...map(get(item, "items"), "slug")];
    }
    return { slugs, existedParams: pick(params, slugs) };
  };
  const checkIsApplyDisabled = (item) => {
    const { existedParams, slugs } = getExistedParams(item, searchParams);
    const existedFilterData = pick(filterData, slugs);
    return isEqual(existedParams, existedFilterData);
  };

  const checkIsClearDisabled = (item) => {
    const { existedParams } = getExistedParams(item, searchParams);
    return size(existedParams) === 0;
  };

  const renderFilterItems = (item, parentItem = null) => {
    const type = get(item, "type") || get(parentItem, "type");

    switch (type) {
      case "checkbox": {
        const checkIsExist = () => {
          const data = get(filterData, get(parentItem, "slug"), null);
          if (data) {
            if (includes(data, "_")) {
              return includes(split(data, "_"), toString(get(item, "id")));
            } else {
              return data === toString(get(item, "id"));
            }
          } else {
            return false;
          }
        };

        return (
          <Checkbox
            value={false}
            name={get(item, "slug")}
            onChange={() =>
              handleFilter(
                toString(get(parentItem, "slug")),
                toString(get(item, "id")),
                type
              )
            }
            checked={checkIsExist()}
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
      }
      case "radio": {
        return (
          <Radio
            name={get(parentItem, "slug")}
            checked={isEqual(
              toString(get(filterData, get(parentItem, "slug"))),
              toString(get(item, "id"))
            )}
            onChange={() =>
              handleFilter(
                toString(get(parentItem, "slug")),
                toString(get(item, "id")),
                type
              )
            }
            label={get(item, "title")}
            position="right"
            customFilledRadio
          />
        );
      }
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
            onClick={() => {
              dispatch(updateLoading(true));
              dispatch(updateSearchClicked(true));

              handleFilter(get(parentItem, "slug"), get(item, "id"), type);
              handleFilterListings({
                ...filterData,
                [get(parentItem, "slug")]: get(item, "id")
              });
              setIsDropdownOpen ? setIsDropdownOpen(false) : null;
            }}
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
      {!isInAllFilters &&
        get(first(get(filterItem, "items")), "type") !== "dropdown" && (
          <FilterControlButtons
            isApplyDisabled={checkIsApplyDisabled(filterItem)}
            isClearDisabled={checkIsClearDisabled(filterItem)}
            closeDropdown={() =>
              setIsDropdownOpen ? setIsDropdownOpen(false) : null
            }
            handleClear={() => {
              dispatch(
                updateFilterData(
                  omit(filterData, [
                    ...map(filterItem?.items, "slug"),
                    filterItem?.slug
                  ])
                )
              );

              const tempUri = [];
              const result = cleanFilterData(
                omit(filterData, [
                  ...map(filterItem?.items, "slug"),
                  filterItem?.slug
                ])
              );
              map(result, (value, key) => {
                if (value) return tempUri.push(`${key}=${value}`);
              });

              const queryParams = join(tempUri, "&")
                ? `${join(tempUri, "&")}`
                : "";
              router.push(`${pathName}?${queryParams}`);
            }}
          />
        )}
    </div>
  );
};

export default FilterItemDropdown;
