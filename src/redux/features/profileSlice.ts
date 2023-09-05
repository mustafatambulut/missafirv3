import { get } from "lodash";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserData } from "@/components/atoms/userInfo/types";
import { IReservationItemProps } from "@/components/molecules/reservationItem/types";
import { getRecentReservations } from "@/service/api";

export const fetchRecentReservations = createAsyncThunk(
  "profile/fetchRecentReservations",
  async (reservationType?: string) => {
    const { data } = await getRecentReservations(reservationType);
    return data;
  }
);

interface ProfileState {
  user: IUserData;
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
  loading: false,
  user: {
    avatar: "https://i.ibb.co/dm4mntF/avatar.jpg",
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "johndoe@missafir.com",
    password: "MSFRV3",
    address: "A Sok. B Mah. C Sitesi No:12",
    phone: "+905121211212",
    birthDate: "01/01/1990",
    gender: "female",
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    contact_permissions: {
      email: false,
      push: true,
      sms: true
    }
  },
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
