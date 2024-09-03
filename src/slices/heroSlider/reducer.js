import { createSlice } from "@reduxjs/toolkit";
import { getHeroSliderList, createHeroSlider, editHeroBanner } from "./thunk";

export const initialState = {
  sliderList: [],
  checkHeroSlider: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    search: "",
  },

  insertHeroSlider: {
    formOpen: false,
    loading: false,
  },

  updateHeroSlider: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleHeroSlider: {},
    imageUploadResponse: [],
  },

  getPermissionList: [],
};

const heroSlice = createSlice({
  name: "heroSlider",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertHeroSlider = { ...state.insertHeroSlider, ...action.payload };
    },
    updateHeroSliderStates: (state, action) => {
      state.updateHeroSlider = { ...state.updateHeroSlider, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getHeroSliderList.fulfilled, (state, action) => {
      state.sliderList = action.payload;
    });

    // builder.addCase(applyHeroSlider.fulfilled, (state, action) => {
    //   state.checkHeroSlider = action.payload;
    // });
    // builder.addCase(applyHeroSlider.rejected, (state) => {
    //   state.checkHeroSlider = "Invalid coupon code or expired";
    // });

    builder.addCase(createHeroSlider.fulfilled, (state) => {
      state.insertHeroSlider = { formOpen: false, loading: false };
    });

    builder.addCase(editHeroBanner.fulfilled, (state) => {
      state.updateHeroSlider = { formOpen: false, loading: false };
    });
  },
});
export const { updateState, updateHeroSliderStates } = heroSlice.actions;

export default heroSlice.reducer;
