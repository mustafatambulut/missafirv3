import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBankState } from "@/redux/features/bankSlice/types";

const initialState = {
  html: ""
} as IBankState;

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setHtml: (state: IBankState, action: PayloadAction<boolean>) => {
      state.html = action.payload;
    }
  }
});

export const { setHtml } = bankSlice.actions;

export default bankSlice.reducer;
