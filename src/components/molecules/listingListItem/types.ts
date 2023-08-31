import { IListingData } from "@/redux/features/listingSlice/types";
import { IFilterData } from "@/components/molecules/filter/types";

export interface IListing {
  listing: IListingData;
  filterData: IFilterData;
}
