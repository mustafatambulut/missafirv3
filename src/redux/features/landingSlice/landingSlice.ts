import { get } from "lodash";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { setLocalStorage } from "@/utils/helper";
import { getLocations, getPage } from "@/service/api";
import { ILandingState } from "@/redux/features/landingSlice/types";
import { ILocationData } from "@/components/atoms/destinationSelect/types";

export const fetchDataByPage = createAsyncThunk(
  "landing/fetchDataByPage",
  async (page: string) => {
    const { attributes } = await getPage(page);
    return attributes;
  }
);

export const fetchLocations = createAsyncThunk(
  "landing/fetchLocations",
  async () => {
    const { data } = await getLocations();
    return data.data;
  }
);

const initialState = {
  entities: [],
  loading: true,
  isShowDrawer: false,
  locations: {}
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
    },
    updateLocations: (
      state: { locations: any },
      action: PayloadAction<ILocationData>
    ) => {
      state.locations = action.payload;
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
    builder.addCase(
      fetchLocations.fulfilled,
      (state: ILandingState, action) => {
        state.locations = action.payload;
        setLocalStorage("locations", JSON.stringify(action.payload));
      }
    );
  }
});

export const { updateIsShowDrawer, updateLocations } = landingSlice.actions;
export default landingSlice.reducer;
