"use client";
import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

import { IRangeSlider } from "@/components/atoms/rangeSlider/types";

import "./RangeSlider.css";

const RangeSlider = ({ isTitleVisible = true }: IRangeSlider) => {
  const step = 5;
  const [minValue, setMinValue] = useState<any>(25);
  const [maxValue, setMaxValue] = useState<any>(275);
  const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const checkIsNumber = (value: string) => {
    const re = /^[0-9\b]+$/;
    return value === "" || re.test(value);
  };

  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkIsNumber(e.target.value) && e.target.value <= maxValue - step) {
      setMinValue(e.target.value);
    }
  };
  const handleMaxValueChange = (e) => {
    if (checkIsNumber(e.target.value) && e.target.value >= minValue + step) {
      setMaxValue(e.target.value);
    } else {
      setMaxValue(minValue + step);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      {isTitleVisible && (
        <h6 className="text-xl font-mi-sans-semi-bold text-gray-700">
          Price Range
        </h6>
      )}
      <MultiRangeSlider
        min={0}
        max={1204}
        step={step}
        minValue={minValue}
        maxValue={maxValue}
        //!TODO: para birimi formatlanacak
        maxCaption={`${maxValue}₺`}
        minCaption={`${minValue}₺`}
        ruler={false}
        label={false}
        className="shadow-none border-none p-0 shadow-none border-none border-0 mt-12"
        onInput={(e) => {
          handleInput(e);
        }}
      />
      <div className="flex gap-3 mt-5 items-center">
        <div className="relative">
          <input
            type="text"
            pattern="[0-9]*"
            value={minValue}
            onChange={handleMinValueChange}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs pt-5"
          />
          <span className="absolute left-4 text-gray-500 text-sm cursor-default">
            min price
          </span>
        </div>
        <span>-</span>
        <div className="relative">
          <input
            type="text"
            pattern="[0-9]*"
            value={maxValue}
            onChange={handleMaxValueChange}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs pt-5"
          />
          <span className="absolute left-4 text-gray-500 text-sm cursor-default">
            max price
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
