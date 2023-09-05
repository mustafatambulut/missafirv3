import { get } from "lodash";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IReservationItemProps } from "@/components/molecules/reservationItem/types";
import { getProfile, profileEdit, getRecentReservations } from "@/service/api";

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
  async (reservationType?: string) => {
    const { data } = await getRecentReservations(reservationType);
    return data;
  }
);

interface ProfileState {
  user: any;
  activeSection:
    | "info"
    | "reservations"
    | "password"
    | "reviews"
    | "wishlist"
    | "settings";
  reservations: IReservationItemProps[];
  selectedReservationId: null | string;
}

const initialState = {
  loading:false,
  user: {},
  // todo: test için eklendi düzenlenecek
  reservations: [],
  activeSection: "reservations",
  selectedReservationId: null
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
    });
    builder.addCase(fetchRecentReservations.fulfilled, (state, action) => {
      state.reservations = action.payload.data.items;
      state.loading = false;
    });
  }
});
export const responseData = (state: RootState) => get(state, "profile.value");
export const { updateActiveSection, updateSelectedReservationId } =
  profileSlice.actions;
export default profileSlice.reducer;
