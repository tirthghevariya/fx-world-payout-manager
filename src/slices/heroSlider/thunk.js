import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHeroSliderList as asyncGetHeroSliderList,
  createHeroSlider as asyncCreateHeroSlider,
  updateHeroSlider as asyncUpdateHeroSlider,
  deleteHeroSlider as asyncDeleteHeroSlider,
  deleteBulkHeroSlider as asyncDeleteBulkHeroSlider,
} from "../../helpers/apis";

import { showToast } from "../toast/reducer";

export const getHeroSliderList = createAsyncThunk(
  "getHeroSliderList",
  async (req) => {
    try {
      const response = asyncGetHeroSliderList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteHeroSlider = createAsyncThunk(
  "chat/deleteHeroSlider",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteHeroSlider(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getHeroSliderList(currentState.heroSlider.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      throw error;
    }
  }
);

export const createHeroSlider = createAsyncThunk(
  "chat/createHeroSlider",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateHeroSlider(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getHeroSliderList(currentState.heroSlider.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      return error;
    }
  }
);

export const editHeroBanner = createAsyncThunk(
  "editHeroBanner",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateHeroSlider(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getHeroSliderList(currentState.heroSlider.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      return error;
    }
  }
);

export const deletebulkHeroSlider = createAsyncThunk(
  "deletebulkHeroSlider",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkHeroSlider(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(
        getHeroSliderList(currentState.heroSlider.filterParams)
      );
      thunkAPI.dispatch(
        showToast({
          type: "success",
          msg: response.msg,
        })
      );
      return response;
    } catch (error) {
      const errorMsg = error.msg || "Something went wrong";
      thunkAPI.dispatch(
        showToast({
          type: "error",
          msg: errorMsg,
        })
      );
      return error;
    }
  }
);
