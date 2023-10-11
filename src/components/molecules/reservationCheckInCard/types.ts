import { Dispatch, SetStateAction } from "react";

export interface IReservationCheckInCard {
  resData?: any;
  className?: string;
  searchParams: any;
}

export interface Guest {
  guest: string | number;
  setGuest: Dispatch<SetStateAction<string | number>>;
}
