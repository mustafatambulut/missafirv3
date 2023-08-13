import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";
import { IListingData } from "@/components/molecules/listingListItem/types";

export interface IRangeSlider {
  showButtons?: boolean;
  filterData: IFilterData;
  isTitleVisible?: boolean;
  isInAllFilters?: boolean;
  allFiltersData?: IFilterData;
  tempFilteredListings?: IListingData[];
  // eslint-disable-next-line no-unused-vars
  filterListings?: (type: string, filterData: IFilterData) => void;
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
  setIsDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setAllFiltersData?: React.Dispatch<React.SetStateAction<IFilterData>>;
}

export interface IPriceRangeData {
  price: { min: number; max: number };
  defaultPriceRange: { min: number; max: number };
}

export interface IPriceRangeChangeData {
  minValue: number;
  maxValue: number;
}
