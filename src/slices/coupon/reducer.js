import { createSlice } from "@reduxjs/toolkit";
import { getCouponList, createCoupon, editCoupon, applyCoupon } from "./thunk";

export const initialState = {
  couponList: [],
  checkCoupon: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertCoupon: {
    formOpen: false,
    loading: false,
  },

  updateCoupon: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleCoupon: {},
  },

  getPermissionList: [],
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertCoupon = { ...state.insertCoupon, ...action.payload };
    },
    updateCouponStates: (state, action) => {
      state.updateCoupon = { ...state.updateCoupon, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCouponList.fulfilled, (state, action) => {
      state.couponList = action.payload;
    });

    builder.addCase(applyCoupon.fulfilled, (state, action) => {
      state.checkCoupon = action.payload;
    });
    builder.addCase(applyCoupon.rejected, (state) => {
      state.checkCoupon = "Invalid coupon code or expired";
    });

    builder.addCase(createCoupon.fulfilled, (state) => {
      state.insertCoupon = { formOpen: false, loading: false };
    });

    builder.addCase(editCoupon.fulfilled, (state) => {
      state.updateCoupon = { formOpen: false, loading: false };
    });
  },
});
export const { updateState, updateCouponStates } = couponSlice.actions;

export default couponSlice.reducer;
