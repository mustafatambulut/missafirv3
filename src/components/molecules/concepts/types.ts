import React from "react";
import { IFilterData } from "@/components/molecules/filter/types";
import { IListingData } from "@/components/molecules/listingListItem/types";

export interface IConcepts {
  showButtons?: boolean;
  filterData: IFilterData;
  isInAllFilters?: boolean;
  isTitleVisible?: boolean;
  allFiltersData?: IFilterData;
  isDeleteButtonsVisible?: boolean;
  tempFilteredListings?: IListingData[];
  // eslint-disable-next-line no-unused-vars
  filterListings?: (type: string, filterData: IFilterData) => void;
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
  setIsDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setAllFiltersData?: React.Dispatch<React.SetStateAction<IFilterData>>;
}

export interface IConceptsData {
  value: string;
  title: string;
}
