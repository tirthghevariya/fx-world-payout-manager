import { createSlice } from "@reduxjs/toolkit";
import {
  getPaymentGatewayList,
  createPaymentGateway,
  editPaymentGateway,
} from "./thunk";

export const initialState = {
  paymentGatewayList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  createPayment: {
    formOpen: false,
    loading: false,
  },
  updatePaymentGateway: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singlePaymentGateway: {},
  },
};

const paymentGatewaySlice = createSlice({
  name: "paymentGateway",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.createPayment = { ...state.createPayment, ...action.payload };
    },
    updatePaymentGatewayStates: (state, action) => {
      state.updatePaymentGateway = {
        ...state.updatePaymentGateway,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPaymentGatewayList.fulfilled, (state, action) => {
      state.paymentGatewayList = action.payload;
    });
    builder.addCase(createPaymentGateway.fulfilled, (state) => {
      state.createPayment = { formOpen: false, loading: false };
    });
    builder.addCase(editPaymentGateway.fulfilled, (state) => {
      state.updatePaymentGateway = { formOpen: false, loading: false };
    });
  },
});

export const { updateState, updatePaymentGatewayStates } =
  paymentGatewaySlice.actions;

export default paymentGatewaySlice.reducer;
