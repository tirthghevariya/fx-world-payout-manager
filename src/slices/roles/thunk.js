import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRolesList as asyncGetRolesList,
  deleteRole as asyncDeleteRole,
  updateRole as asyncUpdateRole,
  createRole as asyncCreateRole,
  deleteBulkRole as asyncDeleteBulkRole,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getRoleList = createAsyncThunk("getRolesList", async (req) => {
  try {
    const response = asyncGetRolesList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteRole = createAsyncThunk(
  "chat/deleteRole",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteRole(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getRoleList(currentState.role.filterParams));
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

export const updateRoles = createAsyncThunk(
  "chat/updateRoles",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateRole(req);
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

export const createRoles = createAsyncThunk(
  "chat/createRole",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateRole(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getRoleList(currentState.role.filterParams));
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

export const deletebulkRoles = createAsyncThunk(
  "chat/createRole",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkRole(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getRoleList(currentState.role.filterParams));
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
