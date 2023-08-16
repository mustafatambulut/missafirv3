import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./features/landingSlice/landingSlice";
import reservationReducer from "./features/reservationSlice/reservationSlice";
import profileReducer from "./features/profileSlice";

export const store = configureStore({
  reducer: {
    landingReducer,
    profileReducer,
    reservationReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
