"use client";
import { get } from "lodash";
import classNames from "classnames";

import { IPriceTypeToggle } from "@/components/atoms/priceTypeToggle/types";

const PriceTypeToggle = ({ filterData, setFilterData }: IPriceTypeToggle) => {
  const toggleItemClass = (type: string) => {
    return classNames(
      "rounded-[100px] px-3 h-full flex justify-center items-center",
      {
        "bg-primary text-white ": get(filterData, "priceType") === type
      }
    );
  };
  const handleFilter = (type: string) => {
    setFilterData((prev) => ({
      ...prev,
      priceType: type
    }));
  };

  return (
    <div className="flex h-full py-1 px-1 gap-1 items-center flex-nowrap bg-gray-50 rounded-[100px] whitespace-nowrap cursor-pointer text-base font-mi-sans-semi-bold">
      <span
        className={toggleItemClass("total")}
        onClick={() => handleFilter("total")}>
        Total Price
      </span>
      <span
        className={toggleItemClass("daily")}
        onClick={() => handleFilter("daily")}>
        Daily Price
      </span>
    </div>
  );
};

export default PriceTypeToggle;
