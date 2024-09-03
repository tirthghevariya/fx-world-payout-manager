import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductList as asyncGetProductList,
  deleteProduct as asyncDeleteProduct,
  updateProduct as asyncUpdateProduct,
  createProduct as asyncCreateProduct,
  getProductKeysList as asyncGetProductKeysList,
  bulkImport as asyncBulkImport,
  updateProductStatus as asyncUpdateProductStatus,
  bulkDeleteProduct as asyncBulkDeleteProduct,
  getEnquiryList as asyncGetEnquiryList,
  getProductEnquiryList as asyncGetProductEnquiryList,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getProductList = createAsyncThunk(
  "getProductList",
  async (req) => {
    try {
      const response = asyncGetProductList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getEnquiryProduct = createAsyncThunk(
  "getEnquiryProduct",
  async (req) => {
    try {
      const response = asyncGetEnquiryList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProductEnquiry = createAsyncThunk(
  "getProductEnquiry",
  async (req) => {
    try {
      const response = asyncGetProductEnquiryList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProductKeysList = createAsyncThunk(
  "getProductKeysList",
  async (req) => {
    try {
      const response = asyncGetProductKeysList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "chat/deleteProduct",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteProduct(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getProductList(currentState.product.filterParams));
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

export const createProduct = createAsyncThunk(
  "chat/createProduct",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateProduct(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getProductList(currentState.product.filterParams));
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

export const bulkFileImport = createAsyncThunk(
  "chat/bulkFileImport",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkImport(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getProductList(currentState.product.filterParams));

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

export const updateProducts = createAsyncThunk(
  "chat/updateProduct",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateProduct(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getProductList(currentState.product.filterParams));
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

export const updateProductStatus = createAsyncThunk(
  "chat/updateProductStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateProductStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getProductList(currentState.product.filterParams));
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

export const bulkDeleteProduct = createAsyncThunk(
  "chat/bulkDeleteProduct",
  async (req, thunkAPI) => {
    try {
      const response = await asyncBulkDeleteProduct(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getProductList(currentState.product.filterParams));
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
