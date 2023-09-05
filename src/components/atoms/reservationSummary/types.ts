import { Reservation } from "@/redux/features/reservationSlice/types";

export interface IReservationSummary {
  reservation: Reservation;
  className?: string;
  isDateSummary?: boolean;
  hideCouponCode?: boolean;
}
