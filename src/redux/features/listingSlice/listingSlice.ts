import {get, has, size} from "lodash";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setLocalStorage } from "@/utils/helper";
import { getFilters, getListings } from "@/service/api";
import { IListingSlice } from "@/redux/features/listingSlice/types";
import {
  IBookingDate,
  IBookingGuest
} from "@/components/atoms/datePicker/types";

export const fetchFilters = createAsyncThunk(
  "landing/fetchFilters",
  async () => {
    const { data } = await getFilters();
    return data.data;
  }
);

export const fetchListings = createAsyncThunk(
  "landing/fetchListings",
  async (params) => {
    const { data } = await getListings(params);
    return data.data;
  }
);

const initialState = {
  filterItems: [],
  listings: [],
  loading: true,
  showSearchbar: false,
  searchLocation: null,
  filterData: {price_type: 1},
  preFilterData: {},
  pagination: null,
  bookingDestination: null,
  bookingDate: {
    startDate: null,
    endDate: null
  },
  bookingGuests: {
    adults: 0,
    kids: 0,
    pets: 0
  }
} as IListingSlice;

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateFilterItems: (state: IListingSlice, action: PayloadAction<any>) => {
      state.filterItems = action.payload;
    },
    updateFilterData: (state: IListingSlice, action: PayloadAction<any>) => {
      state.filterData = action.payload;
      setLocalStorage("filterData", JSON.stringify(action.payload));
    },
    updatePreFilterData: (state: IListingSlice, action: PayloadAction<any>) => {
      state.preFilterData = action.payload;
    },
    updateBookingDestination: (
      state: IListingSlice,
      action: PayloadAction<any>
    ) => {
      state.bookingDestination = action.payload;
    },
    updateBookingDate: (
      state: IListingSlice,
      action: PayloadAction<IBookingDate>
    ) => {
      state.bookingDate = action.payload;
    },
    updateBookingGuests: (
      state: IListingSlice,
      action: PayloadAction<IBookingGuest>
    ) => {
      state.bookingGuests = action.payload;
    },
    updateShowSearchbar: (state: IListingSlice, action: PayloadAction<any>) => {
      state.showSearchbar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.fulfilled, (state: IListingSlice, action) => {
      state.filterItems = action.payload;
      setLocalStorage("filterItems", JSON.stringify(action.payload));
      state.loading = false;
    });
    builder.addCase(fetchListings.pending, (state: IListingSlice) => {
      state.searchLocation = null;
      state.loading = true;
    });
    builder.addCase(fetchListings.fulfilled, (state: IListingSlice, action) => {
      size(action.payload.filters) > 0 && has(action.payload.filters, "district") || has(action.payload.filters, "city")
        ? (state.searchLocation = {
            district: get(action.payload.filters, "district", null),
            city: get(action.payload.filters, "city", null)
          })
        : null;
      state.listings = action.payload.items;
      state.loading = false;
    });
  }
});
export const {
  updateFilterData,
  updateFilterItems,
  updateBookingDate,
  updatePreFilterData,
  updateBookingGuests,
  updateShowSearchbar,
  updateBookingDestination,
} = listingSlice.actions;
export default listingSlice.reducer;
