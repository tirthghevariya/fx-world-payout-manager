import { createSlice } from "@reduxjs/toolkit";
import {
  getProductList,
  updateProducts,
  createProduct,
  getProductKeysList,
  bulkFileImport,
  updateProductStatus,
  getEnquiryProduct,
  getProductEnquiry,
} from "./thunk";

export const initialState = {
  filterParams: {
    currentPage: 1,
    perPage: 20,
    isEnquiry: false,
  },

  insertProduct: {
    formOpen: false,
    loading: false,
  },

  bulkImport: {
    formOpen: false,
    loading: false,
    csvFile: [],
  },

  updateProduct: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleProduct: {},
    imageUploadResponse: [],
  },

  updateStatus: {},
  getProduct: [],
  getProductsKeysList: [],
  enquiryProduct: [],
  productEnquiry: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertProduct = { ...state.insertProduct, ...action.payload };
    },
    updateProductStates: (state, action) => {
      state.updateProduct = { ...state.updateProduct, ...action.payload };
    },
    updateBulkImportState: (state, action) => {
      state.bulkImport = { ...state.bulkImport, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.getProduct = action.payload;
    });
    builder.addCase(getProductKeysList.fulfilled, (state, action) => {
      state.getProductsKeysList = action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.insertProduct = { formOpen: false, loading: false };
    });
    builder.addCase(updateProducts.fulfilled, (state) => {
      state.updateProduct = { formOpen: false, loading: false };
    });
    builder.addCase(bulkFileImport.fulfilled, (state) => {
      state.bulkImport = { formOpen: false, loading: false };
    });
    builder.addCase(updateProductStatus.fulfilled, (state, action) => {
      state.updateStatus = action.payload;
    });
    builder.addCase(getEnquiryProduct.fulfilled, (state, action) => {
      state.enquiryProduct = action.payload;
    });
    builder.addCase(getProductEnquiry.fulfilled, (state, action) => {
      state.productEnquiry = action.payload;
    });
  },
});
export const { updateState, updateProductStates, updateBulkImportState } =
  productSlice.actions;

export default productSlice.reducer;
