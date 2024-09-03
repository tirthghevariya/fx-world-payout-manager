import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPostCategoryList as asyncGetPostCategoryList,
  deletePostCategory as asyncDeletePostCategory,
  bulkDeletePostCategory as asyncBulkDeletePostCategory,
  updatePostCategory as asyncUpdatePostCategory,
  createPostCategory as asyncCreatePostCategory,
  updatePostCategoryStatus as asyncUpdatePostCategoryStatus,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getPostCategoryList = createAsyncThunk(
  "getPostCategoryList",
  async (req) => {
    try {
      const response = asyncGetPostCategoryList(req);

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deletePostCategory = createAsyncThunk(
  "chat/deletePostCategory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeletePostCategory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPostCategoryList(currentState.postCategory.filterParams)
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

export const createPostCategory = createAsyncThunk(
  "chat/createPostCategory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreatePostCategory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPostCategoryList(currentState.postCategory.filterParams)
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

export const editPostCategory = createAsyncThunk(
  "chat/editPostCategory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdatePostCategory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPostCategoryList(currentState.postCategory.filterParams)
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

export const updatePostCategoryStatus = createAsyncThunk(
  "chat/updatePostCategoryStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdatePostCategoryStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPostCategoryList(currentState.postCategory.filterParams)
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

export const deleteBulkPostCategory = createAsyncThunk(
  "chat/deleteBulkPostCategory",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeletePostCategory(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getPostCategoryList(currentState.postCategory.filterParams)
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
