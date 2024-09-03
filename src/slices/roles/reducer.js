import { createSlice } from "@reduxjs/toolkit";
import { getRoleList, updateRoles, createRoles } from "./thunk";

export const initialState = {
  getRolesList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertRole: {
    formOpen: false,
    loading: false,
  },

  updateRole: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleRole: {},
  },

  getPermissionList: [],

  getSingleTopic: [],
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertRole = { ...state.insertRole, ...action.payload };
    },

    updateRoleStates: (state, action) => {
      state.updateRole = { ...state.updateRole, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getRoleList.fulfilled, (state, action) => {
      state.getRolesList = action.payload;
    });

    builder.addCase(createRoles.fulfilled, (state) => {
      state.insertRole = { formOpen: false, loading: false };
    });

    builder.addCase(updateRoles.fulfilled, (state) => {
      state.updateRole = { formOpen: false, loading: false };
    });
  },
});

export const { updateState, updateRoleStates } = roleSlice.actions;

export default roleSlice.reducer;
