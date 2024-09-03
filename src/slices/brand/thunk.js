import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBrandList as asyncGetBrandList,
  createBrand as asyncCreateBrand,
  updateBrand as asyncUpdateBrand,
  deleteBrand as asyncDeleteBrand,
  deleteBulkBrand as asyncDeleteBulkBrand,
  updateBrandStatus as asyncUpdateBrandStatus,
} from "../../helpers/apis";
import { showToast } from "../toast/reducer";

export const getBrandsList = createAsyncThunk("getBrandsList", async (req) => {
  try {
    const response = asyncGetBrandList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteBrand = createAsyncThunk(
  "chat/deleteBrand",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBrand(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getBrandsList(currentState.brand.filterParams));
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

export const createBrand = createAsyncThunk(
  "chat/createBrand",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateBrand(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getBrandsList(currentState.brand.filterParams));
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

export const editBrand = createAsyncThunk(
  "chat/editBrand",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateBrand(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getBrandsList(currentState.brand.filterParams));
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

export const updateBrandStatus = createAsyncThunk(
  "chat/updateBrandStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateBrandStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getBrandsList(currentState.brand.filterParams));
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

// export const updateProductStatus = createAsyncThunk(
//   "chat/updateProductStatus",
//   async (req, thunkAPI) => {
//     try {
//       const response = await asyncUpdateProductStatus(req);
//       const currentState = thunkAPI.getState();
//       thunkAPI.dispatch(getProductList(currentState.product.filterParams));
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

export const bulkDeleteBrand = createAsyncThunk(
  "chat/bulkDeleteBrand",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkBrand(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getBrandsList(currentState.brand.filterParams));
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
