import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  notificationList as asyncNotificationList,
  deleteNotification as asyncDeleteNotification,
  sendSMS as asyncSendSMS,
  bulkDeleteNotification as asyncBulkDeleteNotification,
  getNotificationCount as asyncGetNotificationCount,
  updateNotificationCount as asyncUpdateNotificationCount,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getNotificationList = createAsyncThunk(
  "getNotificationList",
  async (req) => {
    try {
      const response = asyncNotificationList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getNotificationCount = createAsyncThunk(
  "getNotificationCount",
  async (req) => {
    try {
      const response = asyncGetNotificationCount(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "chat/deleteNotification",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteNotification(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getNotificationList(currentState.notification.filterParams)
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

export const sendSms = createAsyncThunk(
  "chat/sendSms",
  async (req, thunkAPI) => {
    try {
      const response = await asyncSendSMS(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getNotificationList(currentState.notification.filterParams)
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

export const updateNotificationCount = createAsyncThunk(
  "chat/updateNotificationCount",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateNotificationCount(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getNotificationCount(currentState.notification.filterParams)
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

export const bulkDeleteNotification = createAsyncThunk(
  "chat/bulkDeleteNotification",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeleteNotification(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getNotificationList(currentState.notification.filterParams)
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
