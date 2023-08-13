import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";

export interface ISort {
  filterData: IFilterData;
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
  setIsDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
