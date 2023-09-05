import {
  STATUS_SUCCESS,
  STATUS_CONFIRMATION,
  STATUS_EXTRA_SERVICE
} from "@/app/[lang]/reservation/constants";

export interface IReservationState {
  guests?: number;
  entities?: Entities;
  payment?: Payment;
  total?: number;
  couponCode?: null;
  isShowCouponCode?: boolean;
  isApplyCouponCode?: boolean;
  currentStep?: number;
  status: STATUS_CONFIRMATION | STATUS_EXTRA_SERVICE | STATUS_SUCCESS;
  reservation?: Reservation;
}

export interface Entities {
  title?: string;
  location?: string;
  images?: string[];
  details?: Detail[];
}

export interface Detail {
  keyInfo?: KeyInfo;
  homeRules?: HomeRule[];
  properties?: string[];
}

export interface HomeRule {
  text?: string;
  img?: string;
}

export interface KeyInfo {
  checkIn?: string;
  checkInOut?: string;
  info?: string[];
}

export interface Payment {
  nightlyRate?: number;
  reservationDay?: number;
  discountPercent?: number;
  couponCodePercent?: number;
  extras?: Extras;
}

export interface Extras {
  label?: string;
  total?: number;
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
