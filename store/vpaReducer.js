import { createSlice } from "@reduxjs/toolkit";

export const vpaReducer = createSlice({
  name: "vpa",
  initialState: "",
  reducers: {
    sendvpa: (state, action) => {
      return action.payload;
    },
  },
});

export const { sendvpa } = vpaReducer.actions;
export default vpaReducer.reducer;
