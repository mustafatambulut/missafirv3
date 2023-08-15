import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./features/landingSlice";
import profileReducer from "./features/profileSlice";

export const store = configureStore({
  reducer: {
    landingReducer,
    profileReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
