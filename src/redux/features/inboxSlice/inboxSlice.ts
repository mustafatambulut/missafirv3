import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessageState } from "@/redux/features/inboxSlice/types";
import {
  getThreadDetails,
  getThreadList,
  getThreadListByPage,
  sendMessageToThread
} from "@/service/api";
import { find, get } from "lodash";
import moment from "moment";

export const fetchThreadList = createAsyncThunk(
  "inbox/fetchThreadList",
  async () => {
    const { data } = await getThreadList();
    return data;
  }
);

export const fetchThreadListByPage = createAsyncThunk(
  "inbox/fetchThreadListByPage",
  async (params) => {
    const { data } = await getThreadListByPage(get(params, "page"));
    return data.data;
  }
);

export const fetchThreadDetails = createAsyncThunk(
  "inbox/fetchThreadDetails",
  async ({ selectedThreadId, isInterval = false }) => {
    const { data } = await getThreadDetails(selectedThreadId);
    return { isInterval, selectedThreadId, data: data.data };
  }
);

export const postMessageToThread = createAsyncThunk(
  "inbox/postMessageToThread",
  async ({ id, message }) => {
    const { data } = await sendMessageToThread(id, message);
    return { status: get(data, "status"), message: message };
  }
);
const initialState = {
  threadList: [],
  threadDetails: null,
  selectedThreadId: null,
  selectedThread: null,
  threadListLoading: false,
  threadDetailsLoading: false,
  sendMessageLoading: false,
  isFavored: false,
  notFound: false,
  pagination: {
    total: 0,
    current: 1
  }
} as IMessageState;

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    changeFavored: (state: IMessageState, action: PayloadAction<boolean>) => {
      state.isFavored = get(action, "payload");
    },
    changeNotFound: (state: IMessageState, action: PayloadAction<boolean>) => {
      state.notFound = get(action, "payload");
    },
    changeSelectedThreadId: (
      state: IMessageState,
      action: PayloadAction<boolean>
    ) => {
      state.selectedThreadId = get(action, "payload");
      state.selectedThread = find(state.threadList, ["id", action.payload]);
    },
    updateThreadDetails: (
      state: IMessageState,
      action: PayloadAction<boolean>
    ) => {
      state.threadDetails = get(action, "payload");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchThreadList.pending, (state) => {
      state.threadListLoading = true;
    });
    builder.addCase(fetchThreadList.fulfilled, (state, action) => {
      state.threadList = get(action, "payload.data.items");
      state.threadListLoading = false;
    });
    builder.addCase(fetchThreadListByPage.fulfilled, (state, action) => {
      state.pagination = get(action, "payload.pagination");
      state.threadList = get(action, "payload.items");
    });
    builder.addCase(fetchThreadDetails.pending, (state, { meta }) => {
      if (!get(meta, "arg.isInterval")) {
        state.threadDetailsLoading = true;
        state.selectedThread = null;
      }
      state.notFound = false;
    });
    builder.addCase(fetchThreadDetails.fulfilled, (state, action) => {
      state.threadDetails = get(action, "payload.data.items");
      if (!get(action, "payload.isInterval")) {
        state.threadDetailsLoading = false;
        state.selectedThreadId = get(action, "payload.selectedThreadId");
        state.selectedThread = find(state.threadList, [
          "id",
          get(action, "payload.selectedThreadId")
        ]);
      }
      state.notFound = false;
    });
    builder.addCase(fetchThreadDetails.rejected, (state) => {
      state.notFound = true;
      state.threadDetailsLoading = false;
    });
    builder.addCase(postMessageToThread.pending, (state) => {
      state.sendMessageLoading = true;
    });
    builder.addCase(postMessageToThread.fulfilled, (state, action) => {
      get(action, "payload.status") === true &&
        state.threadDetails.push({
          id: uuidv4(),
          body: get(action, "payload.message"),
          is_incoming: false,
          created_at: moment().format("DD MMM YYYY HH:mm:ss")
        });
      state.sendMessageLoading = false;
    });
  }
});

export const {
  changeFavored,
  updateThreadDetails,
  changeSelectedThreadId,
  changeNotFound
} = inboxSlice.actions;
export default inboxSlice.reducer;
