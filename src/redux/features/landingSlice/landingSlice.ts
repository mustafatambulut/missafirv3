import { get } from "lodash";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  loading: true,
  isShowDrawer: false
} as ILandingState;

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

export const { updateIsShowDrawer } = landingSlice.actions;
export default landingSlice.reducer;
