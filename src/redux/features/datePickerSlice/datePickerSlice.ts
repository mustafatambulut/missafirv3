import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IDatePickerState } from "@/redux/features/datePickerSlice/types";

const initialState = {
  bookingDate: {
    startDate: null,
    endDate: null
  }
} as IDatePickerState;

const datePickerSlice = createSlice({
  name: "listingDetail",
  initialState,
  reducers: {
    setBookingDate: (
      state: IDatePickerState,
      action: PayloadAction<boolean>
    ) => {
      state.bookingDate = action.payload;
    }
  }
});

export const { setBookingDate } = datePickerSlice.actions;
export default datePickerSlice.reducer;
