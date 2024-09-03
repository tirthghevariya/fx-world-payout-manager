import { createSlice } from "@reduxjs/toolkit";
import {
  getLessThan10ProductsList,
  getOutOfStockProductsList,
  getProductStatusList,
  getProductRangeList,
  getProductDateList,
  getUsersDateList,
  getUserStatusList,
  orderReportList,
  transactionList,
  getMostSoldProduct,
  getRevenueReport,
  getLowStockProduct,
  getVendorCommission,
  editVendorCommission,
  getCustomerFeedbackList,
  getAdminCommission,
  getVendorOrders,
} from "./thunk";
const moment = require("moment");

export const initialState = {
  filterParams: {
    status: "active",
    startDate: moment().subtract(15, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    minQuantity: 10,
    maxQuantity: 20,
  },

  orderFilterParams: {
    status: "Pending",
    startDate: moment().subtract(15, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    minAmount: 1,
    maxAmount: 100,
  },

  getProductStatus: [],
  getProductRange: [],
  getProductDate: [],
  getUsersDate: [],
  getUserStatus: [],
  getOrderReport: [],
  getProductsLessThan10: [],
  getTransactionList: [],
  outOfStockProducts: [],
  mostSoldProduct: [],
  revenueReport: [],
  lowStockProduct: [],
  vendorCommission: [],
  feedback: [],
  adminCommission: [],
  vendorOrders: [],

  updateVendorCommission: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleVendorCommission: {},
  },
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    updateVendorStates: (state, action) => {
      state.updateVendorCommission = {
        ...state.updateVendorCommission,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getLessThan10ProductsList.fulfilled, (state, action) => {
      state.getProductsLessThan10 = action.payload;
    });
    builder.addCase(getOutOfStockProductsList.fulfilled, (state, action) => {
      state.outOfStockProducts = action.payload;
    });
    builder.addCase(getProductStatusList.fulfilled, (state, action) => {
      state.getProductStatus = action.payload;
    });
    builder.addCase(getProductRangeList.fulfilled, (state, action) => {
      state.getProductRange = action.payload;
    });
    builder.addCase(getProductDateList.fulfilled, (state, action) => {
      state.getProductDate = action.payload;
    });
    builder.addCase(getUsersDateList.fulfilled, (state, action) => {
      state.getUsersDate = action.payload;
    });
    builder.addCase(getUserStatusList.fulfilled, (state, action) => {
      state.getUserStatus = action.payload;
    });
    builder.addCase(orderReportList.fulfilled, (state, action) => {
      state.getOrderReport = action.payload;
    });
    builder.addCase(transactionList.fulfilled, (state, action) => {
      state.getTransactionList = action.payload;
    });
    builder.addCase(getMostSoldProduct.fulfilled, (state, action) => {
      state.mostSoldProduct = action.payload;
    });
    builder.addCase(getRevenueReport.fulfilled, (state, action) => {
      state.revenueReport = action.payload;
    });
    builder.addCase(getLowStockProduct.fulfilled, (state, action) => {
      state.lowStockProduct = action.payload;
    });
    builder.addCase(getVendorCommission.fulfilled, (state, action) => {
      state.vendorCommission = action.payload;
    });
    builder.addCase(getCustomerFeedbackList.fulfilled, (state, action) => {
      state.feedback = action.payload;
    });
    builder.addCase(getAdminCommission.fulfilled, (state, action) => {
      state.adminCommission = action.payload;
    });
    builder.addCase(getVendorOrders.fulfilled, (state, action) => {
      state.vendorOrders = action.payload;
    });
    builder.addCase(editVendorCommission.fulfilled, (state) => {
      state.updateVendorCommission = { formOpen: false, loading: false };
    });
  },
});
export const { updateVendorStates } = reportsSlice.actions;
export default reportsSlice.reducer;
