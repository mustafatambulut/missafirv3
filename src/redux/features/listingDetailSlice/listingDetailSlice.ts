import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IListingDetailState } from "@/redux/features/listingDetailSlice/types";

const initialState = {
  booking: {
    startDate: null,
    endDate: null
  },
  checkIn: null,
  checkOut: null,
  adults: 1
} as IListingDetailState;

const listingDetailSlice = createSlice({
  name: "listingDetail",
  initialState,
  reducers: {
    updateBookingDate: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.booking = action.payload;
    },
    setCheckIn: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.checkOut = action.payload;
    },
    setAdults: (state: IListingDetailState, action: PayloadAction<boolean>) => {
      state.adults = action.payload;
    }
  }
});

export const { setCheckIn, setCheckOut, setAdults, updateBookingDate } =
  listingDetailSlice.actions;
export default listingDetailSlice.reducer;
