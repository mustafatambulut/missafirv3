import React from "react";

export interface IBookingGuests {
  data: IBookingGuestsData;
  setBookingGuests: React.Dispatch<
    React.SetStateAction<{ adults: number; kids: number; pets: boolean }>
  >;
}

export interface IBookingGuestsData {
  adults: number;
  kids: number;
  pets: boolean;
}
