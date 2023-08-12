import { get } from "lodash";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPage } from "@/service/api";
import { ILandingState } from "@/redux/features/landingSlice/types";

export const fetchDataByPage = createAsyncThunk(
  "landing/fetchDataByPage",
  async (page: string) => {
    const { attributes } = await getPage(page);
    return attributes;
  }
);

const initialState = {
  entities: [],
  loading: true
} as ILandingState;

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataByPage.pending, (state: ILandingState): void => {
      state.loading = true;
    });
    builder.addCase(
      fetchDataByPage.fulfilled,
      (state: ILandingState, action) => {
        get(state, "entities").push(get(action, "payload"));
        state.loading = false;
      }
    );
  }
});
export default landingSlice.reducer;
