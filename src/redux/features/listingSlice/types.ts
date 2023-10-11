import { IBookingDate } from "@/components/atoms/datePicker/types";

export interface IListingSlice {
  filterItems: any[];
  searchClicked?: boolean;
  showSearchbar?: boolean;
  listingResultsTitle?: string;
  searchLocation?: any;
  pagination?: {
    total?: number;
    current?: number;
  };
  listings: IListingData[];
  filterData: any;
  loading: boolean;
  bookingGuests: BookingGuest;
  preFilterData: any;
  bookingDestination: any;
  bookingDate: IBookingDate;
}

export interface IListingProps {
  items: IListingData[];
}

export interface IListingData {
  uuid: string;
  occupancy: number;
  pictures: Picture[];
  space: string;
  rooms_bedrooms_count: number;
  rooms_bathrooms_count: number;
  city: City;
  district: District;
  approx_lat: number;
  approx_lng: number;
  nickname: string;
  is_fav: boolean;
  available_on: string;
  title: string;
  slug: string;
}

export interface Picture {
  id: number;
  path: string;
  path_extra: string;
  caption: string;
}

export interface City {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface BookingGuest {
  adults?: number;
  kids?: number;
  pets?: number;
}
