import { IAmenitiesData } from "@/components/molecules/amenities/types";

export interface IAmenityItem {
  data: IAmenityItemData;
  // eslint-disable-next-line no-unused-vars
  handleFilter: ({ value, title }: IAmenitiesData) => void;
  // eslint-disable-next-line no-unused-vars
  checkIsIncludes: (data: IAmenitiesData[], value: string) => boolean;
  amenitiesData: IAmenitiesData[];
}

export interface IAmenityItemData {
  title: string;
  items: IAmenity[];
}

export interface IAmenity {
  title: string;
  value: string;
}
