import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardCount as asyncDashboardCount } from "../../helpers/apis";

export const getDashboardCount = createAsyncThunk(
  "getDashboardCount",
  async (req) => {
    try {
      const response = asyncDashboardCount(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);
