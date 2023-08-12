import {
  STATUS_SUCCESS,
  STATUS_CONFIRMATION,
  STATUS_EXTRA_SERVICE
} from "@/app/[lang]/reservation/constants";

export interface IReservationState {
  entities?: Entities;
  payment?: Payment;
  total?: number;
  cuponCode?: null;
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
  homeRules?: string[];
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
  extras?: Extras;
}

export interface Extras {
  label?: string;
  total?: number;
}
