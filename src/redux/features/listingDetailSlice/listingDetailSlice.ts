import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IListingDetailState } from "@/redux/features/listingDetailSlice/types";

const initialState = {
  booking: {
    startDate: null,
    endDate: null
  }
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
    }
  }
});

export const { updateBookingDate } = listingDetailSlice.actions;
export default listingDetailSlice.reducer;
