import React from "react";
import moment from "moment/moment";

export interface IDatePicker {
  bookingDate: IBookingDate;
  setBookingDate: React.Dispatch<React.SetStateAction<IBookingDate>>;
  setSkipButtonVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBookingDate {
  startDate: null | moment.Moment;
  endDate: null | moment.Moment;
}
