import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";

export interface IAmenities {
  filterData: IFilterData;
  isInAllFilters?: boolean;
  isTitleVisible?: boolean;
  allFiltersData: IFilterData;
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
  setAllFiltersData: React.Dispatch<React.SetStateAction<IFilterData>>;
}

export interface IAmenitiesData {
  title: string;
  value: string;
}
