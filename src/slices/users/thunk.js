import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsersList as asyncGetUsersList,
  createUser as asyncCreateUser,
  updateUser as asyncUpdateUser,
  deleteUser as asyncDeleteUser,
  updateUserStatus as asyncUpdateUserStatus,
  registerVsActive as asyncRegisterVsActive,
  bulkDeleteUser as asyncBulkDeleteUser,
  last15DaysOrder as asyncLast15DaysOrder,
  getVendorList as asyncGetVendorList,
  topPerformingReport as asyncTopPerformingReport,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getUserList = createAsyncThunk("getUserList", async (req) => {
  try {
    const response = asyncGetUsersList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const getTopPerformingVendor = createAsyncThunk(
  "getTopPerformingVendor",
  async (req) => {
    try {
      const response = asyncTopPerformingReport(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getVendorList = createAsyncThunk("getVendorList", async (req) => {
  try {
    const response = asyncGetVendorList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const registerVsActiveUser = createAsyncThunk(
  "registerVsActiveUser",
  async (req) => {
    try {
      const response = asyncRegisterVsActive(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const last15DaysOrder = createAsyncThunk(
  "last15DaysOrder",
  async (req) => {
    try {
      const response = asyncLast15DaysOrder(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const createUser = createAsyncThunk(
  "chat/createUser",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateUser(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getUserList(currentState.user.filterParams));
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

export const updateUsers = createAsyncThunk(
  "chat/updateUser",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateUser(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getUserList(currentState.user.filterParams));
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

export const updateUserStatus = createAsyncThunk(
  "chat/updateUserStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateUserStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getUserList(currentState.user.filterParams));
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.message,
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

export const deleteUser = createAsyncThunk(
  "chat/deleteUser",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteUser(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getUserList(currentState.user.filterParams));
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

export const bulkDeleteUser = createAsyncThunk(
  "chat/bulkDeleteUser",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeleteUser(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getUserList(currentState.user.filterParams));
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
