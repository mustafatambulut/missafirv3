import { get } from "lodash";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPage } from "@/service/api";

export const fetchDataByPage = createAsyncThunk("landing/fetchDataByPage", async (page: string) => {
  const { attributes } = await getPage(page);
  return attributes;
});

interface LandingState {
  entities: [];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  entities: [],
  loading: "idle"
} as LandingState;

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataByPage.fulfilled, (state, action) => {
      const entities = get(state, "entities");
      entities.push(get(action, "payload"));
    });
  }
});
export const responseData = (state: RootState) => get(state, "landing.value");
export default landingSlice.reducer;
