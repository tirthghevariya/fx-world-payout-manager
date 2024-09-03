import { createSlice } from "@reduxjs/toolkit";
import { getPostList, createPost, editPost } from "./thunk";

export const initialState = {
  postList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertPost: {
    loading: false,
  },

  updatePost: {
    loading: false,
    isEdit: false,
    singlePost: {},
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertPost = {
        ...state.insertPost,
        ...action.payload,
      };
    },
    updatePostStates: (state, action) => {
      state.updatePost = {
        ...state.updatePost,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPostList.fulfilled, (state, action) => {
      state.postList = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.insertPost = { loading: false };
    });
    builder.addCase(editPost.fulfilled, (state) => {
      state.updatePost = { loading: false };
    });
  },
});

export const { updateState, updatePostStates } = postSlice.actions;

export default postSlice.reducer;
