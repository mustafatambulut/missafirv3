import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "@/redux/features/profileSlice";
import paymentReducer from "@/redux/features/paymentSlice/paymentSlice";
import landingReducer from "@/redux/features/landingSlice/landingSlice";
import messageReducer from "@/redux/features/messageSlice/messageSlice";
import contactReducer from "@/redux/features/contactSlice/contactSlice";
import reservationReducer from "@/redux/features/reservationSlice/reservationSlice";

export const store = configureStore({
  reducer: {
    contactReducer,
    landingReducer,
    profileReducer,
    paymentReducer,
    messageReducer,
    reservationReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
