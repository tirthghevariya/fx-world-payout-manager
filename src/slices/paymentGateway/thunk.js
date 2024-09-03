import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPaymentGatewayList as asyncGetPaymentGatewayList,
  deletePaymentGateway as asyncDeletePaymentGateway,
  createPaymentGateway as asyncCreatePaymentGateway,
  updatePaymentGateway as asyncUpdatePaymentGateway,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getPaymentGatewayList = createAsyncThunk(
  "getPaymentGatewayList",
  async (req) => {
    try {
      const response = asyncGetPaymentGatewayList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deletePaymentGateway = createAsyncThunk(
  "chat/deletePaymentGateway",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeletePaymentGateway(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPaymentGatewayList(currentState.paymentGateway.filterParams)
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

export const createPaymentGateway = createAsyncThunk(
  "chat/createPaymentGateway",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreatePaymentGateway(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPaymentGatewayList(currentState.paymentGateway.filterParams)
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
      return error;
    }
  }
);

export const editPaymentGateway = createAsyncThunk(
  "chat/editPaymentGateway",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdatePaymentGateway(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPaymentGatewayList(currentState.paymentGateway.filterParams)
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
      return error;
    }
  }
);
