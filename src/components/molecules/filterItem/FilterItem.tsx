"use client";
import { useState, cloneElement, useEffect } from "react";
import { map, isArray, filter } from "lodash";
import { useDetectClickOutside } from "react-detect-click-outside";

import { IFilterItem } from "@/components/molecules/filterItem/types";

import FilterItemTitle from "@/components/atoms/filterItemTitle/FilterItemTitle";
import FilterItemDropdown from "@/components/atoms/filterItemDropdown/FilterItemDropdown";

const FilterItem = ({ children, setIsOverlayActive }: IFilterItem) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const outsideRef = useDetectClickOutside({
    onTriggered: () => setIsDropdownOpen(false)
  });

  const checkIsHasDropdown = () => {
    if (isArray(children)) {
      return (
        filter(
          children,
          (child) =>
            child.type.displayName === "Dropdown" &&
            child.props.children !== null
        ).length > 0
      );
    }
  };

  useEffect(() => {
    isDropdownOpen ? setIsOverlayActive(true) : setIsOverlayActive(false);
  }, [isDropdownOpen, setIsOverlayActive]);
  return (
    <div
      ref={outsideRef}
      className="dropdown dropdown-bottom static cursor-pointer after:clear-both select-none">
      {isArray(children)
        ? map(children, (child, index) =>
            cloneElement(child, {
              key: index,
              isDropdownOpen,
              setIsDropdownOpen,
              isHasDropdown: checkIsHasDropdown()
            })
          )
        : cloneElement(children, {
            isDropdownOpen,
            setIsDropdownOpen,
            isHasDropdown: checkIsHasDropdown()
          })}
    </div>
  );
};

FilterItem.Title = FilterItemTitle;
FilterItem.Dropdown = FilterItemDropdown;

export default FilterItem;
