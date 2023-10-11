export interface IDataHandle {
  res: Response;
  check_in?: string;
  check_out?: string;
  adults?: string | number;
}

export interface Response {
  item?: Item;
}

export interface Item {
  uuid?: string;
  property_type?: string;
  occupancy?: number;
  min_nights?: number;
  amenities?: Amenity[];
  pictures?: Picture[];
}

export interface Amenity {
  id?: number;
  name?: string;
}

export interface Picture {
  id?: number;
  path?: string;
  path_extra?: string;
  caption?: string;
}
