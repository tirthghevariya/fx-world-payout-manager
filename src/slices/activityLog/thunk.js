import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLogList as asyncGetLogList,
  deleteActivityLog as asyncDeleteActivityLog,
  bulkDeleteActivityLog as asyncBulkDeleteActivityLog,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getLogList = createAsyncThunk("getLogList", async (req) => {
  try {
    const response = asyncGetLogList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteActivityLog = createAsyncThunk(
  "chat/deleteActivityLog",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteActivityLog(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getLogList(currentState.activityLog.filterParams));
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

// export const createEmail = createAsyncThunk(
//   "chat/createEmail",
//   async (req, thunkAPI) => {
//     try {
//       const response = await asyncCreateEmailTemplates(req);
//       const currentState = thunkAPI.getState();
//       thunkAPI.dispatch(getEmailList(currentState.email.filterParams));
//       thunkAPI.dispatch(
//         showToast({
//           type: "success",
//           msg: response.msg,
//         })
//       );
//       return response;
//     } catch (error) {
//       const errorMsg = error.msg || "Something went wrong";
//       thunkAPI.dispatch(
//         showToast({
//           type: "error",
//           msg: errorMsg,
//         })
//       );
//       return error;
//     }
//   }
// );

export const deleteBulkActivityLog = createAsyncThunk(
  "chat/deleteBulkActivityLog",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeleteActivityLog(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getLogList(currentState.activityLog.filterParams));
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
