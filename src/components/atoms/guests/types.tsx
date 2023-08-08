import React from "react";

export interface IBookingGuests {
  data: IBookingGuestsData;
  setSkipButtonVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setBookingGuests: React.Dispatch<
    React.SetStateAction<{ adults: number; kids: number; pets: boolean }>
  >;
}

export interface IBookingGuestsData {
  adults: number;
  kids: number;
  pets: boolean;
}
