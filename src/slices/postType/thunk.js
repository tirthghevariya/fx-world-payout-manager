import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPostTypeList as asyncGetPostTypeList,
  deletePostType as asyncDeletePostType,
  bulkDeletePostType as asyncBulkDeletePostType,
  updatePostType as asyncUpdatePostType,
  createPostType as asyncCreatePostType,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getPostTypeList = createAsyncThunk(
  "getPostTypeList",
  async (req) => {
    try {
      const response = asyncGetPostTypeList(req);

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deletePostType = createAsyncThunk(
  "chat/deletePostType",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeletePostType(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostTypeList(currentState.postType.filterParams));
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

export const createPostType = createAsyncThunk(
  "chat/createPostType",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreatePostType(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostTypeList(currentState.postType.filterParams));
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

export const editPostType = createAsyncThunk(
  "chat/editPostType",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdatePostType(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostTypeList(currentState.postType.filterParams));
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

export const deleteBulkPostType = createAsyncThunk(
  "chat/deleteBulkPostType",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeletePostType(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostTypeList(currentState.postType.filterParams));
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
