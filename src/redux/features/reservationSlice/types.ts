import {
  STATUS_SUCCESS,
  STATUS_CONFIRMATION,
  STATUS_EXTRA_SERVICE
} from "@/app/[lang]/reservation/constants";

export interface IReservationState {
  entities?: Entities;
  status: STATUS_CONFIRMATION | STATUS_EXTRA_SERVICE | STATUS_SUCCESS;
}

export interface Entities {
  currentStep?: number;
  reservationStatus?: string;
  title?: string;
  location?: string;
  images?: string[];
  payment?: Payment;
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
  total?: number;
  cuponCode?: null;
}

export interface Extras {
  label?: string;
  total?: number;
}
