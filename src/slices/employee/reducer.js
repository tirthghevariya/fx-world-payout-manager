import { createSlice } from "@reduxjs/toolkit";
import {
  getEmployeeList,
  createEmployee,
  updateEmployeeStatus,
  updateEmployee,
} from "./thunk";

export const initialState = {
  employeeList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertEmployee: {
    formOpen: false,
    loading: false,
  },

  editEmployee: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleEmployee: {},
  },

  updateStatus: {
    loading: false,
    formOpen: false,
    singleEmployee: {},
  },
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertEmployee = { ...state.insertEmployee, ...action.payload };
    },
    updateEmployeeStates: (state, action) => {
      state.editEmployee = { ...state.editEmployee, ...action.payload };
    },
    updateStatusStates: (state, action) => {
      state.updateStatus = { ...state.updateStatus, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getEmployeeList.fulfilled, (state, action) => {
      state.employeeList = action.payload;
    });

    builder.addCase(createEmployee.fulfilled, (state) => {
      state.insertEmployee = { formOpen: false, loading: false };
    });

    builder.addCase(updateEmployeeStatus.fulfilled, (state) => {
      state.updateStatus = { formOpen: false, loading: false };
    });

    builder.addCase(updateEmployee.fulfilled, (state) => {
      state.editEmployee = { formOpen: false, loading: false };
    });
  },
});

export const { updateState, updateEmployeeStates, updateStatusStates } =
  employeeSlice.actions;

export default employeeSlice.reducer;
