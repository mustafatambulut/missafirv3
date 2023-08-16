import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";

export interface IPriceTypeToggle {
  filterData: IFilterData;
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
}
