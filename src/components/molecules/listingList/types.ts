import { IFilterData } from "@/components/molecules/filter/types";
import { IListingData } from "@/components/molecules/listingListItem/types";

export interface IListingList {
  data: IListingData[];
  filteredListings: IListingData[];
  filterData: IFilterData;
}
