import { get } from "lodash";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  loading: "idle" | "pending" | "succeeded" | "failed";
  isShowDrawer: false;
}

const initialState = {
  entities: [],
  loading: "idle"
} as LandingState;

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    updateIsShowDrawer: (
      state: { isShowDrawer: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.isShowDrawer = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataByPage.fulfilled, (state, action) => {
      const entities = get(state, "entities");
      entities.push(get(action, "payload"));
    });
  }
});
export const responseData = (state: RootState) => get(state, "landing.value");
export const { updateIsShowDrawer } = landingSlice.actions;
export default landingSlice.reducer;
