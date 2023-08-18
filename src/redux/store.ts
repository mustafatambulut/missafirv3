import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "@/redux/features/profileSlice";
import paymentReducer from "@/redux/features/paymentSlice/paymentSlice";
import landingReducer from "@/redux/features/landingSlice/landingSlice";
import reservationReducer from "@/redux/features/reservationSlice/reservationSlice";

export const store = configureStore({
  reducer: {
    landingReducer,
    profileReducer,
    paymentReducer,
    reservationReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
