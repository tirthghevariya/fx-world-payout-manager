import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSettingList as asyncGetSettingList,
  deleteSetting as asyncDeleteSetting,
  updateSetting as asyncUpdateSetting,
  creatSetting as asyncCreatSetting,
  bulkUpdateSetting as asyncBulkUpdateSetting,
  getSettingKeyValueList as asyncGetSettingKeyValueList,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getAllSettingList = createAsyncThunk(
  "getAllSettingList",
  async (req) => {
    try {
      const response = asyncGetSettingList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getSettingKeyValueList = createAsyncThunk(
  "getSettingKeyValueList",
  async (req) => {
    try {
      const response = asyncGetSettingKeyValueList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteSetting = createAsyncThunk(
  "chat/deleteSetting",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteSetting(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getAllSettingList(currentState.setting.filterParams));
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

export const createSetting = createAsyncThunk(
  "chat/createSetting",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreatSetting(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getAllSettingList(currentState.setting.filterParams));
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

export const updateSingleSetting = createAsyncThunk(
  "chat/updateSingleSetting",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateSetting(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getAllSettingList(currentState.setting.filterParams));
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

export const updateBulkSetting = createAsyncThunk(
  "chat/updateBulkSetting",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkUpdateSetting(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getAllSettingList(currentState.setting.filterParams));
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
