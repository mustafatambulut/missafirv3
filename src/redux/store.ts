import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "@/redux/features/profileSlice";
import bankReducer from "@/redux/features/bankSlice/bankSlice";
import ownerReducer from "@/redux/features/ownerSlice/ownerSlice";
import listingReducer from "./features/listingSlice/listingSlice";
import paymentReducer from "@/redux/features/paymentSlice/paymentSlice";
import landingReducer from "@/redux/features/landingSlice/landingSlice";
import inboxReducer from "@/redux/features/inboxSlice/inboxSlice";
import contactReducer from "@/redux/features/contactSlice/contactSlice";
import datePickerReducer from "@/redux/features/datePickerSlice/datePickerSlice";
import reservationReducer from "@/redux/features/reservationSlice/reservationSlice";
import listingDetailReducer from "@/redux/features/listingDetailSlice/listingDetailSlice";

export const store = configureStore({
  reducer: {
    bankReducer,
    ownerReducer,
    contactReducer,
    landingReducer,
    listingReducer,
    profileReducer,
    paymentReducer,
    inboxReducer,
    datePickerReducer,
    reservationReducer,
    listingDetailReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "listing/updateBookingDate",
          "listingDetail/setBookingDate",
          "datePicker/setBookingDate",
        ],
        ignoredPaths: [
          "listingReducer.bookingDate.endDate",
          "listingReducer.bookingDate.startDate",
          "listingDetailReducer.bookingDate.endDate",
          "listingDetailReducer.bookingDate.startDate",
          "datePickerReducer.bookingDate.startDate",
          "datePickerReducer.bookingDate.endDate"
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
