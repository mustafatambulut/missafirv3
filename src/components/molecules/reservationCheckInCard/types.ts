import { Reservation } from "@/redux/features/reservationSlice/types";

export interface IReservationCheckInCard {
  reservation?: Reservation;
  className?: string;
}
