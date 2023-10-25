"use client";
import { useCallback, useEffect, useState } from "react";
import { first, get, last } from "lodash";
import classNames from "classnames";
import { numericFormatter } from "react-number-format";
import MultiRangeSlider from "multi-range-slider-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateFilterData } from "@/redux/features/listingSlice/listingSlice";

import {
  IPriceRangeChangeData,
  IRangeSlider
} from "@/components/molecules/priceRange/types";

import "./PriceRange.css";

import PriceRangeInputs from "@/components/atoms/priceRangeInputs/PriceRangeInputs";

const PriceRange = ({
  slug,
  maxPrice,
  minPrice,
  isInAllFilters = false
}: IRangeSlider) => {
  const dispatch = useAppDispatch();
  const [minMaxPrice, setMinMaxPrice] = useState<number[] | null>([
    minPrice,
    maxPrice
  ]);
  const filterData  = useAppSelector((state) => state.listingReducer.filterData);

  const step = 1;

  const priceRangeClass = classNames("flex flex-col gap-3", {
    "lg:w-1/2 w-full": isInAllFilters
  });

  useEffect(() => {
    const minMaxPrice = get(filterData, slug)?.split("-") || [
      minPrice,
      maxPrice
    ];
    setMinMaxPrice(minMaxPrice);
  }, [filterData]);

  const handleInput = useCallback(
    (e: IPriceRangeChangeData) => {
      if (e.minValue == minMaxPrice[0] && e.maxValue == minMaxPrice[1]) return;
      const newFilterData = {
        ...filterData,
        [slug]: `${e.minValue}-${e.maxValue}`
      };
      dispatch(updateFilterData(newFilterData));
    },
    [filterData, dispatch, minMaxPrice]
  );

  return (
    <div className={priceRangeClass}>
      <MultiRangeSlider
        step={step}
        ruler={false}
        label={false}
        min={minPrice}
        max={maxPrice}
        maxValue={last(minMaxPrice)}
        minValue={first(minMaxPrice)}
        onInput={(e) => handleInput(e)}
        maxCaption={numericFormatter(`${last(minMaxPrice)}`, {
          thousandSeparator: ".",
          decimalSeparator: ",",
          suffix: "₺"
        })}
        minCaption={numericFormatter(`${first(minMaxPrice)}`, {
          thousandSeparator: ".",
          decimalSeparator: ",",
          suffix: "₺"
        })}
        className="p-0 px-4 shadow-none border-none border-0 mt-12"
      />
      <PriceRangeInputs
        handleInput={handleInput}
        maxPrice={last(minMaxPrice)}
        minPrice={first(minMaxPrice)}
      />
    </div>
  );
};

export default PriceRange;
