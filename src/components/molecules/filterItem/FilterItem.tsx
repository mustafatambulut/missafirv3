"use client";
import { useEffect, useState } from "react";
import {
  get,
  has,
  join,
  pull,
  size,
  split,
  first,
  replace,
  includes
} from "lodash";
import classNames from "classnames";
import { useDetectClickOutside } from "react-detect-click-outside";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IFilterItem } from "@/components/molecules/filterItem/types";
import { updateFilterData } from "@/redux/features/listingSlice/listingSlice";

import Switch from "@/components/atoms/switch/Switch";
import FilterItemTitle from "@/components/atoms/filterItemTitle/FilterItemTitle";
import FilterItemDropdown from "@/components/atoms/filterItemDropdown/FilterItemDropdown";

const FilterItem = ({
  filterItem,
  setIsOverlayActive,
  isInAllFilters = false,
  searchParams
}: IFilterItem) => {
  const dispatch = useAppDispatch();
  const filterData = useAppSelector((state) => state.listingReducer.filterData);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const outsideRef = useDetectClickOutside({
    onTriggered: () => !isInAllFilters && setIsDropdownOpen(false)
  });

  const filterItemClass = classNames({
    "dropdown dropdown-bottom static cursor-pointer after:clear-both select-none ":
      !isInAllFilters,
    "mb-5": isInAllFilters
  });

  const handleFilter = (filterName, filterValue, filterType) => {
    const isHasKey = has(filterData, filterName);

    if (isHasKey) {
      const isHasValue = includes(filterData[filterName], filterValue);
      if (isHasValue) {
        if (filterType === "checkbox") {
          const newFilterValue = replace(
            filterData[filterName],
            size(split(filterData[filterName], "_")) > 1
              ? `_${filterValue}`
              : filterValue,
            ""
          );

          const filteredValues = pull(split(newFilterValue, "_"), filterValue);

          const newFilterData = {
            ...filterData,
            [filterName]: join(filteredValues, "_")
          };

          if (size(newFilterData[filterName]) === 0)
            delete newFilterData[filterName];
          dispatch(updateFilterData(newFilterData));
        } else {
          const newFilterData = {
            ...filterData,
            [filterName]: filterValue
          };
          dispatch(updateFilterData(newFilterData));
        }
      } else {
        if (filterType === "checkbox") {
          const newFilterData = {
            ...filterData,
            [filterName]: `${filterData[filterName]}_${filterValue}`
          };

          dispatch(updateFilterData(newFilterData));
        } else {
          const newFilterData = {
            ...filterData,
            [filterName]: filterValue
          };
          dispatch(updateFilterData(newFilterData));
        }
      }
    } else {
      dispatch(updateFilterData({ ...filterData, [filterName]: filterValue }));
    }
  };

  useEffect(() => {
    if (setIsOverlayActive) {
      isDropdownOpen ? setIsOverlayActive(true) : setIsOverlayActive(false);
    }
  }, [isDropdownOpen, setIsOverlayActive]);

  useEffect(() => {
    if (isInAllFilters) setIsDropdownOpen(true);
  }, [setIsDropdownOpen, isInAllFilters]);

  return (
    <div className={filterItemClass} ref={outsideRef}>
      {size(get(filterItem, "items")) > 0 ? (
        <>
          {get(first(get(filterItem, "items")), "type") === "switch" ? (
            <Switch handleFilter={handleFilter} filterItem={filterItem} />
          ) : (
            <>
              <FilterItemTitle
                filterItem={filterItem}
                isInAllFilters={isInAllFilters}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
              />
              {isDropdownOpen && (
                <FilterItemDropdown
                  searchParams={searchParams}
                  filterItem={filterItem}
                  handleFilter={handleFilter}
                  isInAllFilters={isInAllFilters}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              )}
            </>
          )}
        </>
      ) : (
        <FilterItemTitle
          filterItem={filterItem}
          isInAllFilters={isInAllFilters}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      )}
    </div>
  );
};

export default FilterItem;
