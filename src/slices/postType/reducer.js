import { createSlice } from "@reduxjs/toolkit";
import { getPostTypeList, createPostType, editPostType } from "./thunk";

export const initialState = {
  postTypeList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertPostType: {
    formOpen: false,
    loading: false,
  },

  updatePostType: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singlePostType: {},
  },
};

const postTypeSlice = createSlice({
  name: "postType",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertPostType = { ...state.insertPostType, ...action.payload };
    },
    updatePostTypeStates: (state, action) => {
      state.updatePostType = { ...state.updatePostType, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPostTypeList.fulfilled, (state, action) => {
      state.postTypeList = action.payload;
    });
    builder.addCase(createPostType.fulfilled, (state) => {
      state.insertPostType = { formOpen: false, loading: false };
    });

    builder.addCase(editPostType.fulfilled, (state) => {
      state.updatePostType = { formOpen: false, loading: false };
    });
  },
});
export const { updateState, updatePostTypeStates } = postTypeSlice.actions;

export default postTypeSlice.reducer;
