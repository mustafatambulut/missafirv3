import { IBreadcrumbs } from "@/components/atoms/breadcrumbs/types";

export interface IDetailSection {
  data?: Data;
  className?: string;
}

export interface Data {
  breadCrumbs?: IBreadcrumbs;
  item: Item;
}

export interface Item {
  title?: string;
  summary?: string;
  space?: string | number;
  rooms_bedrooms_count?: string;
  rooms_bathrooms_count?: string;
}
