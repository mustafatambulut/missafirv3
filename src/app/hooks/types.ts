export interface IuseCreateQueryString {
  queries: Queries;
}

export interface Queries {
  check_in?: string;
  check_out?: string;
  district_id?: string;
  adults?: string;
  kids?: string;
  pets?: string;
}
