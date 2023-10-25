import React from "react";
import { IConceptsData } from "@/components/molecules/concepts/types";
import {
  IBathroomsData,
  IBedsData
} from "@/components/molecules/bedAndBaths/types";
import { IAmenitiesData } from "@/components/molecules/amenities/types";
import { IListingData } from "@/components/molecules/listingListItem/types";

export interface IFilter {
  lang?: string;
  searchParams: URLSearchParams;
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
  check_in: string;
  check_out: string;
  bathrooms: IBathroomsData;
  concepts: IConceptsData[];
  price: { min: number; max: number };
  defaultPriceRange: { min: number; max: number };
  amenities: IAmenitiesData[];
}
