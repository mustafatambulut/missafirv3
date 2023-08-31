import { Moment } from "moment/moment";

export interface IDatePicker {
 isInCustomSection?: boolean;
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
