import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCoupon as asyncGetCoupon,
  createCoupon as asyncCreateCoupon,
  updateCoupon as asyncUpdateCoupon,
  updateCouponStatus as asyncUpdateCouponStatus,
  deleteCoupon as asyncDeleteCoupon,
  deleteBulkCoupon as asyncDeleteBulkCoupon,
  applyCoupon as asyncApplyCoupon,
} from "../../helpers/apis";

import { showToast } from "../toast/reducer";

export const getCouponList = createAsyncThunk("getCoupon", async (req) => {
  try {
    const response = asyncGetCoupon(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const applyCoupon = createAsyncThunk("applyCoupon", async (req) => {
  try {
    const response = asyncApplyCoupon(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteCoupon = createAsyncThunk(
  "chat/deleteCoupon",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteCoupon(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCouponList(currentState.coupon.filterParams));
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

export const createCoupon = createAsyncThunk(
  "chat/createCoupon",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateCoupon(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCouponList(currentState.coupon.filterParams));
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

export const editCoupon = createAsyncThunk(
  "editCoupon",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateCoupon(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCouponList(currentState.coupon.filterParams));
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

export const updateCouponStatus = createAsyncThunk(
  "updateCouponStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateCouponStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCouponList(currentState.coupon.filterParams));
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

export const deleteBulkCoupon = createAsyncThunk(
  "chat/deleteBulkCoupon",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkCoupon(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCouponList(currentState.coupon.filterParams));
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
