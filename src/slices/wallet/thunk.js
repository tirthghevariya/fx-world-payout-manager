import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWalletHistory as asyncGetWalletHistory,
  deleteWalletHistory as asyncDeleteWalletHistory,
  deleteBulkWalletHistory as asyncDeleteBulkWalletHistory,
  getFundRequestHistory as asyncGetFundRequestHistory,
  fundRequest as asyncFundRequest,
  updateFundRequest as asyncUpdateFundRequest,
  deleteFundRequest as asyncDeleteFundRequest,
  deleteBulkFundRequest as asyncDeleteBulkFundRequest,
} from "../../helpers/apis";

import { showToast } from "../toast/reducer";

export const getWalletHistoryList = createAsyncThunk(
  "getWalletHistoryList",
  async (req) => {
    try {
      const response = asyncGetWalletHistory(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getFundRequestHistory = createAsyncThunk(
  "getFundRequestHistory",
  async (req) => {
    try {
      const response = asyncGetFundRequestHistory(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteWalletHistory = createAsyncThunk(
  "chat/deleteWalletHistory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteWalletHistory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getWalletHistoryList(currentState.wallet.filterParams));
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      throw error;
    }
  }
);

export const deleteFundRequest = createAsyncThunk(
  "chat/deleteFundRequest",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteFundRequest(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getFundRequestHistory(currentState.wallet.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      throw error;
    }
  }
);

export const bulkDeleteFundRequest = createAsyncThunk(
  "chat/bulkDeleteFundRequest",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkFundRequest(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getFundRequestHistory(currentState.wallet.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      throw error;
    }
  }
);

export const createFundRequest = createAsyncThunk(
  "createFundRequest",
  async (req, thunkAPI) => {
    try {
      const response = await asyncFundRequest(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getFundRequestHistory(currentState.wallet.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      throw error;
    }
  }
);

export const updateFundRequest = createAsyncThunk(
  "updateFundRequest",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateFundRequest(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getFundRequestHistory(currentState.wallet.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      throw error;
    }
  }
);

export const deleteBulkWalletHistory = createAsyncThunk(
  "chat/deleteBulkWalletHistory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkWalletHistory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getWalletHistoryList(currentState.wallet.filterParams));
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      return error;
    }
  }
);
