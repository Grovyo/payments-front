import socket from "@/app/utils/sockets";
import { createSlice } from "@reduxjs/toolkit";

export const setSocketReducer = createSlice({
  name: "socket",
  initialState: "",
  reducers: {
    sendsocket: (state, action) => {
      return action.payload;
    },
  },
});

export const { sendsocket } = setSocketReducer.actions;
export default setSocketReducer.reducer;
