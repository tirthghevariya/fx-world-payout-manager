import { createSlice } from "@reduxjs/toolkit";
import { getNotificationList, sendSms, getNotificationCount } from "./thunk";

export const initialState = {
  permissionList: [],
  notificationCount: [],
  filterParams: {
    currentPage: 1,
    perPage: 20,
    viewAll: false,
  },

  sendSMS: {
    formOpen: false,
    loading: false,
  },

  notificationList: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.sendSMS = { ...state.sendSMS, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNotificationList.fulfilled, (state, action) => {
      state.notificationList = action.payload;
    });
    builder.addCase(getNotificationCount.fulfilled, (state, action) => {
      state.notificationCount = action.payload;
    });
    builder.addCase(sendSms.fulfilled, (state) => {
      state.sendSMS = { formOpen: false, loading: false };
    });
  },
});
export const { updateState } = notificationSlice.actions;

export default notificationSlice.reducer;
