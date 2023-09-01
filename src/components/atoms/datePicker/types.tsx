import { Dispatch, SetStateAction } from "react";
import { Moment } from "moment/moment";

export interface IDatePicker {
  datePickerClass?: string;
  isOpenedStyle?: boolean;
  bookingDate: IBookingDate;
  setBookingDate: Dispatch<SetStateAction<IBookingDate>>;
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
