export interface IAllDetail {
  className?: string;
  detail: Detail;
}

export interface Detail {
  self_check_in?: string;
  check_in_time?: string | Date;
  check_out_time?: string | Date;
  cancelation_policy?: string;
  house_rules?: HouseRules[];
}

export interface HouseRules {
  title: string;
  status: boolean | string;
}
