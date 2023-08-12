import { get } from "lodash";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPage } from "@/service/api";

export const fetchDataByPage = createAsyncThunk(
  "landing/fetchDataByPage",
  async (page: string) => {
    const { attributes } = await getPage(page);
    return attributes;
  }
);

interface LandingState {
  entities: [];
  loading: boolean;
}

const initialState = {
  entities: [],
  loading: true
} as LandingState;

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataByPage.pending, (state: LandingState): void => {
      state.loading = true;
    });
    builder.addCase(
      fetchDataByPage.fulfilled,
      (state: LandingState, action) => {
        get(state, "entities").push(get(action, "payload"));
        state.loading = false;
      }
    );
  }
});
export default landingSlice.reducer;
