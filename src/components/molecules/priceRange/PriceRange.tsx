"use client";
import { useCallback, useEffect, useState } from "react";
import { get, size } from "lodash";
import classNames from "classnames";
import { numericFormatter } from "react-number-format";
import MultiRangeSlider from "multi-range-slider-react";

import {
  IPriceRangeChangeData,
  IPriceRangeData,
  IRangeSlider
} from "@/components/molecules/priceRange/types";

import "./PriceRange.css";

import PriceRangeInputs from "@/components/atoms/priceRangeInputs/PriceRangeInputs";
import FilterControlButtons from "@/components/molecules/filterControlButtons/FilterControlButtons";

import CloseIcon from "../../../../public/images/close.svg";

const PriceRange = ({
  filterData,
  setFilterData,
  filterListings,
  allFiltersData,
  setAllFiltersData,
  setIsDropdownOpen,
  showButtons = false,
  tempFilteredListings,
  isTitleVisible = true,
  isInAllFilters = false
}: IRangeSlider) => {
  const [priceRangeData, setPriceRangeData] = useState<IPriceRangeData>({
    price: { min: 0, max: 0 },
    defaultPriceRange: { min: 0, max: 0 }
  });

  const step = 1;

  const priceRangeClass = classNames("flex flex-col gap-3", {
    "lg:w-1/2 w-full": isInAllFilters
  });

  const handleInput = useCallback(
    (e: IPriceRangeChangeData) => {
      const priceData = isInAllFilters ? allFiltersData : priceRangeData;
      if (
        get(priceData, "price.min") === e.minValue &&
        get(priceData, "price.max") === e.maxValue
      )
        return priceData;

      if (isInAllFilters) {
        if (setAllFiltersData) {
          setAllFiltersData((prev) => ({
            ...prev,
            price: {
              min: e.minValue,
              max: e.maxValue
            }
          }));
        }
      } else {
        setPriceRangeData((prev) => ({
          ...prev,
          price: {
            min: e.minValue,
            max: e.maxValue
          }
        }));
      }
    },
    [priceRangeData, allFiltersData, isInAllFilters, setAllFiltersData]
  );

  const applyFilter = () => {
    if (!isInAllFilters) {
      setFilterData((prev) => ({
        ...prev,
        price: {
          min: get(priceRangeData, "price.min"),
          max: get(priceRangeData, "price.max")
        }
      }));
      if (setIsDropdownOpen) {
        setIsDropdownOpen(false);
      }
    }
  };

  const handleClear = () => {
    if (!isInAllFilters) {
      setPriceRangeData((prev) => ({
        ...prev,
        price: prev.defaultPriceRange
      }));
    }
  };

  useEffect(() => {
    const tempFilterData = {
      ...filterData,
      price: priceRangeData.price
    };
    filterListings && filterListings("temp", tempFilterData);
  }, [priceRangeData, filterData, filterListings]);

  useEffect(() => {
    if (isInAllFilters && allFiltersData) {
      setPriceRangeData({
        price: allFiltersData.price,
        defaultPriceRange: allFiltersData.defaultPriceRange
      });
    } else {
      setPriceRangeData({
        price: filterData.price,
        defaultPriceRange: filterData.defaultPriceRange
      });
    }
  }, [filterData, allFiltersData, isInAllFilters]);

  return (
    <div className={priceRangeClass}>
      {isTitleVisible && (
        <div className="flex justify-between items-center w-full">
          <h6 className="text-xl font-mi-sans-semi-bold text-gray-700">
            Price Range
          </h6>
          {!isInAllFilters && (
            <CloseIcon
              className="fill-gray-800 scale-75"
              onClick={() =>
                setIsDropdownOpen ? setIsDropdownOpen(false) : null
              }
            />
          )}
        </div>
      )}
      <MultiRangeSlider
        min={0}
        max={get(priceRangeData, "defaultPriceRange.max")}
        step={step}
        minValue={get(priceRangeData, "price.min")}
        maxValue={get(priceRangeData, "price.max")}
        maxCaption={numericFormatter(`${get(priceRangeData, "price.max")}`, {
          thousandSeparator: ".",
          decimalSeparator: ",",
          suffix: "₺"
        })}
        minCaption={numericFormatter(`${get(priceRangeData, "price.min")}`, {
          thousandSeparator: ".",
          decimalSeparator: ",",
          suffix: "₺"
        })}
        ruler={false}
        label={false}
        className="p-0 px-4 shadow-none border-none border-0 mt-12"
        onInput={(e) => handleInput(e)}
      />
      <PriceRangeInputs
        handleInput={handleInput}
        priceRangeData={priceRangeData}
      />
      {showButtons && (
        <FilterControlButtons
          handleClear={handleClear}
          applyFilter={applyFilter}
          filteredCount={size(tempFilteredListings)}
        />
      )}
    </div>
  );
};

export default PriceRange;
