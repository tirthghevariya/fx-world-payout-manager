import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrencyList as asyncGetCurrencyList,
  deleteCurrency as asyncDeleteCurrency,
  deleteBulkCurrency as asyncDeleteBulkCurrency,
  createCurrency as asyncCreateCurrency,
  updateCurrency as asyncUpdateCurrency,
} from "../../helpers/apis";

import { showToast } from "../toast/reducer";

export const getCurrencyList = createAsyncThunk(
  "getCurrencyList",
  async (req) => {
    try {
      const response = asyncGetCurrencyList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteCurrency = createAsyncThunk(
  "chat/deleteCurrency",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteCurrency(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCurrencyList(currentState.currency.filterParams));
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

export const createCurrency = createAsyncThunk(
  "chat/createCurrency",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateCurrency(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCurrencyList(currentState.currency.filterParams));
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

export const editCurrency = createAsyncThunk(
  "editCurrency",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateCurrency(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCurrencyList(currentState.currency.filterParams));
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

export const deletebulkCurrency = createAsyncThunk(
  "deletebulkCurrency",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkCurrency(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCurrencyList(currentState.currency.filterParams));
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
