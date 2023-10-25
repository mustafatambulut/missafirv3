import { IListingData } from "@/redux/features/listingSlice/types";

export interface IListing {
  lang?: string;
  listing: IListingData;
}
