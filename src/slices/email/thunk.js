import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmailList as asyncGetEmailList,
  deleteEmail as asyncDeleteEmail,
  bulkDeleteEmail as asyncBulkDeleteEmail,
  updateEmailTemplates as asyncUpdateEmailTemplates,
  createEmailTemplates as asyncCreateEmailTemplates,
  getTemplateVariableList as asyncGetTemplateVariableList,
  updateEmailStatus as asyncUpdateEmailStatus,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getEmailList = createAsyncThunk("getEmailList", async (req) => {
  try {
    const response = asyncGetEmailList(req);
    return response;
  } catch (error) {
    return error;
  }
});
export const getVariableList = createAsyncThunk(
  "getVariableList",
  async (req) => {
    try {
      const response = asyncGetTemplateVariableList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteEmail = createAsyncThunk(
  "chat/deleteEmail",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteEmail(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmailList(currentState.email.filterParams));
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

export const createEmail = createAsyncThunk(
  "chat/createEmail",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateEmailTemplates(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmailList(currentState.email.filterParams));
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

export const editEmail = createAsyncThunk(
  "chat/editEmail",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateEmailTemplates(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmailList(currentState.email.filterParams));
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

export const updateEmailStatus = createAsyncThunk(
  "chat/updateEmailStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateEmailStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmailList(currentState.email.filterParams));
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

export const deleteBulkEmail = createAsyncThunk(
  "chat/deleteBulkEmail",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeleteEmail(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmailList(currentState.email.filterParams));
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
