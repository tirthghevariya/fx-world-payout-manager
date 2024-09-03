import { createSlice } from "@reduxjs/toolkit";
import {
  getWalletHistoryList,
  getFundRequestHistory,
  createFundRequest,
  updateFundRequest,
} from "./thunk";

export const initialState = {
  walletHistory: [],
  fundRequest: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
  },

  insertFundRequest: {
    formOpen: false,
    loading: false,
  },

  editFundRequest: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleTicket: {},
  },

  getPermissionList: [],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertFundRequest = {
        ...state.insertFundRequest,
        ...action.payload,
      };
    },
    updateFundRequestStates: (state, action) => {
      state.editFundRequest = { ...state.editFundRequest, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getWalletHistoryList.fulfilled, (state, action) => {
      state.walletHistory = action.payload;
    });
    builder.addCase(getFundRequestHistory.fulfilled, (state, action) => {
      state.fundRequest = action.payload;
    });
    builder.addCase(createFundRequest.fulfilled, (state) => {
      state.insertFundRequest = { formOpen: false, loading: false };
    });
    builder.addCase(updateFundRequest.fulfilled, (state) => {
      state.editFundRequest = { formOpen: false, loading: false };
    });
  },
});

export const { updateState, updateFundRequestStates } = walletSlice.actions;

export default walletSlice.reducer;
