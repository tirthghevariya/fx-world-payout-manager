import { createSlice } from "@reduxjs/toolkit";
import { getBrandsList, createBrand, editBrand } from "./thunk";

export const initialState = {
  filterParams: {
    currentPage: 1,
    perPage: 20,
  },

  insertBrand: {
    formOpen: false,
    loading: false,
  },

  updateBrand: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleBrand: {},
    imageUploadResponse: "",
  },
  getBrands: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertBrand = { ...state.insertBrand, ...action.payload };
    },
    updateBrandStates: (state, action) => {
      state.updateBrand = { ...state.updateBrand, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createBrand.fulfilled, (state) => {
      state.insertBrand = { formOpen: false, loading: false };
    });
    builder.addCase(editBrand.fulfilled, (state) => {
      state.updateBrand = { formOpen: false, loading: false };
    });
    builder.addCase(getBrandsList.fulfilled, (state, action) => {
      state.getBrands = action.payload;
    });
  },
});
export const { updateState, updateBrandStates } = brandSlice.actions;

export default brandSlice.reducer;
