import { Dispatch, SetStateAction } from "react";
import { IBookingDate } from "@/components/atoms/datePicker/types";

export interface IRenderControl {
  bookingDate: IBookingDate;
  setBookingDate: Dispatch<SetStateAction<IBookingDate>>;
  className?: string;
}
