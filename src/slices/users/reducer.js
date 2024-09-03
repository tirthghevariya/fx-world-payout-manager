import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  getUserList,
  updateUsers,
  updateUserStatus,
  registerVsActiveUser,
  bulkDeleteUser,
  last15DaysOrder,
  getVendorList,
  getTopPerformingVendor,
} from "./thunk";
const moment = require("moment");

export const initialState = {
  filterParams: {
    currentPage: 1,
    perPage: 20,
    isDownload: false,
  },

  insersUser: {
    formOpen: false,
    loading: false,
  },

  updateUser: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleUser: {},
  },

  updateStatus: {
    loading: false,
    formOpen: false,
    singleUser: {},
  },

  updateDate: {
    startDate: moment().subtract(15, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  },

  bulkDelete: {},
  registerVsActive: [],
  last15DaysOrderReport: [],
  userList: [],
  vendorList: [],
  topPerformingVendor: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insersUser = { ...state.insersUser, ...action.payload };
    },
    updateUserStates: (state, action) => {
      state.updateUser = { ...state.updateUser, ...action.payload };
    },
    updateStatusStates: (state, action) => {
      state.updateStatus = { ...state.updateStatus, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.userList = action.payload;
    });

    builder.addCase(registerVsActiveUser.fulfilled, (state, action) => {
      state.registerVsActive = action.payload;
    });

    builder.addCase(last15DaysOrder.fulfilled, (state, action) => {
      state.last15DaysOrderReport = action.payload;
    });

    builder.addCase(createUser.fulfilled, (state) => {
      state.insersUser = { formOpen: false, loading: false };
    });

    builder.addCase(updateUsers.fulfilled, (state) => {
      state.updateUser = { formOpen: false, loading: false };
    });

    builder.addCase(updateUserStatus.fulfilled, (state) => {
      state.updateStatus = { formOpen: false, loading: false };
    });

    builder.addCase(bulkDeleteUser.fulfilled, (state, action) => {
      state.bulkDelete = action.payload;
    });
    builder.addCase(getVendorList.fulfilled, (state, action) => {
      state.vendorList = action.payload;
    });
    builder.addCase(getTopPerformingVendor.fulfilled, (state, action) => {
      state.topPerformingVendor = action.payload;
    });
  },
});

export const { updateState, updateUserStates, updateStatusStates } =
  usersSlice.actions;

export default usersSlice.reducer;
