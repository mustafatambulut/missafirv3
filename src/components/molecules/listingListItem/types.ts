import { IFilterData } from "@/components/molecules/filter/types";
import {
  IBathroomsData,
  IBedsData
} from "@/components/molecules/bedAndBaths/types";

export interface IListing {
  listing: IListingData;
  filterData: IFilterData;
}

export interface IListingData {
  id: string;
  title: string;
  code: string;
  platform: Platform;
  location: string;
  essentials: string[];
  price: Price;
  badges: Badge[];
  images: Image[];
  available: string;
  concept: string;
  beds: IBedsData;
  bathrooms: IBathroomsData;
  size: number;
}

export interface Platform {
  name: string;
  logo: string;
}

export interface Price {
  total: { amount: string; value: number; type: string };
  daily: {
    oldAmount: string;
    amount: string;
    value: number;
    type: string;
  };
}

export interface Badge {
  color: string;
  label: string;
}

export interface Image {
  src: string;
}
