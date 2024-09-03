import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPostList as asyncGetPostList,
  deletePost as asyncDeletePost,
  bulkDeletePost as asyncBulkDeletePost,
  updatePost as asyncUpdatePost,
  createPost as asyncCreatePost,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getPostList = createAsyncThunk("getPostList", async (req) => {
  try {
    const response = asyncGetPostList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const deletePost = createAsyncThunk(
  "chat/deletePost",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeletePost(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostList(currentState.post.filterParams));
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

export const createPost = createAsyncThunk(
  "chat/createPost",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreatePost(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostList(currentState.post.filterParams));
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

export const editPost = createAsyncThunk(
  "chat/editPost",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdatePost(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostList(currentState.post.filterParams));
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

export const deleteBulkPost = createAsyncThunk(
  "chat/deleteBulkPost",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeletePost(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getPostList(currentState.post.filterParams));
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
