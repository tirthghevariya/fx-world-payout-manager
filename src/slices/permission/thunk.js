import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPermission as asyncGetPermission,
  createPermission as asyncCreatePermission,
  updatePermission as asyncUpdatePermission,
  permissionList as asyncPermissionList,
  deletePermission as asyncDeletePermission,
  deleteBulkPermission as asyncDeleteBulkPermission,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getPermissionsList = createAsyncThunk(
  "getPermission",
  async (req) => {
    try {
      const response = asyncGetPermission(req);

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const permissionsList = createAsyncThunk(
  "permissionsList",
  async (req) => {
    try {
      const response = asyncPermissionList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deletePermission = createAsyncThunk(
  "chat/deletePermission",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeletePermission(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(permissionsList(currentState.permission.filterParams));
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

export const createPermission = createAsyncThunk(
  "chat/createPermission",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreatePermission(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(permissionsList(currentState.permission.filterParams));
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

export const updatePermissions = createAsyncThunk(
  "chat/updatePermission",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdatePermission(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(permissionsList(currentState.permission.filterParams));
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

export const deleteBulkPermission = createAsyncThunk(
  "chat/deleteBulkPermission",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkPermission(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(permissionsList(currentState.permission.filterParams));
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
