import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrderList as asyncGetOrderList,
  createOrder as asyncCreateOrder,
  updateOrderStatus as asyncUpdateOrderStatus,
  updateOrder as asyncUpdateOrder,
  deleteOrder as asyncDeleteOrder,
  bulkDeleteOrder as asyncBulkDeleteOrder,
  getVendorOrderList as asyncGetVendorOrderList,
  getVendorSingleOrder as asyncGetVendorSingleOrder,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getOrderList = createAsyncThunk("getOrderList", async (req) => {
  try {
    const response = asyncGetOrderList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const getVendorSingleOrder = createAsyncThunk(
  "getVendorSingleOrder",
  async (req) => {
    try {
      const response = asyncGetVendorSingleOrder(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getVendorOrderList = createAsyncThunk(
  "getVendorOrderList",
  async (req) => {
    try {
      const response = asyncGetVendorOrderList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "chat/deleteOrder",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteOrder(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getOrderList(currentState.order.filterParams));
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

export const OrderProduct = createAsyncThunk(
  "chat/OrderProduct",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateOrder(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getOrderList(currentState.order.filterParams));
      // thunkAPI.dispatch(
      //   showToast({
      //     type: "success",
      //     msg: response.msg,
      //   })
      // );
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

export const updateStatus = createAsyncThunk(
  "chat/updateStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateOrderStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getOrderList(currentState.order.filterParams));
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

export const update = createAsyncThunk(
  "chat/updateOrder",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateOrder(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getOrderList(currentState.order.filterParams));
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

export const deleteBulkOrder = createAsyncThunk(
  "chat/deleteBulkOrder",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeleteOrder(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getOrderList(currentState.order.filterParams));
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
