import { Dispatch, SetStateAction } from "react";
import { IBookingDate } from "@/components/atoms/datePicker/types";

export interface IInputDatePicker {
  date: IBookingDate;
  isOpened?: boolean;
  placeholder?: string;
  showDateFormat?: string;
  isShowLabel?: boolean;
  isShowDates?: boolean;
  showDatePicker?: boolean;
  withDatePreview?: boolean;
  showCalendarIcon?: boolean;
  customOpenHandler?: void;
  isInCustomSection?: boolean;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
}
