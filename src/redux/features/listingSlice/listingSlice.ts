import { get, has, isNull, size } from "lodash";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IBookingDate,
  IBookingGuest
} from "@/components/atoms/datePicker/types";
import { setLocalStorage } from "@/utils/helper";
import { IListingSlice } from "@/redux/features/listingSlice/types";
import { getFilters, getListings, getListingsByPage } from "@/service/api";

export const fetchFilters = createAsyncThunk(
  "listing/fetchFilters",
  async () => {
    const { data } = await getFilters();
    return get(data, "data") || null;
  }
);

export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async (params) => {
    const { data } = await getListings(params);
    return get(data, "data") || null;
  }
);

export const fetchListingsByPage = createAsyncThunk(
  "listing/fetchListingsByPage",
  async (params) => {
    const { data } = await getListingsByPage(params);
    return get(data, "data") || null;
  }
);

const initialState = {
  listingResultsTitle: "",
  filterItems: [],
  listings: [],
  loading: false,
  showSearchbar: false,
  searchLocation: null,
  filterData: { price_type: 1 },
  preFilterData: {},
  bookingDestination: null,
  bookingDate: {
    startDate: null,
    endDate: null
  },
  bookingGuests: {
    adults: 1,
    kids: 0,
    pets: 0
  },
  pagination: {
    total: 0,
    current: 1
  }
} as IListingSlice;

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateSearchClicked: (state: IListingSlice, action: PayloadAction<any>) => {
      state.searchClicked = action.payload;
    },
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
      state.pagination = { total: 0, current: 1 };
      state.loading = true;
      state.searchClicked = true;
    });
    builder.addCase(
      fetchListings.fulfilled,
      (state: IListingSlice, action: any) => {
        if (isNull(action?.payload)) {
          state.loading = false;
          state.searchClicked = false;
          state.listings = [];
          return;
        }
        (size(action.payload.filters) &&
          has(action.payload.filters, "district")) ||
        has(action.payload.filters, "city")
          ? (state.searchLocation = {
              district: get(action.payload.filters, "district", null),
              city: get(action.payload.filters, "city", null)
            })
          : null;
        state.listingResultsTitle = action.payload.title;
        state.pagination = action.payload.pagination;
        state.listings = action.payload.items;
        state.loading = false;
        state.searchClicked = false;
      }
    );
    builder.addCase(
      fetchListingsByPage.fulfilled,
      (state: IListingSlice, action: any) => {
        (size(action.payload.filters) &&
          has(action.payload.filters, "district")) ||
        has(action.payload.filters, "city")
          ? (state.searchLocation = {
              district: get(action.payload.filters, "district", null),
              city: get(action.payload.filters, "city", null)
            })
          : null;
        state.pagination = action.payload.pagination;
        state.listings = [...state.listings, ...action.payload.items];
      }
    );
  }
});
export const {
  updateFilterData,
  updateFilterItems,
  updateBookingDate,
  updatePreFilterData,
  updateBookingGuests,
  updateShowSearchbar,
  updateSearchClicked,
  updateBookingDestination
} = listingSlice.actions;
export default listingSlice.reducer;
