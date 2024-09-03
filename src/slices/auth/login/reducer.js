import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  loading: false,
  isUserLogout: false,
  errorMsg: "",
  error: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state) {
      state.loading = false;
      state.error = true;
      state.isUserLogout = false;
      state.errorMsg = "Username & password is wrong";
    },
    enableLoading(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    },
    logoutUserSuccess(state) {
      state.isUserLogout = true;
    },
  },
});

export const { apiError, loginSuccess, logoutUserSuccess, enableLoading } =
  loginSlice.actions;

export default loginSlice.reducer;
