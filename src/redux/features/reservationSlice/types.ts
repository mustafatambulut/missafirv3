import {
  STATUS_SUCCESS,
  STATUS_CONFIRMATION,
  STATUS_EXTRA_SERVICE
} from "@/app/[lang]/reservation/constants";

export interface IReservationState {
  entities?: Entities;
  payment?: Payment;
  total?: number;
  couponCode?: null;
  isShowCouponCode?: boolean;
  isApplyCouponCode?: boolean;
  currentStep?: number;
  status: STATUS_CONFIRMATION | STATUS_EXTRA_SERVICE | STATUS_SUCCESS;
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
