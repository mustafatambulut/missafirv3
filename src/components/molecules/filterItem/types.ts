import React, { JSX } from "react";
import { IFilterData } from "@/components/molecules/filter/types";

export interface IFilterItem {
  filterItem: any;
  setIsOverlayActive: React.Dispatch<React.SetStateAction<boolean>>;
  isInAllFilters?: boolean;
  searchParams: any;
}

export interface ITitle {
  itemType: string;
  filterData: IFilterData;
  isHasDropdown?: boolean;
  customSpacing?: boolean;
  isDropdownOpen?: boolean;
  children: JSX.Element[] | JSX.Element;
  setIsDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDropdown {
  isDropdownOpen?: boolean;
  children: JSX.Element[] | JSX.Element;
  setIsDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
