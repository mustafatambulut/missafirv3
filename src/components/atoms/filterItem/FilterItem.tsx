"use client";
import React, { useState } from "react";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import { IFilterItem } from "@/components/atoms/filterItem/types";

import DownArrowIcon from "../../../../public/images/arrow-down.svg";

const FilterItem = ({ dropdown, children }: IFilterItem) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownArrowClass = classNames("stroke-black ml-2", {
    "rotate-180": isDropdownOpen
  });
  return (
    <OutsideClickHandler onOutsideClick={() => setIsDropdownOpen(false)}>
      <div className="dropdown dropdown-bottom static cursor-pointer after:clear-both select-none">
        <label
          tabIndex={0}
          className="flex items-center flex-nowrap bg-gray-50 rounded-2xl px-4 py-3 whitespace-nowrap cursor-pointer font-mi-sans-semi-bold text-base"
          onClick={() => setIsDropdownOpen((v) => !v)}>
          {children}
          {dropdown && <DownArrowIcon className={dropdownArrowClass} />}
        </label>
        {isDropdownOpen && dropdown && (
          <div
            tabIndex={0}
            className="dropdown-content z-50 menu p-4 lg:shadow-[0px_1px_20px_0px_#00000014] bg-base-100 lg:rounded-lg min-w-full lg:min-w-[100px] absolute left-0 mt-3 lg:left-auto">
            {dropdown}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default FilterItem;
