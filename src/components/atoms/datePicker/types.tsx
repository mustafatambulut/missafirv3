import { Moment } from "moment/moment";
import { Dispatch, SetStateAction } from "react";

export interface IDatePicker {
 isInCustomSection?: boolean;
  datePickerClass?: string;
  className?: string;
  isShowLabel?: boolean;
  orientation?: "verticalScrollable" | "horizontal";
  isOpenedStyle?: boolean;
  // bookingDate: IBookingDate;
  noNavButtons?: boolean;
  numberOfMonths?: number;
  // setBookingDate: Dispatch<SetStateAction<IBookingDate>>;
  setSkipButtonVisibility: Dispatch<SetStateAction<boolean>>;
}

export interface IBookingDate {
  startDate: null | Moment;
  endDate: null | Moment;
}

export interface IBookingGuest {
  adults: number;
  kids: number;
  pets: boolean;
}
