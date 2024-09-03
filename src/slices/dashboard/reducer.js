import { createSlice } from "@reduxjs/toolkit";
import { getDashboardCount } from "./thunk";

export const initialState = {
  dashboardCount: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getDashboardCount.fulfilled, (state, action) => {
      state.dashboardCount = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
