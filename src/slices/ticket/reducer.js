import { createSlice } from "@reduxjs/toolkit";
import {
  getTicketList,
  createTicket,
  editTicket,
  getTicketChatList,
  getOneTicketList,
} from "./thunk";

export const initialState = {
  ticketList: [],
  oneTicketList: [],
  ticketChatList: [],
  checkCoupon: [],

  filterParams: {
    currentPage: 1,
    perPage: 20,
    status: "open",
    type: "",
  },

  insertTicket: {
    formOpen: false,
    loading: false,
  },

  updateTicket: {
    loading: false,
    formOpen: false,
    isEdit: false,
    singleTicket: {},
  },

  getPermissionList: [],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.insertTicket = { ...state.insertTicket, ...action.payload };
    },
    updateTicketStates: (state, action) => {
      state.updateTicket = { ...state.updateTicket, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTicketList.fulfilled, (state, action) => {
      state.ticketList = action.payload;
    });

    builder.addCase(getOneTicketList.fulfilled, (state, action) => {
      state.oneTicketList = action.payload;
    });

    builder.addCase(getTicketChatList.fulfilled, (state, action) => {
      state.ticketChatList = action.payload;
    });

    builder.addCase(createTicket.fulfilled, (state) => {
      state.insertTicket = { formOpen: false, loading: false };
    });

    builder.addCase(editTicket.fulfilled, (state) => {
      state.updateTicket = { formOpen: false, loading: false };
    });
  },
});

export const { updateState, updateTicketStates } = ticketSlice.actions;

export default ticketSlice.reducer;
