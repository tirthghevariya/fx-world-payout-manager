import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFeedbackList as asyncGetFeedbackList,
  deleteFeedback as asyncDeleteFeedback,
  deleteBulkContact as asyncDeleteBulkContact,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getFeedbackList = createAsyncThunk(
  "getFeedbackList",
  async (req) => {
    try {
      const response = asyncGetFeedbackList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "chat/deleteFeedback",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteFeedback(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getFeedbackList(currentState.feedback.filterParams));
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

export const bulkDeleteContact = createAsyncThunk(
  "bulkDeleteContact",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkContact(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getFeedbackList(currentState.feedback.filterParams));
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
