import { createSlice } from "@reduxjs/toolkit";
import { getFeedbackList } from "./thunk";

export const initialState = {
  filterParams: {
    currentPage: 1,
    perPage: 20,
  },

  getFeedback: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFeedbackList.fulfilled, (state, action) => {
      state.getFeedback = action.payload;
    });
  },
});

export default feedbackSlice.reducer;
