import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";

export interface IAllFiltersHeader {
  filterData: IFilterData;
  setAllFiltersData: React.Dispatch<React.SetStateAction<IFilterData>>;
  allFiltersData: IFilterData;
  calculateMinMaxListingPrice: () => number[];
  modalButtonTrigger: () => void;
}
