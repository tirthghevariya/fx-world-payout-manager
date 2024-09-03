import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  lessThan10 as asyncLessThan10,
  productOutOfStock as asyncProductOutOfStock,
  productStatus as asyncProductStatus,
  productRange as asyncProductRange,
  productDate as asyncProductDate,
  usersDate as asyncUsersDate,
  usersStatus as asyncUsersStatus,
  orderReport as asyncOrderReport,
  transactionList as asyncTransactionList,
  mostSoldProduct as asyncMostSoldProduct,
  revenueReport as asyncRevenueReport,
  lowStockProduct as asyncLowStockProduct,
  vendorCommissionReport as asyncVendorCommissionReport,
  updateVendorCommission as asyncUpdateVendorCommission,
  getCustomerFeedback as asyncGetCustomerFeedback,
  getAdminCommission as asyncGetAdminCommission,
  getVendorOrders as asyncGetVendorOrders,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getLessThan10ProductsList = createAsyncThunk(
  "lessThan10",
  async (req) => {
    try {
      const response = asyncLessThan10(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getCustomerFeedbackList = createAsyncThunk(
  "getCustomerFeedbackList",
  async (req) => {
    try {
      const response = asyncGetCustomerFeedback(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAdminCommission = createAsyncThunk(
  "getAdminCommission",
  async (req) => {
    try {
      const response = asyncGetAdminCommission(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getVendorOrders = createAsyncThunk(
  "getVendorOrders",
  async (req) => {
    try {
      const response = asyncGetVendorOrders(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getVendorCommission = createAsyncThunk(
  "getVendorCommission",
  async (req) => {
    try {
      const response = asyncVendorCommissionReport(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const editVendorCommission = createAsyncThunk(
  "editVendorCommission",
  async (req, thunkAPI) => {
    try {
      const response = asyncUpdateVendorCommission(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getVendorCommission(currentState.reports.filterParams));

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

export const getLowStockProduct = createAsyncThunk(
  "getLowStockProduct",
  async (req) => {
    try {
      const response = asyncLowStockProduct(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getRevenueReport = createAsyncThunk(
  "getRevenueReport",
  async (req) => {
    try {
      const response = asyncRevenueReport(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getMostSoldProduct = createAsyncThunk(
  "getMostSoldProduct",
  async (req) => {
    try {
      const response = asyncMostSoldProduct(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getOutOfStockProductsList = createAsyncThunk(
  "getOutOfStockProductsList",
  async (req) => {
    try {
      const response = asyncProductOutOfStock(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProductStatusList = createAsyncThunk(
  "getProductStatusList",
  async (req) => {
    try {
      const response = asyncProductStatus(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProductRangeList = createAsyncThunk(
  "getProductRangeList",
  async (req) => {
    try {
      const response = asyncProductRange(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProductDateList = createAsyncThunk(
  "getProductDateList",
  async (req) => {
    try {
      const response = asyncProductDate(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getUsersDateList = createAsyncThunk(
  "getUsersDateList",
  async (req) => {
    try {
      const response = asyncUsersDate(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getUserStatusList = createAsyncThunk(
  "getUserStatusList",
  async (req) => {
    try {
      const response = asyncUsersStatus(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const orderReportList = createAsyncThunk(
  "orderReportList",
  async (req) => {
    try {
      const response = asyncOrderReport(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const transactionList = createAsyncThunk(
  "transactionList",
  async (req) => {
    try {
      const response = asyncTransactionList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);
