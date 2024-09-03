import { createSlice } from "@reduxjs/toolkit";
import {
  getPermissionsList,
  createPermission,
  updatePermissions,
  permissionsList,
} from "./thunk";

export const initialState = {
  permissionList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertPermission: {
    formOpen: false,
    loading: false,
  },

  updatePermission: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singlePermission: {},
  },

  getPermissionList: [],
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertPermission = { ...state.insertPermission, ...action.payload };
    },
    updatePermissionStates: (state, action) => {
      state.updatePermission = { ...state.updatePermission, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPermissionsList.fulfilled, (state, action) => {
      state.permissionList = action.payload;
    });

    builder.addCase(permissionsList.fulfilled, (state, action) => {
      state.getPermissionList = action.payload;
    });

    builder.addCase(createPermission.fulfilled, (state) => {
      state.insertPermission = { formOpen: false, loading: false };
    });

    builder.addCase(updatePermissions.fulfilled, (state) => {
      state.updatePermission = { formOpen: false, loading: false };
    });
  },
});
export const { updateState, updatePermissionStates } = permissionSlice.actions;

export default permissionSlice.reducer;
