import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";

export interface ISelectedFilters {
  filterData: IFilterData;
  allFiltersData: IFilterData;
  setAllFiltersData: React.Dispatch<React.SetStateAction<IFilterData>>;
  calculateMinMaxListingPrice: () => number[];
}

export interface ISelectedFiltersData {
  title?: string;
  value: string;
  key: string;
  type?: string;
}
