import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTicketList as asyncGetTicketList,
  getOneTicket as asyncgetOneTicket,
  getTicketChatList as asyncGetTicketChatList,
  createTicket as asyncCreateTicket,
  createTicketChat as asyncCreateTicketChat,
  updateTicket as asyncUpdateTicket,
  updateTicketStatus as asyncUpdateTicketStatus,
  deleteTicket as asyncDeleteTicket,
  deleteTicketChat as asyncDeleteTicketChat,
  deleteBulkTicket as asyncDeleteBulkTicket,
  updateTicketChat as asyncUpdateTicketChat,
} from "../../helpers/apis";

import { showToast } from "../toast/reducer";

export const getTicketList = createAsyncThunk("getTicketList", async (req) => {
  try {
    const response = asyncGetTicketList(req);
    return response;
  } catch (error) {
    return error;
  }
});

export const getOneTicketList = createAsyncThunk(
  "getOneTicketList",
  async (req) => {
    try {
      const response = asyncgetOneTicket(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getTicketChatList = createAsyncThunk(
  "getTicketChatList",
  async (req) => {
    try {
      const response = asyncGetTicketChatList(req);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "chat/deleteTicket",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteTicket(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getTicketList(currentState.ticket.filterParams));
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

export const deleteTicketChat = createAsyncThunk(
  "chat/deleteTicketChat",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteTicketChat(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getOneTicketList(currentState.ticket.filterParams));
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const createTicket = createAsyncThunk(
  "chat/createTicket",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateTicket(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getTicketList(currentState.ticket.filterParams));
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

export const createTicketChat = createAsyncThunk(
  "chat/createTicketChat",
  async (req, thunkAPI) => {
    try {
      const response = await asyncCreateTicketChat(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getTicketList(currentState.ticket.filterParams));

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const editTicket = createAsyncThunk(
  "editTicket",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateTicket(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getTicketList(currentState.ticket.filterParams));
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

export const editTicketChat = createAsyncThunk(
  "editTicketChat",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateTicketChat(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getTicketList(currentState.ticket.filterParams));
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  "updateTicketStatus",
  async (req, thunkAPI) => {
    try {
      const response = await asyncUpdateTicketStatus(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getTicketList(currentState.ticket.filterParams));
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

export const deleteBulkTicket = createAsyncThunk(
  "chat/deleteBulkTicket",
  async (req, thunkAPI) => {
    try {
      const response = await asyncDeleteBulkTicket(req);
      const currentState = thunkAPI.getState();
      thunkAPI.dispatch(getTicketList(currentState.ticket.filterParams));
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
