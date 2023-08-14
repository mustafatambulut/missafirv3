import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./features/landingSlice";

export const store = configureStore({
  reducer: {
    landingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
