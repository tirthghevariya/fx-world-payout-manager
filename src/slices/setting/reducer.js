import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSettingList,
  updateSingleSetting,
  createSetting,
  getSettingKeyValueList,
} from "./thunk";

export const initialState = {
  settingList: [],
  settingKeyValue: [],
  filterParams: {
    currentPage: 1,
    perPage: 20,
    // search: "",
    // orderBy: "permissionId",
    // order: "desc",
  },

  insertSetting: {
    formOpen: false,
    loading: false,
  },

  updateSetting: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleSetting: {},
  },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertSetting = { ...state.insertSetting, ...action.payload };
    },
    updateSettingStates: (state, action) => {
      state.updateSetting = { ...state.updateSetting, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllSettingList.fulfilled, (state, action) => {
      state.settingList = action.payload;
    });
    builder.addCase(createSetting.fulfilled, (state) => {
      state.insertSetting = { formOpen: false, loading: false };
    });
    builder.addCase(updateSingleSetting.fulfilled, (state) => {
      state.updateSetting = { formOpen: false, loading: false };
    });
    builder.addCase(getSettingKeyValueList.fulfilled, (state, action) => {
      state.settingKeyValue = action.payload;
    });
  },
});

export const { updateState, updateSettingStates } = settingSlice.actions;

export default settingSlice.reducer;
