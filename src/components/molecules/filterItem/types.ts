import React, { JSX } from "react";
import { IFilterData } from "@/components/molecules/filter/types";

export interface IFilterItem {
  children: JSX.Element[] | JSX.Element;
  setIsOverlayActive: React.Dispatch<React.SetStateAction<boolean>>;
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
