export interface IMapSection {
  className?: string;
  data?: Data;
}

export interface Data {
  content: string;
  city: string;
  district: string;
  approx_lat?: string | number;
  approx_lng?: string | number;
}
