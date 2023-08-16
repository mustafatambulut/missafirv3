import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";
import { IListingData } from "@/components/molecules/listingListItem/types";

export interface IAllFilters {
  filterData: IFilterData;
  // eslint-disable-next-line no-unused-vars
  filterListings: (type: string, filterData: IFilterData) => void;
  tempFilteredListings: IListingData[];
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
  calculateMinMaxListingPrice: () => number[];
}
