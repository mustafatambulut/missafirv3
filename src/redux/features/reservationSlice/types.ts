import {
  STATUS_SUCCESS,
  STATUS_CONFIRMATION,
  STATUS_EXTRA_SERVICE
} from "@/app/[lang]/reservation/constants";

export interface IReservationState {
  guests?: number;
  total?: number;
  couponCode?: null;
  isShowCouponCode?: boolean;
  isApplyCouponCode?: boolean;
  currentStep?: number;
  status: STATUS_CONFIRMATION | STATUS_EXTRA_SERVICE | STATUS_SUCCESS;
  reservation?: Reservation;
}

export interface Reservation {
  is_available?: boolean;
  price?: Price;
  is_available_reason?: null;
}

export interface Price {
  final?: string;
  listing?: string;
  average_daily_price?: string;
  discount_percentage?: string;
  total_discount_price?: string;
  cleaning_fee?: string;
  total_nights?: number;
  sub_total?: string;
  original_average_daily_price?: string;
  breakdown?: Breakdown[];
}

export interface Breakdown {
  label?: string;
  value?: string;
  extra?: string;
}
