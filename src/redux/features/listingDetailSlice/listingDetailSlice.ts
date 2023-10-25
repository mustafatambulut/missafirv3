import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IListingDetailState } from "@/redux/features/listingDetailSlice/types";

const initialState = {
  resPayload: {
    slug: "",
    check_in: null,
    check_out: null,
    adults: 1,
    kids: 0,
    pets: 0
  },
  bookingDate: {
    startDate: null,
    endDate: null
  },
  availabilityModalOpen: false,
  links: null,
  isLoadingDatePicker: false,
  isSelectedBookingDate: false
} as IListingDetailState;

const listingDetailSlice = createSlice({
  name: "listingDetail",
  initialState,
  reducers: {
    setBookingDate: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.bookingDate = action.payload;
    },
    setResPayload: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.resPayload = action.payload;
    },
    setAvailabilityModalOpen: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.availabilityModalOpen = action.payload;
    },
    setLinks: (state: IListingDetailState, action: PayloadAction<boolean>) => {
      state.links = action.payload;
    },
    setIsSelectedBookingDate: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.isSelectedBookingDate = action.payload;
    },
    setIsLoadingDatePicker: (
      state: IListingDetailState,
      action: PayloadAction<boolean>
    ) => {
      state.isLoadingDatePicker = action.payload;
    }
  }
});

export const {
  setLinks,
  setResPayload,
  setBookingDate,
  setIsLoadingDatePicker,
  setIsSelectedBookingDate,
  setAvailabilityModalOpen
} = listingDetailSlice.actions;
export default listingDetailSlice.reducer;
