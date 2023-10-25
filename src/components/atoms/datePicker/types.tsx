import { Moment } from "moment/moment";

export interface IDatePicker {
  daySize?: number;
  isInCustomSection?: boolean;
  unavailableDates?: string[];
  datePickerClass?: string;
  showDateFormat?: string;
  className?: string;
  isShowLabel?: boolean;
  isShimmer?: boolean;
  orientation?: "verticalScrollable" | "horizontal";
  isOpenedStyle?: boolean;
  noNavButtons?: boolean;
  numberOfMonths?: number;
  // eslint-disable-next-line no-unused-vars
  isOutsideRange?: (day: Moment) => boolean;

  initialVisibleMonth?: void;
  showMinimumDateSelector?: boolean;
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
