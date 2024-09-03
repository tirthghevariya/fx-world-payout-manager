import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  employeeList as asyncEmployeeList,
  deleteEmployee as asyncDeleteEmployee,
  updateEmployee as asyncUpdateEmployee,
  createEmployee as asyncCreateEmployee,
  deleteBulkEmployee as asyncDeleteBulkEmployee,
  updateEmployeeStatus as asyncUpdateEmployeeStatus,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getEmployeeList = createAsyncThunk(
  "getEmployeeList",
  async (req) => {
    try {
      const response = asyncEmployeeList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "chat/deleteEmployee",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteEmployee(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmployeeList(currentState.employee.filterParams));
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

export const updateEmployee = createAsyncThunk(
  "chat/updateEmployee",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateEmployee(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmployeeList(currentState.employee.filterParams));
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

export const updateEmployeeStatus = createAsyncThunk(
  "chat/updateEmployeeStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateEmployeeStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmployeeList(currentState.employee.filterParams));
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

export const createEmployee = createAsyncThunk(
  "chat/createEmployee",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateEmployee(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmployeeList(currentState.employee.filterParams));
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

export const deletebulkEmployee = createAsyncThunk(
  "deletebulkEmployee",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkEmployee(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getEmployeeList(currentState.employee.filterParams));
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
