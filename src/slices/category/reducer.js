import { createSlice } from "@reduxjs/toolkit";
import {
  getCategoryList,
  createCategory,
  updateCategories,
  getBackupList,
  updateCategoriesStatus,
  getCategoryPGList,
} from "./thunk";

export const initialState = {
  permissionList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    isCategory: 0,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertCategory: {
    formOpen: false,
    loading: false,
  },

  updateCategory: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleCategory: {},
    imageUploadResponse: [],
  },
  updateStatus: {},
  backup: [],
  getCategory: [],
  pgCategory: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertCategory = { ...state.insertCategory, ...action.payload };
    },
    updateCategoryStates: (state, action) => {
      state.updateCategory = { ...state.updateCategory, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.getCategory = action.payload;
    });
    builder.addCase(getCategoryPGList.fulfilled, (state, action) => {
      state.pgCategory = action.payload;
    });

    builder.addCase(createCategory.fulfilled, (state) => {
      state.insertCategory = { formOpen: false, loading: false };
    });

    builder.addCase(updateCategories.fulfilled, (state) => {
      state.updateCategory = { formOpen: false, loading: false };
    });

    builder.addCase(updateCategoriesStatus.fulfilled, (state, action) => {
      state.updateStatus = action.payload;
    });

    builder.addCase(getBackupList.fulfilled, (state, action) => {
      state.backup = action.payload;
    });
  },
});
export const { updateState, updateCategoryStates } = categorySlice.actions;

export default categorySlice.reducer;
