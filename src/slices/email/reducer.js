import { createSlice } from "@reduxjs/toolkit";
import { getEmailList, editEmail, createEmail, getVariableList } from "./thunk";

export const initialState = {
  emailList: [],
  variableList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    type: "",
  },

  insertEmail: {
    loading: false,
  },

  updateEmail: {
    loading: false,
    isEdit: false,
    singleEmail: {},
  },
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertEmail = {
        ...state.insertEmail,
        ...action.payload,
      };
    },
    updateEmailStates: (state, action) => {
      state.updateEmail = {
        ...state.updateEmail,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getEmailList.fulfilled, (state, action) => {
      state.emailList = action.payload;
    });

    builder.addCase(getVariableList.fulfilled, (state, action) => {
      state.variableList = action.payload;
    });

    builder.addCase(createEmail.fulfilled, (state) => {
      state.insertEmail = { loading: false };
    });
    builder.addCase(editEmail.fulfilled, (state) => {
      state.updateEmail = { loading: false };
    });
  },
});

export const { updateState, updateEmailStates } = emailSlice.actions;

export default emailSlice.reducer;
