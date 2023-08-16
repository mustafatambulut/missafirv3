import { IFilterData } from "@/components/molecules/filter/types";
import React from "react";
import { IListingData } from "@/components/molecules/listingListItem/types";

export interface IAllFiltersContent {
  filterData: IFilterData;
  allFiltersData: IFilterData;
  tempFilteredListings: IListingData[];
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
  setAllFiltersData: React.Dispatch<React.SetStateAction<IFilterData>>;
}
