import { createSlice } from "@reduxjs/toolkit";
import {
  getPostCategoryList,
  createPostCategory,
  editPostCategory,
} from "./thunk";

export const initialState = {
  postCategoryList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertPostCategory: {
    formOpen: false,
    loading: false,
  },

  updatePostCategory: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singlePostCategory: {},
  },
};

const postCategorySlice = createSlice({
  name: "postCategory",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertPostCategory = {
        ...state.insertPostCategory,
        ...action.payload,
      };
    },
    updatePostCategoryStates: (state, action) => {
      state.updatePostCategory = {
        ...state.updatePostCategory,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPostCategoryList.fulfilled, (state, action) => {
      state.postCategoryList = action.payload;
    });
    builder.addCase(createPostCategory.fulfilled, (state) => {
      state.insertPostCategory = { formOpen: false, loading: false };
    });
    builder.addCase(editPostCategory.fulfilled, (state) => {
      state.updatePostCategory = { formOpen: false, loading: false };
    });
  },
});

export const { updateState, updatePostCategoryStates } =
  postCategorySlice.actions;

export default postCategorySlice.reducer;
