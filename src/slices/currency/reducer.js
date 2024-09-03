import { createSlice } from "@reduxjs/toolkit";
import { getCurrencyList, createCurrency, editCurrency } from "./thunk";

export const initialState = {
  currencyList: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    search: "",
  },

  insertCurrency: {
    formOpen: false,
    loading: false,
  },

  updateCurrency: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleCurrency: {},
  },

  getPermissionList: [],
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertCurrency = { ...state.insertCurrency, ...action.payload };
    },
    updateCurrencyStates: (state, action) => {
      state.updateCurrency = { ...state.updateCurrency, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCurrencyList.fulfilled, (state, action) => {
      state.currencyList = action.payload;
    });

    builder.addCase(createCurrency.fulfilled, (state) => {
      state.insertCurrency = { formOpen: false, loading: false };
    });

    builder.addCase(editCurrency.fulfilled, (state) => {
      state.updateCurrency = { formOpen: false, loading: false };
    });
  },
});
export const { updateState, updateCurrencyStates } = currencySlice.actions;

export default currencySlice.reducer;
