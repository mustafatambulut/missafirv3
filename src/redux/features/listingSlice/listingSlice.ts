import get from "lodash/get";
import has from "lodash/has";
import size from "lodash/size";
import isNull from "lodash/isNull";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IBookingDate,
  IBookingGuest
} from "@/components/atoms/datePicker/types";
import { setLocalStorage } from "@/utils/helper";
import { getFilters, getListings } from "@/service/api";
import { IListingSlice } from "@/redux/features/listingSlice/types";
import { FILTER_ITEMS_KEY } from "@/app/constants";

export const fetchFilters = createAsyncThunk(
  "listing/fetchFilters",
  async () => {
    const { data } = await getFilters();
    return get(data, "data") || null;
  }
);

export const fetchListings = createAsyncThunk(
  "listing/fetchListings",
  async ({ lang, params }: { lang?: string; params?: any }) => {
    const { data } = await getListings({ lang, params });
    return get(data, "data") || null;
  }
);

const initialState = {
  listingResultsTitle: "",
  filterItems: [],
  listings: [],
  listingsLoaded: false,
  loading: false,
  showSearchbar: false,
  searchLocation: null,
  filterData: {},
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
  },
  searchClicked: false
} as IListingSlice;

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateSearchClicked: (state: IListingSlice, action: PayloadAction<any>) => {
      state.searchClicked = action.payload;
    },
    updateLoading: (state: IListingSlice, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    updateFilterItems: (state: IListingSlice, action: PayloadAction<any>) => {
      state.filterItems = action.payload;
    },
    updateFilterData: (state: IListingSlice, action: PayloadAction<any>) => {
      state.filterData = action.payload;
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
      setLocalStorage(FILTER_ITEMS_KEY, JSON.stringify(action.payload));
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

        if (
          (size(action.payload.filters) &&
            has(action.payload.filters, "district")) ||
          has(action.payload.filters, "city")
        ) {
          state.searchLocation = {
            district: get(action.payload.filters, "district", null),
            city: get(action.payload.filters, "city", null)
          };
        }
        state.listingResultsTitle = action.payload.title;
        state.pagination = action.payload.pagination;
        // state.listings = [...state.listings, ...action.payload.items];
        state.listings = action.payload.items;
        state.loading = false;
        state.searchClicked = false;
        state.listingsLoaded = true;
      }
    );
  }
});
export const {
  updateFilterData,
  updateBookingDate,
  updatePreFilterData,
  updateBookingGuests,
  updateShowSearchbar,
  updateSearchClicked,
  updateBookingDestination,
  updateLoading
} = listingSlice.actions;
export default listingSlice.reducer;
