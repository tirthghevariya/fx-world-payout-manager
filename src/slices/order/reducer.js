import { createSlice } from "@reduxjs/toolkit";
import {
  getOrderList,
  OrderProduct,
  updateStatus,
  update,
  getVendorOrderList,
  getVendorSingleOrder,
} from "./thunk";

export const initialState = {
  orderList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  billingDetail: {
    formOpen: false,
    loading: false,
    detail: {},
  },

  shipingDetail: {
    formOpen: false,
    loading: false,
    detail: {},
  },

  createOrder: {
    formOpen: false,
    loading: false,
  },

  updateOrder: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleOrder: {},
  },

  addProduct: {
    formOpen: false,
    loading: false,
    productDetail: [],
  },

  orderStatus: {},
  getOrderList: [],
  vendorOrderList: [],
  vendorSingleOrderList: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.createOrder = { ...state.createOrder, ...action.payload };
    },
    updateOrderStates: (state, action) => {
      state.updateOrder = { ...state.updateOrder, ...action.payload };
    },
    updateShipingStates: (state, action) => {
      state.shipingDetail = { ...state.shipingDetail, ...action.payload };
    },
    updateBilingStates: (state, action) => {
      state.billingDetail = { ...state.billingDetail, ...action.payload };
    },
    updateProductStates: (state, action) => {
      state.addProduct = { ...state.addProduct, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.orderList = action.payload;
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.orderStatus = action.payload;
    });

    builder.addCase(update.fulfilled, (state, action) => {
      state.updateOrder = action.payload;
    });
    builder.addCase(getVendorOrderList.fulfilled, (state, action) => {
      state.vendorOrderList = action.payload;
    });
    builder.addCase(getVendorSingleOrder.fulfilled, (state, action) => {
      state.vendorSingleOrderList = action.payload;
    });

    builder.addCase(OrderProduct.fulfilled, () => {});
  },
});
export const {
  updateState,
  updateOrderStates,
  updateShipingStates,
  updateBilingStates,
  updateProductStates,
} = orderSlice.actions;

export default orderSlice.reducer;
