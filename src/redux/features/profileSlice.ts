import { get } from "lodash";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IReservationItemProps } from "@/components/molecules/reservationItem/types";
import {
  getProfile,
  profileEdit,
  getRecentReservations,
  getRecentReservationDetails,
  getRecentReservationsByPage
} from "@/service/api";
import axios from "axios";

export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async () => {
    const { data } = await getProfile();
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/profileEdit",
  async (profileData) => {
    const { data } = await profileEdit(profileData);
    return data;
  }
);

export const fetchRecentReservations = createAsyncThunk(
  "profile/fetchRecentReservations",
  async (reservationType?: string,{signal}) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const { data } = await getRecentReservations(reservationType,source.token);
    return data;
  }
);

export const fetchRecentReservationsByPage = createAsyncThunk(
  "landing/fetchRecentReservationsByPage",
  async ({ reservationType, page }) => {
    const { data } = await getRecentReservationsByPage({
      reservationType,
      page
    });
    return get(data, "data");
  }
);

export const fetchRecentReservationDetails = createAsyncThunk(
  "profile/fetchRecentReservationDetails",
  async (id) => {
    const { data } = await getRecentReservationDetails(id);
    return data;
  }
);

interface ProfileState {
  user: any;
  loading: boolean;
  reservation: any;
  activeSection:
    | "info"
    | "reservations"
    | "password"
    | "reviews"
    | "wishlist"
    | "settings";
  reservations: IReservationItemProps[];
  selectedReservationId: null | string;
  reservationsLoaded: boolean;
}

const initialState = {
  loading: true,
  user: {},
  // todo: test için eklendi düzenlenecek
  reservations: [],
  reservation: {},
  reservationsLoaded: false,
  activeSection: "reservations",
  selectedReservationId: null,
  pagination: {
    total: 0,
    current: 1
  }
} as ProfileState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateActiveSection: (
      state: ProfileState,
      action: PayloadAction<
        | "info"
        | "reservations"
        | "password"
        | "reviews"
        | "wishlist"
        | "settings"
      >
    ) => {
      state.activeSection = action.payload;
      state.selectedReservationId = null;
    },
    updateSelectedReservationId: (
      state: ProfileState,
      action: PayloadAction<string>
    ) => {
      state.selectedReservationId = action.payload;
    },
    updateReservation: (state: ProfileState, action: PayloadAction<any>) => {
      state.reservation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(fetchRecentReservations.pending, (state) => {
      state.loading = true;
      state.reservationsLoaded = false;
    });
    builder.addCase(fetchRecentReservations.fulfilled, (state, action) => {
      state.reservations = action.payload.data.items;
      state.loading = false;
      state.reservationsLoaded = true;
    });
    builder.addCase(fetchRecentReservationDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchRecentReservationDetails.fulfilled,
      (state, action) => {
        state.reservation = action.payload.data;
        state.loading = false;
      }
    );
    builder.addCase(
      fetchRecentReservationsByPage.fulfilled,
      (state, action) => {
        state.pagination = action.payload.pagination;
        state.reservations = [...state.reservations, ...action.payload.items];
      }
    );
  }
});
export const responseData = (state: RootState) => get(state, "profile.value");
export const { updateReservation } = profileSlice.actions;
export default profileSlice.reducer;
