import React from "react";
import { IConceptsData } from "@/components/molecules/concepts/types";
import {
  IBathroomsData,
  IBedsData
} from "@/components/molecules/bedAndBaths/types";
import { IAmenitiesData } from "@/components/molecules/amenities/types";
import { IListingData } from "@/components/molecules/listingListItem/types";

export interface IFilter {
  filterData: IFilterData;
  // eslint-disable-next-line no-unused-vars
  filterListings: (type: string, filterData: IFilterData) => void;
  tempFilteredListings: IListingData[];
  calculateMinMaxListingPrice: () => number[];
  setFilterData: React.Dispatch<React.SetStateAction<IFilterData>>;
}

export interface IFilterData {
  sort:
    | "all"
    | "descPrice"
    | "ascPrice"
    | "ascDate"
    | "descDate"
    | "mostReview"
    | "new";
  beds: IBedsData;
  priceType: string;
  bathrooms: IBathroomsData;
  concepts: IConceptsData[];
  price: { min: number; max: number };
  defaultPriceRange: { min: number; max: number };
  amenities: IAmenitiesData[];
}
