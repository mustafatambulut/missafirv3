export interface IAmenitiesSection {
  className?: string;
  item: Item;
}

export interface Item {
  amenities: Amenities[];
  missafir_touches?: [];
}

export interface Amenities {
  id?: number;
  name: string;
}
