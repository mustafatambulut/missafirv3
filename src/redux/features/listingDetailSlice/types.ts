export interface IListingDetailState {
  listing?: Listing;
  booking: {
    startDate: string;
    endDate: string;
  };
  checkIn: string;
  checkOut: string;
  adults: string | number;
}

export interface Listing {
  item?: Item;
}

export interface Item {
  uuid?: string;
  property_type?: string;
  amenities?: City[];
  pictures?: Picture[];
  space?: string;
  rooms_bedrooms_count?: number;
  rooms_bathrooms_count?: number;
  city?: City;
  district?: City;
  approx_lat?: number;
  approx_lng?: number;
  title?: string;
  summary?: string;
  theNeighborhood?: string;
  check_in_time?: string;
  check_out_time?: string;
  beds_list?: BedsList[];
  reviews?: any[];
  related?: any[];
  missafir_touches?: any[];
  nickname?: string;
  cancelation_policy?: null;
  house_rules?: Array<HouseRule[]>;
}

export interface City {
  id?: number;
  name?: string;
}

export interface BedsList {
  id?: number;
  icon?: string;
  name?: string;
  count?: number;
}

export interface HouseRule {
  title?: string;
  status?: boolean;
}

export interface Picture {
  id?: number;
  path?: string;
  path_extra?: string;
  caption?: string;
}
