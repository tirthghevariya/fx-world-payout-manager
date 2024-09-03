import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoryList as asyncGetCategoryList,
  createCategory as asyncCreateCategory,
  updateCategory as asyncUpdateCategory,
  deleteCategory as asyncDeleteCategory,
  getBackup as asyncGetBackup,
  updateCategoryStatus as asyncUpdateCategoryStatus,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getCategoryList = createAsyncThunk(
  "getCategoryList",
  async (req) => {
    try {
      const response = asyncGetCategoryList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getCategoryPGList = createAsyncThunk(
  "getCategoryPGList",
  async (req) => {
    try {
      const response = asyncGetCategoryList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getBackupList = createAsyncThunk("getBackupList", async (req) => {
  try {
    const response = asyncGetBackup(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteCategory = createAsyncThunk(
  "chat/deleteCategory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteCategory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCategoryList(currentState.category.filterParams));
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

export const createCategory = createAsyncThunk(
  "chat/createCategory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateCategory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCategoryList(currentState.category.filterParams));
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

export const updateCategories = createAsyncThunk(
  "chat/updateCategories",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateCategory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCategoryList(currentState.category.filterParams));
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

export const updateCategoriesStatus = createAsyncThunk(
  "chat/updateCategoriesStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateCategoryStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getCategoryList(currentState.category.filterParams));
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
